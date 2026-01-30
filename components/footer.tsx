"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Footer() {
  const pathname = usePathname() ?? ""
  const { toast } = useToast()
  
  const phoneNumber = "(+44) 07707 683220"
  const email = "hello@studioreturn.co"

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      const labels: Record<string, string> = {
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

  return (
    <footer className="w-full py-12 px-8 border-t border-white/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div
              className="text-white"
              style={{
                fontFamily: "Arial, sans-serif",
                fontSize: "32px",
                lineHeight: 1,
                fontWeight: "bold",
              }}
            >
              :)
            </div>
            <p className="text-white/70 font-mono text-sm">Polite products from Bristol, UK.</p>
            <div className="space-y-1 pt-2">
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${email}`}
                  className="text-white/70 font-mono text-sm hover:text-white transition-colors"
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
              <div className="flex items-center gap-2">
                <a
                  href={`tel:${phoneNumber.replace(/[()\s]/g, "")}`}
                  className="text-white/70 font-mono text-sm hover:text-white transition-colors"
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
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-sm font-bold">Pages</h4>
            <div className="flex flex-col gap-2 text-white/70 font-mono text-sm">
              <Link 
                href="/" 
                className={`transition-colors ${
                  pathname === "/" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className={`transition-colors ${
                  pathname === "/services" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Services
              </Link>
              <Link 
                href="/work" 
                className={`transition-colors ${
                  pathname === "/work" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Work
              </Link>
              <Link 
                href="/about" 
                className={`transition-colors ${
                  pathname === "/about" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Ethos
              </Link>
              <span className="inline-flex items-center gap-2 opacity-40 cursor-not-allowed">
                Labs
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "#ffffff",
                  }}
                >
                  Coming Soon
                </span>
              </span>
              <Link 
                href="/contact" 
                className={`transition-colors ${
                  pathname === "/contact" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Contact
              </Link>
              <Link 
                href="/careers" 
                className={`transition-colors ${
                  pathname === "/careers" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Careers
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-sm font-bold">Services</h4>
            <div className="flex flex-col gap-2 text-white/70 font-mono text-sm">
              <Link href="/services#branding" className="hover:text-white transition-colors">
                Branding
              </Link>
              <Link href="/services#websites" className="hover:text-white transition-colors">
                Websites
              </Link>
              <Link href="/services#ui-ux" className="hover:text-white transition-colors">
                UI/UX
              </Link>
              <Link href="/services#packages" className="hover:text-white transition-colors">
                Packages
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-mono text-sm font-bold">Connect</h4>
            <div className="flex flex-col gap-2 text-white/70 font-mono text-sm">
              <a
                href="https://www.instagram.com/studioreturn.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                Instagram
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://dribbble.com/studioreturn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                Dribbble
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.behance.net/studioreturn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                Behance
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://bsky.app/profile/studioreturn.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                Bluesky
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="https://www.linkedin.com/company/studioreturn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                LinkedIn
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-white font-mono text-sm font-bold">Legal</h4>
            <div className="flex flex-col gap-2 text-white/70 font-mono text-sm">
              <Link 
                href="/privacy" 
                className={`transition-colors ${
                  pathname === "/privacy" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/cookies" 
                className={`transition-colors ${
                  pathname === "/cookies" ? "text-white underline underline-offset-4" : "hover:text-white"
                }`}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between gap-4">
          <div className="text-white/70 font-mono text-xs">
            <span className="font-sans">©</span> {new Date().getFullYear()} Studio Return. All rights reserved.
          </div>
          <a
            href="https://maps.app.goo.gl/7yvms7QXMbNKazn78"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white/70 font-mono text-xs hover:text-white transition-colors"
          >
            Studio 51, Spike Island, 133 Cumberland Road, Bristol, BS1 6UX
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}
