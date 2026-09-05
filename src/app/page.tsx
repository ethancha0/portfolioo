"use client"

import { useState } from "react"
import type { PointerEvent, ReactNode } from "react"
//import interviewmeVideo from "@/imports/interviewme.mov"
import pfizerImage from "@/imports/pfizer.png"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { ClayButton, ClayFrame } from "@/components/clay"
import zotmeet from "@/imports/zotmeet.png"
//import zotmeeticon from "@/imports/icons/zotmeet.png"
//import linkedin from "@/imports/icons/linkedin.png"
import { ZotMeetGrainient } from "@/components/ZotMeetGrainient"
//import Image from "next/image"

type ProjectImageLayout = {
  scale?: number
  x?: number
  y?: number
  maxWidth?: number
  maxHeight?: number
}

type Project = {
  id: string
  title: string
  displayTitle: string
  link?: string
  eyebrow?: string
  tags: string[]
  description: string
  meta?: string
  height: number
  isLight?: boolean
  gradient?: string | ReactNode
  image?: string
  imageLayout?: ProjectImageLayout
  video?: string
  poster?: string
  popoutImages?: ProjectPopoutItem[]
}

type ProjectPopoutItem = {
  src: string
  type?: "image" | "video"
  alt?: string
  poster?: string
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

function isCssGradient(
  gradient: Project["gradient"],
): gradient is string {
  return typeof gradient === "string"
}

function isPopoutVideo(item: ProjectPopoutItem): boolean {
  if (item.type === "video") return true
  if (item.type === "image") return false
  return /\.(mov|mp4|webm|ogg)$/i.test(item.src)
}

type ExperienceRow = {
  /** Inclusive start month, "YYYY-MM" */
  start: string
  /** Exclusive end month, "YYYY-MM". Omit for ongoing. */
  end?: string
  company: string
  role: string
  link?: string
}

// Dummy data — replace with real entries. Dates are month-precision ("YYYY-MM").
const experience: ExperienceRow[] = [
  {
    start: "2025-10",
    company: "ZotMeet",
    role: "Lead Software Engineer",
    link: "/zotmeet"
  },
  { 
    start: "2026-06",
    end: "2026-09",
    company: "Pfizer", 
    role: "AI Extern" ,
    link: "/pfizer"
  },
  {
    start: "2026-05",
    company: "ICS Student Council",
    role: "Technical Director",
  },
]

const MONTH_ABBR = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
]

/** Months since year 0 for a "YYYY-MM" string. */
function monthIndex(value: string): number {
  const [year, month] = value.split("-").map(Number)
  return year * 12 + (month - 1)
}

function currentMonthIndex(): number {
  const now = new Date()
  return now.getFullYear() * 12 + now.getMonth()
}

/** "4 mos", "1y", "1y 8m" */
function formatDuration(months: number): string {
  const span = Math.max(1, months)
  const years = Math.floor(span / 12)
  const rem = span % 12
  if (years === 0) return `${rem} mon.`
  if (rem === 0) return `${years}y`
  return `${years}y ${rem}m`
}

/** "SEP 2024" */
function formatAxisLabel(index: number): string {
  return `${MONTH_ABBR[index % 12]} ${Math.floor(index / 12)}`
}

/** Temporary: flat 2D project cards — set true to restore popouts + tilt */
const ENABLE_PROJECT_3D = false

const projects: Project[] = [
  {
    id: "ZotMeet",
    title: "ZotMeet",
    displayTitle: "ZotMeet",
    image: zotmeet,
    imageLayout: {
      scale: 1.3,
      x: 0,
      y: 60,
      maxWidth: 92,
      maxHeight: 86,
    },
    gradient: (
      <div style={{ width: "2080px", height: "1080px", position: "relative" }}>
        <ZotMeetGrainient />
      </div>
    ),
    link: "/zotmeet",
    eyebrow: "Lead Product + Softare Engineer",
    tags: ["Product Engineering"],
    description: "Spearheaded & scaled development for UCI's scheduler",
    meta: "ZotMeet · UC Irvine",
    height: 400,
  },
  {
    id: "pfizer",
    title: "Pfizer",
    displayTitle: "Pfizer",
    tags: ["Externship", "Engineering"],
    image: pfizerImage,
    imageLayout: {
      scale: 1,
      x: 0,
      y: 0,
      maxWidth: 80,
      maxHeight: 86,
    },
    link: "/pfizer",
    /* gradient: ( 
      <div style={{ width: "2080px", height: "1080px", position: "relative" }}>
        <Grainient
          color1="#4d4244"
          color2="#21211e"
          color3="#121009"
          timeSpeed={1}
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
      </div> 
    ),
    */
    description: "Building OCR + RAG pipelines",
    meta: "Pfizer · Externship 2025",
    isLight: true,
    height: 400,
  },
  /*
  {
    id: "InterviewMe",
    title: "InterviewMe",
    displayTitle: "InterviewMe",
    eyebrow: "Project",
    tags: ["Personal Project", ""],
    video: interviewmeVideo,
    gradient:
      "linear-gradient(135deg, #f7c59f 0%, #e8a87c 30%, #d4856a 60%, #c9768f 100%)",
    description: "Built for competitive programmers",
    height: 360,
  },
  */
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
  link,
  colorIndex = 0,
  height,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  isHovered: boolean
  isDimmed: boolean
  link?: string
  colorIndex?: number
  height?: number
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
  const useContainedImage = Boolean(project.imageLayout) || hasComponentBackground
  const cssBackground =
    isCssGradient(project.gradient) && !hasRichMedia
      ? project.gradient
      : undefined
  // Soft cream fill when a logo is centered without a grainient backdrop
  const containedImageFill =
    useContainedImage && !hasComponentBackground && !cssBackground
      ? "#f7f2ea"
      : undefined
  const imageLayout = project.imageLayout ?? {}
  const imageScale = imageLayout.scale ?? 0.82
  const imageX = imageLayout.x ?? 0
  const imageY = imageLayout.y ?? 0
  const imageMaxWidth = imageLayout.maxWidth ?? 82
  const imageMaxHeight = imageLayout.maxHeight ?? 72
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
  ] as const
  const popoutItems = (project.popoutImages ?? []).slice(0, 3).map((media, index) => ({
    ...popoutPanels[index],
    media,
  }))
  const getPopoutSizeClass = (media: ProjectPopoutItem) => {
    return media.className ?? popoutSizeClasses[media.size ?? "default"]
  }
  return (
    <a
      href={link}
      data-umami-event={
        link ? `View project: ${project.title}` : `Project: ${project.title}`
      }
      data-umami-event-project={project.id}
      data-umami-event-location="home-work"
    >
      <div
        data-cursor-label="View Project"
        className={`group relative z-0 cursor-pointer transition-[filter,opacity,transform] duration-300 hover:z-30 ${
          ENABLE_PROJECT_3D ? "[perspective:1100px]" : ""
        } ${isDimmed ? "scale-[0.992] opacity-55 blur-[1.25px]" : ""}`}
        onPointerEnter={() => onPointerEnter(project.id)}
        onPointerMove={(event) => onPointerMove(event, project.id)}
        onPointerLeave={onPointerLeave}
      >
        <div
          className={`relative rounded-[26px] transition-[transform,box-shadow,filter] duration-400 ease-out will-change-transform ${
            ENABLE_PROJECT_3D
              ? "overflow-visible [transform-style:preserve-3d]"
              : "overflow-visible"
          }`}
          style={{
            height: height ?? project.height,
            transform: isHovered
              ? ENABLE_PROJECT_3D
                ? `rotateX(${rotateX * 0.55}deg) rotateY(${rotateY * 0.55}deg) translateY(-12px) translateZ(44px) scale(1.025)`
                : "translateY(-6px)"
              : "none",
            boxShadow: isHovered
              ? "0 24px 52px rgba(17, 17, 17, 0.18), 0 8px 18px rgba(17, 17, 17, 0.10)"
              : "0 0 0 rgba(17, 17, 17, 0)",
          }}
        >
          <ClayFrame
            colorIndex={colorIndex}
            thickness={6}
            rounded="xl"
            className="absolute inset-0 h-full w-full"
            innerClassName="!bg-transparent"
            shadow={!isHovered}
            animate={ENABLE_PROJECT_3D}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform:
                    ENABLE_PROJECT_3D && isHovered
                      ? "translateZ(28px) scale(1.035)"
                      : "none",
                  background: cssBackground ?? containedImageFill,
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
                  useContainedImage ? (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
                      <ImageWithFallback
                        src={project.image}
                        alt={`${project.title} interface`}
                        className="object-contain"
                        style={{
                          maxWidth: `${imageMaxWidth}%`,
                          maxHeight: `${imageMaxHeight}%`,
                          transform: `translate(${imageX}px, ${imageY}px) scale(${imageScale})`,
                          transformOrigin: "center center",
                        }}
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
                  hasRichMedia && !useContainedImage
                    ? "bg-gradient-to-t from-black/25 via-transparent to-transparent"
                    : ""
                }`}
                style={
                  ENABLE_PROJECT_3D ? { transform: "translateZ(44px)" } : undefined
                }
              />
            </div>
          </ClayFrame>

          {ENABLE_PROJECT_3D ? (
            <div className="pointer-events-none absolute inset-0 z-20 [transform-style:preserve-3d]">
              {popoutItems.map((panel, index) => (
                <div
                  key={`${panel.media.src}-${index}`}
                  className={`absolute opacity-0 transition-[opacity,transform,filter] duration-400 ease-out group-hover:opacity-100 ${panel.className} ${getPopoutSizeClass(panel.media)}`}
                  style={{ transitionDelay: `${panel.delay}ms` }}
                >
                  <ClayFrame
                    color="chocolate"
                    thickness={4}
                    rounded="md"
                    className="h-full w-full"
                  >
                    {isPopoutVideo(panel.media) ? (
                      <video
                        src={panel.media.src}
                        poster={panel.media.poster}
                        className="h-full w-full object-cover"
                        style={{
                          objectPosition: panel.media.objectPosition ?? "center",
                        }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={
                          panel.media.alt ??
                          `${project.title} popout preview ${index + 1}`
                        }
                      />
                    ) : (
                      <ImageWithFallback
                        src={panel.media.src}
                        alt={
                          panel.media.alt ??
                          `${project.title} popout preview ${index + 1}`
                        }
                        className="h-full w-full object-cover"
                        style={{
                          objectPosition: panel.media.objectPosition ?? "center",
                        }}
                      />
                    )}
                  </ClayFrame>
                  <div className="pointer-events-none absolute -bottom-3 left-4 right-4 h-4 rounded-full bg-black/20 blur-lg" />
                </div>
              ))}
            </div>
          ) : null}

          <div
            className="pointer-events-none absolute inset-0 z-40 rounded-[26px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              transform: ENABLE_PROJECT_3D ? "translateZ(74px)" : undefined,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.14), transparent 34%, rgba(255,255,255,0.05) 62%, transparent)",
            }}
          />
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-6">
          <p
            className="text-[15px] leading-snug text-[#2a2320] sm:text-[16px]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {project.description}
          </p>
          <p
            className="whitespace-nowrap text-[10.5px] uppercase tracking-[0.14em] text-[#8a8378]"
            style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
          >
            {project.meta ?? project.displayTitle}
          </p>
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [tilt, setTilt] = useState<TiltState | null>(null)
  const isProjectFocused = hoveredProject !== null

  // Shared timeline axis for the experience table
  const nowIndex = currentMonthIndex()
  const timelineRows = experience.map((row) => {
    const startIdx = monthIndex(row.start)
    const endIdx = row.end ? monthIndex(row.end) : nowIndex
    return { ...row, startIdx, endIdx, ongoing: !row.end }
  })
  const axisStart = Math.min(...timelineRows.map((r) => r.startIdx))
  const axisEnd = Math.max(...timelineRows.map((r) => r.endIdx))
  const axisSpan = Math.max(1, axisEnd - axisStart)

  const handleProjectPointerMove = (
    event: PointerEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (!ENABLE_PROJECT_3D) return

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
    <div className="min-h-screen bg-[#f5f4f1] text-[#2a1f16]">
      <main>
        {/* Hero — editorial split composition */}
        <section className="relative flex min-h-[40svh] overflow-hidden pb-8 pt-40">
          {/* Soft atmosphere */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 30%, #fbfbf9 0%, #f5f4f1 55%, #eeece6 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
              backgroundSize: "180px",
            }}
          />

          <div className="relative z-10 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-x-6 gap-y-12 px-6 md:grid-cols-[1.05fr_0.95fr]">
            <h1
              className="max-w-[15ch] text-left text-[38px] leading-[1.06] tracking-[-0.02em] text-[#1f2a30] sm:text-[48px] md:text-[60px]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              I&apos;m Ethan, a software engineer who{" "}
              <em className="font-normal italic">builds teams</em>
              <span className="text-[#5c7a3d]">.</span>
            </h1>

            <div
              className="w-full text-[13px] leading-snug sm:text-[14px]"
              style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
            >
              <ul className="divide-y divide-[#e4e1d9]">
                {timelineRows.map((row, i) => {
                  const months = row.endIdx - row.startIdx
                  const left = ((row.startIdx - axisStart) / axisSpan) * 100
                  const width = Math.max(
                    2,
                    ((row.endIdx - row.startIdx) / axisSpan) * 100,
                  )
                  return (
                    <li key={i} className="py-4">
                      <div className="grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-8">
                        <span className="text-[#a8a294] whitespace-nowrap">
                          {formatDuration(months)}
                          {row.ongoing ? " +" : ""}
                        </span>
                        <a href ={row.link}><span className="text-[#2a2320]">{row.company}</span></a>
                        <span className="text-right text-[#8a8378]">
                          {row.role}
                        </span>
                      </div>
                      <div className="relative mt-3 h-[2px] w-full">
                        <div
                          className="absolute top-0 h-[2px] rounded-full bg-[#b3823a]"
                          style={{ left: `${left}%`, width: `${width}%` }}
                        />
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-3 flex justify-between text-[11px] uppercase tracking-[0.14em] text-[#a8a294]">
                <span>{formatAxisLabel(axisStart)}</span>
                <span>
                  {axisEnd >= nowIndex ? "NOW" : formatAxisLabel(axisEnd)}
                </span>
              </div>
            </div>
          </div>

        </section>

        {/* Projects */}
        <section
          id="work"
          className="mx-auto w-full max-w-[1200px] border-t border-[#e4e4e4] px-6 pb-24 pt-20"
        >
          <div className="mb-8">
            <h2
              className="text-[11px] uppercase tracking-[0.16em] text-[#8a8378]"
              style={{ fontFamily: "var(--font-mono), ui-monospace, monospace" }}
            >
              Featured Work
            </h2>
          </div>
          <div className="grid grid-cols-1 items-start gap-x-6 gap-y-14 md:grid-cols-[1.05fr_0.95fr]">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                link={project.link}
                colorIndex={index}
                height={index % 2 === 0 ? 360 : 440}
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
        <section
          id="about"
          className="mx-auto w-full max-w-[1200px] border-t border-[#e8e8e8] px-6 py-16"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-[10px] font-semibold tracking-widest text-[#888] uppercase">
                About
              </h3>
              <p className="text-[14px] leading-relaxed text-[#444]">
                I&apos;m a developer who writes production code — equally
                comfortable in Figma and a TypeScript codebase. I care about the
                details that make software feel inevitable.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-[10px] font-semibold tracking-widest text-[#888] uppercase">
                Currently
              </h3>
              <p className="text-[14px] leading-relaxed text-[#444]">
                Building OCR + RAG pipelines at{" "}
                <strong className="font-medium text-[#111]">Pfizer</strong>.
                While leading project teams at UC Irvine
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-[10px] font-semibold tracking-widest text-[#888] uppercase">
                Links
              </h3>
              <div className="flex flex-col gap-2.5">
                <ClayButton
                  href="https://www.linkedin.com/in/ethanchaoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  colorIndex={3}
                  variant="outline"
                  size="sm"
                  className="w-fit"
                  umamiEventData={{ location: "home-links" }}
                >
                  LinkedIn
                </ClayButton>
                <ClayButton
                  href="https://drive.google.com/file/d/15NfR6ZGFBNBexQ7rof6dPcIRoau7synD/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  colorIndex={0}
                  variant="outline"
                  size="sm"
                  className="w-fit"
                  umamiEventData={{ location: "home-links" }}
                >
                  Resume
                </ClayButton>
                <ClayButton
                  href="/about"
                  colorIndex={2}
                  variant="outline"
                  size="sm"
                  className="w-fit"
                  umamiEventData={{ location: "home-links" }}
                >
                  About
                </ClayButton>
              </div>
            </div>
          </div>
        </section>

        <footer className="mx-auto flex w-full max-w-[1200px] items-center justify-between border-t border-[#e8e8e8] px-6 py-8">
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
