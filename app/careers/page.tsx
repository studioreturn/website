import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export const metadata: Metadata = {
  title: "Careers - Return",
  description: "Join Studio Return. We're building polite products from Bristol, UK.",
}

export default function CareersPage() {
  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Careers
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            We&apos;re a small team doing meaningful work. If you care about craft and want to build products that
            respect people, you might be a good fit.
          </p>
        </div>
      </section>
      
      <div className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-4xl mx-auto">
          {/* About Us Section */}
          <section className="mb-16">
            <h2 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Who We Are</h2>
            <div className="space-y-4 font-mono text-sm leading-relaxed max-w-2xl" style={{ color: DARK_TEXT, opacity: 0.7 }}>
              <p>
                Studio Return is a design studio based in Bristol, UK. We make digital products that solve real problems
                while respecting your time and attention. We call them &quot;polite products&quot;.
              </p>
              <p>
                We&apos;re a deliberately small team. We believe in quality over quantity, and we&apos;d rather do a few
                things really well than many things poorly.
              </p>
            </div>
          </section>

          {/* How We Work Section */}
          <section className="mb-16">
            <h2 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>How We Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>Remote-first</h3>
                <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                  Work from anywhere. We have a studio in Bristol if you want to use it, but it&apos;s not required.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>Flexible hours</h3>
                <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                  We care about output, not hours. Work when you&apos;re most productive.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>No meetings culture</h3>
                <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                  We communicate asynchronously by default. Meetings are the exception, not the rule.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>Four-day weeks</h3>
                <p className="font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                  We work Monday to Thursday. Fridays are for rest, learning, or personal projects.
                </p>
              </div>
            </div>
          </section>

          {/* Culture Section */}
          <section className="mb-16">
            <h2 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Our Culture</h2>
            <div className="space-y-4 font-mono text-sm leading-relaxed max-w-2xl" style={{ color: DARK_TEXT, opacity: 0.7 }}>
              <p>
                We believe in the work, not the hustle. We don&apos;t celebrate overwork. We celebrate sustainable
                creativity and craftsmanship.
              </p>
              <p>We&apos;re direct and honest. We give feedback kindly but clearly. We assume good intentions.</p>
              <p>We care about the details. The small things matter. We sweat the type, the motion, the feel.</p>
              <p>We&apos;re always learning. We share what we learn with each other and with the wider community.</p>
            </div>
          </section>
        </div>
      </div>

      {/* Open Roles Section */}
      <section className="px-8 py-16" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white font-mono text-sm font-bold mb-6 uppercase tracking-wider">Open Roles</h2>

          <div className="border border-white/20 p-8 text-center">
            <p className="text-white/70 font-mono text-sm mb-4">We don&apos;t have any open positions right now.</p>
            <p className="text-white/70 font-mono text-sm">
              But we&apos;re always interested in hearing from talented people. If you think you&apos;d be a good fit,
              send us an email at{" "}
              <a
                href="mailto:careers@studioreturn.co"
                className="text-white underline hover:opacity-70 transition-opacity"
              >
                careers@studioreturn.co
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm" style={{ color: DARK_TEXT, opacity: 0.7 }}>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Competitive salary</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Four-day work week</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Remote-first with Bristol studio access</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>25 days holiday + bank holidays</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Learning budget</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Equipment of your choice</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Pension contributions</span>
            </div>
            <div className="flex items-start gap-3">
              <span style={{ color: DARK_TEXT }}>-</span>
              <span>Team retreats</span>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
