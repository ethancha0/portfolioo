"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export type HoverStripItem = {
  src: string
  alt: string
  caption: string
}

type HoverCardStripProps = {
  items: HoverStripItem[]
  className?: string
}

export function HoverCardStrip({ items, className }: HoverCardStripProps) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className={cn("relative flex items-end justify-start", className)}
      onMouseLeave={() => setActive(null)}
    >
      {items.map((item, i) => {
        const isActive = active === i
        const dimmed = active !== null && !isActive

        return (
          <button
            key={`${item.alt}-${i}`}
            type="button"
            className="relative shrink-0 origin-bottom border-0 bg-transparent p-0 text-left outline-none"
            style={{
              width: isActive ? 168 : 112,
              marginLeft: i === 0 ? 0 : -36,
              zIndex: isActive ? 40 : i + 1,
              transition:
                "width 380ms cubic-bezier(0.22, 1, 0.36, 1), transform 380ms cubic-bezier(0.22, 1, 0.36, 1), filter 320ms ease, margin 380ms ease",
              transform: isActive ? "translateY(-10px) scale(1.04)" : "none",
              filter: dimmed ? "blur(3px) saturate(0.7)" : "none",
              opacity: dimmed ? 0.72 : 1,
            }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-label={item.caption}
          >
            <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-black/5 bg-[#ddd] shadow-[0_10px_24px_rgba(0,0,0,0.1)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            <span
              className="pointer-events-none absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-full bg-[#9babf0] px-3.5 py-1.5 text-[11px] leading-none text-white shadow-sm"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translate(-50%, 0)"
                  : "translate(-50%, 8px)",
                transition:
                  "opacity 220ms ease, transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {item.caption}
              <span
                aria-hidden
                className="absolute left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent border-t-[#9babf0]"
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
