import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Terms of Service
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
                These Terms of Service ("Terms") govern your access to and use
                of the Lynop website, mobile applications, and services
                (collectively, the "Services"). Please read these Terms
                carefully before using our Services.
              </p>

              <h2>Acceptance of Terms</h2>
              <p>
                By accessing or using our Services, you agree to be bound by
                these Terms and our Privacy Policy. If you do not agree to these
                Terms, you may not access or use the Services.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We may modify these Terms at any time. If we make changes, we
                will provide notice by posting the updated Terms on our website
                and updating the "Last updated" date. Your continued use of the
                Services after the changes are posted constitutes your
                acceptance of the updated Terms.
              </p>

              <h2>Account Registration</h2>
              <p>
                To use certain features of the Services, you may need to create
                an account. You agree to provide accurate, current, and complete
                information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your account credentials
                and for all activities that occur under your account. You agree
                to notify us immediately of any unauthorized use of your account
                or any other breach of security.
              </p>

              <h2>User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>
                  Use the Services in any way that violates any applicable law
                  or regulation
                </li>
                <li>
                  Use the Services for any illegal or unauthorized purpose
                </li>
                <li>
                  Attempt to gain unauthorized access to any portion of the
                  Services or any other systems or networks connected to the
                  Services
                </li>
                <li>
                  Interfere with or disrupt the Services or servers or networks
                  connected to the Services
                </li>
                <li>
                  Use any robot, spider, or other automatic device, process, or
                  means to access the Services for any purpose
                </li>
                <li>
                  Introduce any viruses, trojan horses, worms, logic bombs, or
                  other harmful material to the Services
                </li>
                <li>
                  Attempt to decipher, decompile, disassemble, or reverse
                  engineer any of the software used to provide the Services
                </li>
              </ul>

              <h2>Intellectual Property Rights</h2>
              <p>
                The Services and their entire contents, features, and
                functionality (including but not limited to all information,
                software, text, displays, images, video, and audio, and the
                design, selection, and arrangement thereof) are owned by Lynop,
                its licensors, or other providers of such material and are
                protected by United States and international copyright,
                trademark, patent, trade secret, and other intellectual property
                or proprietary rights laws.
              </p>
              <p>
                These Terms permit you to use the Services for your personal,
                non-commercial use only. You must not reproduce, distribute,
                modify, create derivative works of, publicly display, publicly
                perform, republish, download, store, or transmit any of the
                material on our Services, except as follows:
              </p>
              <ul>
                <li>
                  Your computer may temporarily store copies of such materials
                  in RAM incidental to your accessing and viewing those
                  materials
                </li>
                <li>
                  You may store files that are automatically cached by your Web
                  browser for display enhancement purposes
                </li>
                <li>
                  You may print or download one copy of a reasonable number of
                  pages of the website for your own personal, non-commercial use
                  and not for further reproduction, publication, or distribution
                </li>
              </ul>

              <h2>Subscription and Payment Terms</h2>
              <p>
                Some of our Services require payment of fees. If you choose to
                subscribe to a paid Service, you agree to pay all fees in
                accordance with the pricing and payment terms presented to you
                for that Service.
              </p>
              <p>
                Subscription fees are billed in advance on a monthly or annual
                basis, depending on the subscription plan you select. Unless
                otherwise stated, subscriptions automatically renew at the end
                of each billing period.
              </p>
              <p>
                You may cancel your subscription at any time by contacting us or
                through your account settings. If you cancel, you will continue
                to have access to the paid Services until the end of your
                current billing period, but you will not receive a refund for
                any fees already paid.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING,
                BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p>
                WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR
                ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE SERVICES
                OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR
                OTHER HARMFUL COMPONENTS.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                IN NO EVENT WILL LYNOP, ITS AFFILIATES, OR THEIR LICENSORS,
                SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE
                LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING
                OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE
                SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Lynop, its
                affiliates, licensors, and service providers, and its and their
                respective officers, directors, employees, contractors, agents,
                licensors, suppliers, successors, and assigns from and against
                any claims, liabilities, damages, judgments, awards, losses,
                costs, expenses, or fees (including reasonable attorneys' fees)
                arising out of or relating to your violation of these Terms or
                your use of the Services.
              </p>

              <h2>Governing Law and Jurisdiction</h2>
              <p>
                These Terms and any dispute or claim arising out of or related
                to them, their subject matter, or their formation shall be
                governed by and construed in accordance with the laws of the
                State of California, without giving effect to any choice or
                conflict of law provision or rule.
              </p>
              <p>
                Any legal suit, action, or proceeding arising out of, or related
                to, these Terms or the Services shall be instituted exclusively
                in the federal courts of the United States or the courts of the
                State of California, in each case located in the City of San
                Francisco and County of San Francisco.
              </p>

              <h2>Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid, illegal,
                or unenforceable, such provision shall be struck from these
                Terms, and the remaining provisions shall remain in full force
                and effect.
              </p>

              <h2>Entire Agreement</h2>
              <p>
                These Terms, together with our Privacy Policy, constitute the
                sole and entire agreement between you and Lynop regarding the
                Services and supersede all prior and contemporaneous
                understandings, agreements, representations, and warranties,
                both written and oral, regarding the Services.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <p>
                Lynop, Inc.
                <br />
                123 Innovation Way
                <br />
                San Francisco, CA 94107
                <br />
                legal@lynop.com
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
