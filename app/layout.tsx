import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Mono, Cormorant_Garamond } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import localFont from "next/font/local"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const vastXXLBlack = localFont({
  src: "./fonts/vast-xxl-black.woff2",
  variable: "--font-vast-xxl-black",
  weight: "900",
  display: "swap",
})

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300"],
  style: ["italic"],
  variable: "--font-cormorant",
})

export const metadata: Metadata = {
  title: "Studio Return - Digital design studio in Bristol, UK",
  description: "Polite products from Bristol, UK",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceMono.variable} ${vastXXLBlack.variable} ${cormorantGaramond.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
