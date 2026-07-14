const MONTHS: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
}

const MONTH_LABELS = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
] as const

function parseMonthYear(input: string, endOfMonth = false): Date {
  const cleaned = input.trim().replace(/\s+/g, " ")

  // "2025-10" / "2025/10"
  const iso = cleaned.match(/^(\d{4})[-/](\d{1,2})$/)
  if (iso) {
    const year = Number(iso[1])
    const month = Number(iso[2]) - 1
    return endOfMonth
      ? new Date(year, month + 1, 0)
      : new Date(year, month, 1)
  }

  // "Oct. 2025" / "October 2025" / "Oct 2025"
  const labeled = cleaned.match(/^([A-Za-z]+)\.?\s+(\d{4})$/)
  if (labeled) {
    const month = MONTHS[labeled[1].toLowerCase()]
    if (month === undefined) {
      throw new Error(`Unrecognized month in "${input}"`)
    }
    const year = Number(labeled[2])
    return endOfMonth
      ? new Date(year, month + 1, 0)
      : new Date(year, month, 1)
  }

  throw new Error(
    `Could not parse date "${input}". Use formats like "Oct. 2025" or "2025-10".`,
  )
}

function formatMonthYear(date: Date): string {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`
}

function pluralize(count: number, singular: string): string {
  return `${count} ${singular}${count === 1 ? "" : "s"}`
}

function formatDuration(start: Date, end: Date): string {
  const startTime = start.getTime()
  const endTime = end.getTime()
  if (endTime < startTime) {
    return "0 weeks"
  }

  const totalDays = Math.floor((endTime - startTime) / (1000 * 60 * 60 * 24))
  const totalWeeks = Math.max(1, Math.floor(totalDays / 7))

  const monthDiff =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth())

  // Prefer months once we clear ~a month; otherwise show weeks.
  if (monthDiff >= 1 && totalDays >= 28) {
    const months = Math.max(1, monthDiff + (end.getDate() >= start.getDate() ? 0 : -1))
    if (months >= 12) {
      const years = Math.floor(months / 12)
      const remMonths = months % 12
      if (remMonths === 0) return pluralize(years, "year")
      return `${pluralize(years, "year")}, ${pluralize(remMonths, "month")}`
    }
    return pluralize(months, "month")
  }

  return pluralize(totalWeeks, "week")
}

/**
 * Formats a project timeline from a start month/year.
 *
 * @example
 * formatTimeline("Oct. 2025")
 * // "Oct. 2025 - Present (9 months)"
 *
 * @example
 * formatTimeline("Oct. 2025", "Jun. 2026")
 * // "Oct. 2025 - Jun. 2026 (8 months)"
 */
export function formatTimeline(
  start: string,
  end: string | "Present" = "Present",
  now: Date = new Date(),
): string {
  const startDate = parseMonthYear(start)
  const isPresent = end === "Present" || end.toLowerCase() === "present"
  const endDate = isPresent ? now : parseMonthYear(end, true)
  const endLabel = isPresent ? "Present" : formatMonthYear(parseMonthYear(end))

  return `${formatMonthYear(startDate)} - ${endLabel} (${formatDuration(startDate, endDate)})`
}
