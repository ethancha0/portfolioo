"use client"

import type { ReactNode } from "react"
import {
  BulletList,
  CaseStudyHero,
  CaseStudySection,
  CaseStudyShell,
  ImpactStats,
  MediaSlot,
  StackCard,
  caseStudyBody,
} from "@/components/casestudy"
import { ZotMeetGrainient } from "@/components/ZotMeetGrainient"
import { formatTimeline } from "@/lib/formatTimeline"
import zotmeet from "@/imports/zotmeet.png"
import roomrec from "@/imports/zotmeet/videos/room-rec.mp4"
import meeting from "@/imports/zotmeet/meeting.png"
import architecture from "@/imports/zotmeet/architecture.png"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "deployment", label: "Deployment & Infra" },
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

const impactStats = [
  { value: "3", label: "Platforms shipped" },
  { value: "1", label: "Shared codebase" },
  { value: "11K+", label: "Active Users" },
  { value: "Live", label: "zotmeet.com" },
]

export default function Page() {
  return (
    <CaseStudyShell sections={sections} backHref="/" backLabel="Back">
      <CaseStudyHero
        eyebrow="ZotMeet · Shipped 2026"
        title="Find the best time and place to meet"
        description="A full-stack scheduler for UC Irvine — everyone paints their availability onto a shared grid, a live heatmap surfaces the best overlapping slot, and ZotMeet books a real campus study room for it."
        ctas={[
          {
            href: "https://zotmeet.com",
            label: "Live at zotmeet.com",
            variant: "solid",
            colorIndex: 0,
          },
          {
            href: "https://apps.apple.com/us/app/zotmeet/id6773529198",
            label: "App Store!",
            variant: "outline",
            colorIndex: 2,
          },
        ]}
        details={details}
        frameColor="chocolate"
        heroBackground={<ZotMeetGrainient />}
        heroImage={{ src: zotmeet, alt: "ZotMeet app preview" }}
      />

      <div className="mt-16">
        <CaseStudySection
          id="overview"
          eyebrow="Overview"
          title="A modern When2Meet, rebuilt for how UCI students actually meet"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
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
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          eyebrow="The Problem"
          title="Coordinating a time — and finding a room — was near impossible"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
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
        </CaseStudySection>

        <CaseStudySection
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
        </CaseStudySection>

        <CaseStudySection
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
        </CaseStudySection>

        <CaseStudySection
          id="impact"
          eyebrow="Impact"
          title="A production app serving the UCI community"
        >
          <ImpactStats stats={impactStats} />
          <BulletList items={impactPoints} />
        </CaseStudySection>
      </div>
    </CaseStudyShell>
  )
}
