import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { profile } from "@/config/profile";

const contactSchema = z.object({
  name: z.string().trim().min(2, "نام باید حداقل ۲ کاراکتر باشد").max(80),
  email: z.email("ایمیل معتبر نیست").max(120),
  subject: z.string().trim().max(120).optional(),
  message: z
    .string()
    .trim()
    .min(10, "پیام باید حداقل ۱۰ کاراکتر باشد")
    .max(2000),
});

/**
 * ساخت لینک mailto برای حالت پشتیبان؛
 * روی هاست‌های سرورلس (مثل Vercel) که دیتابیس فایلی ندارند،
 * پیام به‌جای ذخیره در دیتابیس با ایمیل به صندوق صاحب سایت می‌رسد.
 */
function buildMailto(
  name: string,
  email: string,
  subject?: string,
  message?: string
) {
  const body = [`نام: ${name}`, `ایمیل: ${email}`, "", message ?? ""].join("\n");
  const mailSubject =
    subject || `پیام جدید از سایت ${profile.brand} — ${name}`;

  return `mailto:${profile.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error:
            parsed.error.issues[0]?.message ??
            "اطلاعات وارد شده معتبر نیستند.",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    /* ذخیره در دیتابیس؛ اگر در دسترس نبود، حالت پشتیبان (ایمیل) اجرا می‌شود */
    let stored = false;
    try {
      await db.contactMessage.create({
        data: { name, email, subject: subject || null, message },
      });
      stored = true;
    } catch (dbError) {
      console.error(
        "[POST /api/contact] DB unavailable — falling back to mailto:",
        dbError
      );
    }

    if (stored) {
      return NextResponse.json({
        ok: true,
        message: "پیام شما با موفقیت ثبت شد.",
      });
    }

    return NextResponse.json({
      ok: true,
      delivered: "mailto",
      mailto: buildMailto(name, email, subject, message),
      message: "پیام شما از طریق ایمیل ارسال می‌شود.",
    });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { ok: false, error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
