import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"
import {
  clayColor,
  clayColorAt,
  type ClayColorName,
} from "./palette"

type ClayRadius = "sm" | "md" | "lg" | "xl" | "2xl" | "full"

const radiusOuter: Record<ClayRadius, string> = {
  sm: "rounded-[12px]",
  md: "rounded-[16px]",
  lg: "rounded-[20px]",
  xl: "rounded-[26px]",
  "2xl": "rounded-[32px]",
  full: "rounded-full",
}

const radiusInner: Record<ClayRadius, string> = {
  sm: "rounded-[7px]",
  md: "rounded-[11px]",
  lg: "rounded-[14px]",
  xl: "rounded-[19px]",
  "2xl": "rounded-[24px]",
  full: "rounded-full",
}

type ClayFrameProps = {
  children: ReactNode
  className?: string
  innerClassName?: string
  /**
   * Named clay color — TypeScript will autocomplete:
   * matcha | cream | chocolate | softMatcha | oat | cocoa | deepMatcha | latte
   */
  color?: ClayColorName
  /** Cycle through the clay palette when no color is set */
  colorIndex?: number
  /** Border thickness in px */
  thickness?: number
  rounded?: ClayRadius
  style?: CSSProperties
  /** Soft clay drop shadow */
  shadow?: boolean
  /** Animate on hover (and when a parent `.group` is hovered) */
  animate?: boolean
}

/**
 * Textured clay rim around media — earthy matcha / cream / chocolate.
 */
export function ClayFrame({
  children,
  className,
  innerClassName,
  color,
  colorIndex = 0,
  thickness = 5,
  rounded = "lg",
  style,
  shadow = true,
  animate = true,
}: ClayFrameProps) {
  const clay = color ? clayColor(color) : clayColorAt(colorIndex)

  return (
    <div
      className={cn(
        "clay-frame relative box-border",
        radiusOuter[rounded],
        shadow && "clay-frame-shadow",
        animate && "clay-frame-animate",
        className,
      )}
      style={{
        ["--clay-color" as string]: clay,
        backgroundColor: clay,
        padding: thickness,
        ...style,
      }}
    >
      {/* Clay grain / knead texture — only visible on the rim */}
      <span
        aria-hidden
        className={cn(
          "clay-texture pointer-events-none absolute inset-0",
          radiusOuter[rounded],
        )}
      />
      <div
        className={cn(
          "relative z-[1] h-full w-full overflow-hidden bg-[#e8e4dc]",
          radiusInner[rounded],
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  )
}
