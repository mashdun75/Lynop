import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Security at Lynop
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  How we protect your data with quantum-resistant encryption and
                  advanced security measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Our Security Approach
                </h2>
                <p className="text-muted-foreground mb-4">
                  At Lynop, security is not just a feature—it's the foundation
                  of everything we build. We've designed our platform from the
                  ground up with a security-first mindset, implementing multiple
                  layers of protection to safeguard your financial data.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our team includes experts in cryptography, quantum computing,
                  and cybersecurity who continuously monitor, test, and improve
                  our security measures to stay ahead of emerging threats.
                </p>
                <p className="text-muted-foreground">
                  We believe that strong security and great user experience can
                  coexist. That's why we've built powerful security features
                  that work seamlessly in the background, protecting your data
                  without getting in your way.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Security Highlights</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div>
                      <h4 className="font-bold">
                        Quantum-Resistant Encryption
                      </h4>
                      <p className="text-muted-foreground">
                        Our encryption algorithms are designed to withstand
                        attacks from both conventional and quantum computers,
                        future-proofing your data security.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div>
                      <h4 className="font-bold">End-to-End Encryption</h4>
                      <p className="text-muted-foreground">
                        Your data is encrypted on your device before being
                        transmitted and remains encrypted while stored. It's
                        only decrypted when you access it with your
                        authenticated credentials.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Multi-Factor Authentication</h4>
                      <p className="text-muted-foreground">
                        Add an extra layer of security to your account with
                        biometric authentication, hardware keys, or one-time
                        passcodes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <div>
                      <h4 className="font-bold">Regular Security Audits</h4>
                      <p className="text-muted-foreground">
                        Our systems undergo regular third-party security audits
                        and penetration testing to identify and address
                        potential vulnerabilities.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
              Our Security Measures
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Data Encryption</h3>
                <p className="text-muted-foreground">
                  All sensitive data is encrypted using quantum-resistant
                  algorithms. We use AES-256 for symmetric encryption and
                  post-quantum cryptography for asymmetric encryption.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Network Security</h3>
                <p className="text-muted-foreground">
                  Our infrastructure is protected by multiple layers of
                  firewalls, intrusion detection systems, and DDoS protection.
                  All data in transit is secured using TLS 1.3.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Authentication</h3>
                <p className="text-muted-foreground">
                  We support multi-factor authentication, biometric
                  verification, and hardware security keys. Password policies
                  enforce strong credentials and regular rotation.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Threat Detection</h3>
                <p className="text-muted-foreground">
                  Our security operations center monitors for suspicious
                  activities 24/7. We use AI-powered systems to detect and
                  respond to potential threats in real-time.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M2 15h10" />
                    <path d="m9 18 3-3-3-3" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Compliance</h3>
                <p className="text-muted-foreground">
                  We adhere to industry standards and regulations including
                  GDPR, CCPA, PCI DSS, and SOC 2. Regular audits ensure ongoing
                  compliance with these standards.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Security Training</h3>
                <p className="text-muted-foreground">
                  All Lynop employees undergo comprehensive security training.
                  We maintain a security-first culture with regular updates and
                  awareness programs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Quantum-Resistant Encryption
                </h2>
                <p className="text-muted-foreground mb-4">
                  Traditional encryption methods may become vulnerable to
                  attacks from quantum computers in the future. That's why we've
                  implemented quantum-resistant encryption algorithms that are
                  designed to withstand such attacks.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our encryption approach combines established cryptographic
                  methods with post-quantum algorithms recommended by the
                  National Institute of Standards and Technology (NIST).
                </p>
                <p className="text-muted-foreground">
                  This forward-thinking approach ensures that your data remains
                  secure not just today, but well into the future as quantum
                  computing technology advances.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Security Certifications
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      <span className="font-bold">SOC</span>
                    </div>
                    <div>
                      <h3 className="font-bold">SOC 2 Type II</h3>
                      <p className="text-sm text-muted-foreground">
                        Certified for security, availability, and
                        confidentiality
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      <span className="font-bold">ISO</span>
                    </div>
                    <div>
                      <h3 className="font-bold">ISO 27001</h3>
                      <p className="text-sm text-muted-foreground">
                        Certified for information security management
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      <span className="font-bold">PCI</span>
                    </div>
                    <div>
                      <h3 className="font-bold">PCI DSS</h3>
                      <p className="text-sm text-muted-foreground">
                        Compliant with Payment Card Industry standards
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Have questions about our security measures?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground mb-8">
              Our security team is available to discuss how we protect your data
              and answer any questions you may have about our approach.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">Contact Security Team</Button>
              </Link>
              <Link href="/security/whitepaper">
                <Button variant="outline" size="lg">
                  Download Security Whitepaper
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
