"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
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
          aria-label={`رفتن به بالای صفحه - ${profile.name}`}
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground shadow-sm">
            {profile.initials}
          </span>
          <span className="text-lg font-bold">{profile.name}</span>
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

          {/* دکمه منوی موبایل */}
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
            <SheetContent side="right" aria-describedby={undefined} className="w-72">
              <SheetHeader>
                <SheetTitle className="text-start">{profile.name}</SheetTitle>
              </SheetHeader>
              <Separator />
              <nav aria-label="ناوبری موبایل" className="px-4">
                <ul className="flex flex-col gap-1">
                  {NAV_ITEMS.map(({ id, label }) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                          active === id
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        )}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
