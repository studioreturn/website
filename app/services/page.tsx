import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services - Return",
  description: "Branding, website design and development, and UI/UX design services from Studio Return.",
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <div className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white mb-6 text-3xl uppercase font-title">Services</h1>
          <p className="text-white/70 font-mono text-base leading-relaxed max-w-2xl mb-16">
            We offer a range of design services to help you build polite digital products. Everything we create is
            crafted with care, respecting both you and your users.
          </p>

          {/* Branding Section */}
          <section id="branding" className="mb-20 scroll-mt-24">
            <h2 className="text-white font-title text-2xl uppercase mb-6">Branding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-white/70 font-mono text-sm leading-relaxed">
                  Your brand is more than a logo. It&apos;s the feeling people get when they interact with your
                  business. We help you define and express that feeling consistently across every touchpoint.
                </p>
                <ul className="text-white/70 font-mono text-sm space-y-2">
                  <li>- Logo design and variations</li>
                  <li>- Visual identity system</li>
                  <li>- Brand guidelines document</li>
                  <li>- Typography and colour palette</li>
                  <li>- Brand collateral design</li>
                  <li>- Social media templates</li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Starter</h4>
                  <p className="text-white font-title text-3xl mb-4">£2,500</p>
                  <p className="text-white/70 font-mono text-xs">Logo, basic guidelines, colour palette</p>
                </div>
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Complete</h4>
                  <p className="text-white font-title text-3xl mb-4">£5,000</p>
                  <p className="text-white/70 font-mono text-xs">Full identity system, guidelines, collateral</p>
                </div>
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Enterprise</h4>
                  <p className="text-white font-title text-3xl mb-4">From £10,000</p>
                  <p className="text-white/70 font-mono text-xs">Comprehensive rebrand, multi-brand systems</p>
                </div>
              </div>
            </div>
          </section>

          {/* Websites Section */}
          <section id="websites" className="mb-20 scroll-mt-24">
            <h2 className="text-white font-title text-2xl uppercase mb-6">Website Design & Development</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-white/70 font-mono text-sm leading-relaxed">
                  We design and build websites that work beautifully. Fast, accessible, and easy to manage. Whether you
                  need a simple marketing site or a complex web application, we&apos;ve got you covered.
                </p>
                <ul className="text-white/70 font-mono text-sm space-y-2">
                  <li>- Custom website design</li>
                  <li>- Responsive development</li>
                  <li>- CMS integration</li>
                  <li>- E-commerce solutions</li>
                  <li>- Performance optimisation</li>
                  <li>- Hosting and maintenance</li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Landing Page</h4>
                  <p className="text-white font-title text-3xl mb-4">£1,500</p>
                  <p className="text-white/70 font-mono text-xs">Single page, responsive design</p>
                </div>
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Marketing Site</h4>
                  <p className="text-white font-title text-3xl mb-4">£4,000</p>
                  <p className="text-white/70 font-mono text-xs">Multi-page site with CMS</p>
                </div>
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Web Application</h4>
                  <p className="text-white font-title text-3xl mb-4">From £8,000</p>
                  <p className="text-white/70 font-mono text-xs">Custom functionality, user accounts, APIs</p>
                </div>
              </div>
            </div>
          </section>

          {/* UI/UX Section */}
          <section id="ui-ux" className="mb-20 scroll-mt-24">
            <h2 className="text-white font-title text-2xl uppercase mb-6">UI/UX Design</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="text-white/70 font-mono text-sm leading-relaxed">
                  Great products start with great design. We help you understand your users and create interfaces that
                  are intuitive, accessible, and delightful to use.
                </p>
                <ul className="text-white/70 font-mono text-sm space-y-2">
                  <li>- User research and testing</li>
                  <li>- Wireframing and prototyping</li>
                  <li>- UI design and design systems</li>
                  <li>- Interaction design</li>
                  <li>- Accessibility audits</li>
                  <li>- Design handoff to developers</li>
                </ul>
              </div>
              <div className="space-y-6">
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">UX Audit</h4>
                  <p className="text-white font-title text-3xl mb-4">£1,000</p>
                  <p className="text-white/70 font-mono text-xs">Review and recommendations</p>
                </div>
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">App Design</h4>
                  <p className="text-white font-title text-3xl mb-4">From £6,000</p>
                  <p className="text-white/70 font-mono text-xs">Full UI/UX for mobile or web app</p>
                </div>
                <div className="border border-white/20 p-6">
                  <h4 className="text-white font-mono text-sm font-bold mb-2">Design System</h4>
                  <p className="text-white font-title text-3xl mb-4">From £4,000</p>
                  <p className="text-white/70 font-mono text-xs">Component library and documentation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Packages Section */}
          <section id="packages" className="scroll-mt-24">
            <h2 className="text-white font-title text-2xl uppercase mb-6">Packages</h2>
            <p className="text-white/70 font-mono text-sm leading-relaxed max-w-2xl mb-8">
              Save money by combining services. These packages are designed for startups and businesses who need a
              complete brand and digital presence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Startup Package */}
              <div className="border border-white p-8 space-y-6">
                <div>
                  <h3 className="text-white font-mono text-sm font-bold mb-2">Startup Package</h3>
                  <p className="text-white font-title text-4xl">£6,000</p>
                  <p className="text-white/50 font-mono text-xs line-through">Usually £7,500</p>
                </div>
                <ul className="text-white/70 font-mono text-sm space-y-2">
                  <li>+ Starter Branding (£2,500)</li>
                  <li>+ Marketing Site (£4,000)</li>
                  <li>+ 1 month support included</li>
                </ul>
                <p className="text-white font-mono text-sm font-bold">Save £1,500</p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center px-6 py-3 bg-white text-[#1100FF] font-mono text-sm font-bold hover:bg-white/90 transition-colors"
                >
                  Get started
                </Link>
              </div>

              {/* Growth Package */}
              <div className="border border-white p-8 space-y-6">
                <div>
                  <h3 className="text-white font-mono text-sm font-bold mb-2">Growth Package</h3>
                  <p className="text-white font-title text-4xl">£12,000</p>
                  <p className="text-white/50 font-mono text-xs line-through">Usually £15,000</p>
                </div>
                <ul className="text-white/70 font-mono text-sm space-y-2">
                  <li>+ Complete Branding (£5,000)</li>
                  <li>+ Marketing Site (£4,000)</li>
                  <li>+ App Design (£6,000)</li>
                  <li>+ 3 months support included</li>
                </ul>
                <p className="text-white font-mono text-sm font-bold">Save £3,000</p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center px-6 py-3 bg-white text-[#1100FF] font-mono text-sm font-bold hover:bg-white/90 transition-colors"
                >
                  Get started
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20 pt-12 border-t border-white/20">
            <p className="text-white/70 font-mono text-sm mb-4">Not sure what you need? Every project is different.</p>
            <Link
              href="/contact"
              className="inline-block text-white font-mono text-sm underline hover:opacity-70 transition-opacity"
            >
              Get in touch for a custom quote
            </Link>
          </section>
        </div>
      </div>
    </PageWrapper>
  )
}
