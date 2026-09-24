export type ExperienceRow = {
  /** Inclusive start month, "YYYY-MM" */
  start: string
  /** Exclusive end month, "YYYY-MM". Omit for ongoing. */
  end?: string
  company: string
  role: string
  link?: string
}

// Dates are month-precision ("YYYY-MM").
export const experience: ExperienceRow[] = [
  {
    start: "2025-10",
    company: "ZotMeet",
    role: "Lead Software Engineer",
    link: "/zotmeet",
  },
  {
    start: "2026-06",
    end: "2026-09",
    company: "Pfizer",
    role: "AI Extern",
    link: "/pfizer",
  },
  {
    start: "2026-05",
    company: "ICS Student Council",
    role: "Technical Director",
  },
]

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
]

/** Months since year 0 for a "YYYY-MM" string. */
function monthIndex(value: string): number {
  const [year, month] = value.split("-").map(Number)
  return year * 12 + (month - 1)
}

function currentMonthIndex(): number {
  const now = new Date()
  return now.getFullYear() * 12 + now.getMonth()
}

/** "4 mon.", "1y", "1y 8m" */
function formatDuration(months: number): string {
  const span = Math.max(1, months)
  const years = Math.floor(span / 12)
  const rem = span % 12
  if (years === 0) return `${rem} mon.`
  if (rem === 0) return `${years}y`
  return `${years}y ${rem}m`
}

/** "SEP 2024" */
function formatAxisLabel(index: number): string {
  return `${MONTH_ABBR[index % 12]} ${Math.floor(index / 12)}`
}

export function ExperienceTimeline({
  rows = experience,
  heading = "Experience",
  className = "",
}: {
  rows?: ExperienceRow[]
  heading?: string
  className?: string
}) {
  // Shared timeline axis across every row
  const nowIndex = currentMonthIndex()
  const timelineRows = rows.map((row) => {
    const startIdx = monthIndex(row.start)
    const endIdx = row.end ? monthIndex(row.end) : nowIndex
    return { ...row, startIdx, endIdx, ongoing: !row.end }
  })
  const axisStart = Math.min(...timelineRows.map((r) => r.startIdx))
  const axisEnd = Math.max(...timelineRows.map((r) => r.endIdx))
  const axisSpan = Math.max(1, axisEnd - axisStart)

  return (
    <section
      id="experience"
      className={`scroll-mt-16 border-t border-[#e4e1d9] pt-12 ${className}`}
    >
      <h2
        className="text-[11px] uppercase tracking-[0.16em] text-[#8a8378]"
        style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
      >
        {heading}
      </h2>
      <div
        className="mt-6 max-w-[620px] text-[13px] leading-snug sm:text-[14px]"
        style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
      >
        <ul className="divide-y divide-[#e4e1d9]">
          {timelineRows.map((row, i) => {
            const months = row.endIdx - row.startIdx
            const left = ((row.startIdx - axisStart) / axisSpan) * 100
            const width = Math.max(
              2,
              ((row.endIdx - row.startIdx) / axisSpan) * 100,
            )
            return (
              <li key={i} className="py-4">
                <div className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-8">
                  <span className="whitespace-nowrap text-[#a8a294]">
                    {formatDuration(months)}
                    {row.ongoing ? " +" : ""}
                  </span>
                  <a href={row.link}>
                    <span className="text-[#2a2320]">{row.company}</span>
                  </a>
                  <span className="text-right text-[#8a8378]">{row.role}</span>
                </div>
                <div className="relative mt-3 h-[2px] w-full">
                  <div
                    className="absolute top-0 h-[2px] rounded-full bg-[#b3823a]"
                    style={{ left: `${left}%`, width: `${width}%` }}
                  />
                </div>
              </li>
            )
          })}
        </ul>
        <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.14em] text-[#a8a294]">
          <span>{formatAxisLabel(axisStart)}</span>
          <span>{axisEnd >= nowIndex ? "NOW" : formatAxisLabel(axisEnd)}</span>
        </div>
      </div>
    </section>
  )
}
