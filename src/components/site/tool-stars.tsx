"use client";

import { useEffect, useState } from "react";
import { profile } from "@/config/profile";

/**
 * ستاره‌های درخشانِ ابزارها — جایگزین نوار متحرک ابزارها؛
 * دقیقاً مثل ستاره‌های کم‌رنگ پس‌زمینه، کاملاً پراکنده و رندوم:
 * موقعیت هر ستاره در هر بارگذاری، تصادفی ساخته می‌شود.
 * با هاور موس، فوکوس کیبورد یا لمس/کلیک، نام ابزار نشان داده می‌شود.
 *
 * نمونه‌گیری پس‌زنی (rejection sampling) تضمین می‌کند که هیچ ستاره‌ای
 * روی خودِ عکس و حلقه‌های مداری‌اش، روی کارت «آماده همکاری» یا
 * روی ستاره‌ی دیگری نیفتد.
 *
 * هر ستاره یک لنگر صفر-اندازه است؛ نقطه‌ی درخشان و برچسب هر دو
 * حول همان نقطه با translate فیزیکی وسط‌چین می‌شوند.
 * چیدمان دسکتاپ و موبایل جدا محاسبه می‌شود چون فضای اطراف عکس فرق دارد.
 */

type StarPosition = { x: string; y: string };

/** محدوده‌ی مجاز پخش (درصد نسبت به قاب عکس) + قوانین اجتناب */
interface ScatterBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  /** حداقل فاصله از مرکز قاب عکس — تا روی عکس و حلقه‌های مداری نیفتد */
  minRadius: number;
  /** حداقل فاصله‌ی بین خود ستاره‌ها */
  minGap: number;
  /** ناحیه‌ی کارت «آماده همکاری» (زیر عکس، سمت راست) */
  card: { xMin: number; xMax: number; yMin: number; yMax: number };
}

/** دسکتاپ: کل فضای اطراف عکس، حتی وسطِ فاصله‌ی عکس و متن */
const DESKTOP_BOUNDS: ScatterBounds = {
  xMin: -16,
  xMax: 170,
  yMin: -52,
  yMax: 150,
  minRadius: 66,
  minGap: 16,
  card: { xMin: 44, xMax: 108, yMin: 100, yMax: 124 },
};

/** موبایل: پهلوها و کمی پایین‌ترِ عکس؛ نه زیر بلوک آمار، نه زیر لبه‌ی پایان hero */
const MOBILE_BOUNDS: ScatterBounds = {
  xMin: -44,
  xMax: 144,
  yMin: -10,
  yMax: 126,
  minRadius: 70,
  minGap: 16,
  card: { xMin: 13, xMax: 106, yMin: 104, yMax: 136 },
};

/** پخش رندوم؛ اگر جا تنگ شد، حداقل فاصله‌ی بین ستاره‌ها آرام شل می‌شود */
function scatterStars(bounds: ScatterBounds, count: number): StarPosition[] {
  const points: { x: number; y: number }[] = [];
  let gap = bounds.minGap;

  while (points.length < count && gap >= 0) {
    for (let attempt = 0; attempt < 400 && points.length < count; attempt++) {
      const x = bounds.xMin + Math.random() * (bounds.xMax - bounds.xMin);
      const y = bounds.yMin + Math.random() * (bounds.yMax - bounds.yMin);

      // نه روی عکس و حلقه‌های مداری‌اش
      if (Math.hypot(x - 50, y - 50) < bounds.minRadius) continue;

      // نه روی کارت «آماده همکاری»
      const { card } = bounds;
      if (x > card.xMin && x < card.xMax && y > card.yMin && y < card.yMax) {
        continue;
      }

      // نه روی ستاره‌ی دیگر
      if (points.some((p) => Math.hypot(p.x - x, p.y - y) < gap)) continue;

      points.push({ x, y });
    }
    gap -= 4;
  }

  // پشتیبان: عملاً هرگز رخ نمی‌دهد
  while (points.length < count) {
    points.push({
      x: bounds.xMin + Math.random() * (bounds.xMax - bounds.xMin),
      y: bounds.yMin + Math.random() * (bounds.yMax - bounds.yMin),
    });
  }

  return points.map((p) => ({ x: `${Math.round(p.x)}%`, y: `${Math.round(p.y)}%` }));
}

export function ToolStars() {
  const tools = profile.tools;
  const [hovered, setHovered] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const [desktopPos, setDesktopPos] = useState<StarPosition[]>([]);
  const [mobilePos, setMobilePos] = useState<StarPosition[]>([]);

  // موقعیت‌ها در مرورگر و به‌صورت رندوم ساخته می‌شوند — مثل ستاره‌های پس‌زمینه
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDesktopPos(scatterStars(DESKTOP_BOUNDS, tools.length));
      setMobilePos(scatterStars(MOBILE_BOUNDS, tools.length));
    });
    return () => cancelAnimationFrame(frame);
  }, [tools.length]);

  const renderStars = (positions: StarPosition[]) =>
    positions.map((pos, i) => {
      const tool = tools[i % tools.length];
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
      {/* پخش رندوم دسکتاپ */}
      <div className="absolute inset-0 hidden lg:block">
        {desktopPos.length === tools.length ? renderStars(desktopPos) : null}
      </div>
      {/* پخش رندوم موبایل و تبلت */}
      <div className="absolute inset-0 lg:hidden">
        {mobilePos.length === tools.length ? renderStars(mobilePos) : null}
      </div>
    </div>
  );
}
