"use client"

import Grainient from "@/components/Grainient"

/** Shared ZotMeet Grainient — keep in sync with the home project card */
export function ZotMeetGrainient() {
  return (
    <Grainient
      color1="#f16486"
      color2="#e0afbb"
      color3="#f5bfcc"
      timeSpeed={1.5}
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
