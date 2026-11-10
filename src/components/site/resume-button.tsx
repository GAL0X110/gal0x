"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useBrand } from "./brand-context";
import { profile } from "@/config/profile";

export function ResumeButton({
  className,
  label = "دانلود رزومه",
}: {
  className?: string;
  label?: string;
}) {
  const { toast } = useToast();
  const { manifest } = useBrand();
  const resumeUrl = (manifest?.resume ?? profile.resumeUrl) || "";

  if (!resumeUrl) {
    return (
      <Button
        variant="outline"
        size="lg"
        className={className}
        onClick={() => toast({ title: "رزومه هنوز آپلود نشده" })}
      >
        <FileText className="size-4" aria-hidden="true" />
        {label}
      </Button>
    );
  }

  return (
    <Button asChild variant="outline" size="lg" className={className}>
      <a href={resumeUrl} download>
        <FileText className="size-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}
