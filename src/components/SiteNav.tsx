"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT ME", href: "/#about" },
  { label: "RESUME", href: "https://drive.google.com/file/d/1a40jwDFfLG5DBDAXZaZafwwdplUpLRCl/view?usp=sharing" },
] as const

export function SiteNav() {
  const pathname = usePathname()
  const onAboutPage = pathname.startsWith("/about")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#e8e8e8] bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-12 max-w-[1200px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#111]">
            Ethan Chao
          </span>
          <span className="hidden text-[#ccc] sm:inline">|</span>
          <span className="hidden text-[10px] font-medium uppercase tracking-wider text-[#888] sm:inline">
            Software Engineering + Health Infomatics @ UC Irvine
          </span>
        </Link>

        <div className="flex items-center gap-7">
          {navItems.map((item) => {
            const isActive =
              item.label === "WORK" ? !onAboutPage : onAboutPage

            return (
              <Link
                key={item.label}
                href={item.href}
                {...(item.label === "RESUME"
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-[11px] font-medium tracking-widest transition-colors hover:text-[#e05a28]"
                style={{ color: isActive ? "#e05a28" : "#888" }}
              >
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}
