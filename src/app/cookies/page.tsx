import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function CookiePolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Cookie Policy
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Last updated: June 1, 2024
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6 max-w-4xl">
            <div className="prose prose-blue max-w-none dark:prose-invert">
              <p>
                This Cookie Policy explains how Lynop ("we", "us", or "our")
                uses cookies and similar technologies on our website and
                applications. This policy is part of our Privacy Policy and
                explains what cookies are, how we use them, and your choices
                regarding cookies.
              </p>

              <h2>What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile) when you visit a website. Cookies
                are widely used to make websites work more efficiently and
                provide information to the website owners.
              </p>
              <p>
                Cookies can be "persistent" or "session" cookies. Persistent
                cookies remain on your device when you go offline, while session
                cookies are deleted as soon as you close your web browser.
              </p>

              <h2>How We Use Cookies</h2>
              <p>We use cookies for several purposes, including:</p>
              <ul>
                <li>
                  <strong>Essential Cookies:</strong> These cookies are
                  necessary for the website to function properly. They enable
                  core functionality such as security, network management, and
                  account access. You cannot opt out of these cookies.
                </li>
                <li>
                  <strong>Functionality Cookies:</strong> These cookies allow us
                  to remember choices you make and provide enhanced, more
                  personal features. For example, they may be used to remember
                  your login details or language preference.
                </li>
                <li>
                  <strong>Performance/Analytics Cookies:</strong> These cookies
                  collect information about how you use our website, such as
                  which pages you visit most often. This data helps us optimize
                  the website and make it easier for you to navigate.
                </li>
                <li>
                  <strong>Marketing Cookies:</strong> These cookies track your
                  online activity to help advertisers deliver more relevant
                  advertising or to limit how many times you see an ad. These
                  cookies can share information with other organizations or
                  advertisers.
                </li>
              </ul>

              <h2>Types of Cookies We Use</h2>
              <p>We use the following types of cookies on our website:</p>

              <h3>First-Party Cookies</h3>
              <p>
                These are cookies that are set by our website. They include
                essential cookies for the website to operate properly.
              </p>

              <table className="w-full border-collapse border border-gray-300 my-4">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-gray-300 p-2">Cookie Name</th>
                    <th className="border border-gray-300 p-2">Purpose</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">session_id</td>
                    <td className="border border-gray-300 p-2">
                      Maintains your session state across page requests
                    </td>
                    <td className="border border-gray-300 p-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      user_preferences
                    </td>
                    <td className="border border-gray-300 p-2">
                      Stores your preferences such as language and theme
                    </td>
                    <td className="border border-gray-300 p-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">auth_token</td>
                    <td className="border border-gray-300 p-2">
                      Authenticates you as a logged-in user
                    </td>
                    <td className="border border-gray-300 p-2">30 days</td>
                  </tr>
                </tbody>
              </table>

              <h3>Third-Party Cookies</h3>
              <p>
                These are cookies that are set by our partners and service
                providers. They include analytics and marketing cookies.
              </p>

              <table className="w-full border-collapse border border-gray-300 my-4">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-gray-300 p-2">Cookie Name</th>
                    <th className="border border-gray-300 p-2">Provider</th>
                    <th className="border border-gray-300 p-2">Purpose</th>
                    <th className="border border-gray-300 p-2">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">_ga</td>
                    <td className="border border-gray-300 p-2">
                      Google Analytics
                    </td>
                    <td className="border border-gray-300 p-2">
                      Distinguishes users for analytics purposes
                    </td>
                    <td className="border border-gray-300 p-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_gid</td>
                    <td className="border border-gray-300 p-2">
                      Google Analytics
                    </td>
                    <td className="border border-gray-300 p-2">
                      Distinguishes users for analytics purposes
                    </td>
                    <td className="border border-gray-300 p-2">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">_fbp</td>
                    <td className="border border-gray-300 p-2">Facebook</td>
                    <td className="border border-gray-300 p-2">
                      Used by Facebook to deliver advertisements
                    </td>
                    <td className="border border-gray-300 p-2">3 months</td>
                  </tr>
                </tbody>
              </table>

              <h2>Your Cookie Choices</h2>
              <p>
                Most web browsers allow you to control cookies through their
                settings preferences. However, if you limit the ability of
                websites to set cookies, you may worsen your overall user
                experience, as it will no longer be personalized to you.
              </p>

              <h3>Managing Cookies in Your Browser</h3>
              <p>
                You can manage cookies through your web browser. Please note
                that different browsers provide different methods to block and
                delete cookies. Below are links to the most common browsers:
              </p>
              <ul>
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>

              <h3>Do Not Track</h3>
              <p>
                Some browsers have a "Do Not Track" feature that lets you tell
                websites that you do not want to have your online activities
                tracked. At this time, we do not respond to browser "Do Not
                Track" signals.
              </p>

              <h2>Changes to This Cookie Policy</h2>
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in technology, regulation, or our business practices. If
                we make any material changes, we will notify you by posting the
                updated policy on our website and updating the "Last updated"
                date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about our use of cookies or this
                Cookie Policy, please contact us at:
              </p>
              <p>
                Lynop, Inc.
                <br />
                123 Innovation Way
                <br />
                San Francisco, CA 94107
                <br />
                privacy@lynop.com
                <br />
                +1 (800) 123-4567
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
