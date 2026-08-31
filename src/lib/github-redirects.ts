export type GitHubRedirect = {
  slug: string
  name: string
  href: string
  aliases?: string[]
}

export const GITHUB_REDIRECTS: GitHubRedirect[] = [
  {
    slug: "facetrace",
    name: "FaceTrace",
    href: "https://github.com/ethancha0/FaceTrace",
  },
  {
    slug: "dsa-interviewer",
    name: "DSA Interviewer",
    href: "https://github.com/ethancha0/dsa-interviewer",
    aliases: ["dsa", "interviewme"],
  },
  {
    slug: "traceqa",
    name: "TraceQA",
    href: "https://github.com/ethancha0/TraceQA",
    aliases: ["trace-qa"],
  },
  {
    slug: "fretly",
    name: "Fretly",
    href: "https://github.com/ethancha0/learn-guitar",
    aliases: ["learn-guitar"],
  },
]

const bySlug = new Map<string, GitHubRedirect>()

for (const redirect of GITHUB_REDIRECTS) {
  bySlug.set(redirect.slug, redirect)
  for (const alias of redirect.aliases ?? []) {
    bySlug.set(alias, redirect)
  }
}

export function getGitHubRedirect(slug: string): GitHubRedirect | undefined {
  return bySlug.get(slug.toLowerCase())
}

export function githubRedirectSlugs(): string[] {
  return [...bySlug.keys()]
}
