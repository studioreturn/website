import Link from "next/link"
import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowUpRight, ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export const metadata: Metadata = {
  title: "Work | Return",
  description: "Selected projects from our portfolio. Brand, web, and UI/UX design work for clients across industries.",
}

export default function WorkPage() {
  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Work
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            Selected projects from our portfolio. Each one crafted with care and attention to detail.
          </p>
        </div>
      </section>

      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 - Breakout */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: DARK_TEXT, opacity: 0.5 }}>Our Product</span>
              <h3 className="italic text-xl mb-2 mt-1" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>Breakout</h3>
              <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                A screen time app that helps you break free from your phone.
              </p>
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: DARK_TEXT }}
              >
                View project
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Placeholder projects */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: DARK_TEXT, opacity: 0.5 }}>Client Work</span>
              <h3 className="italic text-xl mb-2 mt-1" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>Client Project</h3>
              <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                Brand identity and website design for a sustainable fashion brand.
              </p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.5 }}>Coming soon</span>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: DARK_TEXT, opacity: 0.5 }}>Client Work</span>
              <h3 className="italic text-xl mb-2 mt-1" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>SaaS Dashboard</h3>
              <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>UI/UX design for an analytics platform.</p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.5 }}>Coming soon</span>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: DARK_TEXT, opacity: 0.5 }}>Client Work</span>
              <h3 className="italic text-xl mb-2 mt-1" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>Mobile App</h3>
              <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>iOS app design for a wellness startup.</p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.5 }}>Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Want to be next?</h2>
          <p className="text-white/70 font-mono text-sm mb-8">We&apos;d love to hear about your project.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
            style={{ color: BLUE }}
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
