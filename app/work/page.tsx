import Link from "next/link"
import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowUpRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Work | Return",
  description: "Selected projects from our portfolio. Brand, web, and UI/UX design work for clients across industries.",
}

export default function WorkPage() {
  return (
    <PageWrapper>
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white font-title text-3xl md:text-4xl uppercase mb-6">Work</h1>
          <p className="text-white/80 font-mono text-lg max-w-2xl leading-relaxed">
            Selected projects from our portfolio. Each one crafted with care and attention to detail.
          </p>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 - Breakout */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Our Product</span>
              <h3 className="text-white font-mono text-lg font-bold mb-2 mt-1">Breakout</h3>
              <p className="text-white/70 font-mono text-sm">
                A screen time app that helps you break free from your phone.
              </p>
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 text-white font-mono text-sm underline hover:opacity-70 transition-opacity"
              >
                View project
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Placeholder projects */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Client Work</span>
              <h3 className="text-white font-mono text-lg font-bold mb-2 mt-1">Client Project</h3>
              <p className="text-white/70 font-mono text-sm">
                Brand identity and website design for a sustainable fashion brand.
              </p>
              <span className="inline-block mt-4 text-white/50 font-mono text-sm">Coming soon</span>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Client Work</span>
              <h3 className="text-white font-mono text-lg font-bold mb-2 mt-1">SaaS Dashboard</h3>
              <p className="text-white/70 font-mono text-sm">UI/UX design for an analytics platform.</p>
              <span className="inline-block mt-4 text-white/50 font-mono text-sm">Coming soon</span>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4"></div>
              <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Client Work</span>
              <h3 className="text-white font-mono text-lg font-bold mb-2 mt-1">Mobile App</h3>
              <p className="text-white/70 font-mono text-sm">iOS app design for a wellness startup.</p>
              <span className="inline-block mt-4 text-white/50 font-mono text-sm">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white font-title text-2xl uppercase mb-4">Want to be next?</h2>
          <p className="text-white/70 font-mono text-sm mb-8">We&apos;d love to hear about your project.</p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-[#1100FF] font-mono text-sm font-bold hover:bg-white/90 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
