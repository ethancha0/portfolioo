"use client"

import { useCallback, useEffect, useState, type ReactNode } from "react"
import { ClayButton } from "@/components/clay"

type SectionMeta = {
  id: string
  label: string
}

type CaseStudyShellProps = {
  sections: SectionMeta[]
  children: ReactNode
  backHref?: string
  backLabel?: string
  /** Pixels subtracted when scrolling to a section (accounts for fixed nav). */
  scrollOffset?: number
}

export function CaseStudyShell({
  sections,
  children,
  backHref = "/",
  backLabel = "BACK",
  scrollOffset = 96,
}: CaseStudyShellProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")
  const [progress, setProgress] = useState(0)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight
    setProgress(
      docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0,
    )

    const threshold = scrollOffset + 64
    let current = sections[0]?.id ?? ""
    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el && el.getBoundingClientRect().top <= threshold) {
        current = section.id
      }
    }
    setActiveId(current)
  }, [sections, scrollOffset])

  useEffect(() => {
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [handleScroll])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - scrollOffset
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <main className="min-h-screen bg-[#f5f0e8] pt-12 text-[#2a1f16]">
      <div className="mx-auto flex max-w-[1200px] gap-10 px-6 py-10 lg:gap-16 lg:py-14">
        <aside className="hidden w-[186px] shrink-0 lg:block">
          <div className="sticky top-24">
            <ClayButton
              href={backHref}
              colorIndex={0}
              variant="outline"
              size="sm"
              className="uppercase tracking-widest"
            >
              <span>&larr;</span>
              {backLabel}
            </ClayButton>

            <nav className="mt-9 flex flex-col gap-2.5">
              {sections.map((section) => {
                const isActive = activeId === section.id
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollToSection(section.id)
                    }}
                    className="text-left text-[12px] leading-tight tracking-tight transition-colors duration-200 hover:text-[#4f3628]"
                    style={{ color: isActive ? "#8fad6e" : "#9a8f82" }}
                  >
                    {section.label}
                  </a>
                )
              })}
            </nav>

            <div className="relative mt-10 ml-1 h-24 w-px bg-[#e4ddd2]">
              <div
                className="absolute left-0 top-0 w-px bg-[#8fad6e]/50"
                style={{ height: `${progress * 100}%` }}
              />
              <div
                className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#8fad6e] shadow-[0_0_0_4px_rgba(143,173,110,0.2)] transition-[top] duration-150 ease-out"
                style={{ top: `calc(${progress * 100}% - 4px)` }}
              />
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:max-w-[760px]">
          <div className="mb-8 lg:hidden">
            <ClayButton
              href={backHref}
              colorIndex={0}
              variant="outline"
              size="sm"
              className="uppercase tracking-widest"
            >
              <span>&larr;</span>
              {backLabel}
            </ClayButton>
          </div>
          {children}
        </div>
      </div>
    </main>
  )
}
