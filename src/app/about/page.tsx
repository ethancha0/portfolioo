"use client"

import { useState } from "react"
import Link from "next/link"
import { AccordionCardStrip } from "@/components/about/AccordionCardStrip"
import { CoreValues } from "@/components/about/CoreValues"
import { HoverCardStrip } from "@/components/about/HoverCardStrip"
import { PhotoStack } from "@/components/about/PhotoStack"
import { ScrollReveal } from "@/components/about/ScrollReveal"
import { TypewriterGreeting } from "@/components/about/TypewriterGreeting"
import { placeholderSrc } from "@/components/about/placeholder"
import zotmeet from "@/imports/zotmeet.png"
import pfizerImage from "@/imports/pfizer.png"

const heroCards = [
  {
    src: placeholderSrc("Ethan", "#2b2b2b", 420, 540),
    alt: "Portrait of Ethan Chao",
  },
  {
    src: pfizerImage,
    alt: "Pfizer work",
  },
  {
    src: zotmeet,
    alt: "ZotMeet",
  },
  {
    src: placeholderSrc("Campus", "#4a6fa5", 420, 540),
    alt: "Campus life",
  },
  {
    src: placeholderSrc("Build", "#c45c26", 420, 540),
    alt: "Building products",
  },
  {
    src: placeholderSrc("Code", "#3d6b4f", 420, 540),
    alt: "Engineering",
  },
]

const peopleCards = [
  {
    src: placeholderSrc("ZotMeet", "#1f4e79", 480, 360),
    alt: "ZotMeet team",
    caption: "ZotMeet — shipping with 10 people",
  },
  {
    src: placeholderSrc("ICS SC", "#5b4b8a", 480, 360),
    alt: "ICS Student Council",
    caption: "ICS Student Council :D",
  },
  {
    src: placeholderSrc("Kababayan", "#c45c26", 480, 360),
    alt: "Kababayan at UCI",
    caption: "Kababayan — tech + community",
  },
  {
    src: placeholderSrc("Tomo", "#8a3a4b", 480, 360),
    alt: "Tomo no Kai",
    caption: "Tomo no Kai PR crew",
  },
  {
    src: placeholderSrc("FUSION", "#2f6f5e", 480, 360),
    alt: "FUSION Engineering",
    caption: "FUSION — mentoring & building",
  },
  {
    src: placeholderSrc("Pfizer", "#0b5cab", 480, 360),
    alt: "Pfizer cohort",
    caption: "Pfizer extern cohort",
  },
  {
    src: placeholderSrc("Friends", "#6b7280", 480, 360),
    alt: "Friends",
    caption: "the people who keep me curious",
  },
]

const hobbyCards = [
  {
    src: placeholderSrc("Games", "#1a1a2e", 320, 480),
    alt: "Gaming",
    caption: "late-night ranked",
  },
  {
    src: placeholderSrc("Film", "#3d3d3d", 320, 480),
    alt: "Film / media",
    caption: "screens & stories",
  },
  {
    src: placeholderSrc("Night", "#1f2937", 320, 480),
    alt: "Nights out",
    caption: "city lights",
  },
  {
    src: placeholderSrc("Bloom", "#c4786a", 320, 480),
    alt: "Flowers",
    caption: "still life moments",
  },
  {
    src: placeholderSrc("Hike", "#4a6741", 320, 480),
    alt: "Hiking",
    caption: "trail days",
  },
  {
    src: placeholderSrc("Matcha", "#6b8f71", 320, 480),
    alt: "Matcha",
    caption: "caffeinated always",
  },
  {
    src: placeholderSrc("Polaroids", "#6b7280", 320, 480),
    alt: "Polaroids",
    caption: "memory wall",
  },
]

const values = [
  {
    before: "Lead with",
    emphasis: "curiosity & empathy",
  },
  {
    before: "Show up",
    emphasis: "fully",
    after: "and honestly",
  },
  {
    before: "Live every day with",
    emphasis: "intention",
  },
]

export default function AboutPage() {
  const [bioVisible, setBioVisible] = useState(false)

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-[#111] pt-12">
      {/* Hero */}
      <section className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 px-6 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
        <ScrollReveal>
          <PhotoStack cards={heroCards} />
        </ScrollReveal>

        <div className="max-w-xl">
          <TypewriterGreeting
            text="Heyo I'm Ethan"
            className="mb-5 text-[34px] leading-tight tracking-tight text-[#111] sm:text-[42px]"
            onDone={() => setBioVisible(true)}
          />

          <div
            className="space-y-4 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              opacity: bioVisible ? 1 : 0,
              transform: bioVisible ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <p className="text-[16px] font-semibold leading-snug text-[#222] sm:text-[17px]">
              Software isn&apos;t just shipping features. It&apos;s how we make
              complex systems feel human — especially in healthcare.
            </p>
            <p className="text-[14px] leading-relaxed text-[#555]">
              I&apos;m studying Software Engineering + Health Informatics at UC
              Irvine. Years of building products and leading teams taught me
              that the best tools disappear into the work people already do.
            </p>
            <p className="text-[14px] leading-relaxed text-[#555]">
              Today I bridge engineering rigor and human behavior — OCR + RAG
              pipelines at Pfizer, student products like ZotMeet, and
              leadership roles across campus orgs.
            </p>
            <p className="text-[14px] leading-relaxed text-[#555]">
              I love talking product and systems — let&apos;s chat! Find me on{" "}
              <Link
                href="https://www.linkedin.com/in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#0a66c2] transition-opacity hover:opacity-80"
              >
                <LinkedInIcon />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Awesome People */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:gap-10">
          <ScrollReveal>
            <h2 className="text-[26px] tracking-tight text-[#111] sm:text-[30px]">
              Awesome People
            </h2>
            <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-[#777]">
              what&apos;s a journey without the amazing people you come across,
              right?
            </p>
            <p className="mt-8 text-[11px] tracking-wide text-[#bbb]">
              hover over the cards
            </p>
          </ScrollReveal>

          <ScrollReveal delayMs={80}>
            <div className="-mx-6 overflow-x-auto px-6 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
              <HoverCardStrip
                items={peopleCards}
                className="min-w-[720px] pt-6 lg:min-w-0 lg:pt-2"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* So What Else */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:py-20">
        <ScrollReveal>
          <h2 className="text-[26px] tracking-tight text-[#111] sm:text-[30px]">
            So What Else?
          </h2>
          <p className="mt-2 max-w-md text-[13px] leading-relaxed text-[#777]">
            this is what I do when I&apos;m not hunched over my laptop shipping
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={90} className="mt-10">
          <AccordionCardStrip items={hobbyCards} />
        </ScrollReveal>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:py-20">
        <ScrollReveal>
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-[26px] tracking-tight text-[#111] sm:text-[30px]">
              My Core Values
            </h2>
            <span
              aria-hidden
              className="inline-flex size-8 items-center justify-center rounded-full border border-[#ddd] text-[14px] text-[#888]"
            >
              ?
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={70}>
          <CoreValues values={values} />
        </ScrollReveal>
      </section>

      <footer className="mx-auto max-w-[1100px] px-6 pb-16 pt-4">
        <p className="text-[12px] text-[#888]">
          Thanks for reading. Let&apos;s grab coffee (on me!)
        </p>
        <p className="mt-1 text-[11px] text-[#bbb]">© Ethan Chao 2026</p>
      </footer>
    </main>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="translate-y-[2px]"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.23 0z" />
    </svg>
  )
}
