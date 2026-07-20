"use client"

import { useState } from "react"
import { ClayFrame } from "@/components/clay"
import { cn } from "@/lib/utils"

export type AccordionStripItem = {
  src: string
  alt: string
  caption?: string
}

type AccordionCardStripProps = {
  items: AccordionStripItem[]
  className?: string
}

export function AccordionCardStrip({
  items,
  className,
}: AccordionCardStripProps) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div
      className={cn("flex h-[220px] w-full gap-2 sm:h-[260px]", className)}
      onMouseLeave={() => setActive(null)}
    >
      {items.map((item, i) => {
        const isActive = active === i

        return (
          <button
            key={`${item.alt}-${i}`}
            type="button"
            className="relative h-full min-w-0 border-0 bg-transparent p-0 outline-none"
            style={{
              flexGrow: isActive ? 3.2 : 1,
              flexBasis: 0,
              transition: "flex-grow 420ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-label={item.caption ?? item.alt}
          >
            <ClayFrame
              colorIndex={i + 1}
              thickness={5}
              rounded="2xl"
              className="h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                className="h-full w-full object-cover"
                draggable={false}
                style={{
                  transform: isActive ? "scale(1.04)" : "scale(1.12)",
                  transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              />

              {item.caption ? (
                <span
                  className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] tracking-wide text-white backdrop-blur-sm"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 220ms ease, transform 220ms ease",
                  }}
                >
                  {item.caption}
                </span>
              ) : null}
            </ClayFrame>
          </button>
        )
      })}
    </div>
  )
}
