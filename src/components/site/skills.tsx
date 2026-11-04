"use client";

import { motion } from "framer-motion";
import { Languages, Wrench } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { profile } from "@/config/profile";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-y bg-muted/40 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          badge="مهارت‌ها"
          title="مهارت‌ها و تخصص‌های من"
          description="فهرست مهارت‌ها و ابزارهایی که با آن‌ها کار می‌کنم. سطوح را می‌توانید از فایل کانفیگ تغییر دهید."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {/* مهارت‌های اصلی */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <Card className="h-full shadow-sm">
              <CardHeader>
                <CardTitle>مهارت‌های اصلی</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {profile.skills.map((skill, i) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">
                        {skill.level.toLocaleString("fa-IR")}٪
                      </span>
                    </div>
                    <div
                      className="h-2 overflow-hidden rounded-full bg-muted"
                      role="progressbar"
                      aria-label={`سطح مهارت ${skill.name}`}
                      aria-valuenow={skill.level}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: 0.9,
                          delay: 0.1 + i * 0.08,
                          ease: "easeOut",
                        }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* ابزارها و زبان‌ها */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
          >
            <Card className="h-full shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="size-5 text-primary" aria-hidden="true" />
                  ابزارها و فناوری‌ها
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {profile.tools.map((tool) => (
                    <li key={tool}>
                      <Badge
                        variant="outline"
                        className="px-3 py-1.5 text-sm transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                      >
                        {tool}
                      </Badge>
                    </li>
                  ))}
                </ul>

                <div className="my-6 h-px bg-border" aria-hidden="true" />

                <h3 className="mb-4 flex items-center gap-2 font-semibold">
                  <Languages
                    className="size-5 text-primary"
                    aria-hidden="true"
                  />
                  زبان‌ها
                </h3>
                <ul className="space-y-3">
                  {profile.languages.map((lang) => (
                    <li
                      key={lang.name}
                      className="flex items-center justify-between rounded-xl bg-muted/60 px-4 py-3"
                    >
                      <span className="font-medium">{lang.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {lang.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
