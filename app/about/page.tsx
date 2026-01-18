import { PageWrapper } from "@/components/page-wrapper"
import type { Metadata } from "next"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"

export const metadata: Metadata = {
  title: "About - Return",
  description: "Our ethos and philosophy on building polite digital products.",
}

export default function AboutPage() {
  return (
    <PageWrapper>
      <div className="px-8 py-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="font-mono space-y-12 text-base leading-relaxed" style={{ color: "#0a0033" }}>
            <section className="space-y-6">
              <p className="mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "1.5rem", fontStyle: "italic" }}>Things weren&apos;t always like this.</p>
              <p className="mb-6">
                Somewhere along the way, software started misbehaving. The products we use every day stopped solving our
                problems and started trapping us - designed to hook us, track us, and sell our attention to the highest
                bidder. We realised we were spending less time living our lives and more time scrolling aimlessly. We
                want to change that by making software that solves real problems and connects us.
              </p>

              <p className="mb-6">
                <strong className="font-bold text-base">We make polite products.</strong>
              </p>
              <p className="mb-6">
                We design digital products that solve real problems while respecting your time and attention.
              </p>

              <p className="mb-6">
                Our first product, Breakout, is{" "}
                <a
                  href="https://letsbreakout.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  available for free
                </a>{" "}
                now.
              </p>
            </section>

            <section className="space-y-6">
              <h3 className="mb-6 italic text-2xl" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Our Ethos</h3>
              <p className="mb-8">
                We are driven by a simple philosophy:{" "}
                <strong>Software should serve the you, the user. Nobody else. </strong> Here are the principles that
                guide everything we design.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="mb-4">
                    <strong>1/ Polite by design.</strong>
                  </p>
                  <p>
                    We believe digital products should behave like polite guests. They shouldn&apos;t shout, they
                    shouldn&apos;t interrupt, and they certainly shouldn&apos;t overstay their welcome. We design
                    interactions that are quiet, intuitive, and helpful. If our software is doing its job right, you
                    shouldn&apos;t even notice that it&apos;s there.
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>2/ We optimise for the exit.</strong>
                  </p>
                  <p>
                    Most tech companies measure success by how long they can keep you glued to the screen. We measure
                    success by how quickly we can solve your problem. Whether it&apos;s a productivity tool or a social
                    connection app, our goal is to deliver value quickly so you can put the phone down and go play.
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>3/ If you don&apos;t know what the product is, the product is you.</strong>
                  </p>
                  <p>
                    The current model of &quot;free&quot; software usually means you are paying with your data. We hate
                    the surveillance economy. We don&apos;t harvest your habits, we don&apos;t sell your secrets, and we
                    don&apos;t use dark patterns to change your behaviours. We build honest products with transparent
                    business models. Oh, and we don&apos;t work with anyone who does otherwise.
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>4/ Fuck doomscrolling.</strong>
                  </p>
                  <p>
                    The infinite scroll is one of the worst inventions of the 21st century. It turns us, and our
                    children, into zombies. We design products that have hard stops. We want to foster solutions and
                    fulfillment, not dopamine loops.
                  </p>
                </div>

                <div>
                  <p className="mb-4">
                    <strong>5/ Crafted in Bristol.</strong>
                  </p>
                  <p>
                    We believe in the warmth of things made by humans. In an era of copy/pasted, AI generated crap, we
                    sweat the details. We care about the type, motion, and feel. We craft nice things that you&apos;ll
                    enjoy using - in Bristol, UK :)
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
