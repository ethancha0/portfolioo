import type { ReactNode } from "react"

type StackCardProps = {
  label: string
  items: ReactNode[]
  /** @deprecated Cards are no longer color-coded; kept so callers don't break. */
  colorIndex?: number
}

/** Outlined list card for tech stack / infra groups */
export function StackCard({ label, items }: StackCardProps) {
  return (
    <div className="h-full rounded-[10px] border border-[#e4e1d9] bg-[#f7f2ea]">
      <div className="p-5">
        <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#8a8378]">
          {label}
        </p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[14px] leading-[1.55] text-[#4a443d]"
            >
              <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#a8a294]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
