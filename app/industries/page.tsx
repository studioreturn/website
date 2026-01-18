import Link from "next/link"
import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"
import { ArrowRight } from "lucide-react"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export const metadata: Metadata = {
  title: "Industries | Return",
  description: "We work across industries including tech, wellness, fashion, finance, and more.",
}

export default function IndustriesPage() {
  const industries = [
    {
      name: "Technology & SaaS",
      description:
        "Helping software companies create intuitive products and memorable brands that stand out in crowded markets.",
    },
    {
      name: "Health & Wellness",
      description:
        "Designing calming, trustworthy experiences for apps and brands focused on mental and physical wellbeing.",
    },
    {
      name: "Fashion & Retail",
      description:
        "Creating sophisticated brand identities and e-commerce experiences that reflect craftsmanship and style.",
    },
    {
      name: "Finance & Fintech",
      description: "Building trust through clear, accessible design for banking, payments, and financial services.",
    },
    {
      name: "Food & Hospitality",
      description: "Crafting warm, inviting brands and digital experiences for restaurants, hotels, and food brands.",
    },
    {
      name: "Startups & Ventures",
      description: "Helping early-stage companies establish strong foundations with flexible brand systems that scale.",
    },
  ]

  return (
    <PageWrapper>
      <section className="px-8 min-h-[40vh] flex items-center" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-white text-3xl md:text-5xl mb-6 italic tracking-wide" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            Industries
          </h1>
          <p className="text-white/80 font-mono text-lg md:text-xl max-w-[calc(50%-3rem)] leading-relaxed">
            We work across sectors, bringing the same commitment to polite, thoughtful design wherever we go.
          </p>
        </div>
      </section>

      <section className="px-8 py-16" style={{ backgroundColor: GREY_BG }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <div key={industry.name} className="border p-8 hover:border-opacity-40 transition-colors" style={{ borderColor: DARK_TEXT, borderOpacity: 0.2 }}>
                <h2 className="italic text-xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif", color: DARK_TEXT }}>{industry.name}</h2>
                <p className="font-mono text-sm leading-relaxed" style={{ color: DARK_TEXT, opacity: 0.7 }}>{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16" style={{ backgroundColor: BLUE }}>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white italic text-3xl mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Don&apos;t see your industry?</h2>
          <p className="text-white/70 font-mono text-sm mb-8 max-w-lg mx-auto">
            We love working with new sectors. If you think we&apos;d be a good fit, we&apos;d love to chat.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white font-mono text-sm font-bold hover:bg-white/90 transition-colors"
            style={{ color: BLUE }}
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
