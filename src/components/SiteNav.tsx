"use client"

import { usePathname } from "next/navigation"
import { Home, Mail } from "lucide-react"
import { ClayButton } from "@/components/clay"

const RESUME_HREF =
  "https://drive.google.com/file/d/1a40jwDFfLG5DBDAXZaZafwwdplUpLRCl/view?usp=sharing"
const LINKEDIN_HREF = "https://www.linkedin.com/in/ethanchaoo"
const EMAIL_HREF = "mailto:ewchao1@uci.edu"

export function SiteNav() {
  const pathname = usePathname()
  const onAboutPage = pathname.startsWith("/about")
  const onHome = pathname === "/"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e8]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <ClayButton
            href="/"
            aria-label="Home"
            size="icon"
            colorIndex={2}
            variant="soft"
            className="size-8"
          >
            <Home className="size-3.5" strokeWidth={2} />
          </ClayButton>
          <a
            href="/"
            className="text-[14px] font-semibold tracking-tight text-[#111] lowercase transition-colors hover:text-[#555]"
          >
            ethan chao
          </a>
          <div className="ml-0.5 flex items-center gap-1.5">
            <ClayButton
              href={EMAIL_HREF}
              aria-label="Contact"
              size="icon"
              colorIndex={0}
              variant="soft"
              className="size-7"
            >
              <Mail className="size-3.5" strokeWidth={2} />
            </ClayButton>
            <ClayButton
              href={LINKEDIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              size="icon"
              colorIndex={3}
              variant="soft"
              className="size-7"
            >
              <LinkedInIcon />
            </ClayButton>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <ClayButton
            href={onHome ? "#work" : "/#work"}
            colorIndex={4}
            variant={onHome ? "soft" : "outline"}
            size="sm"
          >
            Work
          </ClayButton>
          <ClayButton
            href="/about"
            colorIndex={5}
            variant={onAboutPage ? "solid" : "outline"}
            size="sm"
          >
            About
          </ClayButton>
          <ClayButton
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            colorIndex={1}
            variant="outline"
            size="sm"
          >
            Resume
          </ClayButton>
        </div>
      </nav>
    </header>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  )
}
