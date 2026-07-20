"use client"

import { useEffect, useRef, useState } from "react"

type CyclingTypewriterProps = {
  phrases: string[]
  className?: string
  charMs?: number
  holdMs?: number
  eraseMs?: number
}

/**
 * Types a phrase, holds, erases, then cycles to the next — like the mockup hero title.
 */
export function CyclingTypewriter({
  phrases,
  className,
  charMs = 55,
  holdMs = 2200,
  eraseMs = 28,
}: CyclingTypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState<"typing" | "holding" | "erasing">("typing")
  const phrase = phrases[phraseIndex] ?? ""
  const doneTyping = count >= phrase.length
  const doneErasing = count <= 0

  const phrasesRef = useRef(phrases)
  useEffect(() => {
    phrasesRef.current = phrases
  }, [phrases])

  useEffect(() => {
    if (phrases.length === 0) return

    if (mode === "typing") {
      if (doneTyping) {
        const id = window.setTimeout(() => setMode("holding"), 0)
        return () => window.clearTimeout(id)
      }
      const id = window.setTimeout(() => setCount((c) => c + 1), charMs)
      return () => window.clearTimeout(id)
    }

    if (mode === "holding") {
      const id = window.setTimeout(() => setMode("erasing"), holdMs)
      return () => window.clearTimeout(id)
    }

    // erasing
    if (doneErasing) {
      const id = window.setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % phrasesRef.current.length)
        setMode("typing")
      }, 180)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(() => setCount((c) => c - 1), eraseMs)
    return () => window.clearTimeout(id)
  }, [
    mode,
    count,
    doneTyping,
    doneErasing,
    charMs,
    holdMs,
    eraseMs,
    phrases.length,
  ])

  return (
    <h1 className={className}>
      <span>{phrase.slice(0, count)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] translate-y-[1px] bg-current align-baseline"
        style={{
          height: "0.85em",
          animation: "about-caret 0.9s steps(1) infinite",
        }}
      />
    </h1>
  )
}
