import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  About Lynop
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Our mission is to revolutionize financial data management with
                  quantum-resistant security and real-time insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2022, Lynop was born from a simple observation: as
                  our financial lives become increasingly digital, the security
                  and utility of our transaction data becomes paramount.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founders, with backgrounds in quantum computing,
                  cryptography, and financial technology, recognized that
                  current encryption methods would soon be vulnerable to quantum
                  computing attacks. At the same time, they saw an opportunity
                  to use this data to provide unprecedented insights for both
                  consumers and manufacturers.
                </p>
                <p className="text-muted-foreground">
                  Today, Lynop is at the forefront of secure financial data
                  management, offering quantum-resistant encryption and powerful
                  analytics tools that help individuals manage their finances
                  and enable manufacturers to understand their products'
                  performance in real-time.
                </p>
              </div>
              <div className="bg-muted rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Our Values</h3>
                <ul className="space-y-4">
                  <li>
                    <h4 className="font-bold">Security First</h4>
                    <p className="text-muted-foreground">
                      We believe your financial data deserves the highest level
                      of protection. Our quantum-resistant encryption ensures
                      your information remains secure even against future
                      threats.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold">User Privacy</h4>
                    <p className="text-muted-foreground">
                      Your data belongs to you. We never sell your personal
                      information and only use it to provide the services you've
                      explicitly requested.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold">Continuous Innovation</h4>
                    <p className="text-muted-foreground">
                      We're constantly pushing the boundaries of what's possible
                      in financial technology, developing new features and
                      improving security measures.
                    </p>
                  </li>
                  <li>
                    <h4 className="font-bold">Transparency</h4>
                    <p className="text-muted-foreground">
                      We believe in clear communication about how our technology
                      works and how we handle your data.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-8">
              Leadership Team
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="font-bold text-xl">Sarah Chen</h3>
                <p className="text-primary font-medium mb-2">
                  CEO & Co-Founder
                </p>
                <p className="text-muted-foreground text-sm">
                  Former quantum computing researcher at MIT with 10+ years in
                  fintech. Led security teams at major financial institutions
                  before founding Lynop.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="font-bold text-xl">Michael Rodriguez</h3>
                <p className="text-primary font-medium mb-2">
                  CTO & Co-Founder
                </p>
                <p className="text-muted-foreground text-sm">
                  Cryptography expert with background in blockchain and
                  distributed systems. Previously led engineering at a Y
                  Combinator-backed security startup.
                </p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="font-bold text-xl">Alex Johnson</h3>
                <p className="text-primary font-medium mb-2">CPO</p>
                <p className="text-muted-foreground text-sm">
                  Product leader with experience at Square and Stripe.
                  Passionate about creating intuitive financial tools that
                  empower users.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Join Our Team
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground mb-8">
              We're always looking for talented individuals who share our
              passion for security, innovation, and creating exceptional user
              experiences.
            </p>
            <Link href="/careers">
              <Button size="lg">View Open Positions</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
