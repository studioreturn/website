"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { Palette, Globe, Layers } from "lucide-react"

const BLUE = "#1100FF"
const DARK_TEXT = "#0a0033" // Very dark blue-tinted black for legibility
const GREY_BG = "#f5f5fa" // Light grey with subtle blue tint for alternating sections

export default function Page() {
  return (
    <PageWrapper>
      <section className="px-8 min-h-[calc(100vh-88px)] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 font-serif italic font-bold uppercase tracking-wide">
            RETURN
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-2xl leading-relaxed">
            Nicely made brands, websites and digital products. From Bristol, UK.
          </p>
        </div>
      </section>

      {/* Services - White */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-12 uppercase" style={{ color: DARK_TEXT }}>
            What We Do
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
              <h3 className="font-serif font-bold text-xl uppercase" style={{ color: DARK_TEXT }}>
                Brands
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                Logo design, visual identity systems, brand guidelines, and everything you need to establish a memorable
                brand presence.
              </p>
              <Link
                href="/services#branding"
                className="inline-block font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                Learn more
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
              <h3 className="font-serif font-bold text-xl uppercase" style={{ color: DARK_TEXT }}>
                Websites
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                Custom website design and development. From marketing sites to complex web applications, built with
                care.
              </p>
              <Link
                href="/services#websites"
                className="inline-block font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                Learn more
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
              <h3 className="font-serif font-bold text-xl uppercase" style={{ color: DARK_TEXT }}>
                UI/UX
              </h3>
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                User interface and experience design for apps and digital products. Research, wireframes, prototypes,
                and polished designs.
              </p>
              <Link
                href="/services#ui-ux"
                className="inline-block font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                Learn more
              </Link>
            </div>
          </div>

          <div className="mt-12">
            <Link
              href="/services"
              className="inline-block px-6 py-3 border font-mono text-sm hover:text-white transition-colors"
              style={{ borderColor: BLUE, color: BLUE }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = BLUE
                e.currentTarget.style.color = "white"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = BLUE
              }}
            >
              View all services & pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Work - Grey */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-8 uppercase" style={{ color: DARK_TEXT }}>
            Selected Work
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 - Breakout */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4 border" style={{ borderColor: `${DARK_TEXT}10` }}></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>
                Our Product
              </span>
              <h3 className="font-serif font-bold text-lg uppercase mb-2 mt-1" style={{ color: DARK_TEXT }}>
                Breakout
              </h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}70` }}>
                A screen time app that helps you break free from your phone.
              </p>
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                View project
              </a>
            </div>

            {/* Work Item 2 - Placeholder Client Work */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4 border" style={{ borderColor: `${DARK_TEXT}10` }}></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>
                Client Work
              </span>
              <h3 className="font-serif font-bold text-lg uppercase mb-2 mt-1" style={{ color: DARK_TEXT }}>
                Client Project
              </h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}70` }}>
                Brand identity and website design for a sustainable fashion brand.
              </p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>
                Coming soon
              </span>
            </div>

            {/* Work Item 3 - Placeholder */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4 border" style={{ borderColor: `${DARK_TEXT}10` }}></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>
                Client Work
              </span>
              <h3 className="font-serif font-bold text-lg uppercase mb-2 mt-1" style={{ color: DARK_TEXT }}>
                SaaS Dashboard
              </h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}70` }}>
                UI/UX design for an analytics platform.
              </p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>
                Coming soon
              </span>
            </div>

            {/* Work Item 4 - Placeholder */}
            <div className="group">
              <div className="aspect-[4/3] bg-white mb-4 border" style={{ borderColor: `${DARK_TEXT}10` }}></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>
                Client Work
              </span>
              <h3 className="font-serif font-bold text-lg uppercase mb-2 mt-1" style={{ color: DARK_TEXT }}>
                Mobile App
              </h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}70` }}>
                iOS app design for a wellness startup.
              </p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>
                Coming soon
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos - White */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-12 uppercase" style={{ color: DARK_TEXT }}>
            Our designers have worked with
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

      {/* Testimonials - Grey */}
      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-2xl mb-12 uppercase" style={{ color: DARK_TEXT }}>
            What our clients say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <blockquote className="font-mono text-lg leading-relaxed" style={{ color: DARK_TEXT }}>
                &ldquo;Return completely transformed our brand. They understood our vision from day one and delivered
                something that exceeded our expectations.&rdquo;
              </blockquote>
              <div>
                <p className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>
                  Sarah Mitchell
                </p>
                <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>
                  Founder, TechStart
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <blockquote className="font-mono text-lg leading-relaxed" style={{ color: DARK_TEXT }}>
                &ldquo;Working with Return felt different. They genuinely care about the details and it shows in every
                pixel of our new website.&rdquo;
              </blockquote>
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
      </section>

      {/* Ethos - White */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="font-serif font-bold text-2xl mb-8 uppercase" style={{ color: DARK_TEXT }}>
              Our Ethos
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
              className="inline-block font-mono text-sm underline hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}
            >
              Read our full manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* CTA - Blue (stays blue) */}
      <section className="px-8 py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white font-serif font-bold text-3xl md:text-4xl uppercase mb-6">
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
