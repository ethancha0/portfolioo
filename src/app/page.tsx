"use client"

import { useState } from "react"
import type { PointerEvent, ReactNode } from "react"
//import interviewmeVideo from "@/imports/interviewme.mov"
import pfizerImage from "@/imports/pfizer.png"
import { ImageWithFallback } from "@/components/ImageWithFallback"
// Re-enable together with <ExperienceTimeline /> below
//import { ExperienceTimeline } from "@/components/home/ExperienceTimeline"
import { ClayFrame } from "@/components/clay"
import zotmeet from "@/imports/zotmeet.png"
//import zotmeeticon from "@/imports/icons/zotmeet.png"
//import linkedin from "@/imports/icons/linkedin.png"
import { ZotMeetGrainient } from "@/components/ZotMeetGrainient"
import { SiteShell } from "@/components/SiteRail"
import fretlyPlayer from "@/imports/fretly/player.mov"
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
  /** CSS aspect-ratio for the media frame, e.g. `"1902 / 1066"`. Wins over `height`. */
  aspectRatio?: string
  isLight?: boolean
  gradient?: string | ReactNode
  /** Static CSS paint under `gradient`, so the card still reads when WebGL is unavailable. */
  fallbackBackground?: string
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
      y: 70,
      maxWidth: 92,
      maxHeight: 86,
    },
    gradient: (
      <div style={{ width: "2080px", height: "1080px", position: "relative" }}>
        <ZotMeetGrainient />
      </div>
    ),
    fallbackBackground:
      "linear-gradient(135deg, #f16486 0%, #f07e9b 45%, #f5bfcc 100%)",
    link: "/zotmeet",
    eyebrow: "Lead Product + Softare Engineer",
    tags: ["Founding Engineer", "Lead"],
    description: "Campus Scheduler for 11,000+ UCI Students",
    meta: "ZotMeet · Since Oct. 2025",
    height: 400,
  },

  {
    id: "fretly",
    title: "Fretly",
    displayTitle: "Fretly",
    tags: ["Shipped Product"],
    video: fretlyPlayer,
    aspectRatio: "1902 / 1066",
    link: "/fretly",
    eyebrow: "Personal Project",
    description: "Guitar practice, gamified",
    meta: "Fretly · Shipped 2026",
    height: 400,
  },


  {
    id: "pfizer",
    title: "Pfizer",
    displayTitle: "Pfizer",
    tags: ["Extern"],
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

/** Alternating split so card placement is explicit, not left to column balancing. */
const projectColumns = [
  projects.filter((_, index) => index % 2 === 0),
  projects.filter((_, index) => index % 2 === 1),
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
  height,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  isHovered: boolean
  isDimmed: boolean
  link?: string
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
            ...(project.aspectRatio
              ? { aspectRatio: project.aspectRatio }
              : { height: height ?? project.height }),
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

            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform:
                    ENABLE_PROJECT_3D && isHovered
                      ? "translateZ(28px) scale(1.035)"
                      : "none",
                  background:
                    cssBackground ??
                    containedImageFill ??
                    project.fallbackBackground,
                }}
              >
                {hasComponentBackground ? (
                  <div className="absolute inset-0 z-0">{project.gradient}</div>
                ) : null}
                {project.video ? (
                  <video
                    src={project.video}
                    poster={project.poster}
                    className={`h-full w-full object-contain object-center ${
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

        <div className="mt-5">
          <h3
            className="text-[24px] leading-tight tracking-[-0.01em] text-[#1f1a16] sm:text-[27px]"
            style={{ fontFamily: "var(--font-fraunces), Georgia, serif" }}
          >
            {project.displayTitle}
          </h3>
          <p className="mt-3 max-w-[34ch] text-[15px] leading-[1.55] text-[#4a443d] sm:text-[16px]">
            {project.description}
          </p>
          {project.tags.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className=" border border-[#d8d4cb] px-3 py-1.5 text-[12.5px] text-[#5c564d] transition-colors group-hover:border-[#bdb7ab]"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [tilt, setTilt] = useState<TiltState | null>(null)
  const isProjectFocused = hoveredProject !== null

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
    <SiteShell>
        <main className="px-6 pb-24 pt-14 sm:px-10 lg:px-16 lg:pt-20">
            {/* Projects */}
            <section id="work" className="scroll-mt-16">
              <h2 className="sr-only">Featured work</h2>
              <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
                {projectColumns.map((column, columnIndex) => (
                  <div key={columnIndex} className="flex flex-col">
                    {column.map((project) => (
                      <div key={project.id} className="mb-16">
                        <ProjectCard
                          project={project}
                          link={project.link}
                          height={project.aspectRatio ? undefined : 360}
                          isHovered={hoveredProject === project.id}
                          isDimmed={
                            isProjectFocused && hoveredProject !== project.id
                          }
                          tilt={tilt}
                          onPointerEnter={setHoveredProject}
                          onPointerMove={handleProjectPointerMove}
                          onPointerLeave={clearProjectHover}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* <ExperienceTimeline /> */}

            {/* About strip */}
            {/*
            <section
              id="about"
              className="mt-16 scroll-mt-16 border-t border-[#e4e1d9] pt-12"
            >
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-[#8a8378]">
                    About
                  </h3>
                  <p className="max-w-[46ch] text-[14px] leading-relaxed text-[#4a443d]">
                    I&apos;m a developer who writes production code — equally
                    comfortable in Figma and a TypeScript codebase. I care about
                    the details that make software feel inevitable.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-[#8a8378]">
                    Currently
                  </h3>
                  <p className="max-w-[46ch] text-[14px] leading-relaxed text-[#4a443d]">
                    Building OCR + RAG pipelines at{" "}
                    <strong className="font-medium text-[#1f1a16]">Pfizer</strong>
                    . While leading project teams at UC Irvine.
                  </p>
                </div>
              </div>
            </section>

            */}

            <footer className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-[#e4e1d9] pt-8">
              <span className="text-[10px] uppercase tracking-widest text-[#8a8378]">
                Ethan Chao © 2026
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#8a8378]">
                Product + Software Engineer
              </span>
            </footer>
          </main>
    </SiteShell>
  )
}


