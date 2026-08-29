import type { Metadata } from "next"
import { Fraunces, Outfit, JetBrains_Mono } from "next/font/google"
import { UmamiAnalytics } from "@/components/analytics/UmamiAnalytics"
import { CustomCursor } from "@/components/CustomCursor"
import { SiteNav } from "@/components/SiteNav"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ethan Chao",
  description: "Software Engineering + Health Informatics portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} ${mono.variable}`}
    >
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="234ff9bb-bedf-4c9d-8339-822be28ae7aa"
        />
      </head>
      <body className={outfit.className}>
        <SiteNav />
        {children}
        <CustomCursor />
        <UmamiAnalytics />
      </body>
    </html>
  )
}
