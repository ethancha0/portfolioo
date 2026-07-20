import Link from "next/link"
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  MouseEventHandler,
  ReactNode,
} from "react"
import { cn } from "@/lib/utils"
import { clayColorAt, clayColor, type ClayColorName } from "./palette"

type ClayButtonSize = "sm" | "md" | "lg" | "icon"
type ClayButtonVariant = "solid" | "soft" | "outline"

type ClayButtonBase = {
  children: ReactNode
  className?: string
  color?: ClayColorName
  colorIndex?: number
  size?: ClayButtonSize
  variant?: ClayButtonVariant
  style?: CSSProperties
}

type ClayButtonAsButton = ClayButtonBase &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    href?: undefined
  }

type ClayButtonAsLink = ClayButtonBase & {
  href: string
  target?: string
  rel?: string
  "aria-label"?: string
  type?: never
  onClick?: MouseEventHandler<HTMLAnchorElement>
  disabled?: never
}

export type ClayButtonProps = ClayButtonAsButton | ClayButtonAsLink

const sizeClasses: Record<ClayButtonSize, string> = {
  sm: "min-h-8 gap-1.5 px-3 text-[12px]",
  md: "min-h-9 gap-2 px-4 text-[13px]",
  lg: "min-h-11 gap-2 px-5 text-[14px]",
  icon: "size-8 justify-center p-0",
}

/**
 * Clickable claymation button — soft rim, matte fill, pressable feel.
 */
export function ClayButton(props: ClayButtonProps) {
  const {
    children,
    className,
    color,
    colorIndex = 0,
    size = "md",
    variant = "soft",
    style,
  } = props

  const clay = color ? clayColor(color) : clayColorAt(colorIndex)
  const classes = cn(
    "clay-btn inline-flex items-center font-medium tracking-tight transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out",
    "rounded-full select-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#111]/20",
    "active:translate-y-[1px] active:shadow-[0_1px_0_var(--clay-rim)]",
    sizeClasses[size],
    className,
  )

  const clayStyle: CSSProperties = {
    ["--clay-rim" as string]: clay,
    ...style,
  }

  if (variant === "solid") {
    Object.assign(clayStyle, {
      background: clay,
      borderColor: shade(clay, -18),
      color: "#2a1f16",
      boxShadow: `0 3px 0 ${shade(clay, -22)}, 0 6px 14px rgba(60,40,25,0.12)`,
    })
  } else if (variant === "outline") {
    Object.assign(clayStyle, {
      background: "#f7f2ea",
      borderColor: clay,
      color: "#2a1f16",
      boxShadow: `0 2px 0 ${shade(clay, -10)}, 0 5px 12px rgba(60,40,25,0.08)`,
    })
  } else {
    Object.assign(clayStyle, {
      background: tint(clay, 0.78),
      borderColor: clay,
      color: "#2a1f16",
      boxShadow: `0 2px 0 ${shade(clay, -12)}, 0 5px 12px rgba(60,40,25,0.08)`,
    })
  }

  if ("href" in props && props.href) {
    const isExternal =
      props.href.startsWith("http") ||
      props.href.startsWith("mailto:") ||
      props.href.startsWith("tel:") ||
      props.href.startsWith("#")

    if (isExternal) {
      return (
        <a
          href={props.href}
          target={props.target}
          rel={props.rel}
          aria-label={props["aria-label"]}
          className={classes}
          style={clayStyle}
          onClick={props.onClick}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        href={props.href}
        aria-label={props["aria-label"]}
        className={classes}
        style={clayStyle}
        onClick={props.onClick}
      >
        {children}
      </Link>
    )
  }

  const { type = "button", disabled, onClick, "aria-label": ariaLabel } =
    props as ClayButtonAsButton

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(classes, disabled && "pointer-events-none opacity-50")}
      style={clayStyle}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

/** Mix hex toward white by amount 0–1 */
function tint(hex: string, amount: number): string {
  const { r, g, b } = parseHex(hex)
  const mix = (c: number) => Math.round(c + (255 - c) * amount)
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

/** Darken hex by percent (0–100) */
function shade(hex: string, percent: number): string {
  const { r, g, b } = parseHex(hex)
  const t = percent / 100
  const mix = (c: number) =>
    Math.max(0, Math.min(255, Math.round(c + c * t)))
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`
}

function parseHex(hex: string): { r: number; g: number; b: number } {
  const raw = hex.replace("#", "")
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw
  const n = Number.parseInt(full, 16)
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  }
}
