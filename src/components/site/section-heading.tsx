"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  /** شماره‌ی بخش برای حس فنی؛ مثل "01" */
  index?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  index,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
    >
      {index ? (
        <p
          dir="ltr"
          aria-hidden="true"
          className="mb-3 font-display text-xs font-bold tracking-[0.45em] text-primary/60"
        >
          {"//"} {index}
        </p>
      ) : null}
      <Badge
        variant="outline"
        className="mb-4 border-primary/30 bg-primary/10 text-primary hover:bg-primary/10"
      >
        {badge}
      </Badge>
      <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-8 text-muted-foreground">{description}</p>
      ) : null}
    </motion.div>
  );
}
