"use client"

import { cn } from "@/lib/utils"

export type CoreValue = {
  before: string
  emphasis: string
  after?: string
}

type CoreValuesProps = {
  values: CoreValue[]
  className?: string
}

export function CoreValues({ values, className }: CoreValuesProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-3",
        className,
      )}
    >
      {values.map((value) => (
        <div
          key={`${value.before}-${value.emphasis}`}
          className="group flex min-h-[140px] items-center justify-center rounded-2xl border border-[#ececec] bg-white px-6 py-10 text-center shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
        >
          <p className="text-[15px] leading-relaxed text-[#444]">
            {value.before}{" "}
            <strong className="font-semibold text-[#111]">
              {value.emphasis}
            </strong>
            {value.after ? ` ${value.after}` : null}
          </p>
        </div>
      ))}
    </div>
  )
}
