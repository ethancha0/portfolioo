"use client"

import { useEffect, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react"
import { CaseStudyShell } from "@/components/casestudy/CaseStudyShell"
import { ClayButton, ClayFrame, clayColorNameAt } from "@/components/clay"
import { ImageWithFallback } from "@/components/ImageWithFallback"
import { ZotMeetGrainient } from "@/components/ZotMeetGrainient"
import { formatTimeline } from "@/lib/formatTimeline"
import zotmeet from "@/imports/zotmeet.png"
//import zotmeetMobile from "@/imports/zotmeet-mobile.png"
import roomrec from "@/imports/zotmeet/videos/room-rec.mp4"
import meeting from "@/imports/zotmeet/meeting.png"
import architecture from "@/imports/zotmeet/architecture.png"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "deployment", label: "Deployment & Infra" },
 // { id: "features", label: "Key Features" },
  { id: "impact", label: "Impact" },
]

const details = [
  { label: "Role", value: "Lead Product + Software Engineer" },
  { label: "Timeline", value: formatTimeline("Oct. 2025") },
  { label: "Team", value: "8 Engineers · 2 Designers · ICSSC" },
  { label: "Stack", value: "TypeScript · Next.js 16 · React 19 · Postgres · AWS" },
]

const stackGroups: { label: string; items: ReactNode[] }[] = [
  {
    label: "Language & Framework",
    items: ["TypeScript 5.6 (strict)", "Next.js 16 (App Router)", "React 19"],
  },
  {
    label: "Backend & Data",
    items: [
      "Next.js Server Actions — no separate API server, with a clean command/query split (writes vs. reads)",
      "PostgreSQL 16 + Drizzle ORM (17 versioned migrations)",
      "Integrations: UCI AnteaterAPI (study rooms) + Google Calendar API",
    ],
  },
  {
    label: "Authentication",
    items: [
      "Custom session auth — SHA-256 hashed tokens, 30-day sliding expiry",
      "OAuth via Arctic: Google / OIDC + Sign in with Apple",
      "Argon2 password hashing",
    ],
  },
  {
    label: "UI & State",
    items: [
      "Hybrid Material UI v7 + Tailwind CSS + shadcn / Radix primitives",
      "Zustand (state) · React Hook Form + Zod (typed forms)",
      "nuqs (URL state) · date-fns-tz (timezone-safe) · next-themes (dark mode)",
    ],
  },
  {
    label: "Tooling & Quality",
    items: [
      "pnpm workspace · Biome (lint + format)",
      "Husky + lint-staged + commitlint",
      "Enforced Conventional Commits",
    ],
  },
]

const infraGroups: { label: string; items: ReactNode[] }[] = [
  {
    label: "Infrastructure as Code",
    items: [
      "SST v3 → AWS (Lambda + CloudFront + Route 53), region us-west-1",
      "AWS SES for transactional email",
    ],
  },
  {
    label: "CI / CD",
    items: [
      "GitHub Actions, multi-stage (staging + production)",
      "Auto-runs DB migrations, then deploys on merge to main",
    ],
  },
  {
    label: "Cross-platform packaging",
    items: [
      "Dockerized local Postgres for development",
      "PWA + iOS via PWA Builder with a native Swift WKWebView wrapper + push notifications",
    ],
  },
]

const spotlightFeatures: {
  name: string
  blurb: string
  media: { label: string; kind?: "image" | "video"; ratio?: string; caption?: string }
}[] = [
  {
    name: "Availability polling",
    blurb:
      "A drag-to-paint time grid with a two-tier system — \u201Cavailable\u201D vs. \u201Cif needed\u201D — over fixed dates or recurring days of the week.",
    media: {
      label: "Add drag-to-paint grid demo",
      kind: "video",
      caption: "Showcase: painting availability across the time grid",
    },
  },
  {
    name: "Group availability heatmap",
    blurb:
      "A color-coded overlay showing exactly who's free when, so the best overlapping slot surfaces at a glance.",
    media: {
      label: "Add heatmap screenshot",
      caption: "Showcase: the live group availability heatmap",
    },
  },
  {
    name: "Google Calendar sync",
    blurb:
      "Overlays your real events on the grid to catch conflicts before you commit — plus one-click \u201Cadd to calendar\u201D for finalized meetings.",
    media: {
      label: "Add calendar sync clip",
      kind: "video",
      caption: "Showcase: conflicts surfacing from a synced calendar",
    },
  },
  {
    name: "UCI study-room search & recommendations",
    blurb:
      "Filter live campus rooms by time, location, capacity, and tech — and get suggestions tied to the meeting's chosen slot.",
    media: {
      label: "Add study-room search screenshot",
      caption: "Showcase: filtering and booking a real campus room",
    },
  },
]

const moreFeatures: { name: string; blurb: string }[] = [
  {
    name: "Guest participation",
    blurb:
      "Respond to a meeting without creating an account, via a members-vs-users identity model.",
  },
  {
    name: "Groups",
    blurb:
      "Create and manage groups with member / admin roles, invites, and auto-inviting members to new meetings.",
  },
  {
    name: "Invitations & nudges",
    blurb:
      "Shareable token links + email invites, response tracking, and a \u201Cnudge\u201D to prompt non-responders.",
  },
  {
    name: "Notifications",
    blurb: "An in-app notification center with per-type preferences.",
  },
  {
    name: "Cross-platform",
    blurb:
      "Installable PWA with offline support, plus a native iOS app with push notifications.",
  },
]

// Referenced by the temporarily commented Key Features section below
void spotlightFeatures
void moreFeatures

const impactPoints: ReactNode[] = [
  <>
    Shipped a production application serving the UC Irvine student community
    under an official campus organization (ICSSC), live at{" "}
    <a
      href="https://zotmeet.com"
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#8fad6e] underline decoration-[1.5px] underline-offset-2"
    >
      zotmeet.com
    </a>
    .
  </>,
  "Delivered one codebase to three platforms (web, PWA, and iOS App Store), maximizing reach without triplicating engineering effort.",
  "Built on a modern, cost-efficient serverless architecture (Next.js Server Actions + AWS Lambda / CloudFront via SST) that scales to zero and requires no server management.",
  "Automated the full release pipeline — CI/CD with staged deploys and zero-touch database migrations — enabling safe, frequent shipping.",
  "Integrated real university infrastructure (UCI AnteaterAPI room data + Google Calendar) to solve an actual student pain point, not a toy demo.",
]

const impactStats: { value: string; label: string }[] = [
  { value: "3", label: "Platforms shipped" },
  { value: "1", label: "Shared codebase" },
  { value: "11K+", label: "Active Users" },
  { value: "Live", label: "zotmeet.com" },
]

function MediaIcon({ kind }: { kind: "image" | "video" }) {
  if (kind === "video") {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M8 5.5v13l11-6.5-11-6.5z" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="10" r="1.6" />
      <path d="M21 16.5 15.5 11 6 19.5" />
    </svg>
  )
}

/**
 * Media slot for feature imagery or looping clips. Pass `src` for a real
 * asset; otherwise it renders a labelled placeholder that reserves space.
 * Videos autoplay muted, loop, and never show playback controls.
 * Images dim on hover and open a full-screen lightbox on click.
 */
function MediaSlot({
  label,
  caption,
  kind,
  ratio,
  fit = "cover",
  maxWidth,
  src,
  alt,
  colorIndex = 0,
}: {
  label?: string
  caption?: string
  kind?: "image" | "video"
  /** Aspect ratio box, e.g. `"16 / 9"`. Omit to use the media's natural size. */
  ratio?: string
  /** How media fills a fixed ratio box. Ignored when `ratio` is omitted. */
  fit?: "cover" | "contain"
  /** Caps the media width, e.g. `"420px"`, `"60%"`, or `480`. */
  maxWidth?: string | number
  src?: string
  alt?: string
  colorIndex?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const isVideo =
    kind === "video" ||
    (kind !== "image" && !!src && /\.(mov|mp4|webm|ogg)(\?|$)/i.test(src))
  const isExpandableImage = Boolean(src) && !isVideo
  const resolvedMaxWidth =
    maxWidth == null
      ? undefined
      : typeof maxWidth === "number"
        ? `${maxWidth}px`
        : maxWidth
  const resolvedRatio = ratio ?? (isVideo ? "16 / 9" : undefined)
  const objectFitClass = fit === "contain" ? "object-contain" : "object-cover"
  const clay = clayColorNameAt(colorIndex)

  useEffect(() => {
    if (!expanded) return
    const onKey = (event: Event) => {
      if ("key" in event && event.key === "Escape") setExpanded(false)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [expanded])

  return (
    <>
      <figure
        className={`my-2 ${resolvedMaxWidth ? "mx-auto w-full" : ""}`}
        style={resolvedMaxWidth ? { maxWidth: resolvedMaxWidth } : undefined}
      >
        <ClayFrame
          color={clay}
          thickness={5}
          rounded="xl"
          className={isExpandableImage ? "group cursor-pointer" : ""}
          style={resolvedRatio ? { aspectRatio: resolvedRatio } : undefined}
        >
          <div
            className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-[#faf6ef] to-[#efe6d6]"
            {...(isExpandableImage
              ? {
                  role: "button" as const,
                  tabIndex: 0,
                  "data-cursor-label": "View Image",
                  "aria-label": `View larger: ${alt ?? label ?? "image"}`,
                  onClick: () => setExpanded(true),
                  onKeyDown: (event: ReactKeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      setExpanded(true)
                    }
                  },
                }
              : {})}
          >
            {src ? (
              isVideo ? (
                <video
                  src={src}
                  className={`h-full w-full ${objectFitClass}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  disablePictureInPicture
                  preload="metadata"
                  aria-label={alt ?? label}
                />
              ) : (
                <>
                  <ImageWithFallback
                    src={src}
                    alt={alt ?? label ?? ""}
                    className={
                      resolvedRatio
                        ? `h-full w-full ${objectFitClass} transition-[filter,opacity] duration-300 group-hover:brightness-[0.82]`
                        : "h-auto w-full transition-[filter,opacity] duration-300 group-hover:brightness-[0.82]"
                    }
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/18" />
                </>
              )
            ) : (
              <div
                className="flex flex-col items-center gap-2.5 text-[#b5a894]"
                style={resolvedRatio ? undefined : { aspectRatio: "16 / 9" }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full border-[2.5px] border-[#c4b49a] bg-[#f7f2ea]/80">
                  <MediaIcon kind={isVideo ? "video" : "image"} />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                  {label}
                </span>
              </div>
            )}
          </div>
        </ClayFrame>
        {caption ? (
          <figcaption className="mt-3 text-[13px] italic leading-snug text-[#8f8578]">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {expanded && src && !isVideo ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2a1f16]/70 p-5 backdrop-blur-[2px] sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={alt ?? label ?? "Expanded image"}
          data-cursor-label="Close"
          onClick={() => setExpanded(false)}
        >
          <div
            className="max-h-full max-w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <ClayFrame
              color={clay}
              thickness={6}
              rounded="xl"
              animate={false}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt ?? label ?? ""}
                className="max-h-[85vh] max-w-full object-contain"
                draggable={false}
              />
            </ClayFrame>
          </div>
        </div>
      ) : null}
    </>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-[#e4ddd2] pt-14 first:border-t-0 first:pt-0">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a8f82]">
        {eyebrow}
      </p>
      <h2 className="mb-6 max-w-[620px] text-[26px] font-semibold leading-[1.18] tracking-tight text-[#2a1f16] md:text-[32px]">
        {title}
      </h2>
      {children}
    </section>
  )
}

function StackCard({
  label,
  items,
  colorIndex = 0,
}: {
  label: string
  items: ReactNode[]
  colorIndex?: number
}) {
  return (
    <ClayFrame
      colorIndex={colorIndex}
      thickness={4}
      rounded="xl"
      className="h-full"
      innerClassName="!bg-[#faf6ef]"
    >
      <div className="p-5">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8fad6e]">
          {label}
        </p>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex gap-2 text-[14px] leading-[1.55] text-[#4a3f34]"
            >
              <span className="mt-[9px] h-[3px] w-[3px] shrink-0 rounded-full bg-[#c4b49a]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </ClayFrame>
  )
}

const bodyText = "text-[16px] leading-[1.72] text-[#4a3f34] md:text-[17px]"

export default function Page() {
  return (
    <CaseStudyShell sections={sections} backHref="/" backLabel="Back">
      {/* Hero header */}
      <header>
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9a8f82]">
          ZotMeet · Shipped 2026
        </p>
        <h1 className="mb-5 max-w-[640px] text-[40px] font-semibold leading-[1.05] tracking-tight text-[#2a1f16] md:text-[54px]">
          Find the best time and place to meet
        </h1>
        <p className={`mb-8 max-w-[560px] ${bodyText}`}>
          A full-stack scheduler for UC Irvine — everyone paints their
          availability onto a shared grid, a live heatmap surfaces the best
          overlapping slot, and ZotMeet books a real campus study room for it.
        </p>
        <div className="flex flex-wrap gap-3">
          <ClayButton
            href="https://zotmeet.com"
            target="_blank"
            rel="noopener noreferrer"
            colorIndex={0}
            variant="solid"
            size="md"
            className="uppercase tracking-widest"
          >
            Live at zotmeet.com
            <span>&#8599;</span>
          </ClayButton>
          <ClayButton
            href="https://apps.apple.com/us/app/zotmeet/id6773529198"
            target="_blank"
            rel="noopener noreferrer"
            colorIndex={2}
            variant="outline"
            size="md"
            className="uppercase tracking-widest"
          >
            App Store!
            <span>&#8599;</span>
          </ClayButton>
        </div>

        {/* Hero visual */}
        <ClayFrame
          color="chocolate"
          thickness={6}
          rounded="2xl"
          className="relative mt-10 h-[240px] w-full md:h-[380px]"
          innerClassName="!bg-transparent"
        >
          <div className="absolute inset-0">
            <ZotMeetGrainient />
          </div>
          <div className="relative mt-12 flex h-full w-full items-center justify-center">
            <ImageWithFallback
              src={zotmeet}
              alt="ZotMeet app preview"
              className="max-h-[86%] max-w-[92%] object-contain drop-shadow-2xl"
            />
          </div>
        </ClayFrame>

        {/* Details grid */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[#e4ddd2] pt-8 md:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label}>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9a8f82]">
                {detail.label}
              </p>
              <p className="text-[13px] leading-[1.5] text-[#3d3228]">
                {detail.value}
              </p>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-16">
        {/* Overview */}
        <Section
          id="overview"
          eyebrow="Overview"
          title="A modern When2Meet, rebuilt for how UCI students actually meet"
        >
          <div className={`space-y-4 ${bodyText}`}>
            <p>
              ZotMeet is a full-stack meeting-scheduling web app (a modern
              When2Meet / Doodle) built for UC Irvine students. Users create a
              meeting, everyone &ldquo;paints&rdquo; their availability onto a
              shared time grid, and the app surfaces the best overlapping slot
              via a live availability heatmap.
            </p>
            <p>
              It layers in UCI-specific value: syncing your Google Calendar onto
              the grid to spot conflicts, and recommending / booking real campus
              study rooms for the chosen time.
            </p>
            <p>
              It ships as one codebase across three surfaces — a responsive web
              app, an installable PWA, and a native iOS App Store build — and is
              developed under UCI&apos;s ICS Student Council (ICSSC)
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-center">
            <MediaSlot
              src={meeting}
              alt="ZotMeet meeting availability grid"
              maxWidth={900}
              colorIndex={1}
            />
            <MediaSlot
              src={roomrec}
              kind="video"
              alt="ZotMeet across web and mobile"
              caption="Room Recommendations based on best available time slots"
              ratio="4/5"
              maxWidth={250}
              colorIndex={2}
            />
          </div>
        </Section>

        {/* Problem */}
        <Section
          id="problem"
          eyebrow="The Problem"
          title="Coordinating a time — and finding a room — was near impossible"
        >
          <div className={`space-y-4 ${bodyText}`}>
            <p>
              As a UCI student who loves coordinating study hangouts, I noticed
              how finding study rooms on campus and lining up a good time to meet
              was near impossible.
            </p>
            <p>
              Existing tools like When2Meet and Doodle solve the scheduling half,
              but nothing connects that chosen time to your real calendar or to
              an actual campus room. So people bounced between three apps and a
              group chat — and still ended up without a place to sit.
            </p>
            <p className="text-[#2a1f16]">Thus, ZotMeet was born.</p>
          </div>
        </Section>

        {/* Tech Stack */}
        <Section
          id="tech-stack"
          eyebrow="Tech Stack"
          title="TypeScript end-to-end, from Server Actions to the paint grid"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {stackGroups.map((group, i) => (
              <StackCard
                key={group.label}
                label={group.label}
                items={group.items}
                colorIndex={i}
              />
            ))}
          </div>
        </Section>

        {/* Deployment */}
        <Section
          id="deployment"
          eyebrow="Deployment & Infrastructure"
          title="Serverless on AWS, shipped by a zero-touch CI/CD pipeline"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {infraGroups.map((group, i) => (
              <StackCard
                key={group.label}
                label={group.label}
                items={group.items}
                colorIndex={i + 2}
              />
            ))}
          </div>
          <div className="mt-8">
            <MediaSlot
              src={architecture}
              label="ZotMeet Deployment Architecture"
              caption="ZotMeet Deployment Architecture"
              ratio="16 / 9"
              colorIndex={3}
            />
          </div>
        </Section>
        
        {/* Key Features — temporarily hidden
        <Section
          id="features"
          eyebrow="Key Features"
          title="Everything you need to lock in a meeting"
        >
          <div className="space-y-12">
            {spotlightFeatures.map((feature, index) => (
              <div key={feature.name}>
                <div className="mb-4 flex items-baseline gap-3">
                  <span className="text-[13px] font-semibold tabular-nums text-[#8fad6e]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[19px] font-semibold tracking-tight text-[#2a1f16] md:text-[21px]">
                    {feature.name}
                  </h3>
                </div>
                <p className={`mb-5 max-w-[600px] ${bodyText}`}>{feature.blurb}</p>
                <MediaSlot
                  label={feature.media.label}
                  kind={feature.media.kind}
                  ratio={feature.media.ratio}
                  caption={feature.media.caption}
                  colorIndex={index}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-[#e4ddd2] pt-8">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a8f82]">
              And more
            </p>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {moreFeatures.map((feature) => (
                <div key={feature.name}>
                  <h4 className="mb-1.5 text-[15px] font-semibold text-[#2a1f16]">
                    {feature.name}
                  </h4>
                  <p className="text-[14px] leading-[1.55] text-[#6b5f52]">
                    {feature.blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>
        */}

        {/* Impact */}
        <Section
          id="impact"
          eyebrow="Impact"
          title="A production app serving the UCI community"
        >
          <div className="mb-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {impactStats.map((stat, i) => (
              <ClayFrame
                key={stat.label}
                colorIndex={i}
                thickness={4}
                rounded="xl"
                innerClassName="!bg-[#faf6ef]"
              >
                <div className="px-4 py-5">
                  <p className="text-[26px] font-semibold leading-none tracking-tight text-[#8fad6e] md:text-[30px]">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#8f8578]">
                    {stat.label}
                  </p>
                </div>
              </ClayFrame>
            ))}
          </div>
          <ul className="space-y-4">
            {impactPoints.map((point, i) => (
              <li key={i} className={`flex gap-3 ${bodyText}`}>
                <span className="mt-[11px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#8fad6e]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </CaseStudyShell>
  )
}
