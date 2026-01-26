"use client"

import { PageWrapper } from "@/components/page-wrapper"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export default function PrivacyPage() {
  return (
    <PageWrapper>
      <div className="px-8 py-16 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="font-mono space-y-12 text-base leading-relaxed" style={{ color: DARK_TEXT }}>
            <section className="space-y-6">
              <h1 
                className="mb-6 italic text-3xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Privacy Policy
              </h1>
              <p 
                className="mb-6"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p 
                className="mb-6"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Studio Return (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Information We Collect
              </h2>
              <div className="space-y-6">
                <div
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <p className="mb-4">
                    <strong>Information You Provide</strong>
                  </p>
                  <p>
                    We collect information that you voluntarily provide to us when you contact us, subscribe to our newsletter, or use our services. This may include your name, email address, phone number, and any other information you choose to provide.
                  </p>
                </div>

                <div
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <p className="mb-4">
                    <strong>Automatically Collected Information</strong>
                  </p>
                  <p>
                    When you visit our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We may also collect information about how you interact with our website.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                How We Use Your Information
              </h2>
              <div className="space-y-6">
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4"
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <li>Provide, operate, and maintain our website and services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you newsletters, marketing communications, and other information that may be of interest to you (with your consent)</li>
                  <li>Improve our website and services</li>
                  <li>Detect, prevent, and address technical issues</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Information Sharing and Disclosure
              </h2>
              <div className="space-y-6">
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4"
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <li>With service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                  <li>With your consent or at your direction</li>
                </ul>
              </div>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Data Security
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Your Rights
              </h2>
              <div className="space-y-6">
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  Under UK data protection laws, you have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4"
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  To exercise any of these rights, please contact us using the details provided below.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Cookies
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Our website uses cookies to enhance your browsing experience. For detailed information about the cookies we use and how to manage them, please see our{" "}
                <a
                  href="/cookies"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  Cookie Policy
                </a>.
              </p>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Changes to This Privacy Policy
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="space-y-6">
              <h2 
                className="mb-6 italic text-2xl" 
                style={{ 
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Contact Us
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <p 
                className="mb-6"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Studio Return<br />
                Bristol, UK<br />
                Email:{" "}
                <a
                  href="mailto:hello@studioreturn.com"
                  className="underline hover:opacity-70 transition-opacity"
                >
                  hello@studioreturn.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
