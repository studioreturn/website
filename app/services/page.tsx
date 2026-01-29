"use client"

import Link from "next/link"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowRight, Copy, ArrowUpRight, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect, useRef } from "react"

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

  // Refs for scroll animations
  const websiteSectionRef = useRef<HTMLElement>(null)
  const brandingSectionRef = useRef<HTMLElement>(null)
  const uiuxSectionRef = useRef<HTMLElement>(null)
  const packagesSectionRef = useRef<HTMLElement>(null)

  // Set up intersection observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -20% 0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Find the scroll-animate divs within each section
    const sections = [
      websiteSectionRef.current,
      brandingSectionRef.current,
      uiuxSectionRef.current,
      packagesSectionRef.current
    ]

    sections.forEach(section => {
      if (section) {
        const contentDiv = section.querySelector('.scroll-animate') as HTMLElement
        if (contentDiv) {
          observer.observe(contentDiv)
        }
      }
    })

    return () => {
      sections.forEach(section => {
        if (section) {
          const contentDiv = section.querySelector('.scroll-animate') as HTMLElement
          if (contentDiv) {
            observer.unobserve(contentDiv)
          }
        }
      })
    }
  }, [])

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
            Services
          </h1>
          <p 
            className="text-white/80 font-mono text-lg md:text-xl md:max-w-[calc(50%-3rem)] leading-relaxed"
            style={{
              animation: 'fadeInUp 0.4s ease-out forwards',
              opacity: 0,
              animationDelay: '0.15s'
            }}
          >
            We offer a range of design services to help you build polite digital products.
          </p>
        </div>
      </section>
      
      {/* Website Design & Development Section */}
      <section ref={websiteSectionRef} id="websites" className="px-4 md:px-8 py-8 md:py-16 scroll-mt-24 bg-white">
        <div className="max-w-6xl mx-auto scroll-animate">
          <h2 className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>Website Design & Development</h2>
          <p className="font-mono text-sm leading-relaxed mb-12 max-w-3xl" style={{ color: `${DARK_TEXT}80` }}>
            We design and build websites that work beautifully. Fast, accessible, and easy to manage.
          </p>

          {/* Pricing Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Starter Package */}
            <div 
              className="border-2 p-8 space-y-8" 
              style={{ 
                borderColor: `${DARK_TEXT}20`,
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div>
                <h3 className="font-mono text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Starter</h3>
                <p className="font-serif font-bold text-5xl mb-2" style={{ color: DARK_TEXT }}>£2,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}60` }}>Perfect for new businesses</p>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                  <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Single landing page design</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                  <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Responsive across all devices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                  <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Contact form integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                  <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Performance optimised</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                  <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>2 weeks delivery</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Growth Package */}
            <div 
              className="border-2 p-8 space-y-8" 
              style={{ 
                borderColor: BLUE, 
                backgroundColor: `${BLUE}05`,
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div>
                <h3 className="font-mono text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Growth</h3>
                <p className="font-serif font-bold text-5xl mb-2" style={{ color: DARK_TEXT }}>£5,000</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}60` }}>For scaling businesses</p>
              </div>
              
              <div className="space-y-4">
                <p className="font-mono text-sm font-bold" style={{ color: DARK_TEXT }}>
                  Everything in Starter, plus:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Multi-page site (up to 10 pages)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>CMS integration for easy updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Blog or news section</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>Advanced animations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>SEO optimisation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: BLUE }} />
                    <span className="font-mono text-sm" style={{ color: `${DARK_TEXT}80` }}>4-6 weeks delivery</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Link to Packages */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: `${DARK_TEXT}10` }}>
            <p className="font-mono text-sm mb-4" style={{ color: `${DARK_TEXT}80` }}>
              Save by combining branding and website services
            </p>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View packages
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Website Examples */}
          <div className="mt-16">
            <h3 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Recent work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="https://letsbreakout.com" target="_blank" rel="noopener noreferrer" className="group block">
                <div 
                  className="aspect-[4/3] mb-4 relative overflow-hidden"
                  style={{
                    backgroundColor: '#f3f4f6',
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
                <h4 className="font-serif font-bold text-xl mb-2" style={{ color: DARK_TEXT }}>Breakout</h4>
                <p className="font-mono text-sm mb-3" style={{ color: `${DARK_TEXT}70` }}>Marketing site for a remote team product</p>
                <span className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
                  View project
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              <a href="https://www.getcoconut.com/" target="_blank" rel="noopener noreferrer" className="group block">
                <div 
                  className="aspect-[4/3] mb-4 relative overflow-hidden"
                  style={{
                    backgroundColor: '#f3f4f6',
                    backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <img
                    src="/coconut.png"
                    alt="Coconut app interface"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-serif font-bold text-xl mb-2" style={{ color: DARK_TEXT }}>Coconut</h4>
                <p className="font-mono text-sm mb-3" style={{ color: `${DARK_TEXT}70` }}>Banking platform for freelancers</p>
                <span className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
                  View project
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section ref={brandingSectionRef} id="branding" className="px-4 md:px-8 py-8 md:py-16 scroll-mt-24" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto scroll-animate">
          <h2 className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>Branding</h2>
          <p className="font-mono text-sm leading-relaxed mb-12 max-w-3xl" style={{ color: `${DARK_TEXT}80` }}>
            Your brand is more than a logo. It&apos;s the feeling people get when they interact with your business. 
            We help you define and express that feeling consistently across every touchpoint.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div>
              <h3 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>What&apos;s included</h3>
              <ul className="font-mono text-sm space-y-3" style={{ color: `${DARK_TEXT}80` }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Logo design and variations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Visual identity system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Brand guidelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Typography and colour palette</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Collateral design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Social media templates</span>
                </li>
              </ul>
            </div>

            <div 
              className="border-2 p-8 space-y-6 flex flex-col justify-center" 
              style={{ 
                borderColor: `${DARK_TEXT}20`,
                backgroundColor: 'white',
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div>
                <h3 className="font-mono text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Bespoke pricing</h3>
                <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: `${DARK_TEXT}80` }}>
                  Every branding project is unique. We tailor our approach based on your needs, whether you&apos;re a 
                  startup looking for your first identity or an established business ready for a refresh.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get in touch for pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Link to Packages */}
          <div className="mt-12 pt-8 border-t" style={{ borderColor: `${DARK_TEXT}10` }}>
            <p className="font-mono text-sm mb-4" style={{ color: `${DARK_TEXT}80` }}>
              Save by combining branding and website services
            </p>
            <a
              href="#packages"
              className="inline-flex items-center gap-2 font-mono text-sm font-bold hover:opacity-70 transition-opacity"
              style={{ color: BLUE }}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              View packages
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Branding Examples - Hidden for now, easy to restore */}
          {/* <div>
            <h3 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Recent work</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              Branding examples will go here
            </div>
          </div> */}
        </div>
      </section>

      {/* UI/UX Section */}
      <section ref={uiuxSectionRef} id="ui-ux" className="px-4 md:px-8 py-8 md:py-16 scroll-mt-24 bg-white">
        <div className="max-w-6xl mx-auto scroll-animate">
          <h2 className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>UI/UX Design</h2>
          <p className="font-mono text-sm leading-relaxed mb-12 max-w-3xl" style={{ color: `${DARK_TEXT}80` }}>
            Great products start with great design. We help you understand your users and create interfaces that 
            are intuitive, accessible, and delightful to use.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Our approach</h3>
              <ul className="font-mono text-sm space-y-3 mb-8" style={{ color: `${DARK_TEXT}80` }}>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>User research and testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Wireframing and prototyping</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>UI design and design systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Interaction design</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Accessibility audits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span style={{ color: BLUE }}>—</span>
                  <span>Developer handoff</span>
                </li>
              </ul>
            </div>

            <div 
              className="border-2 p-8 space-y-6 flex flex-col justify-center" 
              style={{ 
                borderColor: `${DARK_TEXT}20`,
                backgroundColor: 'white',
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div>
                <h3 className="font-mono text-sm font-bold mb-3 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Bespoke pricing</h3>
                <p className="font-mono text-sm leading-relaxed mb-6" style={{ color: `${DARK_TEXT}80` }}>
                  UI/UX design is bespoke work. Every app is different, with unique challenges and requirements. 
                  We&apos;ll work with you to understand your product and create a tailored solution.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get in touch to discuss your project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* UX Audit Special Offering */}
          <div 
            className="border-2 p-8 md:p-12 mt-16" 
            style={{ 
              borderColor: BLUE, 
              backgroundColor: 'white',
              backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          >
            <div className="max-w-4xl">
              <div className="flex items-start gap-3 mb-4">
                <span className="px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: BLUE, color: 'white' }}>
                  New
                </span>
              </div>
              <h3 className="font-serif font-bold text-2xl mb-4" style={{ color: DARK_TEXT }}>UX Audit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <p className="font-mono text-sm leading-relaxed mb-4" style={{ color: `${DARK_TEXT}80` }}>
                    Get expert UX feedback on your product in a recorded Loom video. We&apos;ll review your app, identify 
                    usability issues, and provide actionable recommendations to improve the user experience.
                  </p>
                  <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: BLUE }} />
                      <span>15-20 minute video review</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: BLUE }} />
                      <span>Detailed usability feedback</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: BLUE }} />
                      <span>Prioritised recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-1 flex-shrink-0" style={{ color: BLUE }} />
                      <span>Delivered within 5 working days</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-start md:items-end">
                  <p className="font-serif font-bold text-5xl mb-4" style={{ color: DARK_TEXT }}>£200</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: BLUE, color: "white" }}
                  >
                    Buy UX Audit
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* UI/UX Examples */}
          <div className="mt-16">
            <h3 className="font-mono text-sm font-bold mb-6 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Recent work</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a href="https://www.getcoconut.com/" target="_blank" rel="noopener noreferrer" className="group block">
                <div 
                  className="aspect-[4/3] mb-4 relative overflow-hidden"
                  style={{
                    backgroundColor: '#f3f4f6',
                    backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <img
                    src="/coconut.png"
                    alt="Coconut app interface"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="font-serif font-bold text-xl mb-2" style={{ color: DARK_TEXT }}>Coconut</h4>
                <p className="font-mono text-sm mb-3" style={{ color: `${DARK_TEXT}70` }}>Mobile banking app design</p>
                <span className="inline-flex items-center gap-1 font-mono text-sm underline hover:opacity-70 transition-opacity" style={{ color: BLUE }}>
                  View project
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              <div className="group">
                <div 
                  className="aspect-[4/3] mb-4 relative overflow-hidden"
                  style={{
                    backgroundColor: '#f3f4f6',
                    backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                >
                  <img
                    src="/scene.png"
                    alt="Scene app interface"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-serif font-bold text-xl mb-2" style={{ color: DARK_TEXT }}>Scene</h4>
                <p className="font-mono text-sm" style={{ color: `${DARK_TEXT}70` }}>Music discovery app design</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section ref={packagesSectionRef} id="packages" className="px-4 md:px-8 py-8 md:py-16 scroll-mt-24" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto scroll-animate">
          <h2 className="font-serif font-bold text-3xl mb-4" style={{ color: DARK_TEXT }}>Packages</h2>
          <p className="font-mono text-sm leading-relaxed max-w-2xl mb-12" style={{ color: `${DARK_TEXT}80` }}>
            Save by combining branding and website services. Perfect for startups and businesses launching a new digital presence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Launch Package */}
            <div 
              className="border-2 p-8 space-y-6" 
              style={{ 
                borderColor: `${DARK_TEXT}20`,
                backgroundColor: 'white',
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div>
                <h3 className="font-mono text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Launch Package</h3>
                <p className="font-serif font-bold text-4xl mb-1" style={{ color: DARK_TEXT }}>£3,500</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}50` }}>Save £500</p>
              </div>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>+ Starter Branding</li>
                <li>+ Starter Website</li>
                <li>+ 2 weeks support</li>
              </ul>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 font-mono text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ backgroundColor: BLUE, color: "white" }}
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Complete Package */}
            <div 
              className="border-2 p-8 space-y-6" 
              style={{ 
                borderColor: `${DARK_TEXT}20`,
                backgroundColor: 'white',
                backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            >
              <div>
                <h3 className="font-mono text-sm font-bold mb-2 uppercase tracking-wider" style={{ color: DARK_TEXT }}>Complete Package</h3>
                <p className="font-serif font-bold text-4xl mb-1" style={{ color: DARK_TEXT }}>£9,500</p>
                <p className="font-mono text-xs" style={{ color: `${DARK_TEXT}50` }}>Save £1,500</p>
              </div>
              <ul className="font-mono text-sm space-y-2" style={{ color: `${DARK_TEXT}80` }}>
                <li>+ Complete Branding</li>
                <li>+ Growth Website</li>
                <li>+ 3 months support</li>
              </ul>
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
