"use client"

import { useEffect } from "react"
import {
  getClickEventName,
  identifySession,
  trackEvent,
} from "@/lib/umami"

const CLICK_SELECTOR = "a, button, [role='button']"

function sessionContext(): Record<string, string> {
  const params = new URLSearchParams(window.location.search)
  const data: Record<string, string> = {
    landing_path: `${window.location.pathname}${window.location.search}`,
    language: navigator.language,
  }

  const referrer = document.referrer
  if (referrer) {
    try {
      data.referrer_host = new URL(referrer).hostname
    } catch {
      data.referrer_host = referrer
    }
  } else {
    data.referrer_host = "direct"
  }

  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "ref",
  ]) {
    const value = params.get(key)
    if (value) data[key] = value
  }

  return data
}

function labelFromElement(element: HTMLElement): string | undefined {
  const text = element.innerText?.replace(/\s+/g, " ").trim()
  if (!text || text.length > 80) return undefined
  return text
}

function onDocumentClick(event: MouseEvent): void {
  if (event.button !== 0) return

  const target = event.target
  if (!(target instanceof Element)) return

  const element = target.closest(CLICK_SELECTOR)
  if (!(element instanceof HTMLElement)) return
  if (element.hasAttribute("data-umami-event")) return

  const href = element.getAttribute("href") ?? undefined
  trackEvent(
    getClickEventName({
      ariaLabel: element.getAttribute("aria-label") ?? undefined,
      href,
      childrenText: labelFromElement(element),
    }),
    {
      href,
      tag: element.tagName.toLowerCase(),
      path: window.location.pathname,
    },
  )
}

export function UmamiAnalytics() {
  useEffect(() => {
    document.addEventListener("click", onDocumentClick, true)

    let cancelled = false
    const startedAt = Date.now()
    const waitForUmami = window.setInterval(() => {
      if (cancelled) return
      if (window.umami) {
        identifySession(sessionContext())
        window.clearInterval(waitForUmami)
        return
      }
      if (Date.now() - startedAt > 8000) {
        window.clearInterval(waitForUmami)
      }
    }, 100)

    return () => {
      cancelled = true
      window.clearInterval(waitForUmami)
      document.removeEventListener("click", onDocumentClick, true)
    }
  }, [])

  return null
}
