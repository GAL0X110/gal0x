"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/config/profile";

export function ResumeButton({
  className,
  label = "دانلود رزومه",
}: {
  className?: string;
  label?: string;
}) {
  const { toast } = useToast();

  if (!profile.resumeUrl) {
    return (
      <Button
        variant="outline"
        size="lg"
        className={className}
        onClick={() =>
          toast({
            title: "رزومه هنوز آپلود نشده است",
            description:
              "فایل رزومه‌ات را در پوشه public بگذارید و مسیرش را در فایل src/config/profile.ts وارد کنید.",
          })
        }
      >
        <FileText className="size-4" aria-hidden="true" />
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="lg" className={className}>
      <a href={profile.resumeUrl} download>
        <FileText className="size-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
