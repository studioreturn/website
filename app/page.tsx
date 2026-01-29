"use client"

import Link from "next/link"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowUpRight, ArrowRight, Copy, X } from "lucide-react"
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
  const [isMobile, setIsMobile] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Set<'client-work' | 'labs'>>(new Set())
  const [animationsComplete, setAnimationsComplete] = useState(false)
  
  // Contact form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    // Mark animations as complete after all image animations finish (1.2s + 0.4s max delay = 1.6s)
    const timer = setTimeout(() => {
      setAnimationsComplete(true)
    }, 1700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const calculateLinePositions = () => {
      if (!workGridRef.current || !workSectionRef.current) return
      
      const grid = workGridRef.current
      const section = workSectionRef.current
      
      // Find the group divs and get their first child (the thumbnail)
      const groups = grid.querySelectorAll('.group')
      if (groups.length < 4) return

      const sectionRect = section.getBoundingClientRect()
      const isMobileLayout = window.innerWidth < 768
      
      if (isMobileLayout) {
        // Mobile: 1 column, so each item gets its own row
        // We need 8 lines: top and bottom of each of the 4 items
        const positions: number[] = []
        groups.forEach((group) => {
          const thumb = group.firstElementChild as HTMLElement
          if (!thumb) return
          const thumbRect = thumb.getBoundingClientRect()
          positions.push(thumbRect.top - sectionRect.top) // Top of item
          positions.push(thumbRect.bottom - sectionRect.top) // Bottom of item
        })
        setHorizontalLinePositions(positions)
      } else {
        // Desktop: 2 columns
        // Get visible groups (filtered items won't be in DOM)
        const visibleGroups = Array.from(groups).filter(group => {
          const groupEl = group as HTMLElement
          return groupEl.offsetParent !== null // Check if element is visible
        }) as HTMLElement[]
        
        if (visibleGroups.length === 0) return
        
        // Find items for each row (may have fewer than 4 if filtered)
        const firstRowLeft = visibleGroups[0]
        const firstRowRight = visibleGroups[1] || visibleGroups[0]
        const secondRowLeft = visibleGroups[2] || visibleGroups[visibleGroups.length - 1]
        const secondRowRight = visibleGroups[3] || visibleGroups[visibleGroups.length - 1]
        
        // Get the thumbnail divs (first child of each group - the aspect-[4/3] div)
        const firstRowLeftThumb = firstRowLeft?.firstElementChild as HTMLElement
        const firstRowRightThumb = firstRowRight?.firstElementChild as HTMLElement
        const secondRowLeftThumb = secondRowLeft?.firstElementChild as HTMLElement
        const secondRowRightThumb = secondRowRight?.firstElementChild as HTMLElement
        
        if (!firstRowLeftThumb || !firstRowRightThumb) return
        
        const firstRowLeftRect = firstRowLeftThumb.getBoundingClientRect()
        const firstRowRightRect = firstRowRightThumb.getBoundingClientRect()
        
        // Calculate positions relative to the section (where grid lines container is positioned)
        const topOfFirstRow = firstRowLeftRect.top - sectionRect.top
        const bottomOfFirstRow = Math.max(firstRowLeftRect.bottom, firstRowRightRect.bottom) - sectionRect.top
        
        let positions = [topOfFirstRow, bottomOfFirstRow]
        
        // If we have a second row
        if (secondRowLeftThumb && secondRowRightThumb) {
          const secondRowLeftRect = secondRowLeftThumb.getBoundingClientRect()
          const secondRowRightRect = secondRowRightThumb.getBoundingClientRect()
          const topOfSecondRow = secondRowLeftRect.top - sectionRect.top
          const bottomOfSecondRow = Math.max(secondRowLeftRect.bottom, secondRowRightRect.bottom) - sectionRect.top
          
          positions.push(topOfSecondRow, bottomOfSecondRow)
          
          // Calculate spacing: distance from image bottom to category label
          const firstRowLeftGroup = firstRowLeft as HTMLElement
          const categoryLabel = firstRowLeftGroup.querySelector('span.font-mono.text-xs.uppercase') as HTMLElement
          let spacing = 0
          if (categoryLabel) {
            const categoryRect = categoryLabel.getBoundingClientRect()
            const imageBottom = firstRowLeftRect.bottom
            spacing = categoryRect.top - imageBottom
          }
          
          // Find the bottom of the last visible work item in the second row
          const secondRowLeftGroup = secondRowLeft as HTMLElement
          const secondRowRightGroup = secondRowRight as HTMLElement
          
          // Find the last element in each group (could be "Coming soon" span or link)
          const leftLastElement = Array.from(secondRowLeftGroup.children).pop() as HTMLElement
          const rightLastElement = Array.from(secondRowRightGroup.children).pop() as HTMLElement
          
          let bottomOfLastItem = bottomOfSecondRow
          if (leftLastElement && rightLastElement) {
            const leftRect = leftLastElement.getBoundingClientRect()
            const rightRect = rightLastElement.getBoundingClientRect()
            const maxBottom = Math.max(leftRect.bottom, rightRect.bottom)
            bottomOfLastItem = maxBottom - sectionRect.top
          } else if (leftLastElement) {
            const leftRect = leftLastElement.getBoundingClientRect()
            bottomOfLastItem = leftRect.bottom - sectionRect.top
          } else if (rightLastElement) {
            const rightRect = rightLastElement.getBoundingClientRect()
            bottomOfLastItem = rightRect.bottom - sectionRect.top
          }
          
          // Add the additional line below the last row with the same spacing as above category label
          const bottomLinePosition = bottomOfLastItem + spacing
          positions.push(bottomLinePosition)
        }
        
        setHorizontalLinePositions(positions)
      }
    }

    // Calculate positions immediately - cards are in final DOM position
    // CSS transforms animate them visually but don't affect getBoundingClientRect final positions
    const timeoutId = setTimeout(calculateLinePositions, 50)
    window.addEventListener('resize', calculateLinePositions)
    
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', calculateLinePositions)
    }
  }, [activeFilters, isMobile])

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
      {/* Hero + Selected Work - Combined */}
      <section data-header-boundary className="relative" style={{ backgroundColor: BLUE }}>
        <div
          className="px-4 md:px-8 min-h-[48vh] flex items-center relative"
          style={{ backgroundColor: BLUE }}
        >
          {/* Grid lines for hero section */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
            {/* Mobile: Simple vertical lines */}
            <div className="md:hidden max-w-6xl mx-auto h-full relative px-4">
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: '0px',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.1s'
                }}
              />
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  right: '0px',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.15s'
                }}
              />
            </div>
            
            {/* Desktop: Full grid */}
            <div className="hidden md:block absolute inset-0 pointer-events-none">
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
          </div>
          <div className="max-w-6xl mx-auto w-full relative" style={{ zIndex: 2 }}>
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
              className="text-white/80 font-mono text-lg md:text-xl md:max-w-[calc(50%-3rem)] leading-relaxed mb-6"
              style={{ 
                animation: 'fadeInUp 0.4s ease-out forwards',
                opacity: 0,
                animationDelay: '0.15s'
              }}
            >
              Polite products, brands and websites.
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="cta-button cta-primary-on-blue inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Let&apos;s talk
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/about"
                className="cta-button cta-secondary-on-blue inline-flex items-center gap-2 px-6 py-3 font-mono text-sm font-bold"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.25s'
                }}
              >
                Ethos
              </Link>
            </div>
          </div>
        </div>

        <div ref={workSectionRef} className="px-4 md:px-8 pt-10 pb-12 relative" style={{ backgroundColor: BLUE }}>
          {/* Grid lines for selected work section */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {/* Mobile: Two vertical lines, full width */}
            <div className="md:hidden absolute inset-0">
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  left: '1rem',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.25s'
                }}
              />
              <div 
                className="absolute top-0 bottom-0"
                style={{ 
                  right: '1rem',
                  width: '1px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  zIndex: 0,
                  opacity: 0,
                  animation: 'drawVertical 0.4s ease-out forwards',
                  animationDelay: '0.3s'
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
            </div>
            
            {/* Horizontal lines - full width, aligned with work thumbnails */}
            {/* Mobile: 8 lines (top and bottom of each item), Desktop: 4 lines (top and bottom of each row) */}
            {horizontalLinePositions.length > 0 && (
              <>
                {horizontalLinePositions.map((position, index) => (
                  <div 
                    key={index}
                    className="absolute left-0 right-0"
                    style={{ 
                      top: `${position}px`,
                      height: '1px',
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      zIndex: 0,
                      opacity: 0,
                      animation: 'drawHorizontal 0.6s ease-out forwards',
                      animationDelay: `${0.5 + index * 0.05}s`
                    }}
                  />
                ))}
              </>
            )}
            
          </div>
          <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 
                className="text-white font-serif font-bold text-3xl"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.25s'
                }}
              >
                Selected work
              </h2>
              <div 
                className="flex items-center gap-2 md:justify-end pr-2"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.25s'
                }}
              >
                {/* Clear all button - appears when filters are active */}
                {activeFilters.size > 0 && (
                  <button
                    onClick={() => setActiveFilters(new Set())}
                    className="flex items-center justify-center rounded-full text-white transition-all duration-200"
                    style={{
                      width: '1.75rem',
                      height: '1.75rem',
                      backgroundColor: '#4133FF'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#584DFF'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#4133FF'
                    }}
                    aria-label="Clear all filters"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                
                {/* Merged or individual filter pills */}
                {activeFilters.size > 1 ? (
                  // Merged pill when both filters are active - seamless curved connection like Spotify
                  <div className="flex items-center relative">
                    {/* First pill (Client work) - left side, on top, normal size, slightly lighter */}
                    <button
                      onClick={() => {
                        const newFilters = new Set(activeFilters)
                        newFilters.delete('client-work')
                        setActiveFilters(newFilters)
                      }}
                      className="px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 rounded-full relative"
                      style={{ 
                        backgroundColor: '#5245FF',
                        zIndex: 2
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#6356FF'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#5245FF'
                      }}
                    >
                      Client work
                    </button>
                    {/* Second pill (Labs) - right side, underneath, extended to the left */}
                    <button
                      onClick={() => {
                        const newFilters = new Set(activeFilters)
                        newFilters.delete('labs')
                        setActiveFilters(newFilters)
                      }}
                      className="py-1.5 pr-4 font-mono text-xs uppercase tracking-wider text-white transition-all duration-200 rounded-full relative"
                      style={{ 
                        backgroundColor: '#4133FF',
                        paddingLeft: '2.5rem',
                        marginLeft: '-1.5rem',
                        zIndex: 1
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#584DFF'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#4133FF'
                      }}
                    >
                      Labs
                    </button>
                  </div>
                ) : (
                  // Individual pills when 0 or 1 filter is active
                  <>
                    <button
                      onClick={() => {
                        const newFilters = new Set(activeFilters)
                        if (newFilters.has('client-work')) {
                          newFilters.delete('client-work')
                        } else {
                          newFilters.add('client-work')
                        }
                        setActiveFilters(newFilters)
                      }}
                      className="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200"
                      style={{
                        color: activeFilters.has('client-work') ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: activeFilters.has('client-work') ? '#4133FF' : '#1D0DFF'
                      }}
                      onMouseEnter={(e) => {
                        if (activeFilters.has('client-work')) {
                          e.currentTarget.style.backgroundColor = '#584DFF'
                        } else {
                          e.currentTarget.style.backgroundColor = '#291AFF'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilters.has('client-work')) {
                          e.currentTarget.style.backgroundColor = '#4133FF'
                        } else {
                          e.currentTarget.style.backgroundColor = '#1D0DFF'
                        }
                      }}
                    >
                      Client work
                    </button>
                    <button
                      onClick={() => {
                        const newFilters = new Set(activeFilters)
                        if (newFilters.has('labs')) {
                          newFilters.delete('labs')
                        } else {
                          newFilters.add('labs')
                        }
                        setActiveFilters(newFilters)
                      }}
                      className="px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200"
                      style={{
                        color: activeFilters.has('labs') ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: activeFilters.has('labs') ? '#4133FF' : '#1D0DFF'
                      }}
                      onMouseEnter={(e) => {
                        if (activeFilters.has('labs')) {
                          e.currentTarget.style.backgroundColor = '#584DFF'
                        } else {
                          e.currentTarget.style.backgroundColor = '#291AFF'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFilters.has('labs')) {
                          e.currentTarget.style.backgroundColor = '#4133FF'
                        } else {
                          e.currentTarget.style.backgroundColor = '#1D0DFF'
                        }
                      }}
                    >
                      Labs
                    </button>
                  </>
                )}
              </div>
            </div>

            <div ref={workGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Work Item 1 - Coconut */}
              {(activeFilters.size === 0 || activeFilters.has('client-work')) && (
              <div 
                className={`group ${!animationsComplete ? 'animating' : ''}`}
                data-category="client-work"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.3s'
                }}
              >
                <a
                  href="https://www.getcoconut.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div 
                    className="aspect-[4/3] mb-4 relative cursor-pointer"
                    style={{
                      backgroundColor: '#ffffff',
                      backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="absolute inset-0 work-image-container">
                      {/* Bottom layer */}
                      <Image
                        src="/coconut-bottom.png"
                        alt="Coconut app interface"
                        fill
                        className="object-cover work-image-bottom work-image-coconut"
                        unoptimized
                        onAnimationEnd={(e) => {
                          e.currentTarget.style.animation = 'none'
                          e.currentTarget.style.transform = 'translateY(10px) scale(1) translateX(0) rotate(0deg)'
                        }}
                      />
                      {/* Top layer */}
                      <Image
                        src="/coconut-top.png"
                        alt="Coconut app interface"
                        fill
                        className="object-cover work-image-top work-image-coconut"
                        unoptimized
                        onAnimationEnd={(e) => {
                          e.currentTarget.style.animation = 'none'
                          e.currentTarget.style.transform = 'translateY(10px) scale(1) translateX(0) rotate(0deg)'
                        }}
                      />
                    </div>
                  </div>
                </a>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
                  Coconut
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  The bank account for freelancers.
                </p>
                <a
                  href="https://www.getcoconut.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-4 text-white font-mono text-sm underline hover:opacity-70 transition-opacity"
                >
                  View project
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              )}

              {/* Work Item 2 - Breakout */}
              {(activeFilters.size === 0 || activeFilters.has('labs')) && (
              <div 
                className={`group ${!animationsComplete ? 'animating' : ''}`}
                data-category="labs"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.35s'
                }}
              >
                <a
                  href="https://letsbreakout.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div 
                    className="aspect-[4/3] mb-4 relative cursor-pointer"
                    style={{
                      backgroundColor: '#ffffff',
                      backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                      overflow: 'hidden'
                    }}
                  >
                    <div className="absolute inset-0 work-image-container">
                      {/* Bottom layer */}
                      <Image
                        src="/breakout-bottom.png"
                        alt="Breakout website"
                        fill
                        className="object-cover work-image-bottom work-image-breakout"
                        unoptimized
                        onAnimationEnd={(e) => {
                          e.currentTarget.style.animation = 'none'
                          e.currentTarget.style.transform = 'translateY(0) scale(1) translateX(0) rotate(0deg)'
                        }}
                      />
                      {/* Top layer */}
                      <Image
                        src="/breakout-top.png"
                        alt="Breakout website"
                        fill
                        className="object-cover work-image-top work-image-breakout"
                        unoptimized
                        onAnimationEnd={(e) => {
                          e.currentTarget.style.animation = 'none'
                          e.currentTarget.style.transform = 'translateY(0) scale(1) translateX(0) rotate(0deg)'
                        }}
                      />
                    </div>
                  </div>
                </a>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  LABS
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
                  Breakout
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  Your remote team&apos;s new breakout area.
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
              )}

              {/* Work Item 3 - Scene */}
              {(activeFilters.size === 0 || activeFilters.has('labs')) && (
              <div 
                className={`group ${!animationsComplete ? 'animating' : ''}`}
                data-category="labs"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.4s'
                }}
              >
                <div 
                  className="aspect-[4/3] mb-4 relative cursor-pointer"
                  style={{
                    backgroundColor: '#ffffff',
                    backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    overflow: 'hidden'
                  }}
                >
                  <div className="absolute inset-0 work-image-container">
                    {/* Bottom layer */}
                    <Image
                      src="/scene-bottom.png"
                      alt="Scene app interface"
                      fill
                      className="object-cover work-image-bottom work-image-scene"
                      unoptimized
                      onAnimationEnd={(e) => {
                        e.currentTarget.style.animation = 'none'
                        e.currentTarget.style.transform = 'translateY(10px) scale(1) translateX(0) rotate(0deg)'
                      }}
                    />
                    {/* Top layer */}
                    <Image
                      src="/scene-top.png"
                      alt="Scene app interface"
                      fill
                      className="object-cover work-image-top work-image-scene"
                      unoptimized
                      onAnimationEnd={(e) => {
                        e.currentTarget.style.animation = 'none'
                        e.currentTarget.style.transform = 'translateY(10px) scale(1) translateX(0) rotate(0deg)'
                      }}
                    />
                  </div>
                </div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  LABS
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
                  Scene
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  Your guide to the local music scene.
                </p>
                <span className="inline-block mt-4 text-white/50 font-mono text-sm">
                  Coming soon
                </span>
              </div>
              )}

              {/* Work Item 4 - Bastiant */}
              {(activeFilters.size === 0 || activeFilters.has('client-work')) && (
              <div 
                className="group"
                data-category="client-work"
                style={{ 
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.45s'
                }}
              >
                <div className="aspect-[4/3] mb-4 relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-2xl return-heading">
                      Coming soon...
                    </p>
                  </div>
                </div>
                <span className="text-white/50 font-mono text-xs uppercase tracking-wider">
                  Client Work
                </span>
                <h3 className="text-white font-serif font-bold text-xl mb-2 mt-1">
                  Bastiant
                </h3>
                <p className="text-white/70 font-mono text-sm">
                  The AI market intelligence platform.
                </p>
                <span className="inline-block mt-4 text-white/50 font-mono text-sm">
                  Coming soon
                </span>
              </div>
              )}
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 mt-16 mb-12 font-mono text-sm underline hover:opacity-70 transition-opacity"
              style={{ color: '#ffffff' }}
            >
              View more
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services - White */}
      <section className="px-4 md:px-8 py-8 md:py-16 bg-white">
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
                Logo design, visual identities, and brand guidelines.
              </p>
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
                Bespoke website design and development for marketing sites.
              </p>
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
                User interface design for mobile and web apps.
                From research to visuals.
              </p>
            </div>
          </div>
          <div className="mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}
            >
              Learn more
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos - Grey */}
      <section className="px-4 md:px-8 py-8 md:py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif font-bold text-3xl mb-12" style={{ color: DARK_TEXT }}>
            By people from
          </h2>
          <div className="flex flex-col md:flex-row md:flex-wrap md:items-center md:justify-between gap-8 md:gap-16 w-full">
            {/* Microsoft Logo */}
            <a 
              href="https://www.microsoft.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:flex-1 md:min-w-[20px] flex items-center justify-center company-logo-link"
            >
              <div className="logo-container h-10 md:h-12 w-auto md:max-w-[150px]">
                <svg viewBox="0 0 337.6 72" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-treated" fill="none">
                <path fill={`${DARK_TEXT}80`} d="M140.4,14.4v43.2h-7.5V23.7h-0.1l-13.4,33.9h-5l-13.7-33.9h-0.1v33.9h-6.9V14.4h10.8l12.4,32h0.2l13.1-32H140.4 z M146.6,17.7c0-1.2,0.4-2.2,1.3-3c0.9-0.8,1.9-1.2,3.1-1.2c1.3,0,2.4,0.4,3.2,1.2s1.3,1.8,1.3,3c0,1.2-0.4,2.2-1.3,3 c-0.9,0.8-1.9,1.2-3.2,1.2s-2.3-0.4-3.1-1.2C147.1,19.8,146.6,18.8,146.6,17.7z M154.7,26.6v31h-7.3v-31H154.7z M176.8,52.3 c1.1,0,2.3-0.2,3.6-0.8c1.3-0.5,2.5-1.2,3.6-2v6.8c-1.2,0.7-2.5,1.2-4,1.5c-1.5,0.3-3.1,0.5-4.9,0.5c-4.6,0-8.3-1.4-11.1-4.3 c-2.9-2.9-4.3-6.6-4.3-11c0-5,1.5-9.1,4.4-12.3c2.9-3.2,7-4.8,12.4-4.8c1.4,0,2.8,0.2,4.1,0.5c1.4,0.3,2.5,0.8,3.3,1.2v7 c-1.1-0.8-2.3-1.5-3.4-1.9c-1.2-0.4-2.4-0.7-3.6-0.7c-2.9,0-5.2,0.9-7,2.8s-2.6,4.4-2.6,7.6c0,3.1,0.9,5.6,2.6,7.3 C171.6,51.4,173.9,52.3,176.8,52.3z M204.7,26.1c0.6,0,1.1,0,1.6,0.1s0.9,0.2,1.2,0.3v7.4c-0.4-0.3-0.9-0.6-1.7-0.8 s-1.6-0.4-2.7-0.4c-1.8,0-3.3,0.8-4.5,2.3s-1.9,3.8-1.9,7v15.6h-7.3v-31h7.3v4.9h0.1c0.7-1.7,1.7-3,3-4 C201.2,26.6,202.8,26.1,204.7,26.1z M207.9,42.6c0-5.1,1.5-9.2,4.3-12.2c2.9-3,6.9-4.5,12-4.5c4.8,0,8.6,1.4,11.3,4.3 s4.1,6.8,4.1,11.7c0,5-1.5,9-4.3,12c-2.9,3-6.8,4.5-11.8,4.5c-4.8,0-8.6-1.4-11.4-4.2C209.3,51.3,207.9,47.4,207.9,42.6z M215.5,42.3c0,3.2,0.7,5.7,2.2,7.4s3.6,2.6,6.3,2.6c2.6,0,4.7-0.8,6.1-2.6c1.4-1.7,2.1-4.2,2.1-7.6c0-3.3-0.7-5.8-2.1-7.6 c-1.4-1.7-3.5-2.6-6-2.6c-2.7,0-4.7,0.9-6.2,2.7C216.2,36.5,215.5,39,215.5,42.3z M250.5,34.8c0,1,0.3,1.9,1,2.5 c0.7,0.6,2.1,1.3,4.4,2.2c2.9,1.2,5,2.5,6.1,3.9c1.2,1.5,1.8,3.2,1.8,5.3c0,2.9-1.1,5.2-3.4,7c-2.2,1.8-5.3,2.6-9.1,2.6 c-1.3,0-2.7-0.2-4.3-0.5c-1.6-0.3-2.9-0.7-4-1.2v-7.2c1.3,0.9,2.8,1.7,4.3,2.2c1.5,0.5,2.9,0.8,4.2,0.8c1.6,0,2.9-0.2,3.6-0.7 c0.8-0.5,1.2-1.2,1.2-2.3c0-1-0.4-1.8-1.2-2.6c-0.8-0.7-2.4-1.5-4.6-2.4c-2.7-1.1-4.6-2.4-5.7-3.8s-1.7-3.2-1.7-5.4 c0-2.8,1.1-5.1,3.3-6.9c2.2-1.8,5.1-2.7,8.6-2.7c1.1,0,2.3,0.1,3.6,0.4s2.5,0.6,3.4,0.9V34c-1-0.6-2.1-1.2-3.4-1.7 c-1.3-0.5-2.6-0.7-3.8-0.7c-1.4,0-2.5,0.3-3.2,0.8C250.9,33.1,250.5,33.8,250.5,34.8z M266.9,42.6c0-5.1,1.5-9.2,4.3-12.2 c2.9-3,6.9-4.5,12-4.5c4.8,0,8.6,1.4,11.3,4.3s4.1,6.8,4.1,11.7c0,5-1.5,9-4.3,12c-2.9,3-6.8,4.5-11.8,4.5c-4.8,0-8.6-1.4-11.4-4.2 C268.4,51.3,266.9,47.4,266.9,42.6z M274.5,42.3c0,3.2,0.7,5.7,2.2,7.4s3.6,2.6,6.3,2.6c2.6,0,4.7-0.8,6.1-2.6 c1.4-1.7,2.1-4.2,2.1-7.6c0-3.3-0.7-5.8-2.1-7.6c-1.4-1.7-3.5-2.6-6-2.6c-2.7,0-4.7,0.9-6.2,2.7C275.3,36.5,274.5,39,274.5,42.3z M322.9,32.6h-10.9v25h-7.4v-25h-5.2v-6h5.2v-4.3c0-3.2,1.1-5.9,3.2-8s4.8-3.1,8.1-3.1c0.9,0,1.7,0.1,2.4,0.1s1.3,0.2,1.8,0.4v6.3 c-0.2-0.1-0.7-0.3-1.3-0.5c-0.6-0.2-1.3-0.3-2.1-0.3c-1.5,0-2.7,0.5-3.5,1.4c-0.8,0.9-1.2,2.4-1.2,4.2v3.7h10.9v-7l7.3-2.2v9.2h7.4 v6h-7.4v14.5c0,1.9,0.4,3.2,1,4c0.7,0.8,1.8,1.2,3.3,1.2c0.4,0,0.9-0.1,1.5-0.3c0.6-0.2,1.1-0.4,1.5-0.7v6c-0.5,0.3-1.2,0.5-2.3,0.7 c-1.1,0.2-2.1,0.3-3.2,0.3c-3.1,0-5.4-0.8-6.9-2.4c-1.5-1.6-2.3-4.1-2.3-7.4L322.9,32.6L322.9,32.6z" />
                <rect fill={`${DARK_TEXT}80`} width="34.2" height="34.2" />
                <rect fill={`${DARK_TEXT}80`} x="37.8" width="34.2" height="34.2" />
                <rect fill={`${DARK_TEXT}80`} y="37.8" width="34.2" height="34.2" />
                <rect fill={`${DARK_TEXT}80`} x="37.8" y="37.8" width="34.2" height="34.2" />
              </svg>
              <img src="/microsoft-logo.svg" alt="Microsoft" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-colored" />
              </div>
            </a>

            {/* Ravelin Logo */}
            <a 
              href="https://www.ravelin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:flex-1 md:min-w-[20px] flex items-center justify-center company-logo-link"
            >
              <div className="logo-container h-10 md:h-12 w-auto md:max-w-[150px]">
                <svg viewBox="0 0 159.1 45" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-treated" fill="none">
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
              <img src="/ravelin-logo.svg" alt="Ravelin" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-colored" />
              </div>
            </a>

            {/* Deloitte Logo */}
            <a 
              href="https://www.deloitte.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:flex-1 md:min-w-[20px] flex items-center justify-center company-logo-link"
            >
              <div className="logo-container h-10 md:h-12 w-auto md:max-w-[150px]">
                <svg viewBox="13.8 14.75 892.4 170.5" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-treated" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(-2521.9698,-654.34261)">
                  <g transform="matrix(3.0676446,0,0,3.0676446,-6165.655,-2195.369)">
                    <g transform="matrix(1.7716542,0,0,1.7716542,-2301.0501,-745.37663)">
                      <path d="m 3054.8273,974.3862 c 0,-2.385 1.9363,-4.32 4.32,-4.32 2.385,0 4.3188,1.935 4.3188,4.32 0,2.385 -1.9338,4.31875 -4.3188,4.31875 -2.3837,0 -4.32,-1.93375 -4.32,-4.31875" fill={`${DARK_TEXT}80`} />
                      <path d="m 2917.0546,962.94557 c 0,-2.73625 -0.5287,-4.76625 -1.5862,-6.08875 -1.0588,-1.32125 -2.6626,-1.98125 -4.8188,-1.98125 l -2.2937,0 0,16.7325 1.755,0 c 2.395,0 4.15,-0.71 5.2675,-2.135 1.1162,-1.4225 1.6762,-3.59875 1.6762,-6.5275 m 8.18,-0.285 c 0,4.985 -1.34,8.82625 -4.02,11.5225 -2.68,2.6975 -6.4475,4.04625 -11.3038,4.04625 l -9.4362,0 0,-29.87125 10.095,0 c 4.6825,0 8.2975,1.22625 10.845,3.6775 2.5463,2.4525 3.82,5.9925 3.82,10.625" fill={`${DARK_TEXT}80`} />
                      <path d="m 2951.3731,978.22895 7.5087,0 0,-29.99625 -7.5087,0 0,29.99625 z" fill={`${DARK_TEXT}80`} />
                      <path d="m 2969.4302,967.0402 c 0,1.9125 0.25,3.37125 0.7488,4.37375 0.5,1.00375 1.3374,1.505 2.5149,1.505 1.165,0 1.9888,-0.50125 2.4688,-1.505 0.48,-1.0025 0.7187,-2.46125 0.7187,-4.37375 0,-1.9025 -0.2425,-3.3375 -0.7287,-4.30625 -0.4875,-0.97125 -1.3188,-1.4575 -2.4975,-1.4575 -1.1525,0 -1.9762,0.48375 -2.4762,1.44625 -0.4988,0.96375 -0.7488,2.4025 -0.7488,4.3175 m 14.0937,0 c 0,3.64375 -0.955,6.48625 -2.87,8.52375 -1.9137,2.03875 -4.5925,3.05875 -8.0362,3.05875 -3.3025,0 -5.9313,-1.0425 -7.8825,-3.1275 -1.9537,-2.085 -2.93,-4.9025 -2.93,-8.455 0,-3.6325 0.9563,-6.455 2.8713,-8.4675 1.9149,-2.0125 4.5999,-3.01875 8.0574,-3.01875 2.1363,0 4.0263,0.46625 5.6638,1.3975 1.6387,0.93125 2.9038,2.265 3.7925,4.0025 0.89,1.735 1.3337,3.765 1.3337,6.08625" fill={`${DARK_TEXT}80`} />
                      <path d="m 2986.5059,978.22907 7.51,0 0,-11.48 0,-10.80125 -7.51,0 0,22.28125 z" fill={`${DARK_TEXT}80`} />
                      <path d="m 2986.5056,953.2527 7.51,0 0,-5.02125 -7.51,0 0,5.02125 z" fill={`${DARK_TEXT}80`} />
                      <path d="m 3009.2307,972.54595 c 1.0138,0 2.2213,-0.2575 3.63,-0.76875 l 0,5.60625 c -1.0125,0.445 -1.975,0.76375 -2.89,0.9525 -0.915,0.19125 -1.9888,0.28625 -3.2175,0.28625 -2.5213,0 -4.3387,-0.63375 -5.455,-1.89875 -1.1112,-1.265 -1.6687,-3.2075 -1.6687,-5.82875 l 0,-9.185 -2.63,0 0,-5.76 2.63,0 0,-5.69 7.5675,-1.31625 0,7.00625 4.7912,0 0,5.76 -4.7912,0 0,8.6725 c 0,1.4425 0.6787,2.16375 2.0337,2.16375" fill={`${DARK_TEXT}80`} />
                      <path d="m 3026.6116,972.54595 c 1.0138,0 2.2213,-0.2575 3.63,-0.76875 l 0,5.60625 c -1.0112,0.445 -1.975,0.76375 -2.89,0.9525 -0.9162,0.19125 -1.9862,0.28625 -3.2175,0.28625 -2.5212,0 -4.3387,-0.63375 -5.4525,-1.89875 -1.1137,-1.265 -1.6712,-3.2075 -1.6712,-5.82875 l 0,-9.185 -2.6313,0 0,-5.76 2.6313,0 0,-5.77625 7.5662,-1.23 0,7.00625 4.7938,0 0,5.76 -4.7938,0 0,8.6725 c 0,1.4425 0.6788,2.16375 2.035,2.16375" fill={`${DARK_TEXT}80`} />
                      <path d="m 3039.7174,964.32582 c 0.1025,-1.22 0.4513,-2.11375 1.0462,-2.685 0.5976,-0.57 1.3351,-0.855 2.2176,-0.855 0.9625,0 1.7275,0.32 2.295,0.965 0.5712,0.64125 0.8687,1.5 0.8925,2.575 l -6.4513,0 z m 10.59,-6.145 c -1.785,-1.75 -4.3175,-2.62625 -7.5937,-2.62625 -3.4438,0 -6.0938,1.00625 -7.9513,3.01875 -1.8563,2.0125 -2.785,4.9 -2.785,8.6625 0,3.64375 1.0038,6.45375 3.0063,8.42625 2.0037,1.9725 4.8174,2.96 8.4412,2.96 1.74,0 3.2375,-0.11875 4.4925,-0.355 1.2475,-0.23375 2.455,-0.65625 3.6263,-1.26625 l -1.1538,-5.02125 c -0.8512,0.3475 -1.6612,0.615 -2.4262,0.79125 -1.105,0.25625 -2.3175,0.385 -3.6376,0.385 -1.4474,0 -2.5899,-0.35375 -3.4274,-1.06125 -0.8375,-0.70875 -1.2838,-1.68625 -1.335,-2.93125 l 13.4225,0 0,-3.42125 c 0,-3.29125 -0.8926,-5.8125 -2.6788,-7.56125" fill={`${DARK_TEXT}80`} />
                      <path d="m 2935.2007,964.32582 c 0.1025,-1.22 0.4513,-2.11375 1.0462,-2.685 0.5963,-0.57 1.335,-0.855 2.2188,-0.855 0.96,0 1.725,0.32 2.2938,0.965 0.5712,0.64125 0.8674,1.5 0.8937,2.575 l -6.4525,0 z m 10.5912,-6.145 c -1.7862,-1.75 -4.3175,-2.62625 -7.5949,-2.62625 -3.4451,0 -6.0938,1.00625 -7.9501,3.01875 -1.8562,2.0125 -2.7862,4.9 -2.7862,8.6625 0,3.64375 1.0025,6.45375 3.0075,8.42625 2.0025,1.9725 4.8162,2.96 8.44,2.96 1.74,0 3.2375,-0.11875 4.4925,-0.355 1.2475,-0.23375 2.455,-0.65625 3.6275,-1.26625 l -1.155,-5.02125 c -0.8513,0.3475 -1.6613,0.615 -2.425,0.79125 -1.1075,0.25625 -2.3187,0.385 -3.6388,0.385 -1.4462,0 -2.5899,-0.35375 -3.4274,-1.06125 -0.8388,-0.70875 -1.2838,-1.68625 -1.335,-2.93125 l 13.4225,0 0,-3.42125 c 0,-3.29125 -0.8926,-5.8125 -2.6776,-7.56125" fill={`${DARK_TEXT}80`} />
                    </g>
                  </g>
                </g>
              </svg>
              <img src="/deloitte-logo.svg" alt="Deloitte" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-colored" />
              </div>
            </a>

            {/* OakNorth Bank Logo */}
            <a 
              href="https://www.oaknorth.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:flex-1 md:min-w-[20px] flex items-center justify-center company-logo-link"
            >
              <div className="logo-container h-10 md:h-12 w-auto md:max-w-[150px]">
                <svg viewBox="0 0 190 50" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-treated" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_413_8550)">
                  <mask id="mask0_413_8550" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="14" width="130" height="22">
                    <path d="M130 14H0V35.9027H130V14Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask0_413_8550)">
                    <path d="M127.302 35.613H129.549C129.672 35.613 129.781 35.5679 129.865 35.4843C129.948 35.3941 129.994 35.2911 129.994 35.1623V26.8249C129.994 24.8033 129.549 23.2388 128.667 22.125C127.785 21.0112 126.498 20.4575 124.804 20.4575C123.555 20.4575 122.364 20.8052 121.231 21.5069C121.109 21.5971 120.974 21.6357 120.826 21.6357C120.671 21.6357 120.542 21.5778 120.439 21.4683C120.336 21.3589 120.278 21.2108 120.278 21.0241V14.4507C120.278 14.3219 120.233 14.2189 120.15 14.1288C120.066 14.0386 119.956 14 119.834 14H117.587C117.465 14 117.355 14.0451 117.272 14.1288C117.182 14.2189 117.143 14.3219 117.143 14.4507V35.1559C117.143 35.2847 117.188 35.3877 117.272 35.4778C117.355 35.5679 117.465 35.6066 117.587 35.6066H119.834C119.956 35.6066 120.066 35.5615 120.15 35.4778C120.233 35.3877 120.278 35.2847 120.278 35.1559V26.9215C120.278 26.2712 120.375 25.7497 120.574 25.357C120.774 24.9642 121.09 24.623 121.534 24.3462C122.416 23.8118 123.266 23.5478 124.07 23.5478C124.985 23.5478 125.674 23.8375 126.144 24.4234C126.614 25.0093 126.852 25.9235 126.852 27.179V35.1623C126.852 35.2911 126.897 35.3941 126.98 35.4843C127.064 35.5744 127.174 35.613 127.296 35.613M109.256 30.9518V24.7711C109.256 24.4685 109.353 24.2239 109.546 24.0243C109.739 23.8311 109.984 23.7345 110.28 23.7345H113.48C113.615 23.7345 113.731 23.683 113.827 23.5864C113.924 23.4899 113.969 23.374 113.969 23.2388V21.2108C113.969 21.0755 113.924 20.9597 113.827 20.8631C113.731 20.7665 113.615 20.715 113.48 20.715H110.28C109.984 20.715 109.739 20.6184 109.546 20.4253C109.353 20.2321 109.256 19.9811 109.256 19.6849V16.028C109.256 15.8928 109.211 15.7769 109.114 15.6803C109.018 15.5838 108.902 15.5323 108.767 15.5323H107.383C107.009 15.5323 106.719 15.6546 106.52 15.9057C106.32 16.1568 106.204 16.4594 106.192 16.8328L106.146 19.775C106.146 20.0454 106.056 20.2708 105.883 20.451C105.702 20.6313 105.477 20.7214 105.2 20.7214H104.537C104.279 20.7214 104.041 20.8116 103.829 20.9854C103.616 21.1592 103.513 21.4103 103.513 21.7451V23.2452C103.513 23.3804 103.558 23.4963 103.655 23.5929C103.751 23.6895 103.867 23.741 104.003 23.741H105.11C105.406 23.741 105.651 23.8375 105.844 24.0307C106.037 24.2239 106.134 24.4749 106.134 24.7775V30.9968C106.134 32.0141 106.307 32.8961 106.662 33.6301C107.009 34.364 107.518 34.9241 108.175 35.304C108.831 35.6903 109.61 35.877 110.499 35.877C111.162 35.877 111.838 35.7675 112.533 35.5422C113.222 35.3169 113.885 35.0014 114.51 34.5958C114.632 34.5056 114.696 34.3898 114.696 34.2288C114.696 34.1902 114.686 34.1322 114.671 34.055L114.394 33.2953C114.271 32.9476 114.091 32.6836 113.866 32.5098C113.641 32.336 113.377 32.2458 113.08 32.2458C112.804 32.2458 112.507 32.3167 112.186 32.4647C111.735 32.6772 111.265 32.7866 110.788 32.7866C110.338 32.7866 109.971 32.6386 109.687 32.3489C109.404 32.0591 109.263 31.5891 109.263 30.9518M96.8433 25.093C97.2296 24.623 97.661 24.2625 98.1503 23.9921C98.6331 23.7216 99.1546 23.5929 99.7019 23.5929C100.017 23.5929 100.313 23.6186 100.584 23.6637C100.738 23.683 100.848 23.6895 100.912 23.6895C101.299 23.6895 101.627 23.58 101.904 23.3547C102.181 23.1293 102.361 22.8267 102.438 22.434L102.683 21.3395C102.702 21.2301 102.693 21.1335 102.644 21.0434C102.599 20.9532 102.528 20.8888 102.438 20.8438C101.73 20.5798 101.009 20.451 100.275 20.451C99.1224 20.451 98.0859 20.8631 97.1781 21.6872C96.9849 21.8546 96.8176 21.9383 96.6759 21.9383C96.457 21.9383 96.251 21.7516 96.0578 21.3846L96.0321 21.3266C95.9162 21.1206 95.7681 20.9661 95.5879 20.8695C95.4076 20.7665 95.1758 20.715 94.8925 20.715H93.6242C93.5019 20.715 93.386 20.7601 93.2959 20.8567C93.1993 20.9468 93.1542 21.0627 93.1542 21.1979V35.1302C93.1542 35.2589 93.1993 35.3684 93.2959 35.4649C93.3924 35.5615 93.5019 35.613 93.6242 35.613H95.8003C95.9355 35.613 96.045 35.5615 96.1415 35.4649C96.2317 35.3684 96.2767 35.2589 96.2767 35.1302V26.9987C96.2767 26.1939 96.4699 25.5566 96.8562 25.0866M78.8357 28.1769C78.8357 27.3013 79.0288 26.5158 79.4216 25.8205C79.8078 25.1252 80.3487 24.5844 81.044 24.1981C81.7329 23.8118 82.5119 23.6186 83.381 23.6186C84.2502 23.6186 85.0228 23.8118 85.7181 24.1981C86.407 24.5844 86.9478 25.1252 87.3405 25.8205C87.7333 26.5158 87.9264 27.3013 87.9264 28.1769C87.9264 29.0525 87.7333 29.838 87.3405 30.5268C86.9542 31.2222 86.4134 31.763 85.7181 32.1493C85.0292 32.5356 84.2502 32.7287 83.381 32.7287C82.5119 32.7287 81.7393 32.5291 81.044 32.1364C80.3551 31.7437 79.8143 31.1964 79.4216 30.5011C79.0353 29.8058 78.8357 29.0267 78.8357 28.164M83.3746 35.8577C84.8425 35.8577 86.1623 35.5293 87.3212 34.8662C88.4801 34.2031 89.3943 33.2953 90.051 32.1235C90.7077 30.9582 91.036 29.6384 91.036 28.1576C91.036 26.6768 90.7077 25.357 90.051 24.1852C89.3943 23.0134 88.4801 22.0992 87.3212 21.4361C86.1559 20.773 84.8425 20.4446 83.3746 20.4446C81.9067 20.4446 80.5869 20.773 79.4216 21.4361C78.2562 22.0992 77.342 23.0134 76.6918 24.1852C76.0415 25.357 75.7132 26.6832 75.7132 28.1576C75.7132 29.6319 76.0415 30.9582 76.6982 32.1235C77.3549 33.2888 78.2691 34.2031 79.428 34.8662C80.5933 35.5293 81.9067 35.8577 83.3746 35.8577ZM70.0797 15.2941L70.1248 28.0031C70.1248 28.1705 70.0733 28.3057 69.9638 28.4087C69.8544 28.5117 69.7321 28.5696 69.5904 28.5696C69.4939 28.5696 69.4037 28.5439 69.3072 28.4924C69.217 28.4409 69.1398 28.3636 69.0689 28.267L60.7122 15.7512C60.474 15.3842 60.2164 15.1267 59.9396 14.9786C59.6627 14.8305 59.3151 14.7597 58.8773 14.7597H57.1197C56.978 14.7597 56.8557 14.8112 56.7527 14.9142C56.6497 15.0172 56.5982 15.146 56.5982 15.3005V35.0786C56.5982 35.2332 56.6497 35.3619 56.7527 35.4649C56.8557 35.5679 56.978 35.6195 57.1197 35.6195H59.2507C59.4052 35.6195 59.534 35.5679 59.6305 35.4649C59.7336 35.3619 59.7851 35.2332 59.7851 35.0786L59.74 21.8031C59.74 21.6357 59.7915 21.5005 59.901 21.3975C60.004 21.2945 60.1392 21.2365 60.2872 21.2365C60.3838 21.2365 60.474 21.2623 60.5705 21.3138C60.6607 21.3653 60.7379 21.4426 60.8087 21.5391L69.6162 34.731C69.848 35.0786 70.0797 35.3169 70.3244 35.4392C70.5626 35.5615 70.9038 35.6195 71.3481 35.6195H72.758C72.8997 35.6195 73.022 35.5679 73.125 35.4649C73.228 35.3619 73.2795 35.2332 73.2795 35.0786V15.2941C73.2795 15.1396 73.228 15.0109 73.125 14.9078C73.022 14.8048 72.8997 14.7533 72.758 14.7533H70.6141C70.4596 14.7533 70.3308 14.8048 70.2342 14.9078C70.1377 15.0109 70.0797 15.1396 70.0797 15.2941ZM44.5459 28.3057L49.0397 34.6473C49.2779 34.9885 49.5548 35.2332 49.8574 35.3812C50.16 35.5293 50.5591 35.6066 51.0613 35.6066H52.9348C53.0314 35.6066 53.1087 35.5744 53.173 35.5164C53.2374 35.4585 53.2632 35.3877 53.2632 35.2975C53.2632 35.2074 53.2374 35.1366 53.1924 35.0786L48.5697 28.795C48.3766 28.5246 48.28 28.2348 48.28 27.9322C48.28 27.6297 48.3766 27.3464 48.5697 27.076L52.8769 21.2301C52.9219 21.1528 52.9477 21.082 52.9477 21.0112C52.9477 20.9339 52.9155 20.8631 52.8447 20.7987C52.7803 20.7343 52.6966 20.7021 52.6 20.7021H50.4948C50.0698 20.7021 49.7286 20.773 49.4711 20.9146C49.2135 21.0562 48.956 21.3138 48.7049 21.6807L44.5394 27.5975C44.4686 27.694 44.4364 27.8099 44.4364 27.9451C44.4364 28.0739 44.4686 28.1898 44.5394 28.2928M40.9662 35.5937H43.1552C43.2904 35.5937 43.3999 35.5422 43.4964 35.4456C43.5866 35.349 43.6316 35.2396 43.6316 35.1108V14.4829C43.6316 14.3477 43.5866 14.2318 43.4964 14.1416C43.4063 14.0515 43.2904 14.0064 43.1552 14.0064H40.9662C40.8439 14.0064 40.728 14.0515 40.6379 14.1416C40.5413 14.2318 40.4962 14.3477 40.4962 14.4829V35.1366C40.4962 35.2654 40.5413 35.3748 40.6379 35.4714C40.7344 35.5679 40.8439 35.6195 40.9662 35.6195M26.3 28.2155C26.3 27.3399 26.4803 26.5545 26.8473 25.8592C27.2142 25.1638 27.7164 24.623 28.3667 24.2367C29.0169 23.8504 29.7445 23.6573 30.5492 23.6573C31.1287 23.6573 31.6759 23.7667 32.191 23.9856C32.7125 24.2045 33.1567 24.4814 33.5301 24.8097C33.955 25.1574 34.1675 25.7304 34.1675 26.5158V29.5611C34.1675 30.0053 34.1095 30.3852 33.9872 30.7007C33.8649 31.0097 33.6718 31.2865 33.4013 31.5312C32.5258 32.3295 31.5536 32.7287 30.4913 32.7287C29.6865 32.7287 28.9654 32.5356 28.3281 32.1557C27.6971 31.7694 27.1949 31.235 26.8344 30.5526C26.4739 29.8701 26.2936 29.0911 26.2936 28.2284M29.796 35.922C31.2059 35.922 32.4421 35.51 33.4979 34.6859C33.6331 34.5765 33.7554 34.525 33.8585 34.525C34.0194 34.525 34.1611 34.6602 34.2769 34.9306L34.3027 34.9756C34.3993 35.1881 34.5216 35.349 34.6697 35.4649C34.8177 35.5744 35.0238 35.6323 35.2813 35.6323H36.8265C36.9617 35.6323 37.0711 35.5808 37.1677 35.4843C37.2578 35.3877 37.3029 35.2782 37.3029 35.1495V21.1979C37.3029 21.0627 37.2578 20.9468 37.1677 20.8567C37.0776 20.7665 36.9617 20.715 36.8265 20.715H34.7083C34.5667 20.715 34.4443 20.7601 34.3542 20.8567C34.2641 20.9468 34.2061 21.0627 34.1868 21.1979V21.2108C34.1808 21.3395 34.1353 21.4297 34.0645 21.494C33.9937 21.5584 33.8971 21.5906 33.7683 21.5906C33.5881 21.5906 33.4013 21.5262 33.2211 21.4039C32.3455 20.8116 31.3926 20.5154 30.3561 20.5154C28.9719 20.5154 27.7357 20.8438 26.6477 21.5069C25.5596 22.17 24.7033 23.0843 24.0917 24.256C23.4801 25.4278 23.1711 26.7541 23.1711 28.2284C23.1711 29.7028 23.4543 31.029 24.0209 32.1943C24.5875 33.3596 25.3729 34.2739 26.3773 34.9241C27.3816 35.5808 28.5212 35.9092 29.8024 35.9092M3.2706 25.1896C3.2706 23.7925 3.59251 22.5241 4.24277 21.3846C4.89303 20.2515 5.77506 19.3501 6.90174 18.6934C8.02843 18.0367 9.271 17.7084 10.6359 17.7084C12.0008 17.7084 13.2434 18.0367 14.37 18.6934C15.4903 19.3501 16.3788 20.245 17.029 21.3846C17.6793 22.5241 18.0012 23.7925 18.0012 25.1896C18.0012 26.5867 17.6793 27.8421 17.029 28.9881C16.3788 30.1277 15.4967 31.029 14.37 31.6793C13.2434 32.3295 12.0008 32.6579 10.6359 32.6579C9.271 32.6579 8.02843 32.3295 6.90174 31.6793C5.77506 31.029 4.89303 30.1341 4.24277 28.9881C3.59251 27.8486 3.2706 26.5802 3.2706 25.1896ZM10.623 35.8705C12.5931 35.8705 14.3894 35.4006 16.0118 34.4541C17.6342 33.5142 18.9154 32.2265 19.8618 30.5912C20.8018 28.9624 21.2718 27.1597 21.2718 25.1831C21.2718 23.2066 20.8018 21.391 19.8618 19.7622C18.9219 18.1269 17.6342 16.8392 16.0118 15.8992C14.3894 14.9593 12.5931 14.4828 10.623 14.4828C8.65293 14.4828 6.86955 14.9528 5.24713 15.8992C3.6247 16.8392 2.3435 18.1269 1.40353 19.7622C0.469988 21.4039 0 23.213 0 25.1896C0 27.1661 0.469988 28.9624 1.40353 30.5977C2.33706 32.2265 3.61826 33.5142 5.24713 34.4606C6.86955 35.4006 8.66581 35.877 10.623 35.877" fill={`${DARK_TEXT}80`}/>
                  </g>
                  <mask id="mask1_413_8550" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="140" y="0" width="50" height="50">
                    <path d="M190 0H140V50H190V0Z" fill="white"/>
                  </mask>
                  <g mask="url(#mask1_413_8550)">
                    <path d="M190 0V25C190 38.8074 178.807 50 165 50C151.193 50 140 38.8074 140 25C140 11.1926 151.193 0 165 0H190ZM165 9.99902C156.714 9.99902 149.999 16.717 149.999 25C149.999 33.283 156.717 39.998 165 39.998C173.283 39.998 179.998 33.2855 179.998 25C179.998 16.7145 173.286 9.99902 165 9.99902Z" fill={`${DARK_TEXT}80`}/>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_413_8550">
                    <rect width="190" height="50" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <img src="/oaknorth-logo.svg" alt="OakNorth" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-colored" />
              </div>
            </a>

            {/* Beamery Logo */}
            <a 
              href="https://www.beamery.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:flex md:flex-1 md:min-w-[20px] md:items-center md:justify-center company-logo-link"
            >
              <div className="logo-container h-10 md:h-12 w-auto md:max-w-[150px]">
                <svg viewBox="0 0 317.3 70" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-treated" fill="none">
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
              <img src="/beamery-logo.svg" alt="Beamery" className="h-10 md:h-12 w-auto md:max-w-[150px] logo-colored" />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* Testimonials - White - HIDDEN - Uncomment when testimonials are ready */}
      {/* <section className="px-8 py-16 bg-white">
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
      </section> */}

      {/* Ethos - White */}
      <section id="ethos" className="px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="font-serif font-bold text-3xl mb-8" style={{ color: DARK_TEXT }}>
              Ethos
            </h2>

            <p className="font-mono text-lg leading-relaxed mb-6" style={{ color: DARK_TEXT }}>
              We make things that respect people&apos;s time and attention.
            </p>

            <p className="font-mono text-base leading-relaxed mb-8" style={{ color: `${DARK_TEXT}80` }}>
              Our work is thoughtful, honest, and considerate - designed to serve user&apos;s needs, not ours. We believe in solving real problems, communicating clearly, and respecting people&apos;s time and attention. No manipulation, no endless engagement, just human-crafted design that gets out of your way.
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
                  <div className="flex flex-col md:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="cta-button cta-primary-on-blue px-8 py-4 font-mono text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-center"
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </button>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cta-button cta-secondary-on-blue inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-sm font-bold whitespace-nowrap"
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
