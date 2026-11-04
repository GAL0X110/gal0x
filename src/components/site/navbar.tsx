"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandMark } from "./brand-mark";
import { SocialIcon } from "./social-icon";
import { ThemeToggle } from "./theme-toggle";
import { profile } from "@/config/profile";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { id: "home", label: "خانه" },
  { id: "about", label: "درباره من" },
  { id: "skills", label: "مهارت‌ها" },
  { id: "projects", label: "پروژه‌ها" },
  { id: "resume", label: "رزومه" },
  { id: "contact", label: "تماس" },
] as const;

/** شماره‌ی فارسی بخش‌ها برای منوی موبایل */
const FA_INDEXES = ["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* نمایش بخش فعال هنگام اسکرول */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    for (const { id } of NAV_ITEMS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* لوگو */}
        <a
          href="#home"
          className="flex items-center gap-2.5"
          aria-label={`رفتن به بالای صفحه - ${profile.brand}`}
        >
          <BrandMark />
          <span className="flex flex-col leading-none">
            <span className="text-shine font-display text-base font-bold tracking-[0.3em]">
              {profile.brand}
            </span>
            <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:block">
              {profile.fullName}
            </span>
          </span>
        </a>

        {/* منوی دسکتاپ */}
        <nav aria-label="ناوبری اصلی" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active === id
                      ? "text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  {label}
                  {active === id ? (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* منوی موبایل */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="باز کردن منو"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="w-80 gap-0 border-primary/20 [&>button]:hidden"
            >
              {/* کهکشان برند در پس‌زمینه‌ی منو */}
              <Image
                src="/images/galaxy.png"
                alt=""
                aria-hidden="true"
                width={340}
                height={340}
                className="spin-galaxy pointer-events-none absolute -bottom-16 -start-20 size-64 select-none opacity-40 mix-blend-screen"
              />

              {/* سربرگ: برند و دکمه‌ی بستن داخل جریان صفحه (بدون تداخل) */}
              <SheetHeader className="relative flex-row items-center justify-between gap-3 border-b border-border/70 p-4">
                <SheetTitle className="flex items-center gap-2.5 text-start">
                  <BrandMark className="size-9" />
                  <span className="flex flex-col leading-none">
                    <span className="text-shine font-display text-sm font-bold tracking-[0.3em]">
                      {profile.brand}
                    </span>
                    <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {profile.fullName}
                    </span>
                  </span>
                </SheetTitle>
                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="بستن منو"
                    className="text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  >
                    <X className="size-5" aria-hidden="true" />
                  </Button>
                </SheetClose>
              </SheetHeader>

              {/* لینک‌ها با ورود پلکانی */}
              <nav
                aria-label="ناوبری موبایل"
                className="relative flex-1 overflow-y-auto px-4 py-6"
              >
                <ul className="space-y-1.5">
                  {NAV_ITEMS.map(({ id, label }, i) => (
                    <motion.li
                      key={id}
                      initial={{ opacity: 0, x: 32 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.05,
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300",
                          active === id
                            ? "bg-primary/10 text-primary shadow-[inset_-3px_0_0_0] shadow-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground hover:ps-5"
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="font-display text-[11px] font-bold tracking-widest text-primary/60"
                        >
                          {FA_INDEXES[i]}
                        </span>
                        <span className="text-base font-semibold">{label}</span>
                        <ArrowUpLeft
                          className="ms-auto size-4 -translate-x-1 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* پایین منو: شعار برند و شبکه‌های اجتماعی */}
              <div className="relative border-t border-border/70 p-4">
                <p
                  dir="ltr"
                  className="font-display text-[10px] font-semibold tracking-[0.35em] text-muted-foreground"
                >
                  {"//"} BUILDING FROM ZERO.
                </p>
                <ul className="mt-3 flex items-center gap-2">
                  {profile.socials.map((social) => (
                    <li key={social.name}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        title={social.name}
                        className="flex size-9 items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        <SocialIcon icon={social.icon} className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
