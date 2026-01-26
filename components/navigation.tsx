"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname() ?? ""
  
  // Pages that should start with white header (light hero sections)
  const lightHeroPages = ["/about"]
  const shouldStartWhite = lightHeroPages.includes(pathname)
  
  const [isScrolled, setIsScrolled] = useState(shouldStartWhite)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
    
    // For light hero pages, always stay white
    if (shouldStartWhite) {
      setIsScrolled(true)
      return
    }

    const boundary = document.querySelector("[data-header-boundary]")
    if (boundary) {
      // Switch to white when the blue section (hero + Selected work) has scrolled out of view
      const syncFromBoundary = () => {
        const rect = boundary.getBoundingClientRect()
        setIsScrolled(rect.bottom <= 0)
      }
      syncFromBoundary()

      const observer = new IntersectionObserver(
        ([entry]) => setIsScrolled(!entry.isIntersecting),
        { threshold: 0 }
      )
      observer.observe(boundary)
      return () => observer.disconnect()
    }

    // Fallback on pages without the boundary (e.g. /work)
    const handleScroll = () => {
      const heroHeight = window.innerHeight * 0.8
      setIsScrolled(window.scrollY > heroHeight)
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname, shouldStartWhite])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "Ethos" },
    { href: "/labs", label: "Labs" },
  ]

  return (
    <nav
      className="w-full py-4 md:py-6 px-4 md:px-8 sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "#ffffff" : "#1100FF",
        borderBottom: isScrolled
          ? "1px solid rgba(17, 0, 255, 0.1)"
          : "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="hover:opacity-70 transition-opacity">
          <span
            className="transition-colors duration-300"
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
              fontSize: "32px",
              lineHeight: 1,
              color: isScrolled ? "#1100FF" : "#ffffff",
            }}
          >
            :)
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div
            className="flex items-center gap-8 font-mono text-sm transition-colors duration-300"
            style={{ color: isScrolled ? "#1100FF" : "#ffffff" }}
          >
            {navItems.map((item) => {
              const isLabs = item.href === "/labs"
              
              if (isLabs) {
                return (
                  <span
                    key={item.href}
                    className="inline-flex items-center gap-2 opacity-60 cursor-not-allowed"
                  >
                    {item.label}
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-mono opacity-80"
                      style={{
                        backgroundColor: isScrolled ? "rgba(17, 0, 255, 0.15)" : "rgba(255, 255, 255, 0.3)",
                        color: isScrolled ? "#1100FF" : "#ffffff",
                      }}
                    >
                      Coming soon
                    </span>
                  </span>
                )
              }
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-opacity ${
                    pathname === item.href ? "underline underline-offset-4" : "hover:opacity-70"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          <Link
            href="/contact"
            className="flex items-center gap-2 px-5 py-2.5 font-mono text-sm font-bold transition-colors duration-300"
            style={{
              backgroundColor: isScrolled ? "#1100FF" : "#ffffff",
              color: isScrolled ? "#ffffff" : "#1100FF",
            }}
          >
            Contact
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 transition-opacity hover:opacity-70"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" style={{ color: isScrolled ? "#1100FF" : "#ffffff" }} />
          ) : (
            <Menu className="w-6 h-6" style={{ color: isScrolled ? "#1100FF" : "#ffffff" }} />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <>
          <div
            className={`fixed inset-0 z-40 md:hidden bg-black/20 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ top: "65px" }}
          />
          <div
            className={`fixed z-50 md:hidden w-full left-0 right-0 transition-all duration-300 ease-out ${
              isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            style={{
              backgroundColor: isScrolled ? "#ffffff" : "#1100FF",
              top: "65px",
              maxHeight: "calc(100vh - 65px)",
              overflowY: "auto"
            }}
          >
            <div className="px-4 py-8 flex flex-col gap-6">
              {navItems.map((item) => {
                const isLabs = item.href === "/labs"
                
                if (isLabs) {
                  return (
                    <span
                      key={item.href}
                      className="inline-flex items-center gap-2 opacity-60 cursor-not-allowed font-mono text-base"
                      style={{ color: isScrolled ? "#1100FF" : "#ffffff" }}
                    >
                      {item.label}
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-mono opacity-80"
                        style={{
                          backgroundColor: isScrolled ? "rgba(17, 0, 255, 0.15)" : "rgba(255, 255, 255, 0.3)",
                          color: isScrolled ? "#1100FF" : "#ffffff",
                        }}
                      >
                        Coming Soon
                      </span>
                    </span>
                  )
                }
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-mono text-base transition-opacity ${
                      pathname === item.href ? "underline underline-offset-4" : "hover:opacity-70"
                    }`}
                    style={{ color: isScrolled ? "#1100FF" : "#ffffff" }}
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-5 py-2.5 font-mono text-sm font-bold transition-colors duration-300 mt-4 w-full"
                style={{
                  backgroundColor: isScrolled ? "#1100FF" : "#ffffff",
                  color: isScrolled ? "#ffffff" : "#1100FF",
                }}
              >
                Contact
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </>
      </div>
    </nav>
  )
}
