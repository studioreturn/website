import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"

export const metadata: Metadata = {
  title: "Lab | Return",
  description: "Products we've built ourselves. Practicing what we preach by creating polite digital experiences.",
}

export default function LabPage() {
  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Lab
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            Products we&apos;ve built ourselves. We practice what we preach by creating polite digital experiences that
            respect your time and attention.
          </p>
        </div>
      </section>

      {/* Breakout */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-white"></div>

            <div className="space-y-6">
              <span className="font-mono text-xs uppercase tracking-wider opacity-50" style={{ color: "#0a0033" }}>Available Now</span>
              <h2 className="italic text-3xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: "#0a0033" }}>Breakout</h2>
              <p className="font-mono text-base leading-relaxed" style={{ color: "#0a0033", opacity: 0.8 }}>
                A screen time app that helps you break free from your phone. Breakout uses gentle nudges and mindful
                design to help you build healthier digital habits without shame or guilt.
              </p>

              <ul className="space-y-2 font-mono text-sm" style={{ color: "#0a0033", opacity: 0.7 }}>
                <li>- Gentle notifications, not aggressive alerts</li>
                <li>- Beautiful, calming interface</li>
                <li>- Focus on progress, not punishment</li>
                <li>- Privacy-first approach</li>
              </ul>

              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors border-2"
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
      <section className="px-8 py-16" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-mono text-sm font-bold mb-8 uppercase tracking-wider">Coming Soon</h2>

          <div className="border border-white/20 p-8">
            <h3 className="text-white italic text-2xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>More on the way</h3>
            <p className="text-white/70 font-mono text-sm leading-relaxed max-w-xl">
              We&apos;re always experimenting with new ideas. Sign up to our newsletter to be the first to know when we
              launch something new.
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
