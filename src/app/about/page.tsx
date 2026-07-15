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
import { img } from "@/imports/registry"

const heroCards = [
  {
    src: img("portrait.jpeg"),
    alt: "Portrait of Ethan Chao",
  },
  {
    src: img("pfizer"),
    alt: "Pfizer work",
  },
  {
    src: img("zotmeet"),
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
    src: img("portrait.jpeg"),
    alt: "Engineering",
  },
]

const peopleCards = [
  {
    src: img("zmxaa"),
    alt: "",
    caption: "ZotMeet x AntAlmanac Social",
  },
  {
    src: img("tomo"),
    alt: "",
    caption: "Serving on Tomo no Kai board!",
  },
  {
    src: img("dog"),
    alt: "",
    caption: "Corgi Hiking Club",
  },
  {
    src: img("hollywood"),
    alt: "",
    caption: "Hollywood Hike",
  },
  {
    src: img("sd"),
    alt: "",
    caption: "San Diego",
  },
  {
    src: img("seaside"),
    alt: "",
    caption: "Many nights at Seaside",
  },
  {
    src: img("masami"),
    alt: "",
    caption: "Masami :D",
  },
]

const hobbyCards = [
  {
    src: img("rock.JPG"),
    alt: "Boldering",
    caption: "Boldering",
  },
  {
    src: img("bonsai.jpeg"),
    alt: "",
    caption: "Growing Bonsai",
  },
  {
    src: img("vball.jpeg"),
    alt: "Intramural Sports",
    caption: "Intramural Sports",
  },
  {
    src: img("hikinh"),
    alt: "",
    caption: "Hikes!",
  },
  {
    src: img("bonsai2"),
    alt: "Hiking",
    caption: "Bonsai!",
  },
  {
    src: img("bixby.JPG"),
    alt: "Matcha",
    caption: "Going to concerts!",
  },
  {
    src: img("mazemen.jpeg"),
    alt: "Good Eats!",
    caption: "Good Eats!",
  },
]

const values = [
  {
    before: "Change your future's",
    emphasis: "past",
  },
  {
    before: "Habits are the ",
    emphasis: "compound interest",
    after: "of self-improvement",
  },
  {
    before: "Have fun along the way ",
    emphasis: ":)",
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
            text="Hey there, I'm Ethan!"
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
            This summer I’m currently an working as an extern at Pfizer where I’m working on an AI pipeline to extract and organize data across pharmaceutical vendor documents
            </p>
            <p className="text-[14px] leading-relaxed text-[#555]">
            At UC Irvine, I serve as Webmaster for the Computer Science Student Council and Lead Software Engineer for ZotMeet, which is a campus wide study room scheduler where I lead a team of designers and engineers. 
            </p>
            <p className="text-[14px] leading-relaxed text-[#555]">
              I love talking product and systems — let&apos;s chat! Find me on{" "}
              <Link
                href="https://www.linkedin.com/in/ethanchaoo"
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
              The many friends I made along the way of the journey called life :)
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
            I love exploring new cities, hobbies, and foods!
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={90} className="mt-10">
          <AccordionCardStrip items={hobbyCards} />
        </ScrollReveal>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 lg:py-20">
        <ScrollReveal>
          <div className="mb-2 flex items-center gap-3">
            <h2 className="text-[26px] tracking-tight text-[#111] sm:text-[30px]">
              My Core Values
            </h2>
          
          </div>
          <p className=" max-w-md text-[13px] leading-relaxed text-[#777]">
            Some quotes that live in my mind rent-free
          </p>
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
