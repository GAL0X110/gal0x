import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { readManifest, writeManifest } from "@/lib/brand-manifest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

/** پسوندهای مجاز برای تصاویر بر اساس MIME type */
const IMAGE_TYPES: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // ۵ مگابایت
const MAX_RESUME_SIZE = 10 * 1024 * 1024; // ۱۰ مگابایت

const VALID_TYPES = ["avatar", "logo", "resume"] as const;
type UploadType = (typeof VALID_TYPES)[number];

function badRequest(error: string) {
  return NextResponse.json({ ok: false, error }, { status: 400 });
}

export async function GET() {
  /* خواندن هدرها، درخواست را داینامیک می‌کند و از هر نوع کش جلوگیری می‌کند */
  const headersList = await headers();
  void headersList.get("user-agent");

  const manifest = await readManifest();
  return NextResponse.json(manifest, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const type = formData.get("type");
    const file = formData.get("file");

    if (
      typeof type !== "string" ||
      !VALID_TYPES.includes(type as UploadType) ||
      !(file instanceof File)
    ) {
      return badRequest("درخواست آپلود نامعتبر است.");
    }

    /* اعتبارسنجی نوع فایل */
    if (type === "resume") {
      if (file.type !== "application/pdf") {
        return badRequest("فایل رزومه باید از نوع PDF باشد.");
      }
      if (file.size > MAX_RESUME_SIZE) {
        return badRequest("حجم فایل رزومه نباید بیشتر از ۱۰ مگابایت باشد.");
      }
    } else {
      if (!(file.type in IMAGE_TYPES)) {
        return badRequest(
          "فرمت تصویر پشتیبانی نمی‌شود (PNG، JPG، WebP، GIF یا SVG)."
        );
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return badRequest("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
      }
    }

    const publicDir = path.join(process.cwd(), "public");
    const imagesDir = path.join(publicDir, "images");
    await fs.mkdir(imagesDir, { recursive: true });

    const manifest = await readManifest();
    const buffer = Buffer.from(await file.arrayBuffer());

    if (type === "resume") {
      await fs.writeFile(path.join(publicDir, "resume.pdf"), buffer);
      manifest.resume = "/resume.pdf";
    } else {
      /* حذف نسخه‌های قبلی با پسوند متفاوت */
      const existing = await fs.readdir(imagesDir);
      await Promise.all(
        existing
          .filter((name) => name.startsWith(`${type}.`))
          .map((name) => fs.unlink(path.join(imagesDir, name)))
      );

      const ext = IMAGE_TYPES[file.type];
      await fs.writeFile(path.join(imagesDir, `${type}.${ext}`), buffer);
      manifest[type] = `/images/${type}.${ext}`;
    }

    manifest.updatedAt = Date.now();
    await writeManifest(manifest);

    return NextResponse.json({ ok: true, manifest });
  } catch (error) {
    console.error("[POST /api/brand]", error);
    return NextResponse.json(
      { ok: false, error: "خطای غیرمنتظره در ذخیره فایل رخ داد." },
      { status: 500 }
    );
  }
}
