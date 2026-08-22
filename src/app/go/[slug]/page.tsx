import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GitHubRedirect } from "@/components/analytics/GitHubRedirect"
import {
  getGitHubRedirect,
  githubRedirectSlugs,
} from "@/lib/github-redirects"

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return githubRedirectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const dest = getGitHubRedirect(slug)
  if (!dest) return { title: "Not found" }
  return {
    title: `Opening ${dest.name}`,
    robots: { index: false, follow: true },
  }
}

export default async function GitHubRedirectPage({ params }: PageProps) {
  const { slug } = await params
  const dest = getGitHubRedirect(slug)
  if (!dest) notFound()

  return <GitHubRedirect slug={slug} name={dest.name} href={dest.href} />
}
