import type { ReactNode } from "react"
import { caseStudyEyebrow } from "./styles"

type CaseStudySectionProps = {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}

export function CaseStudySection({
  id,
  eyebrow,
  title,
  children,
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-[#e4ddd2] pt-14 first:border-t-0 first:pt-0"
    >
      <p className={`mb-3 ${caseStudyEyebrow}`}>{eyebrow}</p>
      <h2 className="mb-6 max-w-[620px] text-[26px] font-semibold leading-[1.18] tracking-tight text-[#2a1f16] md:text-[32px]">
        {title}
      </h2>
      {children}
    </section>
  )
}
