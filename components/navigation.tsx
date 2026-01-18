"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname() ?? ""
  
  // Pages that should start with white header (light hero sections)
  const lightHeroPages = ["/about"]
  const shouldStartWhite = lightHeroPages.includes(pathname)
  
  const [isScrolled, setIsScrolled] = useState(shouldStartWhite)

  useEffect(() => {
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
    { href: "/about", label: "About" },
    { href: "/lab", label: "Lab" },
  ]

  return (
    <nav
      className="w-full py-6 px-8 sticky top-0 z-50 transition-all duration-300"
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

        <div className="flex items-center gap-8">
          <div
            className="flex items-center gap-8 font-mono text-sm transition-colors duration-300"
            style={{ color: isScrolled ? "#1100FF" : "#ffffff" }}
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-opacity ${
                  pathname === item.href ? "underline underline-offset-4" : "hover:opacity-70"
                }`}
              >
                {item.label}
              </Link>
            ))}
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
      </div>
    </nav>
  )
}
