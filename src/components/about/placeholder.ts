/** SVG data-URI placeholders until real photos are swapped in */
export function placeholderSrc(
  label: string,
  color: string,
  w = 420,
  h = 520,
) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${color}"/>
      <stop offset="100%" stop-color="${color}" stop-opacity="0.72"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <circle cx="${w * 0.72}" cy="${h * 0.22}" r="${Math.min(w, h) * 0.18}" fill="rgba(255,255,255,0.12)"/>
  <text x="50%" y="52%" fill="rgba(255,255,255,0.92)" font-family="Georgia, serif" font-size="22" text-anchor="middle">${label}</text>
</svg>`.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
