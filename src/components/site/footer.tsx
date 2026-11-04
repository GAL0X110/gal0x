"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SocialIcon } from "./social-icon";
import { profile } from "@/config/profile";
import { cn } from "@/lib/utils";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      size="icon"
      aria-label="بازگشت به بالای صفحه"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-6 end-6 z-40 rounded-full shadow-lg transition-all duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </Button>
  );
}

export function Footer() {
  const jalaliYear = new Date().toLocaleDateString("fa-IR", {
    year: "numeric",
  });

  return (
    <>
      <footer className="mt-auto border-t bg-muted/40">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                {profile.initials}
              </span>
              <div>
                <p className="font-bold">{profile.name}</p>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            </div>

            <ul className="flex items-center gap-2">
              {profile.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="flex size-9 items-center justify-center rounded-full border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <SocialIcon icon={social.icon} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground sm:flex-row sm:text-start">
            <p>
              © {jalaliYear} {profile.name} — تمامی حقوق محفوظ است.
            </p>
            <p className="flex items-center gap-1.5">
              ساخته‌شده با
              <Heart
                className="size-4 fill-destructive text-destructive"
                aria-hidden="true"
              />
              و Next.js
            </p>
          </div>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
