"use client"

import type React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { useState } from "react"
import { ArrowRight, Copy, ArrowUpRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const BLUE = "#1100FF"

export default function ContactPage() {
  const { toast } = useToast()
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

  const phoneNumber = "(+44) 07707 683220"
  const email = "hello@studioreturn.co"

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

  if (isSubmitted) {
    return (
      <PageWrapper>
        <div className="px-8 py-16 min-h-[60vh] flex items-center" style={{ backgroundColor: BLUE }}>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-white mb-6 text-3xl md:text-5xl tracking-wide font-serif font-bold">Thanks!</h1>
            <p className="text-white/80 font-mono text-base leading-relaxed">
              We&apos;ve received your message and will get back to you within 2 business days.
            </p>
          </div>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 
            className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" 
            style={{ 
              fontFamily: "Georgia, 'Times New Roman', serif",
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              animationDelay: '0.1s'
            }}
          >
            Get in touch
          </h1>
          <p 
            className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed"
            style={{
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              animationDelay: '0.15s'
            }}
          >
            Got a project in mind? Tell us about it. We&apos;ll get back to you within 2 business days.
          </p>
        </div>
      </section>
      
      <div className="px-8 py-24" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="md:col-span-2">
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
                    placeholder="your.name@email.com"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors resize-none"
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
      </div>
    </PageWrapper>
  )
}
