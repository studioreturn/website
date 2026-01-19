"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowUpRight, ArrowRight, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export default function WorkPage() {
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
            Work
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            Selected projects from our portfolio. Each one crafted with care and attention to detail.
          </p>
        </div>
      </section>

      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 - Breakout */}
            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Our Product</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Breakout</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                A screen time app that helps you break free from your phone.
              </p>
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                View project
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Placeholder projects */}
            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Client Work</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Client Project</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                Brand identity and website design for a sustainable fashion brand.
              </p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>Coming soon</span>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Client Work</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>SaaS Dashboard</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>UI/UX design for an analytics platform.</p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>Coming soon</span>
            </div>

            <div className="group">
              <div className="aspect-[4/3] bg-gray-100 mb-4"></div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Client Work</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Mobile App</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>iOS app design for a wellness startup.</p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>Coming soon</span>
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
