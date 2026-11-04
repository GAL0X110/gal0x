"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "./brand-context";
import { ResumeButton } from "./resume-button";
import { SocialIcon } from "./social-icon";
import { profile } from "@/config/profile";

function RotatingRole() {
  const roles = profile.roles;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % roles.length),
      2600
    );
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <span className="relative inline-grid h-[1.5em] place-items-center overflow-hidden text-primary">
      {/* عبارت‌های نامرئی برای ثابت ماندن عرض باکس به اندازه‌ی بلندترین عبارت */}
      {roles.map((role) => (
        <span
          key={role}
          aria-hidden="true"
          className="invisible col-start-1 row-start-1 whitespace-nowrap"
        >
          {role}
        </span>
      ))}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="col-start-1 row-start-1 whitespace-nowrap"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const { manifest } = useBrand();
  const avatarSrc = manifest?.avatar ?? profile.avatar;

  return (
    <section id="home" className="relative overflow-hidden">
      {/* پس‌زمینه تزئینی */}
      <div className="bg-dots absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-24 start-1/4 size-96 rounded-full bg-primary/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 -end-24 size-80 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center gap-12 px-4 pb-16 pt-28 sm:px-6 lg:flex-row lg:justify-between lg:gap-8">
        {/* متن معرفی */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl text-center lg:text-start"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" aria-hidden="true" />
            سلام، من
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-primary">#</span>
            {profile.name.replace(/ /g, "_")}
          </h1>

          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 text-xl font-bold sm:text-2xl lg:justify-start">
            یک <RotatingRole /> هستم
          </p>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-muted-foreground lg:mx-0">
            {profile.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <a href="#projects">
                مشاهده پروژه‌ها
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <ResumeButton />
          </div>

          {/* شبکه‌های اجتماعی */}
          <ul className="mt-8 flex items-center justify-center gap-2 lg:justify-start">
            {profile.socials.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  title={social.name}
                  className="flex size-10 items-center justify-center rounded-full border bg-card text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
                >
                  <SocialIcon icon={social.icon} className="size-4.5" />
                </a>
              </li>
            ))}
          </ul>

          {/* آمار */}
          <dl className="mt-10 flex items-center justify-center gap-8 sm:gap-12 lg:justify-start">
            {profile.stats.map((stat) => (
              <div key={stat.label} className="text-center lg:text-start">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="text-2xl font-extrabold text-primary sm:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        {/* عکس پروفایل */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative shrink-0"
        >
          <div
            className="absolute -inset-8 rounded-full bg-gradient-to-tr from-primary/25 via-primary/10 to-transparent blur-2xl"
            aria-hidden="true"
          />
          <div className="relative rounded-full border-4 border-primary/25 bg-background p-2 shadow-xl">
            <Image
              src={`${avatarSrc}?v=${manifest?.updatedAt ?? 0}`}
              alt={`عکس پروفایل ${profile.name}`}
              width={300}
              height={300}
              priority
              unoptimized
              className="size-40 rounded-full object-cover sm:size-56 lg:size-72"
            />
          </div>

          {/* کارت شناور: آماده همکاری */}
          {profile.available ? (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-3 start-0 flex items-center gap-2 rounded-2xl border bg-card px-4 py-2.5 shadow-lg sm:-start-6"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-semibold">آماده همکاری</span>
            </motion.div>
          ) : null}

          {/* کارت شناور: نقش */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 0.6,
            }}
            className="absolute -top-3 end-0 rounded-2xl border bg-card px-4 py-2.5 shadow-lg sm:-end-6"
          >
            <p className="text-sm font-semibold">{profile.role}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
