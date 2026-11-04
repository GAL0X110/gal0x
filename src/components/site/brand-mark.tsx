"use client";

import { useState } from "react";
import Image from "next/image";
import { profile } from "@/config/profile";
import { useBrand } from "./brand-context";
import { cn } from "@/lib/utils";

/**
 * نشان دایره‌ای برند سایت: اگر لوگو تنظیم شده باشد لوگو را به‌صورت
 * دایره‌ای کامل نمایش می‌دهد، وگرنه حروف اول نام را نشان می‌دهد.
 */
export function BrandMark({ className }: { className?: string }) {
  const { manifest } = useBrand();
  const [failed, setFailed] = useState(false);

  const logo = manifest?.logo ?? (profile.logo || null);
  const showLogo = Boolean(logo) && !failed;

  return (
    <span
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/30",
        className
      )}
    >
      {showLogo && logo ? (
        <Image
          src={`${logo}?v=${manifest?.updatedAt ?? 0}`}
          alt={`لوگوی ${profile.name}`}
          fill
          sizes="36px"
          className="object-cover"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-bold">{profile.initials}</span>
      )}
    </span>
  );
}
