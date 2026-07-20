import type { ReactNode } from "react"
import { ClayFrame } from "@/components/clay"

type StackCardProps = {
  label: string
  items: ReactNode[]
  colorIndex?: number
}

/** Clay-framed list card for tech stack / infra groups */
export function StackCard({ label, items, colorIndex = 0 }: StackCardProps) {
  return (
    <ClayFrame
      colorIndex={colorIndex}
      thickness={4}
      rounded="xl"
      className="h-full"
      innerClassName="!bg-[#faf6ef]"
    >
      <div className="p-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fad6e]">
          {label}
        </p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[14px] leading-[1.55] text-[#4a3f34]"
            >
              <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#c4b49a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </ClayFrame>
  )
}
