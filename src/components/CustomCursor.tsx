"use client"

import { useEffect, useRef, useState } from "react"

const clickableSelector =
  'a, button, [role="button"], [data-cursor-label], [data-clickable="true"]'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
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

    const hideCursor = () => {
      setIsVisible(false)
      setIsPressed(false)
    }

    const handlePointerDown = () => setIsPressed(true)
    const handlePointerUp = () => setIsPressed(false)

    window.addEventListener("mousemove", updateCursor)
    window.addEventListener("mouseleave", hideCursor)
    window.addEventListener("blur", hideCursor)
    window.addEventListener("mousedown", handlePointerDown)
    window.addEventListener("mouseup", handlePointerUp)

    return () => {
      document.documentElement.classList.remove("has-custom-cursor")
      window.removeEventListener("mousemove", updateCursor)
      window.removeEventListener("mouseleave", hideCursor)
      window.removeEventListener("blur", hideCursor)
      window.removeEventListener("mousedown", handlePointerDown)
      window.removeEventListener("mouseup", handlePointerUp)
    }
  }, [])

  const sizeClass = (() => {
    if (isLabeled) {
      return isPressed ? "h-6 w-28" : "h-5 w-24"
    }
    if (isPressed && isActive) return "h-9 w-9"
    if (isPressed) return "h-6 w-6"
    if (isActive) return "h-7 w-7"
    return "h-3.5 w-3.5"
  })()

  const opacityClass = (() => {
    if (!isVisible) return "opacity-0"
    if (isLabeled) return "opacity-100"
    if (isActive) return "opacity-55"
    return "opacity-100"
  })()

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full text-[10px] font-semibold uppercase tracking-widest text-white shadow-[0_10px_28px_rgba(36,211,101,0.22)] transition-[width,height,opacity,background-color,box-shadow] duration-200 ease-out ${sizeClass} ${
        isActive && !isLabeled ? "bg-[#6f927d]" : "bg-[#4c705b]"
      } ${opacityClass}`}
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
