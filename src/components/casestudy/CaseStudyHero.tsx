import type { ReactNode } from "react"
import { ClayButton, ClayFrame, type ClayColorName } from "@/components/clay"
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
  }
  /** Custom hero media instead of image + background */
  heroMedia?: ReactNode
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
  frameColor = "matcha",
}: CaseStudyHeroProps) {
  return (
    <header>
      <p className={`mb-5 ${caseStudyEyebrow}`}>{eyebrow}</p>
      <h1 className="mb-5 max-w-[640px] text-[40px] font-semibold leading-[1.05] tracking-tight text-[#2a1f16] md:text-[54px]">
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
              <ClayButton
                key={cta.href + cta.label}
                href={cta.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                colorIndex={cta.colorIndex ?? 0}
                variant={cta.variant ?? "outline"}
                size="md"
                className="uppercase tracking-widest"
              >
                {cta.label}
                {isExternal ? <span>&#8599;</span> : null}
              </ClayButton>
            )
          })}
        </div>
      ) : null}

      {heroMedia ??
        (heroImage ? (
          <ClayFrame
            color={frameColor}
            thickness={6}
            rounded="2xl"
            className="relative mt-10 h-[240px] w-full md:h-[380px]"
            innerClassName="!bg-transparent"
          >
            {heroBackground ? (
              <div className="absolute inset-0">{heroBackground}</div>
            ) : (
              <div className="absolute inset-0 bg-[#f7f2ea]" />
            )}
            <div className="relative mt-12 flex h-full w-full items-center justify-center">
              <ImageWithFallback
                src={heroImage.src}
                alt={heroImage.alt}
                className="max-h-[86%] max-w-[92%] object-contain drop-shadow-2xl"
              />
            </div>
          </ClayFrame>
        ) : null)}

      {details.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#e4ddd2] pt-8 md:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <p className={`mb-2 ${caseStudyMuted}`}>{detail.label}</p>
              <p className="text-[13px] leading-[1.5] text-[#3d3228]">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </header>
  )
}
