import type { Metadata } from "next"
import { Fraunces } from "next/font/google"
import { CustomCursor } from "@/components/CustomCursor"
import { SiteNav } from "@/components/SiteNav"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-fraunces",
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
    <html lang="en" className={fraunces.variable}>
      <body className={fraunces.className}>
        <SiteNav />
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
