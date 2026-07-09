"use client"

import { useState } from "react"
import type { PointerEvent, ReactNode } from "react"
import interviewmeVideo from "@/imports/interviewme.mov"
import pfizerImage from "@/imports/pfizer.png"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import zotmeet from "@/imports/zotmeet.png"
import zotmeetMobile from "@/imports/zotmeet-mobile.png"
import fusion from "@/imports/fusion.png"
import Grainient from "@/components/Grainient"

type TimelineEvent = {
  year: string
  company: string
  role: string
  leadershipOnly?: boolean
  delay?: number
}

const experience: TimelineEvent[] = [
  { year: "2026", company: "Pfizer", role: "Software Engineering Extern" },
  { year: "2026", company: "ZotMeet", role: "Lead Software Engineer" },
  {
    year: "2025",
    company: "FUSION Engineering",
    role: "Lead Software Engineer",
  },
  { year: "2025", company: "AntAlmanac", role: "Software Engineer" },
]

const leadershipEvents: TimelineEvent[] = [
  {
    year: "2026",
    company: "ICS Student Council",
    role: "Webmaster",
    leadershipOnly: true,
    delay: 60,
  },
  {
    year: "2026",
    company: "Tomo no Kai",
    role: "Director of Public Relations",
    leadershipOnly: true,
    delay: 120,
  },
  {
    year: "2025",
    company: "Kababayan at UCI",
    role: "Technical Lead",
    leadershipOnly: true,
    delay: 180,
  },
]

const timelineRows: TimelineEvent[] = [
  experience[0],
  experience[1],
  leadershipEvents[0],
  experience[2],
  leadershipEvents[1],
  experience[3],
  leadershipEvents[2],
]

type Project = {
  id: string
  title: string
  displayTitle: string
  eyebrow?: string
  tags: string[]
  description: string
  height: number
  isLight?: boolean
  gradient?: string | ReactNode
  image?: string
  video?: string
  poster?: string
  popoutImages?: ProjectPopoutImage[]
}

type ProjectPopoutImage = {
  src: string
  alt?: string
  objectPosition?: string
  size?: "wide" | "tall" | "square" | "default"
  className?: string
}

const popoutSizeClasses = {
  default: "",
  wide: "h-24 w-44",
  tall: "h-36 w-24",
  square: "h-28 w-28",
}

const defaultGradient =
  "linear-gradient(135deg, #f7c59f 0%, #e05a28 100%)"

function isCssGradient(
  gradient: Project["gradient"],
): gradient is string {
  return typeof gradient === "string"
}

const projects: Project[] = [
  {
    id: "pfizer",
    title: "Pfizer",
    displayTitle: "Pfizer",
    tags: ["Externship", "Engineering"],
    image: pfizerImage,
    gradient: <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
    <Grainient
      color1="#ceb0cd"
      color2="#9e8ce8"
      color3="#c6a8e2"
      timeSpeed={0.25}
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
  </div>,
    description:
      "Building OCR + RAG pipelines",
    popoutImages: [
      {
        src: pfizerImage,
        alt: "Pfizer project preview",
        size: "wide",
      },
    ],
    isLight: true,
    height: 340,
  },
  {
    id: "ZotMeet",
    title: "ZotMeet",
    displayTitle: "ZotMeet",
    image: zotmeet,
    eyebrow: "Lead Product + Softare Engineer",
    tags: ["Product Engineering"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    description:
      "Spearheaded & scaled developement for UCI's scheduler ",
    popoutImages: [
      {
        src: zotmeetMobile,
        alt: "ZotMeet desktop preview",
        size: "wide",
      },
      {
        src: zotmeetMobile,
        alt: "ZotMeet mobile preview",
        size: "tall",
        objectPosition: "top",
      },
    ],
    height: 260,
  },
  {
    id: "fusion",
    title: "FUSION Engineering",
    image: fusion,
    displayTitle: "FUSION Engineering",
    eyebrow: "Lead Software Engineer",
    tags: ["Product Design", ""],
    gradient: "linear-gradient(135deg, #f0f7ff 0%, #d6eaff 50%, #b8d4ff 100%)",
    description:
      "Mentored 6 engineers to build software for UCI Kababayan",
    popoutImages: [
      {
        src: fusion,
        alt: "FUSION Engineering preview",
        size: "wide",
      },
    ],
    isLight: true,
    height: 260,
  },
  {
    id: "InterviewMe",
    title: "InterviewMe",
    displayTitle: "InterviewMe",
    eyebrow: "Project",
    tags: ["Personal Project", ""],
    video: interviewmeVideo,
    gradient:
      "linear-gradient(135deg, #f7c59f 0%, #e8a87c 30%, #d4856a 60%, #c9768f 100%)",
    description:
      "Built for competitive programmers",
    height: 340,
  },
]

type TiltState = {
  id: string
  rotateX: number
  rotateY: number
}

function ProjectCard({
  project,
  isHovered,
  isDimmed,
  tilt,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  isHovered: boolean
  isDimmed: boolean
  tilt: TiltState | null
  onPointerMove: (event: PointerEvent<HTMLDivElement>, id: string) => void
  onPointerEnter: (id: string) => void
  onPointerLeave: () => void
}) {
  const rotateX = tilt?.id === project.id ? tilt.rotateX : 0
  const rotateY = tilt?.id === project.id ? tilt.rotateY : 0
  const hasRichMedia = Boolean(project.video || project.image)
  const hasComponentBackground =
    project.gradient !== undefined && !isCssGradient(project.gradient)
  const cssBackground =
    isCssGradient(project.gradient) && !hasRichMedia
      ? project.gradient
      : undefined
  const popoutPanels = [
    {
      className:
        "right-8 top-8 h-20 w-28 [transform:translateZ(0)_translate3d(0,0,0)_rotate(0deg)_scale(.82)] group-hover:[transform:translateZ(80px)_translate3d(-18px,-28px,0)_rotate(-8deg)_scale(1)]",
      delay: 40,
    },
    {
      className:
        "right-12 bottom-20 h-24 w-32 [transform:translateZ(0)_translate3d(0,0,0)_rotate(0deg)_scale(.8)] group-hover:[transform:translateZ(96px)_translate3d(32px,-36px,0)_rotate(6deg)_scale(1)]",
      delay: 75,
    },
    {
      className:
        "left-10 top-12 h-16 w-24 [transform:translateZ(0)_translate3d(0,0,0)_rotate(0deg)_scale(.84)] group-hover:[transform:translateZ(70px)_translate3d(-24px,-20px,0)_rotate(-10deg)_scale(1)]",
      delay: 110,
    },
  ]
  const popoutItems = popoutPanels.map((panel, index) => ({
    ...panel,
    image: project.popoutImages?.[index],
  }))
  const getPopoutSizeClass = (image?: ProjectPopoutImage) => {
    if (!image) return ""
    return image.className ?? popoutSizeClasses[image.size ?? "default"]
  }
  return (
    <div
      data-cursor-label="View Project"
      className={`group relative z-0 cursor-pointer transition-[filter,opacity,transform] duration-300 [perspective:1100px] hover:z-30 ${
        isDimmed ? "scale-[0.992] opacity-55 blur-[1.25px]" : ""
      }`}
      onPointerEnter={() => onPointerEnter(project.id)}
      onPointerMove={(event) => onPointerMove(event, project.id)}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="relative overflow-visible rounded-[2px] transition-[transform,box-shadow,filter] duration-400 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{
          height: project.height,
          transform: isHovered
            ? `rotateX(${rotateX * 0.55}deg) rotateY(${rotateY * 0.55}deg) translateY(-12px) translateZ(44px) scale(1.025)`
            : "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
          boxShadow: isHovered
            ? "0 24px 52px rgba(17, 17, 17, 0.18), 0 8px 18px rgba(17, 17, 17, 0.10)"
            : "0 0 0 rgba(17, 17, 17, 0)",
        }}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[2px]">
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: isHovered
                ? "translateZ(28px) scale(1.035)"
                : "translateZ(0) scale(1)",
              background: cssBackground,
            }}
          >
            {hasComponentBackground ? (
              <div className="absolute inset-0 z-0">{project.gradient}</div>
            ) : null}
            {project.video ? (
              <video
                src={project.video}
                poster={project.poster}
                className={`h-full w-full object-cover object-top ${
                  hasComponentBackground ? "relative z-10" : ""
                }`}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={`${project.title} preview`}
              />
            ) : project.image ? (
              hasComponentBackground ? (
                <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
                  <ImageWithFallback
                    src={project.image}
                    alt={`${project.title} interface`}
                    className="max-h-[72%] max-w-[82%] object-contain mix-blend-screen"
                  />
                </div>
              ) : (
                <ImageWithFallback
                  src={project.image}
                  alt={`${project.title} interface`}
                  className="h-full w-full object-cover object-top"
                />
              )
            ) : null}
          </div>

          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              hasRichMedia || hasComponentBackground
                ? "bg-gradient-to-t from-black/25 via-transparent to-transparent"
                : ""
            }`}
            style={{ transform: "translateZ(44px)" }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-20 [transform-style:preserve-3d]">
          {popoutItems.map((panel, index) => (
            <div
              key={index}
              className={`absolute overflow-hidden rounded-[7px] border border-white/70 bg-white/90 opacity-0 shadow-[0_18px_38px_rgba(17,17,17,0.20),0_6px_14px_rgba(17,17,17,0.12)] drop-shadow-lg backdrop-blur-sm transition-[opacity,transform,filter] duration-400 ease-out group-hover:opacity-100 ${panel.className} ${getPopoutSizeClass(panel.image)}`}
              style={{ transitionDelay: `${panel.delay}ms` }}
            >
              {panel.image ? (
                <ImageWithFallback
                  src={panel.image.src}
                  alt={
                    panel.image.alt ??
                    `${project.title} popout preview ${index + 1}`
                  }
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: panel.image.objectPosition ?? "center",
                  }}
                />
              ) : (
                <>
                  <div
                    className="h-5 rounded-t-[6px]"
                    style={{
                      background: isCssGradient(project.gradient)
                        ? project.gradient
                        : defaultGradient,
                    }}
                  />
                  <div className="space-y-2 p-3">
                    <div className="h-1.5 w-16 rounded-full bg-[#111]/80" />
                    <div className="h-1.5 w-20 rounded-full bg-[#111]/18" />
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      <div className="h-7 rounded-[4px] bg-[#111]/10" />
                      <div className="h-7 rounded-[4px] bg-[#111]/20" />
                      <div className="h-7 rounded-[4px] bg-[#111]/10" />
                    </div>
                  </div>
                </>
              )}
              <div className="pointer-events-none absolute inset-0 rounded-[7px] ring-1 ring-white/40" />
              <div className="pointer-events-none absolute -bottom-3 left-4 right-4 h-4 rounded-full bg-black/20 blur-lg" />
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-40 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            transform: "translateZ(74px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.14), transparent 34%, rgba(255,255,255,0.05) 62%, transparent)",
          }}
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-6">
        <h2 className="text-[20px] font-medium leading-tight tracking-tight text-[#111] md:text-[22px]">
          {project.displayTitle}
        </h2>
        <p className="max-w-[56%] text-right text-[13px] leading-relaxed text-[#666]">
          {project.description}
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState("WORK")
  const [timelineMode, setTimelineMode] = useState<"experience" | "leadership">(
    "experience",
  )
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [tilt, setTilt] = useState<TiltState | null>(null)
  const isProjectFocused = hoveredProject !== null
  const showLeadership = timelineMode === "leadership"

  const handleProjectPointerMove = (
    event: PointerEvent<HTMLDivElement>,
    id: string,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    setTilt({
      id,
      rotateX: y * -6,
      rotateY: x * 6,
    })
  }

  const clearProjectHover = () => {
    setHoveredProject(null)
    setTilt(null)
  }

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e8e8e8]">
        <nav className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#111]">
              Ethan Chao
            </span>
            <span className="text-[#ccc]">|</span>
            <span className="text-[10px] tracking-wider uppercase text-[#888] font-medium">
              Software Engineering + Health Infomatics @ UC Irvine
            </span>
          </div>

          <div className="flex items-center gap-7">
            {["WORK", "ABOUT ME"].map((item) => (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className="text-[11px] tracking-widest font-medium transition-colors"
                style={{ color: activeNav === item ? "#e05a28" : "#888" }}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="pt-12">
        <section className="max-w-[1200px] mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: headline */}
          <div>
            <h1 className="text-[42px] lg:text-[54px] leading-[1.1] font-light text-[#111] tracking-tight">
              I'm Ethan, a software
              <br />
              engineer who{" "}
              <em
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                }}
                className="font-normal"
              >
                leads.
              </em>
            </h1>
          </div>

          {/* Right: experience timeline */}
          <div className="pt-2">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="relative flex rounded-full border border-[#e8e8e8] bg-[#f7f7f7] p-1">
                <span
                  className="absolute bottom-1 top-1 rounded-full bg-white shadow-[0_3px_10px_rgba(17,17,17,0.08)] transition-transform duration-300 ease-out"
                  style={{
                    left: 4,
                    width: "calc(50% - 4px)",
                    transform:
                      timelineMode === "leadership"
                        ? "translateX(100%)"
                        : "translateX(0)",
                  }}
                />
                {[
                  ["experience", "Experience"],
                  ["leadership", "Leadership"],
                ].map(([mode, label]) => (
                  <button
                    key={mode}
                    onClick={() =>
                      setTimelineMode(mode as "experience" | "leadership")
                    }
                    className="relative z-10 min-w-24 rounded-full px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition-colors"
                    style={{
                      color: timelineMode === mode ? "#e05a28" : "#888",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="w-2 h-2 rounded-full bg-[#e05a28]" />
            </div>
            <div className="w-full overflow-hidden">
              {timelineRows.map((exp) => {
                const isHiddenLeadership =
                  exp.leadershipOnly && !showLeadership

                return (
                  <div
                    key={`${exp.company}-${exp.role}-${exp.year}`}
                    className={`group overflow-hidden border-t transition-[max-height,opacity,transform,border-color,background-color] duration-500 ease-out hover:bg-[#fafafa] ${
                      exp.leadershipOnly
                        ? "border-[#f1d8cf] bg-[#fffaf8]"
                        : "border-[#e8e8e8]"
                    }`}
                    style={{
                      maxHeight: isHiddenLeadership ? 0 : 52,
                      opacity: isHiddenLeadership ? 0 : 1,
                      transform: isHiddenLeadership
                        ? "translateX(42px)"
                        : "translateX(0)",
                      transitionDelay:
                        showLeadership && exp.leadershipOnly
                          ? `${exp.delay ?? 0}ms`
                          : "0ms",
                    }}
                  >
                    <div className="grid grid-cols-[48px_minmax(150px,190px)_1fr] items-center py-3 pr-4">
                      <span className="text-[11px] font-medium text-[#888]">
                        {exp.year}
                      </span>
                      <span className="flex items-center gap-2 pr-8 text-[13px] font-semibold text-[#111]">
                        {exp.company}
                        {exp.leadershipOnly ? (
                          <span className="rounded-full bg-[#e05a28]/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-widest text-[#e05a28]">
                            Lead
                          </span>
                        ) : null}
                      </span>
                      <span className="text-[12px] text-[#666]">
                        {exp.role}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="max-w-[1200px] mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHovered={hoveredProject === project.id}
                isDimmed={isProjectFocused && hoveredProject !== project.id}
                tilt={tilt}
                onPointerEnter={setHoveredProject}
                onPointerMove={handleProjectPointerMove}
                onPointerLeave={clearProjectHover}
              />
            ))}
          </div>
        </section>

        {/* About strip */}
        <section className="border-t border-[#e8e8e8] max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[10px] tracking-widest font-semibold text-[#888] uppercase mb-4">
                About
              </h3>
              <p className="text-[14px] leading-relaxed text-[#444]">
                I'm a developer who writes production code — equally comfortable
                in Figma and a TypeScript codebase. I care about the details
                that make software feel inevitable.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] tracking-widest font-semibold text-[#888] uppercase mb-4">
                Currently
              </h3>
              <p className="text-[14px] leading-relaxed text-[#444]">
                Building an OCR + RAG pipelines at{" "}
                <strong className="text-[#111] font-medium">Pfizer</strong>.
                While leading project teams at UC Irvine
              </p>
            </div>
            <div>
              <h3 className="text-[10px] tracking-widest font-semibold text-[#888] uppercase mb-4">
                Links
              </h3>
              <div className="flex flex-col gap-2">
                {["LinkedIn", "GitHub", "Resume"].map((link) => (
                  <button
                    key={link}
                    className="text-[13px] text-[#111] text-left hover:text-[#e05a28] transition-colors flex items-center gap-1.5 group/link"
                  >
                    <span className="text-[#ccc] group-hover/link:text-[#e05a28] transition-colors">
                      →
                    </span>
                    {link}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#e8e8e8] max-w-[1200px] mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-[10px] tracking-widest text-[#888] uppercase">
            Ethan Chao © 2026
          </span>
          <span className="text-[10px] tracking-widest text-[#888] uppercase">
            Product + Software Engineer
          </span>
        </footer>
      </main>
    </div>
  )
}
