import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function Footer() {
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
            <p className="text-white/70 font-mono text-sm">Nicely made things. From Bristol, UK.</p>
            <div className="space-y-1 pt-2">
              <a
                href="mailto:hello@studioreturn.co"
                className="block text-white/70 font-mono text-sm hover:text-white transition-colors"
              >
                hello@studioreturn.co
              </a>
              <a
                href="tel:07707683220"
                className="block text-white/70 font-mono text-sm hover:text-white transition-colors"
              >
                07707 683 220
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-mono text-sm font-bold">Navigate</h4>
            <div className="flex flex-col gap-2 text-white/70 font-mono text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-white transition-colors">
                About
              </Link>
              <Link href="/work" className="hover:text-white transition-colors">
                Work
              </Link>
              <Link href="/industries" className="hover:text-white transition-colors">
                Industries
              </Link>
              <Link href="/lab" className="hover:text-white transition-colors">
                Lab
              </Link>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/careers" className="hover:text-white transition-colors">
                Careers
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact
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
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
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
          <div className="text-white/70 font-mono text-xs">
            Studio 51, Spike Island, 133 Cumberland Road, Bristol, BS1 6UX
          </div>
        </div>
      </div>
    </footer>
  )
}
