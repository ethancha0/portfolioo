"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Mail } from "lucide-react"

const RESUME_HREF =
  "https://drive.google.com/file/d/1a40jwDFfLG5DBDAXZaZafwwdplUpLRCl/view?usp=sharing"
const LINKEDIN_HREF = "https://www.linkedin.com/in/ethanchaoo"
const EMAIL_HREF = "/about"

export function SiteNav() {
  const pathname = usePathname()
  const onAboutPage = pathname.startsWith("/about")
  const onHome = pathname === "/"

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f5f5]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link
            href="/"
            aria-label="Home"
            className="flex size-8 items-center justify-center rounded-md border border-[#ddd] text-[#222] transition-colors hover:border-[#bbb] hover:bg-white"
          >
            <Home className="size-3.5" strokeWidth={2} />
          </Link>
          <Link
            href="/"
            className="text-[14px] font-semibold tracking-tight text-[#111] lowercase"
          >
            ethan chao
          </Link>
          <div className="ml-0.5 flex items-center gap-1.5">
            <Link
              href={EMAIL_HREF}
              aria-label="Contact"
              className="flex size-7 items-center justify-center rounded-full border border-[#e0e0e0] text-[#555] transition-colors hover:border-[#ccc] hover:bg-white hover:text-[#111]"
            >
              <Mail className="size-3.5" strokeWidth={2} />
            </Link>
            <a
              href={LINKEDIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex size-7 items-center justify-center rounded-full border border-[#e0e0e0] text-[#555] transition-colors hover:border-[#ccc] hover:bg-white hover:text-[#111]"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>

        <div className="flex items-center gap-5 sm:gap-7">
          {!onHome ? (
            <Link
              href="/#work"
              className="text-[13px] font-medium text-[#444] transition-colors hover:text-[#111]"
            >
              Work
            </Link>
          ) : (
            <a
              href="#work"
              className="text-[13px] font-medium text-[#444] transition-colors hover:text-[#111]"
            >
              Work
            </a>
          )}
          <Link
            href="/about"
            className="text-[13px] font-medium transition-colors hover:text-[#111]"
            style={{ color: onAboutPage ? "#111" : "#444" }}
          >
            About
          </Link>
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-medium text-[#444] transition-colors hover:text-[#111]"
          >
            Resume
          </a>
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
