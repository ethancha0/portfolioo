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
import dash from "@/imports/pfizer/dash.png"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "approach", label: "Approach" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "impact", label: "Impact" },
]

const details = [
  { label: "Role", value: "Software Engineering Extern" },
  { label: "Timeline", value: formatTimeline("May 2026") },
  { label: "Team", value: "Health Informatics" },
  { label: "Stack", value: "Python · OCR · RAG · Gemini" },
]

const stackGroups: { label: string; items: ReactNode[] }[] = [
  {
    label: "PDF & Extraction",
    items: [
      "Python",
      "PyMuPDF + pdfplumber for digital PDF text and layout",
      "Structured JSON output with page coordinates",
    ],
  },
  {
    label: "Vision & OCR",
    items: [
      "OpenCV + PIL for resize, crop, contrast, and noise reduction",
      "Tesseract, PaddleOCR, and EasyOCR evaluated across layouts and scan quality",
    ],
  },
  {
    label: "RAG & LLMs",
    items: [
      "LlamaIndex for retrieval-augmented generation",
      "FAISS + Chroma for vector-based indexing",
      "Gemini, Mistral, or Phi-2 for grounded answers",
    ],
  },
  {
    label: "Interface",
    items: [
      "Gradio / Streamlit search UI for natural-language questions over the document collection",
    ],
  },
]

const impactStats = [
  { value: "OCR", label: "Multi-engine extraction" },
  { value: "JSON", label: "Structured fields + coords" },
  { value: "RAG", label: "Searchable document index" },
  { value: "E2E", label: "Parse → retrieve → answer" },
]

const impactPoints: ReactNode[] = [
  "Built an end-to-end document intelligence pipeline — not a standalone OCR script — spanning PDF parsing, image preprocessing, OCR, structured extraction, classification, retrieval, and language models.",
  "Preserved field values with page coordinates in structured JSON so extracted data stayed tied to its source layout for validation and auditability.",
  "Used classification and routing so shipping records, labels, purchase orders, and other clinical supply documents could follow different extraction strategies instead of one brittle template.",
  "Indexed extracted content with a RAG stack so users could search large document collections and ask natural-language questions without manually reviewing hundreds or thousands of pages.",
]

export default function Page() {
  return (
    <CaseStudyShell sections={sections} backHref="/" backLabel="Back">
      <CaseStudyHero
        eyebrow="Pfizer · Externship"
        title="Turning messy pharmaceutical documents into searchable data"
        description="An AI-powered document intelligence pipeline for Pfizer supply chain — ingesting scanned and digital documents, extracting structured fields, classifying document types, and making information searchable with RAG."
        ctas={[]}
        details={details}
        frameColor="cream"
        heroImage={{ src: pfizerImage, alt: "Pfizer project preview" }}
      />

      <div className="mt-16">
        <CaseStudySection
          id="overview"
          eyebrow="Overview"
          title="Document intelligence for pharmaceutical supply chains"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Pharmaceutical supply chains depend on shipping labels, purchase
              orders, logistics forms, invoices, and regulatory records. These
              documents often carry the same kinds of information, but almost
              never in the same format — dates, tables, and key fields shift by
              vendor, template, and scan quality.
            </p>
            <p>
              During my Pfizer Supply Chain Document Processing Externship, I
              worked on an AI-powered pipeline to ingest scanned pharmaceutical
              documents, extract important fields, classify document types, and
              make information searchable across large collections of files.
            </p>
          </div>
          <div className="mt-8">
            <MediaSlot
              src={dash}
              label="Pipeline / UI screenshot"
              caption="Document intelligence interface or extraction output"
              ratio="16 / 9"
              colorIndex={1}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          eyebrow="The Problem"
          title="Inconsistent documents break rule-based parsing"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              A date might appear as{" "}
              <code className="rounded bg-[#ebe4d8] px-1.5 py-0.5 text-[13px]">
                07/12/26
              </code>
              ,{" "}
              <code className="rounded bg-[#ebe4d8] px-1.5 py-0.5 text-[13px]">
                12 July 2026
              </code>
              , or as a handwritten note. Important fields may sit inside
              tables, split across columns, print over noisy backgrounds, rotate
              on scanned pages, or land in different places depending on the
              vendor and document type.
            </p>
            <p>
              Traditional rule-based software struggles here. A parser built for
              one layout can fail when a supplier changes a template, a scan is
              blurry, or a field shows up somewhere unexpected. Even after text
              is extracted, the system still has to decide what each value
              means, keep its relationship to nearby labels, and produce
              reliable structured data for supply-chain and compliance
              decisions.
            </p>
            <p className="text-[#2a1f16]">
              That gap — between messy pharmaceutical documents and trustworthy
              structured data — is what this pipeline was built to close.
            </p>
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="approach"
          eyebrow="Approach"
          title="Parse, clean, extract, classify, then retrieve"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Digitally generated PDFs go through{" "}
              <strong className="font-medium text-[#2a1f16]">PyMuPDF</strong> and{" "}
              <strong className="font-medium text-[#2a1f16]">pdfplumber</strong>{" "}
              to pull text and layout. Scanned or image-based pages are prepared
              with{" "}
              <strong className="font-medium text-[#2a1f16]">OpenCV</strong> and{" "}
              <strong className="font-medium text-[#2a1f16]">PIL</strong> —
              resizing, cropping, contrast adjustment, and noise reduction —
              before OCR engines like Tesseract, PaddleOCR, and EasyOCR are
              evaluated across layouts, scan qualities, and document types.
            </p>
            <p>
              Extracted fields land in structured{" "}
              <strong className="font-medium text-[#2a1f16]">JSON</strong>,
              keeping both the recognized values and their page coordinates.
              Classification and routing decide how each document should be
              processed instead of forcing one extraction strategy onto every
              file — making the system more resilient across shipping records,
              labels, purchase orders, and other clinical supply documents.
            </p>
            <p>
              Finally, content is indexed with a{" "}
              <strong className="font-medium text-[#2a1f16]">RAG</strong>{" "}
              pipeline. LlamaIndex, FAISS, and Chroma support vector retrieval;
              models such as Gemini, Mistral, or Phi-2 generate answers grounded
              in the most relevant sections. A Gradio or Streamlit interface lets
              users search the collection and ask natural-language questions
              without paging through thousands of documents by hand.
            </p>
          </div>
          <div className="mt-8">
            <MediaSlot
              label="Architecture diagram"
              caption="Ingest → preprocess → OCR → structured JSON → classify → RAG"
              ratio="16 / 9"
              colorIndex={3}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="tech-stack"
          eyebrow="Tech Stack"
          title="What powered the pipeline"
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
          title="From inconsistent scans to searchable supply-chain data"
        >
          <ImpactStats stats={impactStats} />
          <BulletList items={impactPoints} />
        </CaseStudySection>
      </div>
    </CaseStudyShell>
  )
}
