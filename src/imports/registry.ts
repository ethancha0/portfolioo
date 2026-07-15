// Auto-discovers every image/video under src/imports so you can reference an
// asset by its file name (e.g. img("portrait")) instead of writing a manual
// `import ... from "@/imports/..."` for each one.
//
// Powered by webpack's require.context (this project runs `next dev` on
// webpack). If you ever switch to Turbopack, require.context is unsupported and
// this would need to move to an explicit barrel of imports.

type WebpackRequireContext = {
  keys(): string[]
  (id: string): unknown
}

type WebpackRequire = {
  context(
    directory: string,
    useSubdirectories: boolean,
    regExp: RegExp,
  ): WebpackRequireContext
}

const assetContext = (require as unknown as WebpackRequire).context(
  ".",
  true,
  /\.(avif|gif|jpe?g|mov|mp4|png|svg|webm)$/i,
)

function resolveSrc(mod: unknown): string {
  if (typeof mod === "string") return mod
  if (mod && typeof mod === "object" && "default" in mod) {
    const def = (mod as { default: unknown }).default
    if (typeof def === "string") return def
  }
  return String(mod)
}

/** Keyed by bare file name, e.g. "portrait" */
const byName: Record<string, string> = {}
/** Keyed by path relative to src/imports without extension, e.g. "me/portrait" */
const byPath: Record<string, string> = {}

for (const key of assetContext.keys()) {
  const src = resolveSrc(assetContext(key))
  const relative = key.replace(/^\.\//, "") // "me/portrait.jpeg"
  const withoutExt = relative.replace(/\.[^.]+$/, "") // "me/portrait"
  const base = withoutExt.replace(/^.*\//, "") // "portrait"

  byPath[withoutExt] = src
  // First match wins so duplicate base names stay stable; use the subfolder
  // path (e.g. "me/portrait") to disambiguate collisions.
  if (!(base in byName)) byName[base] = src
}

/**
 * Resolve an imported asset URL by name.
 *
 * @example
 *   img("portrait")     // src/imports/me/portrait.jpeg
 *   img("me/portrait")  // same, fully qualified to avoid name collisions
 *   img("zotmeet.png")  // extension is optional but allowed
 */
export function img(name: string): string {
  const cleaned = name.replace(/^\.?\//, "").replace(/\.[^.]+$/, "")
  const src = byPath[cleaned] ?? byName[cleaned] ?? byName[cleaned.replace(/^.*\//, "")]

  if (!src) {
    const available = Object.keys(byName).sort().join(", ")
    throw new Error(
      `img("${name}") not found in src/imports. Available names: ${available}`,
    )
  }

  return src
}

/** All discovered asset names (bare file names), handy for debugging. */
export const imageNames = () => Object.keys(byName).sort()
