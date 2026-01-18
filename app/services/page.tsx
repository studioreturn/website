import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export const metadata: Metadata = {
  title: "Services - Return",
  description: "Branding, website design and development, and UI/UX design services from Studio Return.",
}

export default function ServicesPage() {
  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Services
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            We offer a range of design services to help you build polite digital products.
          </p>
        </div>
      </section>
      
      {/* Branding Section */}
      <section id="branding" className="px-8 py-16 scroll-mt-24" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="italic text-3xl mb-8" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>Branding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                Your brand is more than a logo. It&apos;s the feeling people get when they interact with your
                business. We help you define and express that feeling consistently across every touchpoint.
              </p>
              <ul className="font-mono text-sm space-y-2" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                <li>- Logo design and variations</li>
                <li>- Visual identity system</li>
                <li>- Brand guidelines document</li>
                <li>- Typography and colour palette</li>
                <li>- Brand collateral design</li>
                <li>- Social media templates</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="border p-6" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Starter</h4>
                <p className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>£2,500</p>
                <p className="font-mono text-xs" style={{ color: DARK_TEXT, opacity: 0.7 }}>Logo, basic guidelines, colour palette</p>
              </div>
              <div className="border p-6" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Complete</h4>
                <p className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>£5,000</p>
                <p className="font-mono text-xs" style={{ color: DARK_TEXT, opacity: 0.7 }}>Full identity system, guidelines, collateral</p>
              </div>
              <div className="border p-6" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Enterprise</h4>
                <p className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>From £10,000</p>
                <p className="font-mono text-xs" style={{ color: DARK_TEXT, opacity: 0.7 }}>Comprehensive rebrand, multi-brand systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="px-8 py-16 scroll-mt-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white italic text-3xl mb-8" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Website Design & Development</h2>
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
                <p className="text-white italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>£1,500</p>
                <p className="text-white/70 font-mono text-xs">Single page, responsive design</p>
              </div>
              <div className="border border-white/20 p-6">
                <h4 className="text-white font-mono text-sm font-bold mb-2">Marketing Site</h4>
                <p className="text-white italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>£4,000</p>
                <p className="text-white/70 font-mono text-xs">Multi-page site with CMS</p>
              </div>
              <div className="border border-white/20 p-6">
                <h4 className="text-white font-mono text-sm font-bold mb-2">Web Application</h4>
                <p className="text-white italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>From £8,000</p>
                <p className="text-white/70 font-mono text-xs">Custom functionality, user accounts, APIs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UI/UX Section */}
      <section id="ui-ux" className="px-8 py-16 scroll-mt-24" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="italic text-3xl mb-8" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>UI/UX Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                Great products start with great design. We help you understand your users and create interfaces that
                are intuitive, accessible, and delightful to use.
              </p>
              <ul className="font-mono text-sm space-y-2" style={{ color: DARK_TEXT, opacity: 0.7 }}>
                <li>- User research and testing</li>
                <li>- Wireframing and prototyping</li>
                <li>- UI design and design systems</li>
                <li>- Interaction design</li>
                <li>- Accessibility audits</li>
                <li>- Design handoff to developers</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="border p-6" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>UX Audit</h4>
                <p className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>£1,000</p>
                <p className="font-mono text-xs" style={{ color: DARK_TEXT, opacity: 0.7 }}>Review and recommendations</p>
              </div>
              <div className="border p-6" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>App Design</h4>
                <p className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>From £6,000</p>
                <p className="font-mono text-xs" style={{ color: DARK_TEXT, opacity: 0.7 }}>Full UI/UX for mobile or web app</p>
              </div>
              <div className="border p-6" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Design System</h4>
                <p className="italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>From £4,000</p>
                <p className="font-mono text-xs" style={{ color: DARK_TEXT, opacity: 0.7 }}>Component library and documentation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="px-8 py-16 scroll-mt-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white italic text-3xl mb-8" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Packages</h2>
          <p className="text-white/70 font-mono text-sm leading-relaxed max-w-2xl mb-8">
            Save money by combining services. These packages are designed for startups and businesses who need a
            complete brand and digital presence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Startup Package */}
            <div className="border border-white p-8 space-y-6">
              <div>
                <h3 className="text-white font-mono text-sm font-bold mb-2">Startup Package</h3>
                <p className="text-white italic text-4xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>£6,000</p>
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
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
                style={{ color: BLUE }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Growth Package */}
            <div className="border border-white p-8 space-y-6">
              <div>
                <h3 className="text-white font-mono text-sm font-bold mb-2">Growth Package</h3>
                <p className="text-white italic text-4xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>£12,000</p>
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
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
                style={{ color: BLUE }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 pt-12 border-t border-white/20">
            <p className="text-white/70 font-mono text-sm mb-4">Not sure what you need? Every project is different.</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-white font-mono text-sm underline hover:opacity-70 transition-opacity"
            >
              Get in touch for a custom quote
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
