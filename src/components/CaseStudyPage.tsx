import type { ReactNode } from "react"
import { ImageWithFallback } from "@/components/ImageWithFallback"

type DetailBlock = {
  label: string
  value: ReactNode
}

type HeroImage = {
  src: string
  alt: string
  objectPosition?: string
}

export type CaseStudyPageProps = {
  projectName: string
  headline: string
  intro: string
  heroImage?: HeroImage
  hero?: ReactNode
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
  details,
  contextTitle = "Context",
  context,
}: CaseStudyPageProps) {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-[1440px] px-5 pt-8 md:px-8">
        <div className="h-[220px] overflow-hidden bg-[#f2f0ed] md:h-[340px]">
          {hero ??
            (heroImage ? (
              <ImageWithFallback
                src={heroImage.src}
                alt={heroImage.alt}
                className="h-full w-full object-cover"
                style={{
                  objectPosition: heroImage.objectPosition ?? "center",
                }}
              />
            ) : null)}
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
