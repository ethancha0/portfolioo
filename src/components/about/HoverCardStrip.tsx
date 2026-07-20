"use client"

import { useState } from "react"
import { ClayFrame, clayColor, clayColorNameAt } from "@/components/clay"
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
        const clayName = clayColorNameAt(i)
        const clay = clayColor(clayName)

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
            <ClayFrame
              color={clayName}
              thickness={5}
              rounded="2xl"
              className="aspect-[4/3] w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </ClayFrame>

            <span
              className="pointer-events-none absolute left-1/2 top-0 z-50 -translate-x-1/2 -translate-y-[calc(100%+14px)] whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] leading-none text-[#1a1a1a] shadow-sm"
              style={{
                background: clay,
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
                className="absolute left-1/2 top-full -translate-x-1/2 border-x-[6px] border-t-[7px] border-x-transparent"
                style={{ borderTopColor: clay }}
              />
            </span>
          </button>
        )
      })}
    </div>
  )
}
