"use client"

import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import { Palette, Globe, Layers, ArrowUpRight, ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const DARK_TEXT = "#0a0033" // Very dark blue-tinted black for legibility
const GREY_BG = "#f5f5fa" // Light grey with subtle blue tint for alternating sections

export default function Page() {
  return (
    <PageWrapper>
      {/* Hero + Selected Work - Combined */}
      <section data-header-boundary>
        <div
          className="px-8 min-h-[48vh] flex items-center"
          style={{ backgroundColor: BLUE }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-white text-3xl md:text-5xl mb-6 font-serif italic font-bold tracking-wide">
              RETURN
            </h1>
            <p className="text-white/80 font-mono text-lg md:text-xl max-w-2xl leading-relaxed mb-6">
              Nicely made brands, websites and digital products. From Bristol, UK.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
              style={{ color: BLUE }}
            >
              Let&apos;s talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="px-8 pt-10 pb-12" style={{ backgroundColor: BLUE }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-white font-serif font-bold text-2xl mb-8">
              Selected work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Work Item 1 - Breakout */}
              <div className="group">
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Our Product
                </span>
                <h3 className="text-white font-serif font-bold text-lg mb-2 mt-1">
                  Breakout
                </h3>
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

              {/* Work Item 2 - Placeholder Client Work */}
              <div className="group">
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-lg mb-2 mt-1">
                  Client project
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  Brand identity and website design for a sustainable fashion brand.
                </p>
                <span className="inline-block mt-4 text-white/50 font-mono text-sm">
                  Coming soon
                </span>
              </div>

              {/* Work Item 3 - Placeholder */}
              <div className="group">
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-lg mb-2 mt-1">
                  SaaS dashboard
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  UI/UX design for an analytics platform.
                </p>
                <span className="inline-block mt-4 text-white/50 font-mono text-sm">
                  Coming soon
                </span>
              </div>

              {/* Work Item 4 - Placeholder */}
              <div className="group">
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-lg mb-2 mt-1">
                  Mobile app
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  iOS app design for a wellness startup.
                </p>
                <span className="inline-block mt-4 text-white/50 font-mono text-sm">
                  Coming soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services - White */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-12" style={{ color: DARK_TEXT }}>
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Branding */}
            <div className="space-y-4">
              <div
                className="w-16 h-16 border flex items-center justify-center mb-6"
                style={{ borderColor: `${BLUE}30` }}
              >
                <Palette className="w-8 h-8" style={{ color: BLUE }} />
              </div>
              <h3 className="font-serif font-bold text-xl" style={{ color: DARK_TEXT }}>
                Brands
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                Logo design, visual identity systems, brand guidelines, and everything you need to establish a memorable
                brand presence.
              </p>
              <Link
                href="/services#branding"
                className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                Learn more
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Website Design & Dev */}
            <div className="space-y-4">
              <div
                className="w-16 h-16 border flex items-center justify-center mb-6"
                style={{ borderColor: `${BLUE}30` }}
              >
                <Globe className="w-8 h-8" style={{ color: BLUE }} />
              </div>
              <h3 className="font-serif font-bold text-xl" style={{ color: DARK_TEXT }}>
                Websites
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                Custom website design and development. From marketing sites to complex web applications, built with
                care.
              </p>
              <Link
                href="/services#websites"
                className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                Learn more
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* UI/UX */}
            <div className="space-y-4">
              <div
                className="w-16 h-16 border flex items-center justify-center mb-6"
                style={{ borderColor: `${BLUE}30` }}
              >
                <Layers className="w-8 h-8" style={{ color: BLUE }} />
              </div>
              <h3 className="font-serif font-bold text-xl" style={{ color: DARK_TEXT }}>
                UI/UX
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                User interface and experience design for apps and digital products. Research, wireframes, prototypes,
                and polished designs.
              </p>
              <Link
                href="/services#ui-ux"
                className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                Learn more
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos - Grey */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-12" style={{ color: DARK_TEXT }}>
            By designers from
          </h2>
          <div className="flex flex-wrap items-center gap-12 md:gap-16">
            <span className="font-mono text-lg" style={{ color: `${DARK_TEXT}50` }}>
              Microsoft
            </span>
            <span className="font-mono text-lg" style={{ color: `${DARK_TEXT}50` }}>
              Spotify
            </span>
            <span className="font-mono text-lg" style={{ color: `${DARK_TEXT}50` }}>
              Monzo
            </span>
          </div>
        </div>
      </section>

      {/* Testimonials - White */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-12" style={{ color: DARK_TEXT }}>
            What our clients say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <blockquote className="font-mono text-lg leading-relaxed" style={{ color: DARK_TEXT }}>
                &ldquo;Return completely transformed our brand. They understood our vision from day one and delivered
                something that exceeded our expectations.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <Image
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah Mitchell"
                  width={48}
                  height={48}
                  className="rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>
                    Sarah Mitchell
                  </p>
                  <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>
                    Founder, TechStart
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <blockquote className="font-mono text-lg leading-relaxed" style={{ color: DARK_TEXT }}>
                &ldquo;Working with Return felt different. They genuinely care about the details and it shows in every
                pixel of our new website.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="James Chen"
                  width={48}
                  height={48}
                  className="rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>
                    James Chen
                  </p>
                  <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>
                    CEO, GreenLeaf Co
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethos - Grey */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="font-serif font-bold text-2xl mb-8" style={{ color: DARK_TEXT }}>
              Our ethos
            </h2>

            <p className="font-mono text-lg leading-relaxed mb-6" style={{ color: DARK_TEXT }}>
              Software should serve you, the user. Nobody else.
            </p>

            <p className="font-mono text-base leading-relaxed mb-8" style={{ color: `${DARK_TEXT}80` }}>
              We believe digital products should behave like polite guests. They shouldn&apos;t shout, they
              shouldn&apos;t interrupt, and they certainly shouldn&apos;t overstay their welcome. We design interactions
              that are quiet, intuitive, and helpful.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}
            >
              Read our full manifesto
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Blue (stays blue) */}
      <section id="contact" className="px-8 py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white font-serif font-bold text-3xl md:text-4xl mb-6">
            Got a project in mind?
          </h2>
          <p className="text-white/70 font-mono text-base mb-8 max-w-xl mx-auto">
            We&apos;d love to hear about it. Get in touch and let&apos;s create something polite together.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
            style={{ color: BLUE }}
          >
            Start a conversation
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
