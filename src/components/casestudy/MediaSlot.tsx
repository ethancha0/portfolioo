"use client"

import {
  useEffect,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react"
import { ClayFrame, clayColorNameAt } from "@/components/clay"
import { ImageWithFallback } from "@/components/ImageWithFallback"

function MediaIcon({ kind }: { kind: "image" | "video" }) {
  if (kind === "video") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="M21 16.5 15.5 11 6 19.5" />
    </svg>
  )
}

export type MediaSlotProps = {
  label?: string
  caption?: string
  kind?: "image" | "video"
  /** Aspect ratio box, e.g. `"16 / 9"`. Omit to use the media's natural size. */
  ratio?: string
  /** How media fills a fixed ratio box. Ignored when `ratio` is omitted. */
  fit?: "cover" | "contain"
  /** Caps the media width, e.g. `"420px"`, `"60%"`, or `480`. */
  maxWidth?: string | number
  src?: string
  alt?: string
  colorIndex?: number
}

/**
 * Media slot for case study imagery or looping clips.
 * Pass `src` for a real asset; otherwise renders a labelled placeholder.
 * Images open a lightbox on click.
 */
export function MediaSlot({
  label,
  caption,
  kind,
  ratio,
  fit = "cover",
  maxWidth,
  src,
  alt,
  colorIndex = 0,
}: MediaSlotProps) {
  const [expanded, setExpanded] = useState(false)
  const isVideo =
    kind === "video" ||
    (kind !== "image" && !!src && /\.(mov|mp4|webm|ogg)(\?|$)/i.test(src))
  const isExpandableImage = Boolean(src) && !isVideo
  const resolvedMaxWidth =
    maxWidth == null
      ? undefined
      : typeof maxWidth === "number"
        ? `${maxWidth}px`
        : maxWidth
  const resolvedRatio = ratio ?? (isVideo ? "16 / 9" : undefined)
  const objectFitClass = fit === "contain" ? "object-contain" : "object-cover"
  const clay = clayColorNameAt(colorIndex)

  useEffect(() => {
    if (!expanded) return
    const onKey = (event: Event) => {
      if ("key" in event && event.key === "Escape") setExpanded(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [expanded])

  return (
    <>
      <figure
        className={`my-2 ${resolvedMaxWidth ? "mx-auto w-full" : ""}`}
        style={resolvedMaxWidth ? { maxWidth: resolvedMaxWidth } : undefined}
      >
        <ClayFrame
          color={clay}
          thickness={5}
          rounded="xl"
          className={isExpandableImage ? "group cursor-pointer" : ""}
          style={resolvedRatio ? { aspectRatio: resolvedRatio } : undefined}
        >
          <div
            className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#faf6ef] to-[#efe6d6]"
            {...(isExpandableImage
              ? {
                  role: "button" as const,
                  tabIndex: 0,
                  "data-cursor-label": "View Image",
                  "aria-label": `View larger: ${alt ?? label ?? "image"}`,
                  onClick: () => setExpanded(true),
                  onKeyDown: (event: ReactKeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      setExpanded(true)
                    }
                  },
                }
              : {})}
          >
            {src ? (
              isVideo ? (
                <video
                  src={src}
                  className={`h-full w-full ${objectFitClass}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  preload="metadata"
                  aria-label={alt ?? label}
                />
              ) : (
                <>
                  <ImageWithFallback
                    src={src}
                    alt={alt ?? label ?? ""}
                    className={
                      resolvedRatio
                        ? `h-full w-full ${objectFitClass} transition-[filter,opacity] duration-300 group-hover:brightness-[0.82]`
                        : "h-auto w-full transition-[filter,opacity] duration-300 group-hover:brightness-[0.82]"
                    }
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/18" />
                </>
              )
            ) : (
              <div
                className="flex flex-col items-center gap-2.5 text-[#b5a894]"
                style={resolvedRatio ? undefined : { aspectRatio: "16 / 9" }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-[#c4b49a] bg-[#f7f2ea]/80">
                  <MediaIcon kind={isVideo ? "video" : "image"} />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                  {label}
                </span>
              </div>
            )}
          </div>
        </ClayFrame>
        {caption ? (
          <figcaption className="mt-3 text-[13px] italic leading-snug text-[#8f8578]">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {expanded && src && !isVideo ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a1f16]/70 p-5 backdrop-blur-[2px] sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={alt ?? label ?? "Expanded image"}
          data-cursor-label="Close"
          onClick={() => setExpanded(false)}
        >
          <div
            className="max-h-full max-w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <ClayFrame color={clay} thickness={6} rounded="xl" animate={false}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt ?? label ?? ""}
                className="max-h-[85vh] max-w-full object-contain"
                draggable={false}
              />
            </ClayFrame>
          </div>
        </div>
      ) : null}
    </>
  )
}
