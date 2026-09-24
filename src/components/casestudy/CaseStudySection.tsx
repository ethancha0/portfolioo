import type { ReactNode } from "react"
import { serif } from "@/components/theme"
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
      className="scroll-mt-28 border-t border-[#e4e1d9] pt-14 first:border-t-0 first:pt-0"
    >
      <p className={`mb-3 ${caseStudyEyebrow}`}>{eyebrow}</p>
      <h2
        className="mb-6 max-w-[620px] text-[26px] leading-[1.18] tracking-[-0.01em] text-[#1f1a16] md:text-[32px]"
        style={{ fontFamily: serif }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
