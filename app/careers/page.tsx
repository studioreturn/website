import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers - Return",
  description: "Join Studio Return. We're building polite products from Bristol, UK.",
}

export default function CareersPage() {
  return (
    <PageWrapper>
      <div className="px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-white mb-6 text-3xl uppercase font-title">Careers</h1>
          <p className="text-white/70 font-mono text-base leading-relaxed max-w-2xl mb-16">
            We&apos;re a small team doing meaningful work. If you care about craft and want to build products that
            respect people, you might be a good fit.
          </p>

          {/* About Us Section */}
          <section className="mb-16">
            <h2 className="text-white font-mono text-sm font-bold mb-6 uppercase tracking-wider">Who We Are</h2>
            <div className="space-y-4 text-white/70 font-mono text-sm leading-relaxed max-w-2xl">
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
            <h2 className="text-white font-mono text-sm font-bold mb-6 uppercase tracking-wider">How We Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h3 className="text-white font-mono text-sm font-bold">Remote-first</h3>
                <p className="text-white/70 font-mono text-sm">
                  Work from anywhere. We have a studio in Bristol if you want to use it, but it&apos;s not required.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-mono text-sm font-bold">Flexible hours</h3>
                <p className="text-white/70 font-mono text-sm">
                  We care about output, not hours. Work when you&apos;re most productive.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-mono text-sm font-bold">No meetings culture</h3>
                <p className="text-white/70 font-mono text-sm">
                  We communicate asynchronously by default. Meetings are the exception, not the rule.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-mono text-sm font-bold">Four-day weeks</h3>
                <p className="text-white/70 font-mono text-sm">
                  We work Monday to Thursday. Fridays are for rest, learning, or personal projects.
                </p>
              </div>
            </div>
          </section>

          {/* Culture Section */}
          <section className="mb-16">
            <h2 className="text-white font-mono text-sm font-bold mb-6 uppercase tracking-wider">Our Culture</h2>
            <div className="space-y-4 text-white/70 font-mono text-sm leading-relaxed max-w-2xl">
              <p>
                We believe in the work, not the hustle. We don&apos;t celebrate overwork. We celebrate sustainable
                creativity and craftsmanship.
              </p>
              <p>We&apos;re direct and honest. We give feedback kindly but clearly. We assume good intentions.</p>
              <p>We care about the details. The small things matter. We sweat the type, the motion, the feel.</p>
              <p>We&apos;re always learning. We share what we learn with each other and with the wider community.</p>
            </div>
          </section>

          {/* Open Roles Section */}
          <section className="mb-16">
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

            {/* Example of how a job listing would look - commented out for now
            <div className="space-y-4">
              <div className="border border-white/20 p-6 hover:border-white transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-white font-mono text-base font-bold">Senior Product Designer</h3>
                    <p className="text-white/50 font-mono text-xs mt-1">Remote / Bristol • Full-time</p>
                  </div>
                  <Link
                    href="/careers/senior-product-designer"
                    className="inline-block px-4 py-2 border border-white text-white font-mono text-xs hover:bg-white hover:text-[#1100FF] transition-colors"
                  >
                    View role
                  </Link>
                </div>
              </div>
            </div>
            */}
          </section>

          {/* Benefits Section */}
          <section>
            <h2 className="text-white font-mono text-sm font-bold mb-6 uppercase tracking-wider">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/70 font-mono text-sm">
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Competitive salary</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Four-day work week</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Remote-first with Bristol studio access</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>25 days holiday + bank holidays</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Learning budget</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Equipment of your choice</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Pension contributions</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-white">-</span>
                <span>Team retreats</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  )
}
