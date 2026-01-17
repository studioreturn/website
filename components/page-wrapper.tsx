import type React from "react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"

interface PageWrapperProps {
  children: React.ReactNode
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#1100FF" }}>
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
