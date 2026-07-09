import { CaseStudyPage } from "@/components/CaseStudyPage"
import zotmeet from "@/imports/zotmeet.png"

const caseStudy = {
  projectName: "Gotwo",
  headline: "Centralizing food delivery for better eats",
  intro:
    "Meals are best served with a good deal. My team and I designed an app for busy college students ensuring they receive fresh and nutritious meals at the best price point.",
  heroImage: {
    src: zotmeet,
    alt: "Gotwo app preview",
    objectPosition: "center",
  },
  details: [
    {
      label: "Timeline",
      value: "Jan - Feb 2025 (8 weeks)",
    },
    {
      label: "Role",
      value: "Product Designer",
    },
    {
      label: "Responsibility",
      value:
        "I and a team of 4 designers built an end to end project for an 8 week design challenge presented by our school club",
    },
    {
      label: "Project Theme",
      value: "Revolutionizing Daily Life",
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
