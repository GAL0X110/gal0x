import Image from "next/image";
import { profile } from "@/config/profile";
import { cn } from "@/lib/utils";

/**
 * نشان برند سایت: اگر لوگو در کانفیگ تنظیم شده باشد لوگو را نمایش می‌دهد،
 * وگرنه حروف اول نام را داخل یک مربع رنگی نشان می‌دهد.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary text-primary-foreground shadow-sm",
        className
      )}
    >
      {profile.logo ? (
        <Image
          src={profile.logo}
          alt={`لوگوی ${profile.name}`}
          fill
          sizes="36px"
          className="object-contain p-0.5"
        />
      ) : (
        <span className="font-bold">{profile.initials}</span>
      )}
    </span>
  );
}
