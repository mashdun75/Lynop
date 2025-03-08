import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Privacy Policy
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
                At Lynop, we take your privacy seriously. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you use our website and services.
              </p>

              <h2>Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when you:
              </p>
              <ul>
                <li>Create an account</li>
                <li>Use our services</li>
                <li>Contact our customer support</li>
                <li>Participate in surveys or promotions</li>
                <li>Interact with our website or applications</li>
              </ul>

              <p>This information may include:</p>
              <ul>
                <li>
                  Personal identifiers (name, email address, phone number,
                  postal address)
                </li>
                <li>Account credentials</li>
                <li>Financial information</li>
                <li>Transaction data</li>
                <li>Usage data</li>
                <li>Device information</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send you technical notices, updates, and support messages
                </li>
                <li>Respond to your comments and questions</li>
                <li>Develop new products and services</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>
                  Detect, investigate, and prevent fraudulent transactions and
                  other illegal activities
                </li>
                <li>Personalize your experience</li>
              </ul>

              <h2>Quantum-Resistant Encryption</h2>
              <p>
                Lynop uses quantum-resistant encryption to protect your data.
                This advanced encryption method is designed to withstand attacks
                from both conventional and quantum computers, ensuring your
                information remains protected well into the future.
              </p>
              <p>
                All sensitive data, including financial information and
                transaction details, is encrypted using these advanced
                algorithms. Your data is encrypted on your device before being
                transmitted to our servers, and it remains encrypted while
                stored. The data is only decrypted when you access it with your
                authenticated credentials.
              </p>

              <h2>Data Sharing and Disclosure</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>
                  Service providers who perform services on our behalf (e.g.,
                  payment processing, data analysis, email delivery)
                </li>
                <li>
                  Business partners with your consent or as necessary to
                  complete your transactions
                </li>
                <li>
                  Legal authorities when required by law or to protect our
                  rights
                </li>
                <li>
                  Other parties in connection with a corporate transaction, such
                  as a merger or sale of assets
                </li>
              </ul>

              <p>
                <strong>We do not sell your personal information.</strong>
              </p>

              <h2>Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal information, including:
              </p>
              <ul>
                <li>Access to your personal information</li>
                <li>Correction of inaccurate or incomplete information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction or objection to processing</li>
                <li>Data portability</li>
                <li>Withdrawal of consent</li>
              </ul>

              <p>
                To exercise these rights, please contact us at
                privacy@lynop.com.
              </p>

              <h2>Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, unless a
                longer retention period is required or permitted by law.
              </p>

              <h2>Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, disclosure, alteration, and destruction. These measures
                include quantum-resistant encryption, secure network
                architectures, and regular security assessments.
              </p>

              <h2>International Data Transfers</h2>
              <p>
                Your information may be transferred to, and processed in,
                countries other than the country in which you reside. These
                countries may have data protection laws that are different from
                the laws of your country. We have implemented appropriate
                safeguards to ensure that your personal information remains
                protected in accordance with this Privacy Policy.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not directed to children under the age of 16.
                We do not knowingly collect personal information from children
                under 16. If we learn that we have collected personal
                information from a child under 16, we will take steps to delete
                that information as soon as possible.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically for any changes.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us at:
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
