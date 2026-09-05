"use client"

import Grainient from "@/components/Grainient"

/** Shared Fretly Grainient — warm amber / oat / rosewood tones */
export function FretlyGrainient() {
  return (
    <Grainient
      color1="#b3823a"
      color2="#e2c58f"
      color3="#6a4a35"
      timeSpeed={1.2}
      colorBalance={0}
      warpStrength={1}
      warpFrequency={5}
      warpSpeed={3.6}
      warpAmplitude={38}
      blendAngle={0}
      blendSoftness={0.05}
      rotationAmount={500}
      noiseScale={2}
      grainAmount={0.1}
      grainScale={2}
      grainAnimated={false}
      contrast={1.5}
      gamma={0.9}
      saturation={1}
      centerX={0}
      centerY={0}
      zoom={0.9}
    />
  )
}
