import { useState } from "react"
import type { PointerEvent } from "react"
import heroImage from "@/imports/image.png"
import projectImage from "@/imports/image-1.png"
import { ImageWithFallback } from "@/components/ImageWithFallback"

const experience = [
  { year: "2026", company: "Pfizer", role: "Software Engineering Extern" },
  { year: "2026", company: "ZotMeet", role: "Lead Software Engineer" },
  {
    year: "2025",
    company: "FUSION Engineering",
    role: "Lead Software Engineer",
  },
  { year: "2025", company: "AntAlmanac", role: "Software Engineer" },
]

const projects = [
  {
    id: "openai",
    title: "OpenAI x Hardware",
    displayTitle: "OpenAI x Hardware",
    tags: ["Product Design", "Prototyping"],
    gradient:
      "linear-gradient(135deg, #f7c59f 0%, #e8a87c 30%, #d4856a 60%, #c9768f 100%)",
    description:
      "Exploring the intersection of AI and physical computing — designing interactions that feel natural across hardware form factors.",
    height: 340,
  },
  {
    id: "chess",
    title: "GTO Chess Strategy Tool",
    displayTitle: "GTO Strategy Tool",
    tags: ["Product Design", "Engineering"],
    gradient: "linear-gradient(135deg, #e8f4fd 0%, #c9e8f8 50%, #a8d5f0 100%)",
    description:
      "A chess analysis interface that breaks down GTO vs exploitative strategy for any given position.",
    isLight: true,
    image: projectImage,
    height: 340,
  },
  {
    id: "bloomberg",
    title: "Bloomberg Terminal UX",
    displayTitle: "Terminal UX Redesign",
    eyebrow: "Bloomberg",
    tags: ["UX Research", "Interface Design"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    description:
      "Redesigning complex financial data workflows for the Bloomberg Terminal professional audience.",
    height: 260,
  },
  {
    id: "1password",
    title: "1Password Onboarding",
    displayTitle: "Onboarding Redesign",
    eyebrow: "1Password",
    tags: ["Product Design", "Mobile"],
    gradient: "linear-gradient(135deg, #f0f7ff 0%, #d6eaff 50%, #b8d4ff 100%)",
    description:
      "Streamlining the new-user experience to reduce time-to-value for enterprise password management.",
    isLight: true,
    height: 260,
  },
]

type Project = typeof projects[number]

type TiltState = {
  id: string
  rotateX: number
  rotateY: number
}

function ProjectCard({
  project,
  isHovered,
  tilt,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project
  isHovered: boolean
  tilt: TiltState | null
  onPointerMove: (event: PointerEvent<HTMLDivElement>, id: string) => void
  onPointerEnter: (id: string) => void
  onPointerLeave: () => void
}) {
  const rotateX = tilt?.id === project.id ? tilt.rotateX : 0
  const rotateY = tilt?.id === project.id ? tilt.rotateY : 0
  const textColor = project.isLight ? "text-[#111]" : "text-white"
  const eyebrowColor = project.isLight ? "text-[#888]" : "text-white/50"
  const ctaClass = project.isLight
    ? "text-[#111] border-black/20 bg-white/60"
    : "text-white border-white/50 bg-white/15"

  return (
    <div
      className="group relative cursor-pointer [perspective:1100px]"
      style={{ height: project.height }}
      onPointerEnter={() => onPointerEnter(project.id)}
      onPointerMove={(event) => onPointerMove(event, project.id)}
      onPointerLeave={onPointerLeave}
    >
      <div
        className="relative h-full overflow-hidden rounded-[2px] transition-[transform,box-shadow,filter] duration-300 ease-out will-change-transform [transform-style:preserve-3d]"
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.015)`
            : "rotateX(0deg) rotateY(0deg) translateY(0) scale(1)",
          boxShadow: isHovered
            ? "0 30px 70px rgba(17, 17, 17, 0.22), 0 10px 24px rgba(17, 17, 17, 0.12)"
            : "0 0 0 rgba(17, 17, 17, 0)",
        }}
      >
        <div
          className="absolute inset-0 transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: isHovered
              ? "translateZ(38px) scale(1.055)"
              : "translateZ(0) scale(1)",
            background: project.image ? undefined : project.gradient,
          }}
        >
          {project.image ? (
            <ImageWithFallback
              src={project.image}
              alt={`${project.title} interface`}
              className="h-full w-full object-cover object-top"
            />
          ) : null}
        </div>

        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            project.image
              ? "bg-gradient-to-t from-black/35 via-transparent to-transparent"
              : ""
          }`}
          style={{ transform: "translateZ(44px)" }}
        />

        <div
          className="absolute inset-0 flex flex-col justify-end p-8 transition-transform duration-300 ease-out"
          style={{
            transform: isHovered ? "translateZ(72px)" : "translateZ(22px)",
          }}
        >
          <div
            className={`absolute right-5 top-5 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-widest opacity-0 backdrop-blur-md transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 ${ctaClass}`}
            style={{
              transform: isHovered
                ? "translateZ(28px) translateY(0)"
                : "translateZ(0) translateY(6px)",
            }}
          >
            <span className="text-[8px]">⊙</span> VIEW CASE STUDY
          </div>

          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: isHovered
                ? "translateZ(26px) translateY(-2px)"
                : "translateZ(0)",
            }}
          >
            {project.eyebrow ? (
              <span
                className={`mb-2 block text-[10px] font-medium uppercase tracking-widest ${eyebrowColor}`}
              >
                {project.eyebrow}
              </span>
            ) : null}
            <h2
              className={`text-[22px] font-light tracking-tight ${textColor}`}
            >
              {project.displayTitle}
            </h2>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 rounded-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            transform: "translateZ(90px)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.24), transparent 34%, rgba(255,255,255,0.08) 62%, transparent)",
          }}
        />
      </div>
    </div>
  )
}

export default function App() {
  const [activeNav, setActiveNav] = useState("WORK")
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [tilt, setTilt] = useState<TiltState | null>(null)

  const handleProjectPointerMove = (
    event: PointerEvent<HTMLDivElement>,
    id: string,
  ) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    setTilt({
      id,
      rotateX: y * -10,
      rotateY: x * 10,
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
              Product + Software Engineering
            </span>
          </div>

          <div className="flex items-center gap-7">
            {["WORK", "FUN", "ABOUT", "RESUME"].map((item) => (
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
            <div className="flex justify-end mb-6">
              <div className="w-2 h-2 rounded-full bg-[#e05a28]" />
            </div>
            <table className="w-full">
              <tbody>
                {experience.map((exp, i) => (
                  <tr
                    key={i}
                    className="group border-t border-[#e8e8e8] hover:bg-[#fafafa] transition-colors"
                  >
                    <td className="py-3 pr-6 text-[11px] text-[#888] font-medium w-12">
                      {exp.year}
                    </td>
                    <td className="py-3 pr-8 text-[13px] font-semibold text-[#111] w-40">
                      {exp.company}
                    </td>
                    <td className="py-3 text-[12px] text-[#666]">{exp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
