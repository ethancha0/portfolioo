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
import { formatTimeline } from "@/lib/formatTimeline"
import pfizerImage from "@/imports/pfizer.png"

/**
 * Project case study template — copy this file to `src/app/<slug>/page.tsx`
 * and swap the content below. Shared building blocks live in
 * `@/components/casestudy`.
 */

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "approach", label: "Approach" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "impact", label: "Impact" },
]

const details = [
  { label: "Role", value: "Software Engineering Extern" },
  { label: "Timeline", value: formatTimeline("May 2025") },
  { label: "Team", value: "Engineering · Health Informatics" },
  { label: "Stack", value: "Python · OCR · RAG · LLMs" },
]

const stackGroups: { label: string; items: ReactNode[] }[] = [
  {
    label: "Core",
    items: [
      "Replace with your language / framework stack",
      "Add key libraries and runtimes",
    ],
  },
  {
    label: "Data & ML",
    items: [
      "OCR pipeline details",
      "RAG retrieval + embedding store",
      "Evaluation / grounding approach",
    ],
  },
  {
    label: "Tooling",
    items: ["CI / quality gates", "Observability / eval harness"],
  },
]

const impactStats = [
  { value: "—", label: "Metric one" },
  { value: "—", label: "Metric two" },
  { value: "—", label: "Metric three" },
  { value: "Live", label: "Status" },
]

const impactPoints: ReactNode[] = [
  "Replace with a concrete outcome from the project.",
  "Add a second impact point — shipping, adoption, or technical milestone.",
  "Add a third point on systems design, reliability, or collaboration.",
]

export default function Page() {
  return (
    <CaseStudyShell sections={sections} backHref="/" backLabel="Back">
      <CaseStudyHero
        eyebrow="Pfizer · Externship"
        title="Building OCR + RAG pipelines for production health data"
        description="Template intro — summarize the problem, what you built, and why it mattered in 1–2 sentences."
        ctas={[
          // { href: "https://example.com", label: "View live", variant: "solid", colorIndex: 0 },
        ]}
        details={details}
        frameColor="cream"
        heroImage={{ src: pfizerImage, alt: "Pfizer project preview" }}
      />

      <div className="mt-16">
        <CaseStudySection
          id="overview"
          eyebrow="Overview"
          title="What this project is about"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Replace this with a short overview of the product or system —
              audience, scope, and your ownership.
            </p>
            <p>
              Add a second paragraph on the technical surface area (OCR, RAG,
              pipelines, APIs, etc.).
            </p>
          </div>
          <div className="mt-8">
            <MediaSlot
              label="Add overview screenshot"
              caption="Showcase: primary product or pipeline UI"
              ratio="16 / 9"
              colorIndex={1}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          eyebrow="The Problem"
          title="What was broken or missing"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Describe the pain point — who felt it, how often, and what
              existing tools failed to do.
            </p>
            <p className="text-[#2a1f16]">
              Thus, this project was born. {/* rewrite */}
            </p>
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="approach"
          eyebrow="Approach"
          title="How you solved it"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Walk through the architecture or workflow: ingest → OCR → chunk →
              retrieve → generate → evaluate.
            </p>
          </div>
          <div className="mt-8">
            <MediaSlot
              label="Add architecture diagram"
              caption="System diagram or pipeline flow"
              ratio="16 / 9"
              colorIndex={3}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="tech-stack"
          eyebrow="Tech Stack"
          title="What you built with"
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
          id="impact"
          eyebrow="Impact"
          title="What changed because of this work"
        >
          <ImpactStats stats={impactStats} />
          <BulletList items={impactPoints} />
        </CaseStudySection>
      </div>
    </CaseStudyShell>
  )
}
