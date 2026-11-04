"use client";

import { useState, type ChangeEvent } from "react";
import {
  CircleUserRound,
  FileCheck2,
  FileText,
  Loader2,
  Settings2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useBrand } from "./brand-context";
import { cn } from "@/lib/utils";

type UploadType = "avatar" | "logo" | "resume";

const UPLOAD_ITEMS: {
  type: UploadType;
  title: string;
  hint: string;
  accept: string;
}[] = [
  {
    type: "avatar",
    title: "آواتار / عکس پروفایل",
    hint: "PNG، JPG، WebP یا GIF — حداکثر ۵ مگابایت",
    accept: "image/*",
  },
  {
    type: "logo",
    title: "لوگوی برند",
    hint: "ترجیحاً PNG یا SVG — حداکثر ۵ مگابایت",
    accept: "image/*",
  },
  {
    type: "resume",
    title: "فایل رزومه",
    hint: "فقط PDF — حداکثر ۱۰ مگابایت",
    accept: "application/pdf",
  },
];

export function BrandSettings() {
  const { manifest, refetch } = useBrand();
  const { toast } = useToast();
  const [uploading, setUploading] = useState<UploadType | null>(null);
  const [open, setOpen] = useState(false);

  async function handleUpload(type: UploadType, file: File) {
    setUploading(type);
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("file", file);

      const res = await fetch("/api/brand", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "آپلود فایل ناموفق بود.");
      }

      toast({
        title: "فایل با موفقیت آپلود شد ✅",
        description: "تغییرات بلافاصله در سایت اعمال می‌شود.",
      });
      await refetch();
    } catch (error) {
      toast({
        title: "آپلود ناموفق بود",
        description:
          error instanceof Error ? error.message : "لطفاً دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  }

  function onFileChange(type: UploadType, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) void handleUpload(type, file);
    e.target.value = "";
  }

  function renderStatus(type: UploadType) {
    if (type === "avatar") {
      return manifest?.avatar ? (
        <Image
          src={`${manifest.avatar}?v=${manifest.updatedAt}`}
          alt="پیش‌نمایش آواتار"
          width={40}
          height={40}
          unoptimized
          className="size-10 rounded-full object-cover ring-2 ring-primary/30"
        />
      ) : (
        <span className="text-xs text-muted-foreground">پیش‌فرض</span>
      );
    }
    if (type === "logo") {
      return manifest?.logo ? (
        <Image
          src={`${manifest.logo}?v=${manifest.updatedAt}`}
          alt="پیش‌نمایش لوگو"
          width={40}
          height={40}
          unoptimized
          className="size-10 rounded-xl bg-muted object-contain p-1 ring-2 ring-primary/30"
        />
      ) : (
        <span className="text-xs text-muted-foreground">تنظیم نشده</span>
      );
    }
    return manifest?.resume ? (
      <Badge className="gap-1 bg-primary text-primary-foreground">
        <FileCheck2 className="size-3.5" aria-hidden="true" />
        آپلود شده
      </Badge>
    ) : (
      <Badge variant="outline" className="text-muted-foreground">
        تنظیم نشده
      </Badge>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="تنظیمات برند و آپلود فایل‌ها"
          title="تنظیمات برند و آپلود فایل‌ها"
          className="fixed bottom-6 start-6 z-40 size-11 rounded-full shadow-lg"
        >
          <Settings2 className="size-5" aria-hidden="true" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="size-5 text-primary" aria-hidden="true" />
            تنظیمات برند سایت
          </DialogTitle>
          <DialogDescription>
            آواتار، لوگو و رزومه‌ات را از همین‌جا آپلود کنید؛ تغییرات بلافاصله
            روی سایت اعمال می‌شود.
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ul className="space-y-3">
          {UPLOAD_ITEMS.map((item) => (
            <li
              key={item.type}
              className="flex items-center gap-3 rounded-2xl border bg-card p-4"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {item.type === "resume" ? (
                  <FileText className="size-5" aria-hidden="true" />
                ) : (
                  <CircleUserRound className="size-5" aria-hidden="true" />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {item.hint}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {renderStatus(item.type)}
                <Button asChild size="sm" variant="outline" className="gap-1.5">
                  <label className="cursor-pointer">
                    {uploading === item.type ? (
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <UploadCloud className="size-4" aria-hidden="true" />
                    )}
                    آپلود
                    <input
                      type="file"
                      accept={item.accept}
                      className="sr-only"
                      aria-label={`آپلود ${item.title}`}
                      onChange={(e) => onFileChange(item.type, e)}
                      disabled={uploading !== null}
                    />
                  </label>
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <p className={cn("text-center text-xs text-muted-foreground")}>
          فایل‌ها مستقیماً روی هاست سایت ذخیره می‌شوند و نیازی به تغییر کد
          نیست.
        </p>
      </DialogContent>
    </Dialog>
  );
}
