"use client";

import { useState } from "react";
import { profile } from "@/config/profile";

/**
 * ستاره‌های درخشانِ دورِ قاب کهکشانی عکس؛
 * جایگزین نوار متحرک ابزارها — هر ستاره یک ابزار است که
 * با هاور موس، فوکوس کیبورد یا لمس/کلیک، نامش را نشان می‌دهد.
 *
 * هر ستاره یک لنگر صفر-اندازه است؛ نقطه‌ی درخشان و برچسب هر دو
 * حول همان نقطه با translate فیزیکی وسط‌چین می‌شوند.
 */

/** موقعیت ثابت ستاره‌ها (درصدی نسبت به قاب عکس) — دور تا دور قاب، با فاصله از عکس */
const TOOL_STAR_POSITIONS = [
  { x: "38%", y: "-18%" },
  { x: "66%", y: "-16%" },
  { x: "106%", y: "16%" },
  { x: "116%", y: "52%" },
  { x: "106%", y: "82%" },
  { x: "14%", y: "104%" },
  { x: "-16%", y: "52%" },
  { x: "-6%", y: "16%" },
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
            className="group absolute size-0"
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
              {/* ستاره‌ی دایره‌ای درخشان — هم‌خانواده‌ی ستاره‌های پس‌زمینه، ولی پرنورتر */}
              <span
                className={`block size-2 rounded-full bg-primary transition-all duration-200 ${
                  isActive
                    ? "scale-150 shadow-[0_0_10px_4px_rgba(234,179,8,0.9),0_0_30px_12px_rgba(234,179,8,0.45)]"
                    : "scale-100 shadow-[0_0_8px_3px_rgba(234,179,8,0.7),0_0_22px_8px_rgba(234,179,8,0.3)]"
                }`}
                aria-hidden="true"
              />
            </button>

            {/* برچسب نام ابزار — بالای ستاره، وسط‌چین */}
            <span
              dir="ltr"
              className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-primary/30 bg-card px-2.5 py-1 font-display text-xs font-semibold tracking-widest text-foreground shadow-lg transition-all duration-200 ${
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
