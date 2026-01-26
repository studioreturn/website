"use client"

import { PageWrapper } from "@/components/page-wrapper"

const BLUE = "#1100FF"
const GREY_BG = "#f5f5fa"
const DARK_TEXT = "#0a0033"

export default function CookiesPage() {
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
                Cookie Policy
              </h1>
              <p 
                className="mb-6"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                <strong>Last updated:</strong> January 2026
              </p>
              <p 
                className="mb-6"
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Studio Return (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies on our website to enhance your browsing experience and improve our services. This Cookie Policy explains what cookies are, how we use them, and how you can manage them.
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
                What Are Cookies?
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies allow a website to recognise your device and store some information about your preferences or past actions.
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
                How We Use Cookies
              </h2>
              <div className="space-y-6">
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  We use cookies for the following purposes:
                </p>
                <div
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <p className="mb-4">
                    <strong>Essential Cookies</strong>
                  </p>
                  <p>
                    These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. You may not opt-out of these cookies, but you can block them by changing your browser settings, though this may affect how the website functions.
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
                    <strong>Analytics Cookies</strong>
                  </p>
                  <p>
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the way our website works, for example, by ensuring that users find what they are looking for easily.
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
                    <strong>Functional Cookies</strong>
                  </p>
                  <p>
                    These cookies allow the website to remember choices you make (such as your language preference) and provide enhanced, more personal features. They may also be used to provide services you have requested.
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
                Types of Cookies We Use
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
                    <strong>Session Cookies</strong>
                  </p>
                  <p>
                    These are temporary cookies that are deleted when you close your browser. They help us maintain your session while you navigate through our website.
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
                    <strong>Persistent Cookies</strong>
                  </p>
                  <p>
                    These cookies remain on your device for a set period or until you delete them. They help us remember your preferences and improve your experience on future visits.
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
                Third-Party Cookies
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and refine marketing efforts. These third-party cookies are subject to the respective privacy policies of those third parties.
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
                Managing Cookies
              </h2>
              <div className="space-y-6">
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4"
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <li>See what cookies you have and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies from specific websites</li>
                  <li>Block all cookies</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  Please note that if you choose to block or delete cookies, some features of our website may not function properly, and your experience may be affected.
                </p>
                <p 
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  For more information on how to manage cookies in different browsers, please visit:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4"
                  style={{
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    opacity: 0,
                    animationDelay: '0.2s'
                  }}
                >
                  <li>
                    <a
                      href="https://support.google.com/chrome/answer/95647"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      Safari
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:opacity-70 transition-opacity"
                    >
                      Microsoft Edge
                    </a>
                  </li>
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
                Changes to This Cookie Policy
              </h2>
              <p 
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  opacity: 0,
                  animationDelay: '0.2s'
                }}
              >
                We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Cookie Policy on this page and updating the &quot;Last updated&quot; date.
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
                If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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
