"use client";

import { useState } from "react";
import { profile } from "@/config/profile";

/**
 * ستاره‌های درخشانِ ابزارها — جایگزین نوار متحرک ابزارها؛
 * مثل ستاره‌های کم‌رنگ پس‌زمینه، کاملاً پراکنده و دور تا دورِ عکس
 * (بعضی‌ها خیلی دور، حتی وسط صفحه)؛ با هاور موس، فوکوس کیبورد یا
 * لمس/کلیک، نام ابزار نشان داده می‌شود.
 *
 * هر ستاره یک لنگر صفر-اندازه است؛ نقطه‌ی درخشان و برچسب هر دو
 * حول همان نقطه با translate فیزیکی وسط‌چین می‌شوند.
 * چیدمان دسکتاپ و موبایل جداگانه تنظیم شده چون فضای اطراف عکس فرق دارد.
 */

/** دسکتاپ: پخش در کل فضای اطراف — حتی وسطِ فاصله‌ی عکس و متن */
const DESKTOP_POSITIONS = [
  { x: "-10%", y: "-38%" },
  { x: "18%", y: "-44%" },
  { x: "58%", y: "-42%" },
  { x: "126%", y: "-30%" },
  { x: "142%", y: "14%" },
  { x: "118%", y: "62%" },
  { x: "150%", y: "88%" },
  { x: "-8%", y: "78%" },
] as const;

/** موبایل: پخش در عرض و پایینِ عکس؛ بالای عکس جا برای پخش نیست */
const MOBILE_POSITIONS = [
  { x: "-40%", y: "18%" },
  { x: "-30%", y: "-10%" },
  { x: "20%", y: "-10%" },
  { x: "88%", y: "-8%" },
  { x: "138%", y: "26%" },
  { x: "112%", y: "70%" },
  { x: "0%", y: "90%" },
  { x: "-28%", y: "96%" },
] as const;

type StarPosition = { x: string; y: string };

export function ToolStars() {
  const tools = profile.tools;
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);

  const renderStars = (positions: readonly StarPosition[]) =>
    tools.map((tool, i) => {
      const pos = positions[i % positions.length];
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
    });

  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {/* چیدمان دسکتاپ */}
      <div className="absolute inset-0 hidden lg:block">
        {renderStars(DESKTOP_POSITIONS)}
      </div>
      {/* چیدمان موبایل و تبلت */}
      <div className="absolute inset-0 lg:hidden">
        {renderStars(MOBILE_POSITIONS)}
      </div>
    </div>
  );
}
