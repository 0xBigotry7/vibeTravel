import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
// import FullPage3DBackground from '@/components/FullPage3DBackground'
import LegendaryCursorEffect from '@/components/LegendaryCursorEffect'
import PageTransition from '@/components/PageTransition'
import { ToastProvider } from "@/contexts/ToastContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "VibeTravel.club - Curated Travel Guides & Custom Itineraries",
  description:
    "Discover curated travel guides and personalized itineraries for the modern explorer. Join our community of passionate travelers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LegendaryCursorEffect />
        {/* <FullPage3DBackground /> */}
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ToastProvider>
            <PageTransition>{children}</PageTransition>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
