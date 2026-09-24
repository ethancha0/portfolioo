"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { serif } from "@/components/theme"

export const LINKEDIN_HREF = "https://www.linkedin.com/in/ethanchaoo"
export const EMAIL_HREF = "mailto:ewchao1@uci.edu"
export const RESUME_HREF =
  "https://drive.google.com/file/d/15NfR6ZGFBNBexQ7rof6dPcIRoau7synD/view?usp=sharing"

export const navLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Showcase", href: "/" },
  { label: "About Me", href: "/about" },
]

/**
 * The left rail shared by every page — identity, nav, links.
 * `children` renders beneath the nav (e.g. a case study's section list).
 */
export function SiteRail({
  children,
  eventLocation = "rail",
}: {
  children?: ReactNode
  eventLocation?: string
}) {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col px-6 pb-12 pt-16 sm:px-10 lg:sticky lg:top-0 lg:h-screen lg:w-[clamp(270px,25vw,400px)] lg:shrink-0 lg:pb-12 lg:pt-20">
      <div>
        <a
          href="/"
          data-umami-event="Home"
          data-umami-event-location={eventLocation}
          className="block transition-opacity hover:opacity-70"
        >
          <h1
            className="text-[34px] leading-[1.1] tracking-[-0.01em] text-[#1f1a16] sm:text-[38px]"
            style={{ fontFamily: serif }}
          >
            Ethan Chao
          </h1>
        </a>
        <p className="mt-1 max-w-[24ch] text-[14px] leading-[1.45] text-[#4a443d]">
          Builds software by building teams
        </p>
        <p className="mt-1 text-[17px] leading-[1.45] text-[#8a8378]">
          Software Engineering @ UC Irvine
        </p>
      </div>

      <nav className="mt-10 flex flex-col items-start gap-3 lg:mt-14">
        {navLinks.map((item) => {
          const isActive = pathname === item.href

          return (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-current={isActive ? "page" : undefined}
              data-umami-event={`Nav: ${item.label}`}
              data-umami-event-location={eventLocation}
              className={`group relative flex items-center text-[16px] transition-colors hover:text-[#1f1a16] ${
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
              {item.label}
            </a>
          )
        })}
      </nav>

      {children}

      <div className="mt-12 flex items-center gap-5 lg:mt-auto lg:pt-16">
        <a
          href={LINKEDIN_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-umami-event="LinkedIn"
          data-umami-event-location={eventLocation}
          className="text-[#5c564d] transition-colors hover:text-[#1f1a16]"
        >
          <LinkedInGlyph />
        </a>
        <a
          href={EMAIL_HREF}
          aria-label="Email"
          data-umami-event="Email"
          data-umami-event-location={eventLocation}
          className="text-[#5c564d] transition-colors hover:text-[#1f1a16]"
        >
          <MailGlyph />
        </a>
      </div>
    </aside>
  )
}

/** Two-column page frame: sticky rail on the left, scrolling content on the right. */
export function SiteShell({
  children,
  rail,
}: {
  children: ReactNode
  rail?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f5f4f1] text-[#2a1f16]">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col lg:flex-row">
        <SiteRail>{rail}</SiteRail>
        <div className="min-w-0 flex-1 border-t border-[#e4e1d9] lg:border-l lg:border-t-0">
          {children}
        </div>
      </div>
    </div>
  )
}

export function LinkedInGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  )
}

export function MailGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6.5 9 6 9-6" />
    </svg>
  )
}
