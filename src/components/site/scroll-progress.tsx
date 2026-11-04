"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * نشانگر پیشرفت اسکرول:
 * - دسکتاپ: ریل عمودی طلایی سمت راست صفحه با نقطه‌ی درخشان
 * - موبایل: خط باریک طلایی بالای صفحه
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });
  const tipTop = useTransform(progress, (v) => `${Math.min(100, v * 100)}%`);

  return (
    <>
      {/* خط پیشرفت موبایل */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-right bg-gradient-to-l from-primary to-primary/60 sm:hidden"
      />

      {/* ریل عمودی دسکتاپ (سمت راست) */}
      <div
        aria-hidden="true"
        className="fixed top-1/2 start-4 z-40 hidden -translate-y-1/2 sm:block"
      >
        <div className="relative h-44 w-[3px] rounded-full bg-border/80">
          <motion.span
            style={{ scaleY: progress }}
            className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/50"
          />
          <motion.span
            style={{ top: tipTop }}
            className="absolute -start-[3.5px] size-[10px] -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_3px] shadow-primary/40"
          />
        </div>
      </div>
    </>
  );
}
