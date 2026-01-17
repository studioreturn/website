import Link from "next/link"
import type { Metadata } from "next"
import { PageWrapper } from "@/components/page-wrapper"

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
      <section className="px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white font-title text-3xl md:text-4xl uppercase mb-6">Industries</h1>
          <p className="text-white/80 font-mono text-lg max-w-2xl leading-relaxed">
            We work across sectors, bringing the same commitment to polite, thoughtful design wherever we go.
          </p>
        </div>
      </section>

      <section className="px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <div key={industry.name} className="border border-white/20 p-8 hover:border-white/40 transition-colors">
                <h2 className="text-white font-title text-xl uppercase mb-4">{industry.name}</h2>
                <p className="text-white/70 font-mono text-sm leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-16 bg-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-white font-title text-2xl uppercase mb-4">Don&apos;t see your industry?</h2>
          <p className="text-white/70 font-mono text-sm mb-8 max-w-lg mx-auto">
            We love working with new sectors. If you think we&apos;d be a good fit, we&apos;d love to chat.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-[#1100FF] font-mono text-sm font-bold hover:bg-white/90 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
