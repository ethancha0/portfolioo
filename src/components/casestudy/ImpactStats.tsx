import type { ReactNode } from "react"
import { ClayFrame } from "@/components/clay"
import { caseStudyBody } from "./styles"

export type ImpactStat = {
  value: string
  label: string
}

type ImpactStatsProps = {
  stats: ImpactStat[]
}

export function ImpactStats({ stats }: ImpactStatsProps) {
  return (
    <div className="mb-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <ClayFrame
          key={stat.label}
          colorIndex={i}
          thickness={4}
          rounded="xl"
          innerClassName="!bg-[#faf6ef]"
        >
          <div className="px-4 py-5">
            <p className="text-[26px] font-semibold leading-none tracking-tight text-[#8fad6e] md:text-[30px]">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8f8578]">
              {stat.label}
            </p>
          </div>
        </ClayFrame>
      ))}
    </div>
  )
}

type BulletListProps = {
  items: ReactNode[]
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className={`flex gap-3 ${caseStudyBody}`}>
          <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#8fad6e]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
