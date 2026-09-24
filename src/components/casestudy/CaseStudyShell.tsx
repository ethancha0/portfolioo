"use client"

import { useCallback, useEffect, useState, type ReactNode } from "react"
import { SiteShell } from "@/components/SiteRail"

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
  backLabel = "Back",
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
    <SiteShell
      rail={
        <div className="mt-12 hidden lg:block">
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em] text-[#a8a294]">
            On this page
          </p>

          <nav className="flex flex-col items-start gap-3">
            {sections.map((section) => {
              const isActive = activeId === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  data-umami-event={`Section: ${section.label}`}
                  data-umami-event-location="case-study-nav"
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(section.id)
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative text-left text-[14px] leading-tight transition-colors duration-200 hover:text-[#1f1a16] ${
                    isActive ? "text-[#1f1a16]" : "text-[#8a8378]"
                  }`}
                >
                  <span
                    className={`absolute -left-6 transition-opacity duration-200 group-hover:opacity-100 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    &rarr;
                  </span>
                  {section.label}
                </a>
              )
            })}
          </nav>

          <div className="relative mt-8 ml-1 h-20 w-px bg-[#e4e1d9]">
            <div
              className="absolute left-0 top-0 w-px bg-[#b3823a]/45"
              style={{ height: `${progress * 100}%` }}
            />
            <div
              className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#b3823a] shadow-[0_0_0_4px_rgba(179,130,58,0.16)] transition-[top] duration-150 ease-out"
              style={{ top: `calc(${progress * 100}% - 4px)` }}
            />
          </div>
        </div>
      }
    >
      <main className="px-6 pb-16 pt-14 sm:px-10 lg:px-16 lg:pt-20">
        <div className="min-w-0 lg:max-w-[760px]">
          <div className="mb-8 lg:hidden">
            <a
              href={backHref}
              data-umami-event="Back"
              data-umami-event-location="case-study-nav-mobile"
              className="group inline-flex items-center gap-2 text-[14px] text-[#8a8378] transition-colors hover:text-[#1f1a16]"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">
                &larr;
              </span>
              {backLabel}
            </a>
          </div>
          {children}
        </div>
      </main>
    </SiteShell>
  )
}
