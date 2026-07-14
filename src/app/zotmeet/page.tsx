import { CaseStudyPage } from "@/components/CaseStudyPage"
import { ZotMeetGrainient } from "@/components/ZotMeetGrainient"
import { formatTimeline } from "@/lib/formatTimeline"
import zotmeet from "@/imports/zotmeet.png"

const caseStudy = {
  projectName: "ZotMeet",
  headline: "Scheduler for UC Irvine Students",
  intro: "Finding the best place to meet",
  heroImage: {
    src: zotmeet,
    alt: "ZotMeet app preview",
    objectPosition: "center",
    // Tweak these to expand / move the product image in the hero
    layout: {
      scale: 1.3,
      x: 0,
      y: 30,
      maxWidth: 900,
      maxHeight: 90,
    },
  },
  heroBackground: (
    <div className="absolute inset-0">
      <ZotMeetGrainient />
    </div>
  ),
  details: [
    {
      label: "Timeline",
      value: formatTimeline("Oct. 2025"),
    },
    {
      label: "Role",
      value: "Lead Product + Software Engineer",
    },
    {
      label: "Responsibility",
      value:
        "Lead 8 developers and 2 designers through agile sprints, milestone planning, PR reviews, and team bonding socials",
    },
  ],
  context: (
    <>
      <p>
        As a UCI student who loves coordinating study hangouts, I noticed how
        finding study rooms on campus and coordinating a good time to meet was
        near impossible{" "}
      </p>
      <p>Thus, ZotMeet was born</p>
    </>
  ),
}

export default function Page() {
  return <CaseStudyPage {...caseStudy} />
}
