import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export const metadata: Metadata = {
  title: "Labs | Return",
  description: "Products we've built ourselves. Practicing what we preach by creating polite digital experiences.",
}

export default function LabsPage() {
  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Labs
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            Products we&apos;ve built ourselves. We practice what we preach by creating polite digital experiences that
            respect your time and attention.
          </p>
        </div>
      </section>

      {/* Breakout */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gray-100"></div>

            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Available Now</span>
              <h2 className="font-serif font-bold text-3xl" style={{ color: DARK_TEXT }}>Breakout</h2>
              <p className="font-mono text-base leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                A screen time app that helps you break free from your phone. Breakout uses gentle nudges and mindful
                design to help you build healthier digital habits without shame or guilt.
              </p>

              <ul className="space-y-2 font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                <li>- Gentle notifications, not aggressive alerts</li>
                <li>- Beautiful, calming interface</li>
                <li>- Focus on progress, not punishment</li>
                <li>- Privacy-first approach</li>
              </ul>

              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold hover:opacity-90 transition-opacity border-2"
                style={{ color: BLUE, borderColor: BLUE }}
              >
                Try Breakout free
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-sm font-bold mb-8 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Coming Soon</h2>

          <div className="border p-8" style={{ borderColor: `${DARK_TEXT}20` }}>
            <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: DARK_TEXT }}>More on the way</h3>
            <p className="font-mono text-sm leading-relaxed max-w-xl" style={{ color: `${DARK_TEXT}80` }}>
              We&apos;re always experimenting with new ideas. Sign up to our newsletter to be the first to know when we
              launch something new.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
