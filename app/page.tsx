"use client"

import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowUpRight, ArrowRight, Copy } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useToast } from "@/hooks/use-toast"

const BLUE = "#1100FF"
const DARK_TEXT = "#0a0033" // Very dark blue-tinted black for legibility
const GREY_BG = "#f5f5fa" // Light grey with subtle blue tint for alternating sections

export default function Page() {
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

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const labels: Record<string, string> = {
        address: "Address",
        phone: "Phone number",
        email: "Email",
      }
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

  return (
    <PageWrapper>
      {/* Hero + Selected Work - Combined */}
      <section data-header-boundary className="relative" style={{ backgroundColor: BLUE }}>
        <div
          className="px-8 min-h-[48vh] flex items-center relative"
          style={{ backgroundColor: BLUE }}
        >
          {/* Grid lines for hero section */}
          <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            <div className="max-w-6xl mx-auto h-full relative px-8">
              {/* Left edge of first column */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: 0,
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0s'
                }}
              />
              {/* End of first column */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: 'calc(50% - 1rem)',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.05s'
                }}
              />
              {/* Start of second column */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: 'calc(50% + 1rem)',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.1s'
                }}
              />
              {/* Right edge */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  right: 0,
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.15s'
                }}
              />
            </div>
          </div>
          <div className="max-w-6xl mx-auto w-full">
            <h1 
              className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide return-heading"
              style={{ 
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.1s'
              }}
            >
              RETURN
            </h1>
            <p 
              className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed mb-6"
              style={{ 
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.15s'
              }}
            >
              Nicely made brands, websites and digital products.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
              style={{ 
                color: BLUE,
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.2s'
              }}
            >
              Let&apos;s talk
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div ref={workSectionRef} className="px-8 pt-10 pb-12 relative" style={{ backgroundColor: BLUE }}>
          {/* Grid lines for selected work section */}
          <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {/* Vertical lines - constrained to content width */}
            <div className="max-w-6xl mx-auto h-full relative px-8">
              {/* Left edge of first column */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: 0,
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.15s'
                }}
              />
              {/* End of first column */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: 'calc(50% - 1rem)',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.2s'
                }}
              />
              {/* Start of second column */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: 'calc(50% + 1rem)',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.25s'
                }}
              />
              {/* Right edge */}
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  right: 0,
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
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
                    top: `${horizontalLinePositions[0]}px`,
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    zIndex: 0,
                    opacity: 0,
                    animation: 'drawHorizontal 0.4s ease-out forwards',
                    animationDelay: '0.4s'
                  }}
                />
                {/* Bottom of first row */}
                <div 
                  className="absolute left-0 right-0"
                  style={{ 
                    top: `${horizontalLinePositions[1]}px`,
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    zIndex: 0,
                    opacity: 0,
                    animation: 'drawHorizontal 0.4s ease-out forwards',
                    animationDelay: '0.45s'
                  }}
                />
                {/* Top of second row */}
                <div 
                  className="absolute left-0 right-0"
                  style={{ 
                    top: `${horizontalLinePositions[2]}px`,
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    zIndex: 0,
                    opacity: 0,
                    animation: 'drawHorizontal 0.4s ease-out forwards',
                    animationDelay: '0.5s'
                  }}
                />
                {/* Bottom of second row */}
                <div 
                  className="absolute left-0 right-0"
                  style={{ 
                    top: `${horizontalLinePositions[3]}px`,
                    height: '1px',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    zIndex: 0,
                    opacity: 0,
                    animation: 'drawHorizontal 0.4s ease-out forwards',
                    animationDelay: '0.55s'
                  }}
                />
              </>
            )}
          </div>
          <div className="max-w-6xl mx-auto relative">
            <h2 
              className="text-white font-serif font-bold text-3xl mb-8"
              style={{ 
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.25s'
              }}
            >
              Selected work
            </h2>

            <div ref={workGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Work Item 1 - Breakout */}
              <div 
                className="group"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.3s'
                }}
              >
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Our Product
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
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
              <div 
                className="group"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.35s'
                }}
              >
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
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
              <div 
                className="group"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.4s'
                }}
              >
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
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
              <div 
                className="group"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.45s'
                }}
              >
                <div className="aspect-[4/3] bg-white mb-4 border border-white/20"></div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
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
          <h2 className="font-serif font-bold text-3xl mb-12" style={{ color: DARK_TEXT }}>
            What we do
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Branding */}
            <div className="space-y-4">
              <div className="mb-6">
                <Image
                  src="/branding-icon.svg"
                  alt="Branding icon"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-serif font-bold text-2xl" style={{ color: DARK_TEXT }}>
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
              <div className="mb-6">
                <Image
                  src="/websites-icon.svg"
                  alt="Websites icon"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-serif font-bold text-2xl" style={{ color: DARK_TEXT }}>
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
              <div className="mb-6">
                <Image
                  src="/uiux-icon.svg"
                  alt="UI/UX icon"
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="font-serif font-bold text-2xl" style={{ color: DARK_TEXT }}>
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
          <h2 className="font-serif font-bold text-3xl mb-12" style={{ color: DARK_TEXT }}>
            By designers from
          </h2>
          <div className="flex flex-wrap items-center justify-between gap-16 w-full" style={{ alignItems: 'center' }}>
            {/* Microsoft Logo */}
            <div className="flex-1 min-w-[20px] flex items-center justify-center">
              <svg viewBox="0 0 337.6 72" className="h-12 w-auto max-w-[150px]" fill="none">
                <path fill={`${DARK_TEXT}80`} d="M140.4,14.4v43.2h-7.5V23.7h-0.1l-13.4,33.9h-5l-13.7-33.9h-0.1v33.9h-6.9V14.4h10.8l12.4,32h0.2l13.1-32H140.4 z M146.6,17.7c0-1.2,0.4-2.2,1.3-3c0.9-0.8,1.9-1.2,3.1-1.2c1.3,0,2.4,0.4,3.2,1.2s1.3,1.8,1.3,3c0,1.2-0.4,2.2-1.3,3 c-0.9,0.8-1.9,1.2-3.2,1.2s-2.3-0.4-3.1-1.2C147.1,19.8,146.6,18.8,146.6,17.7z M154.7,26.6v31h-7.3v-31H154.7z M176.8,52.3 c1.1,0,2.3-0.2,3.6-0.8c1.3-0.5,2.5-1.2,3.6-2v6.8c-1.2,0.7-2.5,1.2-4,1.5c-1.5,0.3-3.1,0.5-4.9,0.5c-4.6,0-8.3-1.4-11.1-4.3 c-2.9-2.9-4.3-6.6-4.3-11c0-5,1.5-9.1,4.4-12.3c2.9-3.2,7-4.8,12.4-4.8c1.4,0,2.8,0.2,4.1,0.5c1.4,0.3,2.5,0.8,3.3,1.2v7 c-1.1-0.8-2.3-1.5-3.4-1.9c-1.2-0.4-2.4-0.7-3.6-0.7c-2.9,0-5.2,0.9-7,2.8s-2.6,4.4-2.6,7.6c0,3.1,0.9,5.6,2.6,7.3 C171.6,51.4,173.9,52.3,176.8,52.3z M204.7,26.1c0.6,0,1.1,0,1.6,0.1s0.9,0.2,1.2,0.3v7.4c-0.4-0.3-0.9-0.6-1.7-0.8 s-1.6-0.4-2.7-0.4c-1.8,0-3.3,0.8-4.5,2.3s-1.9,3.8-1.9,7v15.6h-7.3v-31h7.3v4.9h0.1c0.7-1.7,1.7-3,3-4 C201.2,26.6,202.8,26.1,204.7,26.1z M207.9,42.6c0-5.1,1.5-9.2,4.3-12.2c2.9-3,6.9-4.5,12-4.5c4.8,0,8.6,1.4,11.3,4.3 s4.1,6.8,4.1,11.7c0,5-1.5,9-4.3,12c-2.9,3-6.8,4.5-11.8,4.5c-4.8,0-8.6-1.4-11.4-4.2C209.3,51.3,207.9,47.4,207.9,42.6z M215.5,42.3c0,3.2,0.7,5.7,2.2,7.4s3.6,2.6,6.3,2.6c2.6,0,4.7-0.8,6.1-2.6c1.4-1.7,2.1-4.2,2.1-7.6c0-3.3-0.7-5.8-2.1-7.6 c-1.4-1.7-3.5-2.6-6-2.6c-2.7,0-4.7,0.9-6.2,2.7C216.2,36.5,215.5,39,215.5,42.3z M250.5,34.8c0,1,0.3,1.9,1,2.5 c0.7,0.6,2.1,1.3,4.4,2.2c2.9,1.2,5,2.5,6.1,3.9c1.2,1.5,1.8,3.2,1.8,5.3c0,2.9-1.1,5.2-3.4,7c-2.2,1.8-5.3,2.6-9.1,2.6 c-1.3,0-2.7-0.2-4.3-0.5c-1.6-0.3-2.9-0.7-4-1.2v-7.2c1.3,0.9,2.8,1.7,4.3,2.2c1.5,0.5,2.9,0.8,4.2,0.8c1.6,0,2.9-0.2,3.6-0.7 c0.8-0.5,1.2-1.2,1.2-2.3c0-1-0.4-1.8-1.2-2.6c-0.8-0.7-2.4-1.5-4.6-2.4c-2.7-1.1-4.6-2.4-5.7-3.8s-1.7-3.2-1.7-5.4 c0-2.8,1.1-5.1,3.3-6.9c2.2-1.8,5.1-2.7,8.6-2.7c1.1,0,2.3,0.1,3.6,0.4s2.5,0.6,3.4,0.9V34c-1-0.6-2.1-1.2-3.4-1.7 c-1.3-0.5-2.6-0.7-3.8-0.7c-1.4,0-2.5,0.3-3.2,0.8C250.9,33.1,250.5,33.8,250.5,34.8z M266.9,42.6c0-5.1,1.5-9.2,4.3-12.2 c2.9-3,6.9-4.5,12-4.5c4.8,0,8.6,1.4,11.3,4.3s4.1,6.8,4.1,11.7c0,5-1.5,9-4.3,12c-2.9,3-6.8,4.5-11.8,4.5c-4.8,0-8.6-1.4-11.4-4.2 C268.4,51.3,266.9,47.4,266.9,42.6z M274.5,42.3c0,3.2,0.7,5.7,2.2,7.4s3.6,2.6,6.3,2.6c2.6,0,4.7-0.8,6.1-2.6 c1.4-1.7,2.1-4.2,2.1-7.6c0-3.3-0.7-5.8-2.1-7.6c-1.4-1.7-3.5-2.6-6-2.6c-2.7,0-4.7,0.9-6.2,2.7C275.3,36.5,274.5,39,274.5,42.3z M322.9,32.6h-10.9v25h-7.4v-25h-5.2v-6h5.2v-4.3c0-3.2,1.1-5.9,3.2-8s4.8-3.1,8.1-3.1c0.9,0,1.7,0.1,2.4,0.1s1.3,0.2,1.8,0.4v6.3 c-0.2-0.1-0.7-0.3-1.3-0.5c-0.6-0.2-1.3-0.3-2.1-0.3c-1.5,0-2.7,0.5-3.5,1.4c-0.8,0.9-1.2,2.4-1.2,4.2v3.7h10.9v-7l7.3-2.2v9.2h7.4 v6h-7.4v14.5c0,1.9,0.4,3.2,1,4c0.7,0.8,1.8,1.2,3.3,1.2c0.4,0,0.9-0.1,1.5-0.3c0.6-0.2,1.1-0.4,1.5-0.7v6c-0.5,0.3-1.2,0.5-2.3,0.7 c-1.1,0.2-2.1,0.3-3.2,0.3c-3.1,0-5.4-0.8-6.9-2.4c-1.5-1.6-2.3-4.1-2.3-7.4L322.9,32.6L322.9,32.6z" />
                <rect fill={`${DARK_TEXT}80`} width="34.2" height="34.2" />
                <rect fill={`${DARK_TEXT}80`} x="37.8" width="34.2" height="34.2" />
                <rect fill={`${DARK_TEXT}80`} y="37.8" width="34.2" height="34.2" />
                <rect fill={`${DARK_TEXT}80`} x="37.8" y="37.8" width="34.2" height="34.2" />
              </svg>
            </div>

            {/* Ravelin Logo */}
            <div className="flex-1 min-w-[20px] flex items-center justify-center">
              <svg viewBox="0 0 159.1 45" className="h-12 w-auto max-w-[150px]" fill="none">
                <style>{`.st0,.st1{fill:${DARK_TEXT}80}`}</style>
                <g>
                  <g id="ravelinSvg" transform="translate(49.635 7.122)">
                    <g>
                      <path className="st0" d="M13.5,16.7H8.9v8.6H5V1.7h9.4c4.2,0,7.6,3.4,7.6,7.5c0,0,0,0,0,0.1c0,3-1.9,5.7-4.7,6.8l5.4,9.2h-4.2L13.5,16.7z M8.9,13.3h5.6c2.2-0.1,3.8-2,3.7-4.2c-0.1-2-1.7-3.6-3.7-3.7H8.9V13.3z" />
                      <path className="st0" d="M40.9,8.5v16.9h-3.6v-2.4c-1.4,1.9-3.6,3-5.9,2.9c-4.9-0.3-8.7-4.5-8.4-9.4c0.2-4.5,3.9-8.1,8.4-8.4c2.3-0.1,4.5,1,5.9,2.8V8.5H40.9z M37.3,16.9c0-2.9-2.5-5.3-5.4-5.3c-2.9,0-5.3,2.5-5.3,5.4c0,2.9,2.4,5.3,5.3,5.3c2.9,0.1,5.3-2.2,5.3-5.1C37.3,17.1,37.3,17,37.3,16.9L37.3,16.9z" />
                      <path className="st0" d="M59.9,8.5l-6.6,16.9h-4.2L42.5,8.5h4l4.7,12.8l4.7-12.8H59.9z" />
                      <path className="st0" d="M69.1,22.4c1.7,0.1,3.3-0.7,4.3-2.1l3,1.8c-1.7,2.4-4.5,3.8-7.4,3.7c-5.6,0-9.2-3.8-9.2-8.9c-0.2-4.7,3.6-8.7,8.3-8.9c0.2,0,0.4,0,0.6,0c5,0,8.5,4,8.5,8.9c0,0.5-0.1,1-0.1,1.5H63.7C64.3,21.1,66.4,22.4,69.1,22.4z M73.6,15.5c-0.3-2.4-2.4-4.2-4.8-4.1c-2.5-0.1-4.7,1.7-5.1,4.1H73.6z" />
                      <path className="st0" d="M79.8,0.7h3.6v24.6h-3.6L79.8,0.7z" />
                      <path className="st0" d="M86.5,3.6c0-1.3,1-2.3,2.3-2.3c1.3,0,2.3,1,2.3,2.3c0,1.3-1,2.3-2.3,2.3l0,0C87.5,5.9,86.5,4.9,86.5,3.6z M87,8.5h3.6v16.9H87L87,8.5z" />
                      <path className="st0" d="M109.5,15v10.4h-3.6v-10c0.2-1.9-1.2-3.7-3.1-3.9c-0.2,0-0.5,0-0.7,0c-2.4,0-4.3,1.4-4.3,4.9v9h-3.6V8.5h3.6v2.2c1.1-1.7,3.1-2.7,5.2-2.6C106.8,8,109.5,10.6,109.5,15z" />
                    </g>
                  </g>
                  <g id="ravelinLogoSvg">
                    <path className="st1" d="M31.7,17.8l-8.5-6.1l-8.5,6.1l3.2,9.9h10.4L31.7,17.8z M19.7,25.3l-2.2-6.5l5.6-4l5.6,4l-2.1,6.5L19.7,25.3z" />
                    <path className="st1" d="M39.6,18.6l3.2-4.4l-5.2-1.7V0.8L26.4,4.4L23.2,0L20,4.4L8.8,0.8v11.7l-5.2,1.7l3.2,4.4L0,28.1l11.1,3.7v5.5l5.2-1.7l6.9,9.4l6.9-9.5l5.2,1.7v-5.5l11.1-3.6L39.6,18.6z M34.4,25.1l0.5-1.7l1,0.3l2.2-3.1l4.4,6.2l-7.2,2.4v-3.8L34.4,25.1z M18.7,34.8l3.6-1.2v-1h1.7v1l3.6,1.2l-4.5,6.1L18.7,34.8z M19.9,30.2v1.7l-6.4,2.1v-6.8l1.6-0.5l-2-6.2L11.5,21l-4-5.5l6.4-2.1l1,1.4l5.3-3.8l-1-1.4l4-5.4l4,5.4l-1,1.4l5.3,3.8l1-1.4l6.4,2.1l-4,5.5l-1.6-0.5l-2,6.2l1.6,0.5v6.8l-6.4-2.1v-1.7L19.9,30.2z M35.2,11.7l-3.6-1.2L31,11.4l-1.4-1l0.6-0.8l-2.3-3.1l7.3-2.3V11.7z M16.3,9.5l0.4,0.6l0.2,0.2l-1.4,1l-0.6-0.8l-3.6,1.2V4.1l7.3,2.3L16.3,9.5z M12.1,25.1l-1,0.3v3.8l-7.2-2.4l4.5-6.2l2.2,3.1l1-0.3L12.1,25.1z" />
                  </g>
                </g>
              </svg>
            </div>

            {/* Spotify Logo */}
            <div className="flex-1 min-w-[20px] flex items-center justify-center">
              <svg viewBox="0 0 559 168" className="h-12 w-auto max-w-[150px]" fill="none">
                <path fill={`${DARK_TEXT}80`} d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.288 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.802c-1.89 3.072-5.91 4.042-8.98 2.152-22.51-13.836-56.823-17.843-83.448-9.761-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739zm94.56 3.072c-14.46-3.448-17.03-5.868-17.03-10.953 0-4.804 4.52-8.037 11.25-8.037 6.52 0 12.98 2.455 19.76 7.509 0.2 0.153 0.46 0.214 0.71 0.174 0.26-0.038 0.48-0.177 0.63-0.386l7.06-9.952c0.29-0.41 0.21-0.975-0.18-1.288-8.07-6.473-17.15-9.62-27.77-9.62-15.61 0-26.52 9.369-26.52 22.774 0 14.375 9.41 19.465 25.67 23.394 13.83 3.187 16.17 5.857 16.17 10.629 0 5.29-4.72 8.58-12.32 8.58-8.44 0-15.33-2.85-23.03-9.51-0.19-0.17-0.45-0.24-0.69-0.23-0.26 0.02-0.49 0.14-0.65 0.33l-7.92 9.42c-0.33 0.4-0.29 0.98 0.09 1.32 8.96 8 19.98 12.22 31.88 12.22 16.82 0 27.69-9.19 27.69-23.42 0.03-12.007-7.16-18.657-24.77-22.941l-0.03-0.013zm62.86-14.26c-7.29 0-13.27 2.872-18.21 8.757v-6.624c0-0.523-0.42-0.949-0.94-0.949h-12.95c-0.52 0-0.94 0.426-0.94 0.949v73.601c0 0.52 0.42 0.95 0.94 0.95h12.95c0.52 0 0.94-0.43 0.94-0.95v-23.23c4.94 5.53 10.92 8.24 18.21 8.24 13.55 0 27.27-10.43 27.27-30.369 0.02-19.943-13.7-30.376-27.26-30.376l-0.01 0.001zm12.21 30.375c0 10.149-6.25 17.239-15.21 17.239-8.85 0-15.53-7.41-15.53-17.239 0-9.83 6.68-17.238 15.53-17.238 8.81-0.001 15.21 7.247 15.21 17.237v0.001zm50.21-30.375c-17.45 0-31.12 13.436-31.12 30.592 0 16.972 13.58 30.262 30.91 30.262 17.51 0 31.22-13.39 31.22-30.479 0-17.031-13.62-30.373-31.01-30.373v-0.002zm0 47.714c-9.28 0-16.28-7.46-16.28-17.344 0-9.929 6.76-17.134 16.07-17.134 9.34 0 16.38 7.457 16.38 17.351 0 9.927-6.8 17.127-16.17 17.127zm68.27-46.53h-14.25v-14.566c0-0.522-0.42-0.948-0.94-0.948h-12.95c-0.52 0-0.95 0.426-0.95 0.948v14.566h-6.22c-0.52 0-0.94 0.426-0.94 0.949v11.127c0 0.522 0.42 0.949 0.94 0.949h6.22v28.795c0 11.63 5.79 17.53 17.22 17.53 4.64 0 8.49-0.96 12.12-3.02 0.3-0.16 0.48-0.48 0.48-0.82v-10.6c0-0.32-0.17-0.63-0.45-0.8-0.28-0.18-0.63-0.19-0.92-0.04-2.49 1.25-4.9 1.83-7.6 1.83-4.15 0-6.01-1.89-6.01-6.11v-26.76h14.25c0.52 0 0.94-0.426 0.94-0.949v-11.126c0.02-0.523-0.4-0.949-0.93-0.949l-0.01-0.006zm49.64 0.057v-1.789c0-5.263 2.02-7.61 6.54-7.61 2.7 0 4.87 0.536 7.3 1.346 0.3 0.094 0.61 0.047 0.85-0.132 0.25-0.179 0.39-0.466 0.39-0.77v-10.91c0-0.417-0.26-0.786-0.67-0.909-2.56-0.763-5.84-1.546-10.76-1.546-11.95 0-18.28 6.734-18.28 19.467v2.74h-6.22c-0.52 0-0.95 0.426-0.95 0.948v11.184c0 0.522 0.43 0.949 0.95 0.949h6.22v44.405c0 0.53 0.43 0.95 0.95 0.95h12.94c0.53 0 0.95-0.42 0.95-0.95v-44.402h12.09l18.52 44.402c-2.1 4.66-4.17 5.59-6.99 5.59-2.28 0-4.69-0.68-7.14-2.03-0.23-0.12-0.51-0.14-0.75-0.07-0.25 0.09-0.46 0.27-0.56 0.51l-4.39 9.63c-0.21 0.46-0.03 0.99 0.41 1.23 4.58 2.48 8.71 3.54 13.82 3.54 9.56 0 14.85-4.46 19.5-16.44l22.46-58.037c0.12-0.292 0.08-0.622-0.1-0.881-0.17-0.257-0.46-0.412-0.77-0.412h-13.48c-0.41 0-0.77 0.257-0.9 0.636l-13.81 39.434-15.12-39.46c-0.14-0.367-0.49-0.61-0.88-0.61h-22.12v-0.003zm-28.78-0.057h-12.95c-0.52 0-0.95 0.426-0.95 0.949v56.481c0 0.53 0.43 0.95 0.95 0.95h12.95c0.52 0 0.95-0.42 0.95-0.95v-56.477c0-0.523-0.42-0.949-0.95-0.949v-0.004zm-6.4-25.719c-5.13 0-9.29 4.152-9.29 9.281 0 5.132 4.16 9.289 9.29 9.289s9.28-4.157 9.28-9.289c0-5.128-4.16-9.281-9.28-9.281zm113.42 43.88c-5.12 0-9.11-4.115-9.11-9.112s4.04-9.159 9.16-9.159 9.11 4.114 9.11 9.107c0 4.997-4.04 9.164-9.16 9.164zm0.05-17.365c-4.67 0-8.2 3.71-8.2 8.253 0 4.541 3.51 8.201 8.15 8.201 4.67 0 8.2-3.707 8.2-8.253 0-4.541-3.51-8.201-8.15-8.201zm2.02 9.138l2.58 3.608h-2.18l-2.32-3.31h-1.99v3.31h-1.82v-9.564h4.26c2.23 0 3.69 1.137 3.69 3.051 0.01 1.568-0.9 2.526-2.21 2.905h-0.01zm-1.54-4.315h-2.37v3.025h2.37c1.18 0 1.89-0.579 1.89-1.514 0-0.984-0.71-1.511-1.89-1.511z" />
              </svg>
            </div>

            {/* OakNorth Bank Logo */}
            <div className="flex-1 min-w-[20px] flex items-center justify-center" style={{ color: `${DARK_TEXT}80` }}>
              <svg viewBox="0 0 190 50" className="h-12 w-auto max-w-[150px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,14)">
                  <path fill="currentColor" d="m127.302 21.613h2.247c0.123 0 0.232-0.0451 0.316-0.1287 0.083-0.0902 0.129-0.1932 0.129-0.322v-8.3374c0-2.0216-0.445-3.58609-1.327-4.6999s-2.169-1.66749-3.863-1.66749c-1.249 0-2.44 0.34766-3.573 1.04942-0.122 0.09014-0.257 0.12877-0.405 0.12877-0.155 0-0.284-0.05795-0.387-0.1674-0.103-0.10944-0.161-0.25752-0.161-0.44423v-6.5734c0-0.128764-0.045-0.231775-0.128-0.32191-0.084-0.0901348-0.194-0.128764-0.316-0.128764h-2.247c-0.122 0-0.232 0.0450674-0.315 0.128764-0.09 0.090135-0.129 0.193146-0.129 0.32191v20.7052c0 0.1288 0.045 0.2318 0.129 0.3219 0.083 0.0901 0.193 0.1288 0.315 0.1288h2.247c0.122 0 0.232-0.0451 0.316-0.1288 0.083-0.0901 0.128-0.1931 0.128-0.3219v-8.2344c0-0.6503 0.097-1.1718 0.296-1.5645 0.2-0.3928 0.516-0.734 0.96-1.0108 0.882-0.53439 1.732-0.79836 2.536-0.79836 0.915 0 1.604 0.28972 2.074 0.87556 0.47 0.5859 0.708 1.5001 0.708 2.7556v7.9833c0 0.1288 0.045 0.2318 0.128 0.322 0.084 0.0901 0.194 0.1287 0.316 0.1287m-18.04-4.6612v-6.1807c0-0.3026 0.097-0.5472 0.29-0.7468 0.193-0.19318 0.438-0.28975 0.734-0.28975h3.2c0.135 0 0.251-0.05151 0.347-0.14808 0.097-0.09657 0.142-0.21246 0.142-0.34766v-2.02803c0-0.13521-0.045-0.25109-0.142-0.34767-0.096-0.09657-0.212-0.14807-0.347-0.14807h-3.2c-0.296 0-0.541-0.09658-0.734-0.28972-0.193-0.19315-0.29-0.44424-0.29-0.7404v-3.65689c0-0.1352-0.045-0.25109-0.142-0.34766-0.096-0.09657-0.212-0.14808-0.347-0.14808h-1.384c-0.374 0-0.664 0.12233-0.863 0.37342-0.2 0.25108-0.316 0.55368-0.328 0.9271l-0.046 2.94225c0 0.2704-0.09 0.49574-0.263 0.67601-0.181 0.18027-0.406 0.2704-0.683 0.2704h-0.663c-0.258 0-0.496 0.09014-0.708 0.26397-0.213 0.17383-0.316 0.42492-0.316 0.75971v1.5001c0 0.1352 0.045 0.25108 0.142 0.34766 0.096 0.09657 0.212 0.14808 0.348 0.14808h1.107c0.296 0 0.541 0.09657 0.734 0.28971 0.193 0.1932 0.29 0.4442 0.29 0.7468v6.2193c0 1.0173 0.173 1.8993 0.528 2.6333 0.347 0.7339 0.856 1.294 1.513 1.6739 0.656 0.3863 1.435 0.573 2.324 0.573 0.663 0 1.339-0.1095 2.034-0.3348 0.689-0.2253 1.352-0.5408 1.977-0.9464 0.122-0.0902 0.186-0.206 0.186-0.367 0-0.0386-0.01-0.0966-0.025-0.1738l-0.277-0.7597c-0.123-0.3477-0.303-0.6117-0.528-0.7855s-0.489-0.264-0.786-0.264c-0.276 0-0.573 0.0709-0.894 0.2189-0.451 0.2125-0.921 0.3219-1.398 0.3219-0.45 0-0.817-0.148-1.101-0.4377-0.283-0.2898-0.424-0.7598-0.424-1.3971m-12.4197-5.8588c0.3863-0.47 0.8177-0.8305 1.307-1.10092 0.4828-0.27041 1.0043-0.39917 1.5516-0.39917 0.3151 0 0.6111 0.02575 0.8821 0.07082 0.154 0.01931 0.264 0.02575 0.328 0.02575 0.387 0 0.715-0.10945 0.992-0.33479 0.277-0.22533 0.457-0.52793 0.534-0.92066l0.245-1.09449c0.019-0.10945 0.01-0.20602-0.039-0.29616-0.045-0.09013-0.116-0.15451-0.206-0.19958-0.708-0.26397-1.429-0.39273-2.163-0.39273-1.1526 0-2.1891 0.41204-3.0969 1.23613-0.1932 0.1674-0.3605 0.25109-0.5022 0.25109-0.2189 0-0.4249-0.18671-0.6181-0.55368l-0.0257-0.05795c-0.1159-0.20602-0.264-0.36053-0.4442-0.45711-0.1803-0.10301-0.4121-0.15451-0.6954-0.15451h-1.2683c-0.1223 0-0.2382 0.04506-0.3283 0.14164-0.0966 0.09013-0.1417 0.20602-0.1417 0.34122v13.9323c0 0.1287 0.0451 0.2382 0.1417 0.3347 0.0965 0.0966 0.206 0.1481 0.3283 0.1481h2.1761c0.1352 0 0.2447-0.0515 0.3412-0.1481 0.0902-0.0965 0.1352-0.206 0.1352-0.3347v-8.1315c0-0.8048 0.1932-1.4421 0.5795-1.9121m-18.0205 3.0903c0-0.8756 0.1931-1.6611 0.5859-2.3564 0.3862-0.6953 0.9271-1.2361 1.6224-1.6224 0.6889-0.38629 1.4679-0.57944 2.337-0.57944 0.8692 0 1.6418 0.19315 2.3371 0.57944 0.6889 0.3863 1.2297 0.9271 1.6224 1.6224 0.3928 0.6953 0.5859 1.4808 0.5859 2.3564s-0.1931 1.6611-0.5859 2.3499c-0.3863 0.6954-0.9271 1.2362-1.6224 1.6225-0.6889 0.3863-1.4679 0.5794-2.3371 0.5794-0.8691 0-1.6417-0.1996-2.337-0.5923-0.6889-0.3927-1.2297-0.94-1.6224-1.6353-0.3863-0.6953-0.5859-1.4744-0.5859-2.3371m4.5389 7.6937c1.4679 0 2.7877-0.3284 3.9466-0.9915s2.0731-1.5709 2.7298-2.7427c0.6567-1.1653 0.985-2.4851 0.985-3.9659s-0.3283-2.8006-0.985-3.9724c-0.6567-1.17173-1.5709-2.08595-2.7298-2.74909-1.1653-0.66313-2.4787-0.99148-3.9466-0.99148s-2.7877 0.32835-3.953 0.99148c-1.1654 0.66314-2.0796 1.57736-2.7298 2.74909-0.6503 1.1718-0.9786 2.498-0.9786 3.9724 0 1.4743 0.3283 2.8006 0.985 3.9659s1.5709 2.0796 2.7298 2.7427c1.1653 0.6631 2.4787 0.9915 3.9466 0.9915zm-13.2949-20.5636 0.0451 12.709c0 0.1674-0.0515 0.3026-0.161 0.4056-0.1094 0.103-0.2317 0.1609-0.3734 0.1609-0.0965 0-0.1867-0.0257-0.2832-0.0772-0.0902-0.0515-0.1674-0.1288-0.2383-0.2254l-8.3567-12.5158c-0.2382-0.36698-0.4958-0.62451-0.7726-0.772585-0.2769-0.148078-0.6245-0.218898-1.0623-0.218898h-1.7576c-0.1417 0-0.264 0.051505-0.367 0.154516-0.103 0.103007-0.1545 0.231777-0.1545 0.386297v19.7781c0 0.1546 0.0515 0.2833 0.1545 0.3863s0.2253 0.1546 0.367 0.1546h2.131c0.1545 0 0.2833-0.0516 0.3798-0.1546 0.1031-0.103 0.1546-0.2317 0.1546-0.3863l-0.0451-13.2755c0-0.16739 0.0515-0.30259 0.161-0.40561 0.103-0.10301 0.2382-0.16095 0.3862-0.16095 0.0966 0 0.1868 0.02575 0.2833 0.07726 0.0902 0.0515 0.1674 0.12876 0.2382 0.22533l8.8075 13.1919c0.2318 0.3476 0.4635 0.5859 0.7082 0.7082 0.2382 0.1223 0.5794 0.1803 1.0237 0.1803h1.4099c0.1417 0 0.264-0.0516 0.367-0.1546s0.1545-0.2317 0.1545-0.3863v-19.7845c0-0.15452-0.0515-0.28328-0.1545-0.386295-0.103-0.103011-0.2253-0.154516-0.367-0.154516h-2.1439c-0.1545 0-0.2833 0.051505-0.3799 0.154516-0.0965 0.103015-0.1545 0.231775-0.1545 0.386295zm-25.5338 13.0116 4.4938 6.3416c0.2382 0.3412 0.5151 0.5859 0.8177 0.7339 0.3026 0.1481 0.7017 0.2254 1.2039 0.2254h1.8735c0.0966 0 0.1739-0.0322 0.2382-0.0902 0.0644-0.0579 0.0902-0.1287 0.0902-0.2189 0-0.0901-0.0258-0.1609-0.0708-0.2189l-4.6227-6.2836c-0.1931-0.2704-0.2897-0.5602-0.2897-0.8628 0-0.3025 0.0966-0.5858 0.2897-0.8562l4.3072-5.84591c0.045-0.07726 0.0708-0.14808 0.0708-0.2189 0-0.07726-0.0322-0.14808-0.103-0.21246-0.0644-0.06438-0.1481-0.09657-0.2447-0.09657h-2.1052c-0.425 0-0.7662 0.07082-1.0237 0.21246-0.2576 0.14164-0.5151 0.39917-0.7662 0.76614l-4.1655 5.91674c-0.0708 0.0965-0.103 0.2124-0.103 0.3476 0 0.1288 0.0322 0.2447 0.103 0.3477m-3.5732 7.3009h2.189c0.1352 0 0.2447-0.0515 0.3412-0.1481 0.0902-0.0966 0.1352-0.206 0.1352-0.3348v-20.6279c0-0.135202-0.045-0.251089-0.1352-0.341224-0.0901-0.0901345-0.206-0.135202-0.3412-0.135202h-2.189c-0.1223 0-0.2382 0.0450673-0.3283 0.135202-0.0966 0.090135-0.1417 0.206022-0.1417 0.341224v20.6537c0 0.1288 0.0451 0.2382 0.1417 0.3348 0.0965 0.0965 0.206 0.1481 0.3283 0.1481m-14.6662-7.404c0-0.8756 0.1803-1.661 0.5473-2.3563 0.3669-0.6954 0.8691-1.2362 1.5194-1.6225 0.6502-0.38626 1.3778-0.57941 2.1825-0.57941 0.5795 0 1.1267 0.10945 1.6418 0.32835 0.5215 0.21886 0.9657 0.49576 1.3391 0.82406 0.4249 0.3477 0.6374 0.9207 0.6374 1.7061v3.0453c0 0.4442-0.058 0.8241-0.1803 1.1396-0.1223 0.309-0.3154 0.5858-0.5859 0.8305-0.8755 0.7983-1.8477 1.1975-2.91 1.1975-0.8048 0-1.5259-0.1931-2.1632-0.573-0.631-0.3863-1.1332-0.9207-1.4937-1.6031-0.3605-0.6825-0.5408-1.4615-0.5408-2.3242m3.5024 7.6936c1.4099 0 2.6461-0.412 3.7019-1.2361 0.1352-0.1094 0.2575-0.1609 0.3606-0.1609 0.1609 0 0.3026 0.1352 0.4184 0.4056l0.0258 0.045c0.0966 0.2125 0.2189 0.3734 0.367 0.4893 0.148 0.1095 0.3541 0.1674 0.6116 0.1674h1.5452c0.1352 0 0.2446-0.0515 0.3412-0.148 0.0901-0.0966 0.1352-0.2061 0.1352-0.3348v-13.9516c0-0.1352-0.0451-0.25109-0.1352-0.34122-0.0901-0.09014-0.206-0.14164-0.3412-0.14164h-2.1182c-0.1416 0-0.264 0.04506-0.3541 0.14164-0.0901 0.09013-0.1481 0.20602-0.1674 0.34122v0.01288c-6e-3 0.12876-0.0515 0.2189-0.1223 0.28328s-0.1674 0.09657-0.2962 0.09657c-0.1802 0-0.367-0.06438-0.5472-0.18671-0.8756-0.59231-1.8285-0.88847-2.865-0.88847-1.3842 0-2.6204 0.32835-3.7084 0.99148-1.0881 0.66314-1.9444 1.57736-2.556 2.74907-0.6116 1.1718-0.9206 2.4981-0.9206 3.9724 0 1.4744 0.2832 2.8006 0.8498 3.9659s1.352 2.0796 2.3564 2.7298c1.0043 0.6567 2.1439 0.9851 3.4251 0.9851m-26.5318-10.7196c0-1.39711 0.32191-2.66543 0.97217-3.80499 0.65026-1.13312 1.53229-2.03447 2.65897-2.69117 1.12669-0.65669 2.36926-0.98504 3.73416-0.98504s2.6075 0.32835 3.7341 0.98504c1.1203 0.6567 2.0088 1.55161 2.659 2.69117 0.6503 1.13956 0.9722 2.40788 0.9722 3.80499 0 1.3971-0.3219 2.6525-0.9722 3.7985-0.6502 1.1396-1.5323 2.0409-2.659 2.6912-1.1266 0.6502-2.3692 0.9786-3.7341 0.9786s-2.60747-0.3284-3.73416-0.9786c-1.12668-0.6503-2.00871-1.5452-2.65897-2.6912-0.65026-1.1395-0.97217-2.4079-0.97217-3.7985zm7.3524 10.6809c1.9701 0 3.7664-0.4699 5.3888-1.4164 1.6224-0.9399 2.9036-2.2276 3.85-3.8629 0.94-1.6288 1.41-3.4315 1.41-5.4081 0-1.97648-0.47-3.79205-1.41-5.42092-0.9399-1.6353-2.2276-2.92294-3.85-3.86291-1.6224-0.939979-3.4187-1.41641-5.3888-1.41641-1.97007 0-3.75345 0.469989-5.37587 1.41641-1.62243 0.93997-2.90363 2.22761-3.8436 3.86291-0.933542 1.64174-1.40353 3.45087-1.40353 5.42742 0 1.9765 0.469988 3.7728 1.40353 5.4081 0.93353 1.6288 2.21473 2.9165 3.8436 3.8629 1.62242 0.94 3.41868 1.4164 5.37587 1.4164" />
                </g>
                <g transform="translate(140)">
                  <path fill="currentColor" d="m50 25v-25h-25v9.99901h14.9985v15.001z" />
                  <path fill="currentColor" d="m39.9985 25c0 8.2855-6.7155 14.9985-14.9985 14.9985s-15.001-6.7155-15.001-14.9985 6.71549-15.001 15.001-15.001 14.9985 6.71549 14.9985 15.001zm9.999 0c0.0025-13.8074-11.1901-25-24.9975-25s-25 11.1926-25 25 11.1926 25 25 25 25-11.1926 25-25" />
                </g>
              </svg>
            </div>

            {/* Beamery Logo */}
            <div className="flex-1 min-w-[20px] flex items-center justify-center">
              <svg viewBox="0 0 317.3 70" className="h-12 w-auto max-w-[150px]" fill="none">
                <style>{`.st0,.st1{fill:${DARK_TEXT}80}`}</style>
                <g>
                  <g transform="translate(42.729 7.225)">
                    <path className="st0" d="M71.5,30.2c1.6,2,2.4,4.4,2.2,6.9c0.2,3.3-1.3,6.5-3.8,8.5c-3.3,2.2-7.1,3.2-11,3H41.1V6.9h15.3c3.7-0.2,7.4,0.8,10.5,2.9c2.5,2,3.9,5,3.7,8.2c0.1,2-0.4,3.9-1.4,5.6c-0.9,1.5-2.4,2.7-4,3.3v0.2C67.6,27.3,69.8,28.4,71.5,30.2z M62,14.1c-1.8-1.1-3.9-1.6-6.1-1.5h-8.3v12h8.3c2.1,0.2,4.3-0.3,6.1-1.5c1.3-1.1,2-2.8,1.9-4.6C64,16.8,63.3,15.2,62,14.1L62,14.1z M64.9,41.4c1.4-1.2,2.2-3,2-4.9c0.2-1.9-0.6-3.7-2-4.9c-2-1.2-4.3-1.7-6.7-1.5H47.6V43h10.6C60.5,43.2,62.9,42.6,64.9,41.4L64.9,41.4z" />
                    <path className="st0" d="M105.8,36.6H83.4c0.1,2.2,1.1,4.2,2.6,5.7c1.7,1.4,3.8,2,5.9,1.9c1.7,0.1,3.5-0.3,5-1.2c1.2-0.6,2.1-1.7,2.5-3.1h6c-0.6,2.7-2.2,5.1-4.5,6.7c-2.7,1.8-5.8,2.7-9,2.6c-2.7,0.1-5.4-0.6-7.7-1.8c-2.2-1.2-4-3-5.2-5.1c-2.5-4.8-2.5-10.4,0-15.2c1.2-2.2,3-4,5.1-5.2c2.3-1.3,4.9-1.9,7.6-1.9c2.6,0,5.1,0.6,7.4,1.8c2.1,1.2,3.9,3,5,5.1c1.2,2.3,1.8,4.9,1.8,7.6C105.9,35.2,105.9,35.9,105.8,36.6z M86.2,26.8c-1.5,1.4-2.5,3.3-2.7,5.3h16.2c-0.2-2-1.1-3.9-2.6-5.3c-1.5-1.2-3.4-1.9-5.4-1.8C89.7,24.9,87.7,25.6,86.2,26.8L86.2,26.8z" />
                    <path className="st0" d="M139,20.7v27.9h-5.7l-0.4-4.2h-0.2c-0.9,1.5-2.2,2.8-3.8,3.5c-1.8,0.9-3.7,1.3-5.7,1.3c-2.5,0-4.9-0.6-7-1.9c-2.1-1.3-3.8-3.1-5-5.3c-2.4-4.7-2.4-10.2,0-14.9c1.1-2.2,2.9-4,5-5.3c2.1-1.3,4.5-1.9,7-1.9c2,0,3.9,0.4,5.7,1.3c1.6,0.8,2.9,2,3.8,3.5h0.2l0.4-4.2H139z M118.3,41.1c3.4,3.4,9,3.4,12.4,0c3.2-3.7,3.2-9.2,0-12.9c-3.4-3.4-9-3.4-12.4,0C115.1,31.9,115.1,37.4,118.3,41.1z" />
                    <path className="st0" d="M185.8,23.1c2,2.4,3,5.4,2.8,8.5v17h-6.2V33.3c0.1-2-0.4-4-1.5-5.7c-1.1-1.3-2.7-2-4.4-1.9c-1.9,0-3.6,0.7-4.9,2.1c-1.4,1.6-2,3.6-1.9,5.7v15.2h-6.2V33.3c0.1-2-0.4-4-1.5-5.7c-1.1-1.3-2.7-2-4.3-1.9c-1.9-0.1-3.7,0.7-4.9,2.1c-1.3,1.6-2,3.6-1.9,5.7v15.2h-6.2V20.7h5.7l0.4,4.4h0.2c0.7-1.6,1.9-2.9,3.4-3.7c1.6-0.9,3.4-1.4,5.3-1.3c1.9,0,3.8,0.5,5.4,1.4c1.6,1,2.8,2.4,3.5,4.1h0.2c0.8-1.7,2.2-3.1,3.9-4.1c1.8-1,3.8-1.5,5.8-1.5C181.1,19.9,183.8,21,185.8,23.1z" />
                    <path className="st0" d="M220.6,36.6h-22.4c0.1,2.2,1.1,4.2,2.6,5.7c1.7,1.4,3.8,2,5.9,1.9c1.7,0.1,3.5-0.3,5-1.2c1.2-0.6,2.1-1.7,2.5-3.1h5.9c-0.6,2.7-2.2,5.1-4.5,6.7c-2.7,1.8-5.8,2.7-9,2.6c-2.7,0.1-5.4-0.6-7.7-1.8c-2.2-1.2-4-3-5.2-5.1c-2.5-4.8-2.5-10.4,0-15.2c1.2-2.2,3-4,5.1-5.2c2.3-1.3,4.9-1.9,7.6-1.9c2.6,0,5.1,0.6,7.4,1.8c2.1,1.2,3.9,3,5,5.1c1.2,2.3,1.8,4.9,1.8,7.6C220.8,35.2,220.7,35.9,220.6,36.6z M201,26.8c-1.5,1.4-2.5,3.3-2.7,5.3h16.2c-0.2-2-1.1-3.9-2.6-5.3c-1.5-1.2-3.4-1.9-5.4-1.8C204.5,24.9,202.5,25.6,201,26.8L201,26.8z" />
                    <path className="st0" d="M242.1,20.6v5.7c-0.9-0.2-1.8-0.2-2.7-0.2c-2.4-0.1-4.8,0.8-6.4,2.6c-1.7,2.3-2.5,5.2-2.2,8.1v11.8h-6.2V20.7h5.7l0.4,5.4h0.2c0.7-1.8,1.9-3.3,3.5-4.4c1.6-1,3.4-1.5,5.3-1.5C240.4,20.1,241.3,20.3,242.1,20.6z" />
                    <path className="st0" d="M274.5,20.7l-17.9,40.8h-6.6l6.1-13.7l-11.8-27.1h6.6l8.4,20.4h0.2l8.3-20.4H274.5z" />
                  </g>
                  <g>
                    <path className="st1" d="M15.1,62.7l9.6,5.5V31.8c0-1.7-0.9-3.3-2.4-4.1l0,0c-2.3-1.3-5.2-0.5-6.5,1.8c-0.4,0.7-0.6,1.6-0.6,2.4L15.1,62.7z" />
                    <path className="st1" d="M7.2,18.9L7.2,18.9c-2.3-1.3-5.2-0.5-6.5,1.8C0.2,21.4,0,22.2,0,23v25.3c0,3.4,1.8,6.6,4.8,8.3l4.8,2.7V23C9.6,21.3,8.7,19.8,7.2,18.9z" />
                    <path className="st1" d="M64,36.5v-11L32.5,43.6c-1.5,0.9-2.4,2.4-2.4,4.1l0,0c0,2.6,2.1,4.8,4.8,4.8c0.8,0,1.7-0.2,2.4-0.6L64,36.5z" />
                    <path className="st1" d="M30.1,65.2L30.1,65.2c0,2.6,2.1,4.8,4.8,4.8c0.8,0,1.7-0.2,2.4-0.6l21.9-12.7c3-1.7,4.8-4.9,4.8-8.3v-5.5L32.5,61.1C31,61.9,30.1,63.5,30.1,65.2z" />
                    <path className="st1" d="M16.9,7.2l-9.6,5.5L38.8,31c1.5,0.9,3.3,0.9,4.8,0l0,0c2.3-1.3,3.1-4.2,1.7-6.5c-0.4-0.7-1-1.3-1.7-1.7L16.9,7.2z" />
                    <path className="st1" d="M58.7,22.2L58.7,22.2c2.3-1.3,3.1-4.2,1.7-6.5c-0.4-0.7-1-1.3-1.7-1.7L36.8,1.3c-3-1.7-6.6-1.7-9.6,0L22.4,4L54,22.2C55.4,23.1,57.3,23.1,58.7,22.2z" />
                  </g>
                </g>
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials - White */}
      <section className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-12" style={{ color: DARK_TEXT }}>
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
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif font-bold text-3xl mb-8" style={{ color: DARK_TEXT }}>
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
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-white font-mono text-sm mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="body" className="block text-white font-mono text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    id="body"
                    name="body"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/50 font-mono text-sm focus:outline-none focus:border-white/50 focus:bg-white/15 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
                    style={{ color: BLUE }}
                  >
                    Send message
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
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-white font-mono text-sm">Address</label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(fullAddress, "address")}
                      className="text-white/70 hover:text-white transition-colors"
                      title="Copy address"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-white/80">
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/90 transition-colors no-underline inline-block"
                    >
                      Studio 51, Spike Island
                    </a>
                    <br />
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/90 transition-colors no-underline inline-block"
                    >
                      133 Cumberland Road
                    </a>
                    <br />
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/90 transition-colors no-underline inline-block"
                    >
                      Bristol
                    </a>
                    <br />
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white/90 transition-colors no-underline inline-block"
                    >
                      BS1 6UX
                    </a>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-white font-mono text-sm">Phone</label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(phoneNumber, "phone")}
                      className="text-white/70 hover:text-white transition-colors"
                      title="Copy phone number"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <a
                    href={`tel:${phoneNumber.replace(/[()\s]/g, "")}`}
                    className="text-white/80 hover:text-white/90 transition-colors no-underline inline-block"
                  >
                    {phoneNumber}
                  </a>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="block text-white font-mono text-sm">Email</label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(email, "email")}
                      className="text-white/70 hover:text-white transition-colors"
                      title="Copy email"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <a
                    href={`mailto:${email}`}
                    className="text-white/80 hover:text-white/90 transition-colors no-underline inline-block"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
