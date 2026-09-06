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
import fretlyPlayer from "@/imports/fretly/player.mov"
import { formatTimeline } from "@/lib/formatTimeline"
import scroll from "@/imports/fretly/scroll.png"



// TODO(ethan): drop screenshots into src/imports/fretly/ and import them here.
// import player from "@/imports/fretly/player.png"
// import importDialog from "@/imports/fretly/import.png"
// import drift from "@/imports/fretly/drift.png"

/** TODO(ethan): swap in the deployed URL. */
const LIVE_URL = "https://learn-guitar-beta.vercel.app/"
const GITHUB_URL = "https://github.com/ethancha0/learn-guitar"
/** TODO(ethan): confirm the start month — used for the timeline label. */
const START_MONTH = "Jun. 2026"

const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "approach", label: "Approach" },
  { id: "drift", label: "The Drift Hunt" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "impact", label: "Impact" },
]

const details = [
  { label: "Role", value: "Solo — Design + Engineering" },
  { label: "Timeline", value: formatTimeline(START_MONTH) },
  { label: "Team", value: "Solo project" },
  {
    label: "Stack",
    value: "TypeScript · Next.js 16 · alphaTab · Python · SyncToolbox",
  },
]

const stackGroups: { label: string; items: ReactNode[] }[] = [
  {
    label: "App & Rendering",
    items: [
      "Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS",
      "@coderline/alphatab for multi-track notation and tablature, served from same-origin assets so its worker and audio worklet load correctly",
      "Radix Dialog primitives · lucide-react · cva + clsx + tailwind-merge",
    ],
  },
  {
    label: "Playback & Sync",
    items: [
      "alphaTab in EnabledExternalMedia mode — the recording is the clock, not alphaTab's MIDI player",
      "SyncMap: a bidirectional score-time ↔ audio-time curve driving cursor movement",
      "Douglas–Peucker simplification at a 20 ms tolerance, plus terminal anchors so the tail can't distort",
    ],
  },
  {
    label: "Media Import",
    items: [
      "Songsterr lookup that resolves current revisions and converts fetched parts into Guitar Pro data",
      "yt-dlp + ffmpeg + ffprobe behind Node route handlers for YouTube search, download, validation, and normalization",
      "npm-bundled binaries traced into the media routes by next.config.mjs, with env-var overrides per host",
    ],
  },
  {
    label: "Persistence",
    items: [
      "IndexedDB for large audio Blobs · localStorage for preferences and sync metadata",
      "Optional Supabase Auth + Postgres metadata + private Storage, with row-level security per account",
    ],
  },
  {
    label: "Offline Alignment",
    items: [
      "alphaTab converts the score to MIDI plus a bar/beat timing grid — the same parser playback uses",
      "fluidsynth renders a reference track; librosa analyzes at 22.05 kHz mono",
      "SyncToolbox MrMsDTW over quantized chroma + DLNCO onsets produces a monotonic nonlinear warp path",
    ],
  },
  {
    label: "Testing & Diagnostics",
    items: [
      "22 Vitest suites over sync maps, audio clocks, the alignment queue, waveform/onset logic, and the import helpers",
      "In-app diagnostics: waveform overlays, bar/beat markers, manual anchors, onset residuals, DTW retry",
      "probe-playback.mjs reproduces alphaTab's playback math offline so drift can be measured without a browser",
    ],
  },
]

const impactStats = [
  { value: "541 ms", label: "Whole-song drift removed" },
  { value: "7.3 ms", label: "Median onset residual" },
  { value: "22", label: "Test suites" },
  { value: "Live", label: "Shipped and public" },
]

const impactPoints: ReactNode[] = [
  <>
    Shipped a working practice tool, live at{" "}
    <a
      href={LIVE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="fretly live"
      data-umami-event-url={LIVE_URL}
      className="font-medium text-[#8fad6e] underline decoration-[1.5px] underline-offset-2"
    >
      {LIVE_URL.replace(/^https?:\/\//, "")}
    </a>
    , with source on{" "}
    <a
      href={GITHUB_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-umami-event="fretly github"
      className="font-medium text-[#8fad6e] underline decoration-[1.5px] underline-offset-2"
    >
      GitHub
    </a>
    .
  </>,
  "Removed a whole-song timing drift of 541 ms — an eighth note by the last chorus — by measuring four separate clocks independently instead of guessing at the symptom.",
  "Turned score-to-recording alignment into an offline preprocessing step, so a DTW pipeline that takes seconds of CPU never runs on the request path in production.",
  "Made import frictionless: a song can come from a Songsterr search and a YouTube link, with no local files and no API keys, because every binary call stays server-side.",
  "Kept the alignment honest with instrumentation — onset residuals, waveform overlays, and manual anchors — so sync quality is a number that can be checked, not a feeling.",
]

export default function Page() {
  return (
    <CaseStudyShell sections={sections} backHref="/" backLabel="Back">
      <CaseStudyHero
        eyebrow="Fretly · Personal Project"
        title="Practice along to the real recording, not a MIDI backing track"
        description="A web app that pairs a Guitar Pro score with the original song and keeps the tab cursor locked to the recording — through every tempo push, drag, and rubato a real band plays."
        ctas={[
          {
            href: LIVE_URL,
            label: "Live site",
            variant: "solid",
            colorIndex: 0,
          },
          {
            href: GITHUB_URL,
            label: "GitHub",
            variant: "outline",
            colorIndex: 2,
          },
        ]}
        details={details}
        frameColor="chocolate"
        heroMedia={
          <div className="relative mt-10 h-[240px] w-full overflow-hidden rounded-[26px] md:h-[380px]">
            <video
              src={fretlyPlayer}
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Fretly player preview"
            />
          </div>
        }
      />

      <div className="mt-16">
        <CaseStudySection
          id="overview"
          eyebrow="Overview"
          title="A score that follows the record"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Fretly imports a Guitar Pro or PowerTab score — from a local file
              or straight out of a Songsterr search — pairs it with backing
              audio from a file or a YouTube link, and renders the notation and
              tablature in the browser with track selection, looping, speed
              control, and separate backing and reference-synth volume.
            </p>
            <p>
              The part that matters is the cursor. Instead of playing alphaTab&apos;s
              MIDI rendition, the app makes the actual recording the playback
              clock and warps the score onto it, so you are practicing against
              the record you know rather than a metronomic approximation of it.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <MediaSlot
              label="Player screenshot"
              caption="Tab rendering, transport, and mixer over the imported recording"
              ratio="16 / 9"
              fit="cover"
              maxWidth={900}
              colorIndex={1}
              src={scroll}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="problem"
          eyebrow="The Problem"
          title="Real bands don't play to a click"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Tab software plays a synthesized version of the score at a tempo
              you set. Recordings do something else entirely — they push into
              choruses, drag on turnarounds, and sit a few milliseconds off the
              grid everywhere in between. A cursor driven by the score&apos;s own
              tempo map is right at bar one and wrong by bar twenty.
            </p>
            <p>
              A single global offset does not fix that, because the error is not
              constant. What is needed is a nonlinear, strictly monotonic map
              from score time to audio time: a curve that can stretch and
              compress locally while never running backwards.
            </p>
            <p className="text-[#2a1f16]">
              Building and trusting that curve is the whole project.
            </p>
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="approach"
          eyebrow="Approach"
          title="Import fast, align offline, play against the recording"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              Import is deliberately impatient. Songsterr routes resolve metadata
              and convert revisions into{" "}
              <code className="rounded bg-[#ebe4d8] px-1.5 py-0.5 text-[13px]">
                .gp
              </code>{" "}
              files, YouTube routes shell out to{" "}
              <strong className="font-medium text-[#2a1f16]">yt-dlp</strong> and{" "}
              <strong className="font-medium text-[#2a1f16]">ffmpeg</strong> for
              search and audio, and the player route opens immediately while
              alignment is queued in the background. Audio Blobs live in
              IndexedDB; signed-in users also get their files in private Supabase
              Storage behind row-level security.
            </p>
            <p>
              Alignment itself is offline preprocessing, never a request-path
              job. alphaTab converts the score to MIDI and a bar/beat grid using
              the same parser playback uses; fluidsynth renders a reference
              track; librosa and{" "}
              <strong className="font-medium text-[#2a1f16]">
                SyncToolbox MrMsDTW
              </strong>{" "}
              compare quantized chroma and DLNCO onsets to produce a monotonic
              warp path. The client resamples that path into alphaTab sync points
              and stores it per song.
            </p>
            <p>
              At playback, alphaTab runs in external-media mode and a
              ~60 Hz loop pumps the audio element&apos;s current time into it. The{" "}
              <strong className="font-medium text-[#2a1f16]">SyncMap</strong>{" "}
              translates between the two timelines in both directions, so a new
              DTW result can replace the map in place without reloading the
              player.
            </p>
          </div>
          <div className="mt-8">
            <MediaSlot
              label="Architecture diagram"
              caption="Import → background alignment → DTW warp path → sync points → cursor"
              ratio="16 / 9"
              fit="contain"
              colorIndex={3}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="drift"
          eyebrow="The Drift Hunt"
          title="541 ms hiding in a bitwise OR"
        >
          <div className={`space-y-4 ${caseStudyBody}`}>
            <p>
              On a 170 BPM song the cursor started clean, was visibly out a few
              measures in, and got worse from there. The on-screen error readout
              could not localize it — it compares two moving clocks and only ever
              says that <em>something</em> disagrees.
            </p>
            <p>
              So I measured four layers separately: the score&apos;s own timing
              model, the raw DTW path, the simplified sync map, and what playback
              actually implements. The first three came back at{" "}
              <strong className="font-medium text-[#2a1f16]">0.000 ms</strong>{" "}
              against the score across all 144 bars, and the DTW path sat at a
              7.3 ms median residual against 474 detected note attacks. Only the
              last layer was wrong — and its error was a straight line at
              −2.6666 ms per second.
            </p>
            <p>
              A per-second constant points at something counted per event, not
              per song. alphaTab keeps two clocks for the same score: the cursor
              accumulates in floating point, while the sync-point path runs
              through a helper that truncates to whole milliseconds with{" "}
              <code className="rounded bg-[#ebe4d8] px-1.5 py-0.5 text-[13px]">
                | 0
              </code>
              . At 170 BPM a beat is 352.941 ms and gets banked as 352 — and
              since audit #2 had moved sampling from bars to beats, that helper
              ran 576 times a song. 0.941 ms × 2.833 beats/s is 2.667 ms/s;
              × 576 beats is 542 ms. Measured: 541.
            </p>
            <p>
              The fix reads alphaTab&apos;s own belief back out. Sync points are
              applied once, the generator is asked where it thinks each point
              sits, and every offset is re-derived against{" "}
              <em>that</em> time before a second and final apply. One pass is
              exact, and the two clocks are forced to agree at every beat, so
              nothing is left to accumulate in between.
            </p>
            <p className="text-[#2a1f16]">
              The lesson I keep from it: the beat-level sampling that fixed
              intra-bar drift in the previous audit is exactly what multiplied
              this one by five. Nothing in the system was measuring the layer
              where it landed — so I built the tooling that could.
            </p>
          </div>
          <div className="mt-8">
            <MediaSlot
              label="Drift plot"
              caption="Cursor error against score time, before and after the compensation pass"
              ratio="16 / 9"
              fit="contain"
              colorIndex={0}
            />
          </div>
        </CaseStudySection>

        <CaseStudySection
          id="tech-stack"
          eyebrow="Tech Stack"
          title="A browser player with an offline signal-processing tail"
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
          title="Sync you can measure, not just feel"
        >
          <ImpactStats stats={impactStats} />
          <BulletList items={impactPoints} />
        </CaseStudySection>
      </div>
    </CaseStudyShell>
  )
}
