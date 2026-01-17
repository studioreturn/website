import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"

export const metadata: Metadata = {
  title: "Lab | Return",
  description: "Products we've built ourselves. Practicing what we preach by creating polite digital experiences.",
}

export default function LabPage() {
  return (
    <PageWrapper>
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white font-title text-3xl md:text-4xl uppercase mb-6">Lab</h1>
          <p className="text-white/80 font-mono text-lg max-w-2xl leading-relaxed">
            Products we&apos;ve built ourselves. We practice what we preach by creating polite digital experiences that
            respect your time and attention.
          </p>
        </div>
      </section>

      {/* Breakout */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-white"></div>

            <div className="space-y-6">
              <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Available Now</span>
              <h2 className="text-white font-title text-3xl uppercase">Breakout</h2>
              <p className="text-white/80 font-mono text-base leading-relaxed">
                A screen time app that helps you break free from your phone. Breakout uses gentle nudges and mindful
                design to help you build healthier digital habits without shame or guilt.
              </p>

              <ul className="space-y-2 text-white/70 font-mono text-sm">
                <li>- Gentle notifications, not aggressive alerts</li>
                <li>- Beautiful, calming interface</li>
                <li>- Focus on progress, not punishment</li>
                <li>- Privacy-first approach</li>
              </ul>

              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-[#1100FF] font-mono text-sm font-bold hover:bg-white/90 transition-colors"
              >
                Try Breakout free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="px-8 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-mono text-sm font-bold mb-8 uppercase tracking-wider">Coming Soon</h2>

          <div className="border border-white/20 p-8">
            <h3 className="text-white font-title text-2xl uppercase mb-4">More on the way</h3>
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
