import { useState, type ImgHTMLAttributes } from 'react'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

export function ImageWithFallback({ src, alt, className, style, ...props }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div
        className={className}
        style={{ background: '#e8e8e8', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}
        aria-label={alt}
      >
        <span style={{ color: '#aaa', fontSize: 12 }}>{alt}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setErrored(true)}
      {...props}
    />
  )
}
