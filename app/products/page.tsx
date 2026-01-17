import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Products | Return",
  description: "In-house products built by Return. Polite software that respects your time.",
}

export default function ProductsPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-white text-4xl md:text-5xl mb-6 italic font-light"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Our Products
          </h1>
          <p className="text-white/80 font-mono text-lg max-w-2xl leading-relaxed">
            We don't just design for others - we build our own products too. Each one is crafted with the same care and
            attention we bring to client work, embodying our belief in polite, respectful software.
          </p>
        </div>
      </section>

      {/* Breakout */}
      <section className="px-8 py-16">
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
              <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Launched 2024</span>
              <h2 className="text-white font-title text-3xl uppercase">Breakout</h2>
              <p className="text-white/80 font-mono text-base leading-relaxed">
                Breakout is a screen time app that helps you break free from your phone. Unlike other apps that shame
                you or lock you out, Breakout takes a gentler approach - it simply helps you notice when you're
                mindlessly scrolling and gives you the nudge you need to put your phone down.
              </p>
              <ul className="text-white/70 font-mono text-sm space-y-2">
                <li>- Gentle, non-judgmental approach to screen time</li>
                <li>- Beautiful, minimal interface</li>
                <li>- No subscriptions, no ads, no data collection</li>
                <li>- Available for iOS</li>
              </ul>
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-white text-[#1100FF] font-mono text-sm font-bold hover:bg-white/90 transition-colors"
              >
                Download Breakout
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* More Coming */}
      <section className="px-8 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white font-mono text-sm font-bold mb-4 uppercase tracking-wider">More Coming Soon</h2>
          <p className="text-white/70 font-mono text-base max-w-xl mx-auto">
            We're always working on new ideas. Follow us on social media or sign up to our newsletter to be the first to
            know about our next product.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-white font-title text-2xl uppercase mb-4">Got a product idea?</h2>
            <p className="text-white/70 font-mono text-base mb-6">
              We occasionally partner with founders to bring product ideas to life. If you've got an idea for something
              polite, we'd love to hear it.
            </p>
            <Link
              href="/contact"
              className="inline-block text-white font-mono text-sm underline hover:opacity-70 transition-opacity"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
