import { profile } from "@/config/profile";

/**
 * نوار متحرک بی‌پایان ابزارها و مهارت‌ها؛
 * با فونت نمایشی برند و جداکننده‌ی طلایی، برای حس فنی و زنده.
 */
export function ToolsMarquee() {
  return (
    <div
      aria-hidden="true"
      dir="ltr"
      className="relative overflow-hidden border-y bg-muted/30 py-4"
    >
      {/* محو شدن لبه‌ها */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused]">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex items-center gap-10">
            {profile.tools.map((tool) => (
              <li key={tool} className="flex items-center gap-10">
                <span className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                  {tool}
                </span>
                <span className="text-sm text-primary">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
