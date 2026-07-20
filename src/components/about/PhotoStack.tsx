"use client"

import { useState } from "react"
import { ClayFrame } from "@/components/clay"
import { cn } from "@/lib/utils"

export type StackCard = {
  src: string
  alt: string
}

type PhotoStackProps = {
  cards: StackCard[]
  className?: string
}

export function PhotoStack({ cards, className }: PhotoStackProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={cn("relative mx-auto h-[340px] w-full max-w-[420px]", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ perspective: 1200 }}
    >
      {/* Decorative blobs */}
      <span
        className="pointer-events-none absolute -left-6 top-10 size-16 rotate-12 rounded-[40%] bg-[#7cff4a] opacity-90"
        style={{
          clipPath:
            "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          animation: "about-float 5s ease-in-out infinite",
        }}
      />
      <span
        className="pointer-events-none absolute -right-4 bottom-16 h-24 w-28 rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, #ff8fb8 0%, #6a8cff 55%, #ff9a4a 100%)",
          filter: "blur(2px)",
          animation: "about-float 6.5s ease-in-out infinite reverse",
        }}
      />

      {cards.map((card, i) => {
        const total = cards.length
        const fromFront = total - 1 - i
        const fan = hovered ? 1 : 0.55
        const rotateY = -28 - fromFront * 4 * fan
        const rotateZ = (fromFront - total / 2) * 2.2 * fan
        const x = fromFront * (hovered ? 28 : 14)
        const y = fromFront * (hovered ? 10 : 6)
        const scale = 1 - fromFront * 0.035

        return (
          <div
            key={`${card.alt}-${i}`}
            className="absolute left-[12%] top-[6%] h-[78%] w-[58%]"
            style={{
              zIndex: i + 1,
              transform: `translate3d(${x}px, ${y}px, 0) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
              transition:
                "transform 520ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease",
              transformOrigin: "left center",
            }}
          >
            <ClayFrame
              colorIndex={i}
              thickness={5}
              rounded="2xl"
              className="h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.src}
                alt={card.alt}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </ClayFrame>
          </div>
        )
      })}
    </div>
  )
}
