import type { ReactNode } from "react"
import type { ClayColorName } from "@/components/clay"
import { pillClass, serif } from "@/components/theme"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { caseStudyBody, caseStudyEyebrow, caseStudyMuted } from "./styles"

export type CaseStudyDetail = {
  label: string
  value: string
}

export type CaseStudyCta = {
  href: string
  label: string
  variant?: "solid" | "outline" | "soft"
  colorIndex?: number
  external?: boolean
}

type CaseStudyHeroProps = {
  eyebrow: string
  title: string
  description: string
  ctas?: CaseStudyCta[]
  details?: CaseStudyDetail[]
  /** Full-bleed layer behind the hero image (e.g. Grainient) */
  heroBackground?: ReactNode
  heroImage?: {
    src: string
    alt: string
    /** Shift right (+) or left (−), in pixels. */
    offsetX?: number
    /** Shift down (+) or up (−), in pixels. */
    offsetY?: number
    /** Scale from center. `1` is unchanged. */
    scale?: number
    /** Max width of the image inside the frame, as a percent. */
    maxWidth?: number
    /** Max height of the image inside the frame, as a percent. */
    maxHeight?: number
  }
  /** Custom hero media instead of image + background */
  heroMedia?: ReactNode
  /** @deprecated Hero media is now an unframed well; kept so callers don't break. */
  frameColor?: ClayColorName
}

export function CaseStudyHero({
  eyebrow,
  title,
  description,
  ctas = [],
  details = [],
  heroBackground,
  heroImage,
  heroMedia,
}: CaseStudyHeroProps) {
  return (
    <header>
      <p className={`mb-5 ${caseStudyEyebrow}`}>{eyebrow}</p>
      <h1
        className="mb-5 max-w-[640px] text-[40px] leading-[1.06] tracking-[-0.01em] text-[#1f1a16] md:text-[54px]"
        style={{ fontFamily: serif }}
      >
        {title}
      </h1>
      <p className={`mb-8 max-w-[560px] ${caseStudyBody}`}>{description}</p>

      {ctas.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {ctas.map((cta) => {
            const isExternal =
              cta.external ??
              /^(https?:|mailto:|tel:)/i.test(cta.href)
            return (
              <a
                key={cta.href + cta.label}
                href={cta.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                data-umami-event={cta.label}
                data-umami-event-location="case-study-hero"
                className={pillClass}
              >
                {cta.label}
                {isExternal ? <span aria-hidden>&#8599;</span> : null}
              </a>
            )
          })}
        </div>
      ) : null}

      {heroMedia ??
        (heroImage ? (
          <div className="relative mt-10 h-[240px] w-full overflow-hidden rounded-[26px] md:h-[380px]">
            {heroBackground ? (
              <div className="absolute inset-0">{heroBackground}</div>
            ) : (
              <div className="absolute inset-0 bg-[#f7f2ea]" />
            )}
            <div className="absolute inset-0 z-[1] flex items-center justify-center">
              <ImageWithFallback
                src={heroImage.src}
                alt={heroImage.alt}
                className="h-auto w-auto object-contain drop-shadow-2xl"
                style={{
                  maxWidth: `${heroImage.maxWidth ?? 85}%`,
                  maxHeight: `${heroImage.maxHeight ?? 72}%`,
                  transform: `translate(${heroImage.offsetX ?? 0}px, ${heroImage.offsetY ?? 0}px) scale(${heroImage.scale ?? 1})`,
                  transformOrigin: "center center",
                }}
              />
            </div>
          </div>
        ) : null)}

      {details.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#e4e1d9] pt-8 md:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <p className={`mb-2 ${caseStudyMuted}`}>{detail.label}</p>
              <p className="text-[13px] leading-[1.5] text-[#4a443d]">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  )
}
