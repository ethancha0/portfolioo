import type { ReactNode } from "react"
import { serif } from "@/components/theme"
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
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-[10px] border border-[#e4e1d9] bg-[#f7f2ea] px-4 py-5"
        >
          <p
            className="text-[26px] leading-none tracking-[-0.01em] text-[#1f1a16] md:text-[30px]"
            style={{ fontFamily: serif }}
          >
            {stat.value}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#8a8378]">
            {stat.label}
          </p>
        </div>
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
          <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#b3823a]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
