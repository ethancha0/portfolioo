import type { ReactNode } from "react"

const EVENT_NAME_MAX = 50
const EVENT_VALUE_MAX = 500

type EventData = Record<string, string | number | undefined | null>

function truncate(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max)
}

export function textFromReactNode(node: ReactNode): string | undefined {
  if (node == null || typeof node === "boolean") return undefined
  if (typeof node === "string" || typeof node === "number") {
    const text = String(node).trim()
    return text || undefined
  }
  if (Array.isArray(node)) {
    const joined = node
      .map((child) => textFromReactNode(child))
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim()
    return joined || undefined
  }
  return undefined
}

export function getClickEventName({
  event,
  ariaLabel,
  href,
  childrenText,
}: {
  event?: string
  ariaLabel?: string
  href?: string
  childrenText?: string
}): string {
  const explicit = event?.trim() || ariaLabel?.trim() || childrenText?.trim()
  if (explicit) return truncate(explicit, EVENT_NAME_MAX)

  if (href) {
    if (href.startsWith("mailto:")) return "Email"
    if (href.startsWith("tel:")) return "Phone"
    if (/linkedin\.com/i.test(href)) return "LinkedIn"
    if (/drive\.google\.com|\bresume\b/i.test(href)) return "Resume"
    if (/^(https?:)/i.test(href)) return "Outbound link"
    return truncate(`Open ${href}`, EVENT_NAME_MAX)
  }

  return "Button click"
}

export function umamiEventAttributes(
  eventName: string,
  extra?: EventData,
): Record<string, string> {
  const attrs: Record<string, string> = {
    "data-umami-event": truncate(eventName, EVENT_NAME_MAX),
  }

  if (!extra) return attrs

  for (const [key, value] of Object.entries(extra)) {
    if (value == null || value === "") continue
    attrs[`data-umami-event-${key}`] = truncate(String(value), EVENT_VALUE_MAX)
  }

  return attrs
}

export function trackEvent(
  eventName: string,
  data?: EventData,
): Promise<void> | undefined {
  if (typeof window === "undefined" || !window.umami) return

  const cleaned: Record<string, string | number> = {}
  if (data) {
    for (const [key, value] of Object.entries(data)) {
      if (value == null || value === "") continue
      cleaned[key] =
        typeof value === "number" ? value : truncate(String(value), EVENT_VALUE_MAX)
    }
  }

  if (Object.keys(cleaned).length > 0) {
    return window.umami.track(truncate(eventName, EVENT_NAME_MAX), cleaned)
  }

  return window.umami.track(truncate(eventName, EVENT_NAME_MAX))
}

export function identifySession(data: EventData): void {
  if (typeof window === "undefined" || !window.umami) return

  const cleaned: Record<string, string | number> = {}
  for (const [key, value] of Object.entries(data)) {
    if (value == null || value === "") continue
    cleaned[key] =
      typeof value === "number" ? value : truncate(String(value), EVENT_VALUE_MAX)
  }

  if (Object.keys(cleaned).length === 0) return
  void window.umami.identify(cleaned)
}
