"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "./section-heading";
import { profile, type Project as ProjectType } from "@/config/profile";

function ProjectCard({ project, index }: { project: ProjectType; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={project.image}
              alt={`تصویر پروژه ${project.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="text-lg font-bold">{project.title}</h3>
          <p className="flex-1 text-sm leading-7 text-muted-foreground">
            {project.description}
          </p>
          <ul className="flex flex-wrap gap-1.5" aria-label="تکنولوژی‌های پروژه">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>

        <CardFooter className="gap-2 border-t p-5 pt-4">
          {project.demoUrl ? (
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                مشاهده دمو
                <ArrowUpLeft className="size-4" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          {project.codeUrl ? (
            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                کد پروژه
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          ) : null}
          {!project.demoUrl && !project.codeUrl ? (
            <span className="text-sm text-muted-foreground">به‌زودی…</span>
          ) : null}
        </CardFooter>
      </Card>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          badge="نمونه‌کارها"
          title="پروژه‌های من"
          description="مجموعه‌ای از پروژه‌هایی که روی آن‌ها کار کرده‌ام. هر زمان پروژه جدیدی داشته باشید، می‌توانید از فایل کانفیگ به سایت اضافه‌اش کنید."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {profile.projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
