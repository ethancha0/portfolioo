/**
 * Shared visual language for the site — mirrors the landing page rail + cards.
 * Keep subpages referencing these instead of re-declaring hex values.
 */
export const theme = {
  /** Page background */
  bg: "#f5f4f1",
  /** Soft fill for cards and media wells */
  surface: "#f7f2ea",
  /** Hairline rules and outlines */
  border: "#e4e1d9",
  /** Outline for interactive pills */
  borderStrong: "#d8d4cb",
  /** Headings */
  ink: "#1f1a16",
  /** Body copy */
  body: "#4a443d",
  /** Secondary / labels */
  muted: "#8a8378",
  /** Tertiary — axis labels, timestamps */
  faint: "#a8a294",
  /** The single warm accent, used sparingly */
  accent: "#b3823a",
} as const

export const serif = "var(--font-fraunces), Georgia, serif"
export const mono = "var(--font-mono), ui-monospace, monospace"

/** Serif display heading, as used for the name and project titles */
export const headingClass =
  "tracking-[-0.01em] text-[#1f1a16] leading-tight"

/** Small mono section label, as used for "Featured Work" */
export const labelClass =
  "text-[11px] uppercase tracking-[0.16em] text-[#8a8378]"

/** Outlined pill, as used for project tags */
export const pillClass =
  "inline-flex items-center gap-1.5 rounded-[4px] border border-[#d8d4cb] px-3 py-1.5 text-[12.5px] text-[#5c564d] transition-colors hover:border-[#8a8378] hover:text-[#1f1a16]"
