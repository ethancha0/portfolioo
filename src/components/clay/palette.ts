/** Earthy claymation palette — matcha, cream, chocolate. */
export const CLAY_COLORS = {
  matcha: "#8fad6e",
  cream: "#efe6d6",
  chocolate: "#6a4a35",
  softMatcha: "#a8b87c",
  oat: "#d9cdb5",
  cocoa: "#4f3628",
  deepMatcha: "#7a9160",
  latte: "#c4b49a",
} as const

/** Autocomplete-friendly color names for `color="…"` props */
export type ClayColorName = keyof typeof CLAY_COLORS

export const CLAY_COLOR_NAMES = Object.keys(CLAY_COLORS) as ClayColorName[]

/** Resolve a named clay color to its hex value */
export function clayColor(name: ClayColorName): string {
  return CLAY_COLORS[name]
}

/** Cycle palette names by index (for galleries / lists) */
export function clayColorNameAt(index: number): ClayColorName {
  const i =
    ((index % CLAY_COLOR_NAMES.length) + CLAY_COLOR_NAMES.length) %
    CLAY_COLOR_NAMES.length
  return CLAY_COLOR_NAMES[i]
}

/** Cycle palette hex values by index */
export function clayColorAt(index: number): string {
  return CLAY_COLORS[clayColorNameAt(index)]
}
