import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message ?? "اطلاعات وارد شده معتبر نیستند.",
        },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    await db.contactMessage.create({
      data: { name, email, subject: subject || null, message },
    });

    return NextResponse.json({
      ok: true,
      message: "پیام شما با موفقیت ثبت شد.",
    });
  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { ok: false, error: "خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
