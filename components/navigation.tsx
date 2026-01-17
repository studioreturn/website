"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is roughly viewport height, so trigger at ~80% of viewport
      const heroHeight = window.innerHeight * 0.8
      setIsScrolled(window.scrollY > heroHeight)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/industries", label: "Industries" },
    { href: "/about", label: "About" },
    { href: "/lab", label: "Lab" },
  ]

  return (
    <nav
      className="w-full py-6 px-8 sticky top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled ? "#ffffff" : "#1100FF",
        borderBottom: isScrolled ? "1px solid rgba(17, 0, 255, 0.1)" : "none",
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
