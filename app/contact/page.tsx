"use client"

import type React from "react"

import { PageWrapper } from "@/components/page-wrapper"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

const BLUE = "#1100FF"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission - replace with actual form handler
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            <h1 className="text-white mb-6 text-3xl md:text-5xl italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Thanks!</h1>
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
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Get in touch
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            Got a project in mind? Tell us about it. We&apos;ll get back to you within 2 business days.
          </p>
        </div>
      </section>
      
      <div className="px-8 py-16" style={{ backgroundColor: BLUE }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - Info */}
            <div>
              <div className="space-y-6 text-white/70 font-mono text-sm">
                <div>
                  <h3 className="text-white font-bold mb-2">Email</h3>
                  <a href="mailto:hello@studioreturn.co" className="underline hover:text-white transition-colors">
                    hello@studioreturn.co
                  </a>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2">Studio</h3>
                  <p>Studio 51, Spike Island</p>
                  <p>133 Cumberland Road</p>
                  <p>Bristol, BS1 6UX</p>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-2">Social</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/studioreturn.co/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://dribbble.com/studioreturn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-white transition-colors"
                    >
                      Dribbble
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-mono text-sm font-bold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/40 text-white font-mono text-sm px-4 py-3 focus:border-white focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-mono text-sm font-bold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/40 text-white font-mono text-sm px-4 py-3 focus:border-white focus:outline-none transition-colors"
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-white font-mono text-sm font-bold mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/40 text-white font-mono text-sm px-4 py-3 focus:border-white focus:outline-none transition-colors"
                    placeholder="Your company"
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="block text-white font-mono text-sm font-bold mb-2">
                    Budget range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formState.budget}
                    onChange={handleChange}
                    className="w-full bg-[#1100FF] border border-white/40 text-white font-mono text-sm px-4 py-3 focus:border-white focus:outline-none transition-colors"
                  >
                    <option value="">Select a range</option>
                    <option value="under-5k">Under £5,000</option>
                    <option value="5k-10k">£5,000 - £10,000</option>
                    <option value="10k-25k">£10,000 - £25,000</option>
                    <option value="25k-plus">£25,000+</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-white font-mono text-sm font-bold mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-white/40 text-white font-mono text-sm px-4 py-3 focus:border-white focus:outline-none transition-colors resize-none"
                    placeholder="What are you working on? What do you need help with?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: BLUE }}
                >
                  {isSubmitting ? "Sending..." : "Send message"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
