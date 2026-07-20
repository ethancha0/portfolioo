"use client"

import { useEffect, useRef, useState } from "react"
import { ClayFrame } from "@/components/clay"
import { cn } from "@/lib/utils"

export type SpiralImage = {
  src: string
  alt: string
}

type ImageSpiralProps = {
  images: SpiralImage[]
  className?: string
  /** Seconds for one full loop around the arc */
  periodSec?: number
}

/**
 * Semi-circle of photos that slowly travel along the arc (spiral carousel).
 * Ends fade out; tiles rotate to follow the curve's tangent.
 */
export function ImageSpiral({
  images,
  className,
  periodSec = 48,
}: ImageSpiralProps) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (prefersReduced || images.length === 0) return

    const tick = (now: number) => {
      if (startRef.current == null) startRef.current = now
      const elapsed = (now - startRef.current) / 1000
      setPhase((elapsed / periodSec) % 1)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [mounted, images.length, periodSec])

  if (images.length === 0) return null

  const count = images.length
  // Upper arc: π (left) → 0 (right), peaking at π/2
  const arcStart = Math.PI * 0.95
  const arcEnd = Math.PI * 0.05
  const arcSpan = arcStart - arcEnd

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-visible",
        className,
      )}
      aria-hidden
    >
      {mounted
        ? images.map((image, i) => {
            const t = (i / count + phase) % 1
            const angle = arcStart - t * arcSpan
            // Wide upper arc; sides sit above the portrait
            const x = 50 + Math.cos(angle) * 46
            const y = 46 - Math.sin(angle) * 40
            const rotateDeg = ((Math.PI / 2 - angle) * 180) / Math.PI
            // Fade toward the ends of the arc
            const edge = Math.min(t, 1 - t)
            const opacity = Math.min(1, Math.pow(edge / 0.18, 1.25))
            if (opacity < 0.04) return null
            const scale = 0.86 + opacity * 0.16

            return (
              <div
                key={`${image.src}-${i}`}
                className="absolute size-[64px] sm:size-[76px] md:size-[86px]"
                style={{
                  left: `${x.toFixed(3)}%`,
                  top: `${y.toFixed(3)}%`,
                  opacity,
                  transform: `translate(-50%, -50%) rotate(${rotateDeg.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                  zIndex: Math.round(10 + opacity * 20),
                  willChange: "transform, opacity",
                }}
              >
                <ClayFrame
                  colorIndex={i}
                  thickness={4}
                  rounded="lg"
                  className="h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </ClayFrame>
              </div>
            )
          })
        : null}
    </div>
  )
}
