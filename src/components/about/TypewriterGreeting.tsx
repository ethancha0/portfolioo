"use client"

import { useEffect, useRef, useState } from "react"

type TypewriterGreetingProps = {
  text: string
  className?: string
  charMs?: number
  onDone?: () => void
}

export function TypewriterGreeting({
  text,
  className,
  charMs = 55,
  onDone,
}: TypewriterGreetingProps) {
  const [count, setCount] = useState(0)
  const done = count >= text.length
  const onDoneRef = useRef(onDone)
  const firedRef = useRef(false)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    if (done) {
      if (!firedRef.current) {
        firedRef.current = true
        onDoneRef.current?.()
      }
      return
    }
    const id = window.setTimeout(() => setCount((c) => c + 1), charMs)
    return () => window.clearTimeout(id)
  }, [count, done, charMs])

  return (
    <h1 className={className}>
      <span>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block w-[2px] translate-y-[2px] bg-current align-baseline"
        style={{
          height: "0.9em",
          opacity: done ? 0 : 1,
          animation: done ? undefined : "about-caret 0.9s steps(1) infinite",
        }}
      />
    </h1>
  )
}
