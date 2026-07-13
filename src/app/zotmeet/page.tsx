import { CaseStudyPage } from "@/components/CaseStudyPage"
import zotmeet from "@/imports/zotmeet.png"

const caseStudy = {
  projectName: "ZotMeet",
  headline: "Scheduler for UC Irvine Students",
  intro:
    "Finding the best place to meet",
  heroImage: {
    src: zotmeet,
    alt: "Gotwo app preview",
    objectPosition: "center",
  },
  details: [
    {
      label: "Timeline",
      value: "Oct. 2025 - Present (8 weeks)",
    },
    {
      label: "Role",
      value: "Lead Product + Software Engineer",
    },
    {
      label: "Responsibility",
      value:
        "Lead 8 developers and 2 designers through agile sprints, milestone planning, PR review, and team bonding socials",
    },
  ],
  context: (
    <>
      <p>This was an 8 week challenge for beginners.</p>
      <p>
        Design at UCI, a college club, hosts project teams each quarter for
        beginners & intermediate UI/UX designers to collaborate and build an end
        to end project. A demo showcase is held at the end to assess our
        projects.
      </p>
    </>
  ),
}

export default function Page() {
  return <CaseStudyPage {...caseStudy} />
}
