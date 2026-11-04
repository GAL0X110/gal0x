"use client";

import { motion } from "framer-motion";
import { Briefcase, Mail, MapPin, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { ResumeButton } from "./resume-button";
import { profile } from "@/config/profile";

const INFO_ITEMS = [
  { icon: User, label: "نام کامل", value: profile.fullName },
  { icon: MapPin, label: "موقعیت", value: profile.location },
  { icon: Mail, label: "ایمیل", value: profile.email },
  {
    icon: Briefcase,
    label: "وضعیت",
    value: profile.available ? "آماده همکاری" : "مشغول به کار",
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          badge="درباره من"
          title="کمی بیشتر با من آشنا شوید"
          description="در این بخش می‌توانید با من، علاقه‌مندی‌ها و مسیری که طی کرده‌ام آشنا شوید."
        />

        <div className="grid items-start gap-10 lg:grid-cols-5">
          {/* متن بیوگرافی */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="space-y-5 leading-8 text-muted-foreground">
              {profile.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-8 mb-4 font-bold">علاقه‌مندی‌های من</h3>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <li key={interest}>
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {interest}
                  </Badge>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* کارت اطلاعات */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <Card className="shadow-sm">
              <CardContent className="p-6">
                <ul className="space-y-5">
                  {INFO_ITEMS.map((item) => (
                    <li key={item.label} className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <item.icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">
                          {item.label}
                        </p>
                        <p
                          className="truncate font-semibold"
                          dir={item.label === "ایمیل" ? "ltr" : undefined}
                          style={
                            item.label === "ایمیل"
                              ? { textAlign: "end" }
                              : undefined
                          }
                        >
                          {item.value}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <ResumeButton className="mt-6 w-full" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
