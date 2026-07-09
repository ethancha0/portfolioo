"use client"

import { useEffect, useRef, useState } from "react"

const clickableSelector =
  'a, button, [role="button"], [data-cursor-label], [data-clickable="true"]'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isLabeled, setIsLabeled] = useState(false)
  const [label, setLabel] = useState("View")

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches

    if (!canUseCustomCursor) return

    document.documentElement.classList.add("has-custom-cursor")

    const updateCursor = (event: MouseEvent) => {
      const cursor = cursorRef.current
      if (cursor) {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
      }

      const target = event.target as HTMLElement | null
      const clickable = target?.closest(clickableSelector) as HTMLElement | null
      const cursorLabel = clickable?.dataset.cursorLabel

      setIsVisible(true)
      setIsActive(Boolean(clickable))
      setIsLabeled(Boolean(cursorLabel))
      setLabel(cursorLabel || "")
    }

    const hideCursor = () => setIsVisible(false)

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseleave", hideCursor)
    window.addEventListener("blur", hideCursor)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mouseleave", hideCursor)
      window.removeEventListener("blur", hideCursor)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-widest text-white shadow-[0_10px_28px_rgba(36,211,101,0.22)] transition-[width,height,opacity,background-color,box-shadow] duration-200 ease-out ${
        isLabeled ? "h-5 w-24 bg-[#4c705b]" : "h-3.5 w-3.5"
      } ${isActive && !isLabeled ? "bg-[#6f927d] opacity-80" : "bg-[#4c705b]"} ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span
        className={`whitespace-nowrap transition-opacity duration-150 ${
          isLabeled ? "opacity-100 delay-75" : "opacity-0"
        }`}
      >
        {label}
      </span>
    </div>
  )
}
