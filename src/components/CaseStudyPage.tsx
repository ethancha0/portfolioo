import type { ReactNode } from "react"
import { ImageWithFallback } from "@/components/ImageWithFallback"

type DetailBlock = {
  label: string
  value: ReactNode
}

type HeroImageLayout = {
  /** Scale relative to the hero frame (1 = 100%). Default 1 */
  scale?: number
  /** Horizontal shift in px (positive = right). Default 0 */
  x?: number
  /** Vertical shift in px (positive = down). Default 0 */
  y?: number
  /** Max width as % of the hero frame. Default 100 */
  maxWidth?: number
  /** Max height as % of the hero frame. Default 100 */
  maxHeight?: number
}

type HeroImage = {
  src: string
  alt: string
  objectPosition?: string
  /** Size / position for product mockups over a hero background */
  layout?: HeroImageLayout
}

export type CaseStudyPageProps = {
  projectName: string
  headline: string
  intro: string
  heroImage?: HeroImage
  hero?: ReactNode
  /** Full-bleed layer behind the hero image (e.g. Grainient) */
  heroBackground?: ReactNode
  details: DetailBlock[]
  contextTitle?: string
  context: ReactNode
}

export function CaseStudyPage({
  projectName,
  headline,
  intro,
  heroImage,
  hero,
  heroBackground,
  details,
  contextTitle = "Context",
  context,
}: CaseStudyPageProps) {
  const layout = heroImage?.layout ?? {}
  const imageScale = layout.scale ?? 1
  const imageX = layout.x ?? 0
  const imageY = layout.y ?? 0
  const imageMaxWidth = layout.maxWidth ?? 100
  const imageMaxHeight = layout.maxHeight ?? 100

  return (
    <main className="min-h-screen bg-white pt-12 text-black">
      <section className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
        <div className="relative h-[220px] overflow-hidden bg-[#f2f0ed] md:h-[340px]">
          {heroBackground ? (
            <div className="absolute inset-0 z-0">{heroBackground}</div>
          ) : null}
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {hero ??
              (heroImage ? (
                <ImageWithFallback
                  src={heroImage.src}
                  alt={heroImage.alt}
                  className={
                    heroBackground ? "object-contain" : "h-full w-full object-cover"
                  }
                  style={{
                    objectPosition: heroImage.objectPosition ?? "center",
                    ...(heroBackground
                      ? {
                          maxWidth: `${imageMaxWidth}%`,
                          maxHeight: `${imageMaxHeight}%`,
                          transform: `translate(${imageX}px, ${imageY}px) scale(${imageScale})`,
                          transformOrigin: "center center",
                        }
                      : null),
                  }}
                />
              ) : null)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1060px] px-5 py-16 md:px-8 md:py-20">
        <div className="mb-16">
          <p className="mb-7 text-[30px] font-semibold leading-none tracking-tight md:text-[38px]">
            {projectName}
          </p>
          <h1 className="mb-7 max-w-[920px] text-[42px] font-semibold leading-[1.05] tracking-tight md:text-[58px]">
            {headline}
          </h1>
          <p className="max-w-[920px] text-[20px] leading-[1.45] text-[#222] md:text-[24px]">
            {intro}
          </p>
        </div>

        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-24">
          <div className="space-y-9">
            {details.map((detail) => (
              <div key={detail.label}>
                <h2 className="mb-3 text-[22px] font-semibold leading-none underline decoration-[2px] underline-offset-2">
                  {detail.label}
                </h2>
                <div className="text-[20px] italic leading-[1.45] text-[#1f1f1f]">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="mb-5 text-[22px] font-semibold leading-none underline decoration-[2px] underline-offset-2">
              {contextTitle}
            </h2>
            <div className="space-y-4 text-[22px] leading-[1.45] text-[#1f1f1f]">
              {context}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
