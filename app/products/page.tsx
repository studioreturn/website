"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export default function ProductsPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 
            className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" 
            style={{ 
              fontFamily: "Georgia, 'Times New Roman', serif",
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              animationDelay: '0.1s'
            }}
          >
            Our Products
          </h1>
          <p 
            className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed"
            style={{
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              animationDelay: '0.15s'
            }}
          >
            We don't just design for others - we build our own products too. Each one is crafted with the same care and
            attention we bring to client work, embodying our belief in polite, respectful software.
          </p>
        </div>
      </section>

      {/* Breakout */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-white/10 overflow-hidden">
              <img
                src="/breakout-app-screenshot-mobile-interface.jpg"
                alt="Breakout App"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-wider opacity-50" style={{ color: DARK_TEXT }}>Launched 2024</span>
              <h2 className="italic text-3xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>Breakout</h2>
              <p className="font-mono text-base leading-relaxed" style={{ color: DARK_TEXT, opacity: 0.8 }}>
                Breakout is a screen time app that helps you break free from your phone. Unlike other apps that shame
                you or lock you out, Breakout takes a gentler approach - it simply helps you notice when you're
                mindlessly scrolling and gives you the nudge you need to put your phone down.
              </p>
              <ul className="font-mono text-sm space-y-2" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                <li>- Gentle, non-judgmental approach to screen time</li>
                <li>- Beautiful, minimal interface</li>
                <li>- No subscriptions, no ads, no data collection</li>
                <li>- Available for iOS</li>
              </ul>
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold hover:bg-white/90 transition-colors border-2"
                style={{ color: BLUE, borderColor: BLUE, backgroundColor: "white" }}
              >
                Download Breakout
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* More Coming */}
      <section className="px-8 py-16" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white font-mono text-sm font-bold mb-4 uppercase tracking-wider">More Coming Soon</h2>
          <p className="text-white/70 font-mono text-base max-w-xl mx-auto">
            We're always working on new ideas. Follow us on social media or sign up to our newsletter to be the first to
            know about our next product.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>Got a product idea?</h2>
            <p className="font-mono text-base mb-6" style={{ color: DARK_TEXT, opacity: 0.7 }}>
              We occasionally partner with founders to bring product ideas to life. If you've got an idea for something
              polite, we'd love to hear it.
            </p>
            <Link
              href="/contact"
              className="inline-block font-mono text-sm underline hover:opacity-70 transition-opacity"
              style={{ color: DARK_TEXT }}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
