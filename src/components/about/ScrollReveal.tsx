"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        el.style.transitionDelay = `${delayMs}ms`
        el.dataset.visible = "true"
        observer.disconnect()
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delayMs])

  return (
    <div
      ref={ref}
      className={cn(
        "translate-y-6 opacity-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  )
}
