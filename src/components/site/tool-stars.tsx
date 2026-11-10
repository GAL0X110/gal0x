"use client";

import { useState } from "react";
import { Sparkle } from "lucide-react";
import { profile } from "@/config/profile";

/**
 * ستاره‌های طلایی پراکنده در کهکشان صفحه‌ی اول؛
 * جایگزین نوار متحرک ابزارها — هر ستاره یک ابزار است که
 * با هاور موس، فوکوس کیبورد یا لمس/کلیک، نامش را نشان می‌دهد.
 *
 * هر ستاره یک لنگر صفر-اندازه است؛ آیکون و برچسب هر دو
 * حول همان نقطه با translate فیزیکی وسط‌چین می‌شوند.
 */

/** موقعیت ثابت ستاره‌ها (درصدی، دور از متن اصلی)؛ sm یعنی در موبایل هم دیده شود */
const TOOL_STAR_POSITIONS = [
  { x: "20%", y: "10%", sm: true },
  { x: "79%", y: "9%", sm: true },
  { x: "94%", y: "34%", sm: false },
  { x: "5%", y: "40%", sm: false },
  { x: "96%", y: "72%", sm: false },
  { x: "9%", y: "82%", sm: false },
  { x: "34%", y: "96%", sm: true },
  { x: "86%", y: "90%", sm: false },
] as const;

export function ToolStars() {
  const tools = profile.tools;
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {tools.map((tool, i) => {
        const pos = TOOL_STAR_POSITIONS[i % TOOL_STAR_POSITIONS.length];
        const isActive = hovered === tool || pinned === tool;

        return (
          <div
            key={tool}
            className={`group absolute size-0 ${pos.sm ? "" : "hidden lg:block"}`}
            style={{ left: pos.x, top: pos.y }}
          >
            <button
              type="button"
              aria-label={tool}
              className="star-twinkle pointer-events-auto absolute left-0 top-0 flex size-7 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              style={{
                animationDelay: `${i * 0.45}s`,
                animationDuration: `${2.6 + (i % 3) * 0.8}s`,
              }}
              onMouseEnter={() => setHovered(tool)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(tool)}
              onBlur={() => setHovered(null)}
              onClick={() => setPinned((p) => (p === tool ? null : tool))}
            >
              <Sparkle
                className={`size-3.5 fill-primary text-primary drop-shadow-[0_0_7px_rgba(234,179,8,0.9)] transition-transform duration-200 ${
                  isActive ? "scale-150" : "scale-100"
                }`}
                aria-hidden="true"
              />
            </button>

            {/* برچسب نام ابزار — بالای ستاره، وسط‌چین */}
            <span
              dir="ltr"
              className={`pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-lg border border-primary/30 bg-card px-2.5 py-1 font-display text-xs font-semibold tracking-widest text-foreground shadow-lg transition-all duration-200 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {tool}
            </span>
          </div>
        );
      })}
    </div>
  );
}
