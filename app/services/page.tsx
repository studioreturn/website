"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowRight, Copy, ArrowUpRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export default function ServicesPage() {
  const { toast } = useToast()
  
  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const copyToClipboard = async (text: string, type: string) => {
    const labels: Record<string, string> = {
      phone: "Phone number",
      email: "Email address",
    }

    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard",
        description: `${labels[type]} copied successfully`,
      })
    } catch (err) {
      console.error("Failed to copy:", err)
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const fullAddress = "Studio 51, Spike Island, 133 Cumberland Road, Bristol, BS1 6UX"
  const phoneNumber = "(+44) 07707 683220"
  const email = "hello@studioreturn.co"
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setIsSubmitted(true)
      setFormState({ name: "", email: "", message: "" })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('Form submission error:', error)
      toast({
        title: "Failed to send message",
        description: "Please try again or email us directly at hello@studioreturn.co",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
      <section id="branding" className="px-8 py-16 scroll-mt-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-8" style={{ color: DARK_TEXT }}>Branding</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                Your brand is more than a logo. It&apos;s the feeling people get when they interact with your
                business. We help you define and express that feeling consistently across every touchpoint.
              </p>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>- Logo design and variations</li>
                <li>- Visual identity system</li>
                <li>- Brand guidelines document</li>
                <li>- Typography and colour palette</li>
                <li>- Brand collateral design</li>
                <li>- Social media templates</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Starter</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>£2,500</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Logo, basic guidelines, colour palette</p>
              </div>
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Complete</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>£5,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Full identity system, guidelines, collateral</p>
              </div>
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Enterprise</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>From £10,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Comprehensive rebrand, multi-brand systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Websites Section */}
      <section id="websites" className="px-8 py-16 scroll-mt-24" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-8" style={{ color: DARK_TEXT }}>Website Design & Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                We design and build websites that work beautifully. Fast, accessible, and easy to manage. Whether you
                need a simple marketing site or a complex web application, we&apos;ve got you covered.
              </p>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>- Custom website design</li>
                <li>- Responsive development</li>
                <li>- CMS integration</li>
                <li>- E-commerce solutions</li>
                <li>- Performance optimisation</li>
                <li>- Hosting and maintenance</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Landing Page</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>£1,500</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Single page, responsive design</p>
              </div>
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Marketing Site</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>£4,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Multi-page site with CMS</p>
              </div>
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Web Application</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>From £8,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Custom functionality, user accounts, APIs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UI/UX Section */}
      <section id="ui-ux" className="px-8 py-16 scroll-mt-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-8" style={{ color: DARK_TEXT }}>UI/UX Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <p className="font-mono text-sm leading-relaxed" style={{ color: `${DARK_TEXT}80` }}>
                Great products start with great design. We help you understand your users and create interfaces that
                are intuitive, accessible, and delightful to use.
              </p>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>- User research and testing</li>
                <li>- Wireframing and prototyping</li>
                <li>- UI design and design systems</li>
                <li>- Interaction design</li>
                <li>- Accessibility audits</li>
                <li>- Design handoff to developers</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>UX Audit</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>£1,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Review and recommendations</p>
              </div>
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>App Design</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>From £6,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Full UI/UX for mobile or web app</p>
              </div>
              <div className="border p-6" style={{ borderColor: `${DARK_TEXT}20` }}>
                <h4 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Design System</h4>
                <p className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>From £4,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}80` }}>Component library and documentation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="px-8 py-16 scroll-mt-24" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-8" style={{ color: DARK_TEXT }}>Packages</h2>
          <p className="font-mono text-sm leading-relaxed max-w-2xl mb-8" style={{ color: `${DARK_TEXT}80` }}>
            Save money by combining services. These packages are designed for startups and businesses who need a
            complete brand and digital presence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Startup Package */}
            <div className="border p-8 space-y-6" style={{ borderColor: `${DARK_TEXT}20` }}>
              <div>
                <h3 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Startup Package</h3>
                <p className="font-serif font-bold text-4xl" style={{ color: DARK_TEXT }}>£6,000</p>
                <p className="font-mono text-xs line-through" style={{ color: `${DARK_TEXT}50` }}>Usually £7,500</p>
              </div>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>+ Starter Branding (£2,500)</li>
                <li>+ Marketing Site (£4,000)</li>
                <li>+ 1 month support included</li>
              </ul>
              <p className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>Save £1,500</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Growth Package */}
            <div className="border p-8 space-y-6" style={{ borderColor: `${DARK_TEXT}20` }}>
              <div>
                <h3 className="font-mono text-sm font-bold mb-2" style={{ color: DARK_TEXT }}>Growth Package</h3>
                <p className="font-serif font-bold text-4xl" style={{ color: DARK_TEXT }}>£12,000</p>
                <p className="font-mono text-xs line-through" style={{ color: `${DARK_TEXT}50` }}>Usually £15,000</p>
              </div>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>+ Complete Branding (£5,000)</li>
                <li>+ Marketing Site (£4,000)</li>
                <li>+ App Design (£6,000)</li>
                <li>+ 3 months support included</li>
              </ul>
              <p className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>Save £3,000</p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-white font-serif font-bold text-3xl md:text-4xl mb-6">
            Got a project in mind?
          </h2>
          <p className="text-white/70 font-mono text-base mb-12">
            We&apos;d love to hear about it. Get in touch and let&apos;s make something nice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="md:col-span-2">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <h3 className="text-white font-serif font-bold text-2xl mb-3">Message sent!</h3>
                  <p className="text-white/70 font-mono text-sm">
                    Thanks for getting in touch. We&apos;ll get back to you within 2 business days.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white font-mono text-sm mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formState.name || ""}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-mono text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email || ""}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors disabled:opacity-50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-white font-mono text-sm mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formState.message || ""}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors resize-none disabled:opacity-50"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ color: BLUE }}
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </button>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-mono text-sm font-bold hover:bg-white/10 transition-colors"
                    >
                      Schedule a call
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Details */}
            <div>
              <div className="space-y-4 text-white/80 font-mono text-sm">
                <div>
                  <label className="block text-white font-mono text-sm mb-2">Phone</label>
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${phoneNumber.replace(/[()\s]/g, "")}`}
                      className="text-white/80 hover:text-white/90 transition-colors no-underline inline-block"
                    >
                      {phoneNumber}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(phoneNumber, "phone")}
                      className="text-white/70 hover:text-white transition-colors"
                      title="Copy phone number"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-white font-mono text-sm mb-2">Email</label>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${email}`}
                      className="text-white/80 hover:text-white/90 transition-colors no-underline inline-block"
                    >
                      {email}
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(email, "email")}
                      className="text-white/70 hover:text-white transition-colors"
                      title="Copy email"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white leading-relaxed">
                    Based in Bristol? Let us know and we can chat over a coffee instead :)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
