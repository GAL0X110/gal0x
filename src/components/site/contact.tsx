"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "./section-heading";
import { SocialIcon } from "./social-icon";
import { profile } from "@/config/profile";

interface ContactInfoItem {
  icon: typeof Mail;
  label: string;
  value: string;
  ltr: boolean;
  href?: string;
}

const CONTACT_INFO: ContactInfoItem[] = [
  {
    icon: Mail,
    label: "ایمیل",
    value: profile.email,
    ltr: true,
    href: `mailto:${profile.email}`,
  },
  {
    icon: Phone,
    label: "موبایل",
    value: profile.phone,
    ltr: true,
    href: `tel:${profile.phone.replace(/\s+/g, "")}`,
  },
  { icon: MapPin, label: "موقعیت", value: profile.location, ltr: false },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const updateField = (field: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      toast({
        title: "خطا در ارسال",
        description: "لطفاً نام خود را کامل وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    if (!EMAIL_PATTERN.test(form.email.trim())) {
      toast({
        title: "خطا در ارسال",
        description: "لطفاً یک ایمیل معتبر وارد کنید.",
        variant: "destructive",
      });
      return;
    }
    if (form.message.trim().length < 10) {
      toast({
        title: "خطا در ارسال",
        description: "متن پیام باید حداقل ۱۰ کاراکتر باشد.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "خطا در ارسال پیام");
      }

      toast({
        title: "پیام شما ارسال شد ✅",
        description: "به‌محض مشاهده پیام، با شما در ارتباط خواهم بود.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "ارسال پیام ناموفق بود",
        description:
          error instanceof Error
            ? error.message
            : "لطفاً چند لحظه بعد دوباره تلاش کنید.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="05"
          badge="تماس با من"
          title="بیایید در ارتباط باشیم"
          description="برای همکاری، سؤال یا حتی یک سلام ساده، از فرم زیر استفاده کنید. پیام شما مستقیماً برای من ارسال می‌شود."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* اطلاعات تماس */}
          <div className="space-y-4 lg:col-span-2">
            {CONTACT_INFO.map((item) => {
              const content = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p
                      className="truncate font-semibold"
                      dir={item.ltr ? "ltr" : undefined}
                      style={item.ltr ? { textAlign: "end" } : undefined}
                    >
                      {item.value}
                    </p>
                  </div>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={`${item.label}: ${item.value}`}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  {content}
                </div>
              );
            })}

            {/* شبکه‌های اجتماعی */}
            <div className="rounded-2xl border bg-card p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold">من را دنبال کنید</p>
              <ul className="flex flex-wrap gap-2">
                {profile.socials.map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      title={social.name}
                      className="flex size-10 items-center justify-center rounded-xl border bg-background text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-md"
                    >
                      <SocialIcon icon={social.icon} className="size-4.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* فرم تماس */}
          <Card className="shadow-sm lg:col-span-3">
            <CardHeader>
              <CardTitle>ارسال پیام</CardTitle>
              <CardDescription>
                معمولاً ظرف ۲۴ ساعت پاسخ می‌دهم.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">نام و نام خانوادگی *</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="نام شما"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      required
                      minLength={2}
                      maxLength={80}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">ایمیل *</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      dir="ltr"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                      maxLength={120}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">موضوع</Label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    placeholder="موضوع پیام (اختیاری)"
                    value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    maxLength={120}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">متن پیام *</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder="سلام، می‌خواستم درباره…"
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    required
                    minLength={10}
                    maxLength={2000}
                    className="resize-none"
                  />
                </div>

                <Button type="submit" size="lg" disabled={sending} className="w-full sm:w-auto">
                  {sending ? (
                    <>
                      <Loader2
                        className="size-4 animate-spin"
                        aria-hidden="true"
                      />
                      در حال ارسال…
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                      ارسال پیام
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
