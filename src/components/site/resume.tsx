"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { ResumeButton } from "./resume-button";
import { profile } from "@/config/profile";
import { cn } from "@/lib/utils";

interface TimelineItem {
  title: string;
  org: string;
  period: string;
  description: string;
  current?: boolean;
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-8 before:absolute before:inset-y-2 before:start-[7px] before:w-px before:bg-border">
      {items.map((item, i) => (
        <motion.li
          key={`${item.title}-${i}`}
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          className="relative ps-10"
        >
          <span
            className="absolute start-0 top-1.5 flex size-[15px] items-center justify-center rounded-full bg-primary shadow-[0_0_0_4px] shadow-primary/15"
            aria-hidden="true"
          />
          <div className="rounded-2xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/10 text-primary"
              >
                {item.period}
              </Badge>
              {item.current ? (
                <Badge className="bg-primary text-primary-foreground">
                  در حال فعالیت
                </Badge>
              ) : null}
            </div>
            <h3 className="font-bold">{item.title}</h3>
            <p className="mt-0.5 text-sm text-primary/90">{item.org}</p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {item.description}
            </p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function Resume() {
  return (
    <section
      id="resume"
      className="scroll-mt-20 border-y bg-muted/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          badge="رزومه"
          title="مسیر حرفه‌ای من"
          description="سوابق شغلی و تحصیلی من به‌صورت خلاصه. نسخه کامل رزومه را می‌توانید دانلود کنید."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Tabs defaultValue="experience" dir="rtl" className="w-full">
            <TabsList className="mx-auto mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="experience" className="gap-2">
                <Briefcase className="size-4" aria-hidden="true" />
                سوابق شغلی
              </TabsTrigger>
              <TabsTrigger value="education" className="gap-2">
                <GraduationCap className="size-4" aria-hidden="true" />
                تحصیلات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="experience">
              <Timeline
                items={profile.experience.map((e) => ({
                  title: e.title,
                  org: e.company,
                  period: e.period,
                  description: e.description,
                  current: e.current,
                }))}
              />
            </TabsContent>

            <TabsContent value="education">
              <Timeline
                items={profile.education.map((e) => ({
                  title: e.degree,
                  org: e.school,
                  period: e.period,
                  description: e.description,
                  current: e.current,
                }))}
              />
            </TabsContent>
          </Tabs>
        </motion.div>

        <div className="mt-12 text-center">
          <ResumeButton />
        </div>
      </div>
    </section>
  );
}
