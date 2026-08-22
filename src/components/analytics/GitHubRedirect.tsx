"use client"

import { useEffect } from "react"
import { trackEvent } from "@/lib/umami"

type GitHubRedirectProps = {
  slug: string
  name: string
  href: string
}

export function GitHubRedirect({ slug, name, href }: GitHubRedirectProps) {
  useEffect(() => {
    let cancelled = false
    const startedAt = Date.now()

    const go = () => {
      if (!cancelled) window.location.replace(href)
    }

    const waitForUmami = window.setInterval(() => {
      if (cancelled) return

      if (window.umami) {
        window.clearInterval(waitForUmami)
        void Promise.resolve(
          trackEvent("GitHub redirect", {
            project: name,
            slug,
            href,
          }),
        ).finally(go)
        return
      }

      if (Date.now() - startedAt > 1200) {
        window.clearInterval(waitForUmami)
        go()
      }
    }, 40)

    return () => {
      cancelled = true
      window.clearInterval(waitForUmami)
    }
  }, [href, name, slug])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f0e8] px-6 text-center">
      <div>
        <p className="text-[13px] font-medium tracking-tight text-[#2a1f16]">
          Opening {name} on GitHub…
        </p>
        <a
          href={href}
          className="mt-3 inline-block text-[12px] text-[#8fad6e] underline decoration-[1.5px] underline-offset-2"
        >
          Continue if nothing happens
        </a>
      </div>
    </main>
  )
}
