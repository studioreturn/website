"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowUpRight, ArrowRight, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useRef } from "react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export default function WorkPage() {
  const { toast } = useToast()
  const workGridRef = useRef<HTMLDivElement>(null)
  const workSectionRef = useRef<HTMLDivElement>(null)
  const [horizontalLinePositions, setHorizontalLinePositions] = useState<number[]>([])
  
  useEffect(() => {
    const calculateLinePositions = () => {
      if (!workGridRef.current || !workSectionRef.current) return
      
      const grid = workGridRef.current
      const section = workSectionRef.current
      
      // Find the group divs and get their first child (the thumbnail)
      const groups = grid.querySelectorAll('.group')
      if (groups.length < 4) return

      // Grid is 2 columns, so:
      // Row 1: groups[0] (left), groups[1] (right)
      // Row 2: groups[2] (left), groups[3] (right)
      const firstRowLeft = groups[0] as HTMLElement
      const firstRowRight = groups[1] as HTMLElement
      const secondRowLeft = groups[2] as HTMLElement
      const secondRowRight = groups[3] as HTMLElement
      
      // Get the thumbnail divs (first child of each group - the aspect-[4/3] div)
      const firstRowLeftThumb = firstRowLeft.firstElementChild as HTMLElement
      const firstRowRightThumb = firstRowRight.firstElementChild as HTMLElement
      const secondRowLeftThumb = secondRowLeft.firstElementChild as HTMLElement
      const secondRowRightThumb = secondRowRight.firstElementChild as HTMLElement
      
      if (!firstRowLeftThumb || !firstRowRightThumb || !secondRowLeftThumb || !secondRowRightThumb) return
      
      const sectionRect = section.getBoundingClientRect()
      const firstRowLeftRect = firstRowLeftThumb.getBoundingClientRect()
      const firstRowRightRect = firstRowRightThumb.getBoundingClientRect()
      const secondRowLeftRect = secondRowLeftThumb.getBoundingClientRect()
      const secondRowRightRect = secondRowRightThumb.getBoundingClientRect()
      
      // Calculate positions relative to the section (where grid lines container is positioned)
      // Four lines: top and bottom of each row
      const topOfFirstRow = firstRowLeftRect.top - sectionRect.top
      const bottomOfFirstRow = Math.max(firstRowLeftRect.bottom, firstRowRightRect.bottom) - sectionRect.top
      const topOfSecondRow = secondRowLeftRect.top - sectionRect.top
      const bottomOfSecondRow = Math.max(secondRowLeftRect.bottom, secondRowRightRect.bottom) - sectionRect.top
      
      setHorizontalLinePositions([topOfFirstRow, bottomOfFirstRow, topOfSecondRow, bottomOfSecondRow])
    }

    // Wait for layout to settle, try multiple times to ensure elements are rendered
    const timeoutId1 = setTimeout(calculateLinePositions, 100)
    const timeoutId2 = setTimeout(calculateLinePositions, 500)
    const timeoutId3 = setTimeout(calculateLinePositions, 1000)
    window.addEventListener('resize', calculateLinePositions)
    
    return () => {
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
      clearTimeout(timeoutId3)
      window.removeEventListener('resize', calculateLinePositions)
    }
  }, [])
  
  
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
      <section className="px-4 md:px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
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
            Work
          </h1>
          <p 
            className="text-white/80 font-mono text-lg md:text-xl md:max-w-[calc(50%-3rem)] leading-relaxed"
            style={{
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              animationDelay: '0.15s'
            }}
          >
            Some selected projects.
          </p>
        </div>
      </section>

      <section ref={workSectionRef} className="px-4 md:px-8 py-8 md:py-16 relative" style={{ backgroundColor: GREY_BG }}>
        {/* Grid lines for work section */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          {/* Mobile: Simple vertical lines */}
          <div className="md:hidden max-w-6xl mx-auto h-full relative px-8">
            <div 
              className="absolute top-0 bottom-0"
              style={{ 
                left: '-1px',
                width: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                opacity: 0,
                animation: 'drawVertical 0.4s ease-out forwards',
                animationDelay: '0.15s'
              }}
            />
            <div 
              className="absolute top-0 bottom-0"
              style={{ 
                right: '-1px',
                width: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                opacity: 0,
                animation: 'drawVertical 0.4s ease-out forwards',
                animationDelay: '0.2s'
              }}
            />
          </div>
          
          {/* Desktop: Full grid */}
          <div className="hidden md:block absolute inset-0 pointer-events-none">
          {/* Vertical lines - constrained to content width */}
          <div className="max-w-6xl mx-auto h-full relative px-8">
            {/* Left edge of first column */}
            <div 
              className="absolute top-0 bottom-0"
              style={{ 
                left: '-1px',
                width: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                opacity: 0,
                animation: 'drawVertical 0.4s ease-out forwards',
                animationDelay: '0.15s'
              }}
            />
            {/* Right edge of first column (inner edge of gap) */}
            <div 
              className="absolute top-0 bottom-0"
              style={{ 
                left: 'calc(50% - 1rem + 1px)',
                width: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                opacity: 0,
                animation: 'drawVertical 0.4s ease-out forwards',
                animationDelay: '0.2s'
              }}
            />
            {/* Left edge of second column (inner edge of gap) */}
            <div 
              className="absolute top-0 bottom-0"
              style={{ 
                left: 'calc(50% + 1rem - 1px)',
                width: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                opacity: 0,
                animation: 'drawVertical 0.4s ease-out forwards',
                animationDelay: '0.25s'
              }}
            />
            {/* Right edge of second column */}
            <div 
              className="absolute top-0 bottom-0"
              style={{ 
                right: '-1px',
                width: '1px',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                zIndex: 10,
                opacity: 0,
                animation: 'drawVertical 0.4s ease-out forwards',
                animationDelay: '0.3s'
              }}
            />
          </div>
          
          {/* Horizontal lines - full width, aligned with work thumbnails */}
          {horizontalLinePositions.length >= 4 && (
            <>
              {/* Top of first row */}
              <div 
                className="absolute left-0 right-0"
                style={{ 
                  top: `${horizontalLinePositions[0] - 1}px`,
                  height: '1px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  opacity: 0,
                  animation: 'drawHorizontal 0.4s ease-out forwards',
                  animationDelay: '0.4s'
                }}
              />
              {/* Bottom of first row */}
              <div 
                className="absolute left-0 right-0"
                style={{ 
                  top: `${horizontalLinePositions[1] + 1}px`,
                  height: '1px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  opacity: 0,
                  animation: 'drawHorizontal 0.4s ease-out forwards',
                  animationDelay: '0.45s'
                }}
              />
              {/* Top of second row */}
              <div 
                className="absolute left-0 right-0"
                style={{ 
                  top: `${horizontalLinePositions[2] - 1}px`,
                  height: '1px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  opacity: 0,
                  animation: 'drawHorizontal 0.4s ease-out forwards',
                  animationDelay: '0.5s'
                }}
              />
              {/* Bottom of second row */}
              <div 
                className="absolute left-0 right-0"
                style={{ 
                  top: `${horizontalLinePositions[3] + 1}px`,
                  height: '1px',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  zIndex: 10,
                  opacity: 0,
                  animation: 'drawHorizontal 0.4s ease-out forwards',
                  animationDelay: '0.55s'
                }}
              />
            </>
          )}
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative">
          <div ref={workGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Work Item 1 - Coconut */}
            <div 
              className="group"
              style={{
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.25s'
              }}
            >
              <a
                href="https://www.getcoconut.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div 
                  className="aspect-[4/3] mb-4 relative overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <img
                    src="/Coconut.png"
                    alt="Coconut app interface"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Client Work</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Coconut</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                The bank account for freelancers.
              </p>
              <a
                href="https://www.getcoconut.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-4 font-mono text-sm underline hover:opacity-70 transition-opacity"
                style={{ color: BLUE }}
              >
                View project
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Work Item 2 - Breakout */}
            <div 
              className="group"
              style={{
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.3s'
              }}
            >
              <a
                href="https://letsbreakout.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div 
                  className="aspect-[4/3] mb-4 relative overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <img
                    src="/breakout.png"
                    alt="Breakout website"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </a>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Our Product</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Breakout</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                Your remote team&apos;s new breakout area.
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

            {/* Work Item 3 - Scene */}
            <div 
              className="group"
              style={{
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.35s'
              }}
            >
              <div 
                className="aspect-[4/3] mb-4 relative overflow-hidden"
                style={{
                  backgroundColor: '#ffffff',
                  backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}
              >
                <img
                  src="/scene.png"
                  alt="Scene app interface"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Our Product</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Scene</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                Your guide to the local music scene.
              </p>
              <span className="inline-block mt-4 font-mono text-sm" style={{ color: `${DARK_TEXT}50` }}>Coming soon</span>
            </div>

            {/* Work Item 4 - Bastiant */}
            <div 
              className="group"
              style={{
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.4s'
              }}
            >
              <div className="aspect-[4/3] mb-4 relative overflow-hidden" style={{ backgroundColor: '#ededf2' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-2xl return-heading" style={{ color: DARK_TEXT }}>
                    Coming soon...
                  </p>
                </div>
              </div>
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: `${DARK_TEXT}50` }}>Client Work</span>
              <h3 className="font-serif font-bold text-xl mb-2 mt-1" style={{ color: DARK_TEXT }}>Bastiant</h3>
              <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>
                The AI market intelligence platform.
              </p>
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
            We&apos;d love to hear about it. Get in touch and let&apos;s make something cool together.
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
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors resize-none disabled:opacity-50"
                      placeholder="Tell us about your project..."
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-center"
                      style={{ color: BLUE }}
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </button>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-mono text-sm font-bold hover:bg-white/10 transition-colors whitespace-nowrap"
                    >
                      Schedule a call
                      <ArrowUpRight className="w-5 h-5" />
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
