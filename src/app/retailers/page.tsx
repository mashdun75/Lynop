import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  Shield,
  Zap,
  Receipt,
  FileText,
  Wallet,
  Store,
  RefreshCw,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  Target,
  BarChart4,
  ShoppingCart,
  Package,
  ThumbsDown,
  ArrowDownUp,
} from "lucide-react";

export default function RetailersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Lynop for Retailers
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Reduce fraud, minimize returns, and enhance customer
                  satisfaction with Lynop's retail integration framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <ThumbsDown className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Reduce Return Rates</h3>
                <p className="text-muted-foreground">
                  Lynop's integration with your POS system provides detailed
                  insights into return patterns, helping you identify and
                  address issues before they become trends.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Fraud Detection</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms detect suspicious return patterns and
                  potential fraud attempts in real-time, protecting your bottom
                  line.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Receipt className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Digital Receipts</h3>
                <p className="text-muted-foreground">
                  Eliminate paper receipts and provide customers with secure,
                  quantum-encrypted digital receipts that can't be tampered with
                  or forged.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Package className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Product Insights</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights into which products have high return
                  rates and why, allowing you to address quality issues or
                  improve product descriptions.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <ArrowDownUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Seamless Integration</h3>
                <p className="text-muted-foreground">
                  Lynop integrates with all major POS systems and e-commerce
                  platforms with minimal setup time and no disruption to your
                  existing operations.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Cryptocurrency Payments</h3>
                <p className="text-muted-foreground">
                  Accept cryptocurrency payments securely through Lynop's wallet
                  integration, expanding your payment options without additional
                  complexity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
                How Lynop Reduces Return Fraud
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Our comprehensive approach to fraud prevention protects your
                business at every step.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex justify-center items-center">
                <div className="space-y-4 max-w-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Tamper-proof digital receipts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Biometric verification for high-value returns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>AI-powered suspicious pattern detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Cross-retailer fraud monitoring network</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Real-time alerts for suspicious activity</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 sm:flex-row justify-center">
                    <Link href="/contact">
                      <Button className="px-8">Contact Sales</Button>
                    </Link>
                    <Link href="/integrations">
                      <Button variant="outline" className="px-8">
                        View Integrations
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">
                      Return Fraud Prevention
                    </h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Wardrobing Detection</p>
                          <p className="text-sm text-muted-foreground">
                            Identifies customers who repeatedly buy, use, and
                            return items
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <RefreshCw className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">
                            Receipt Fraud Prevention
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Eliminates fake or altered receipt returns
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Return Rate Analytics</p>
                          <p className="text-sm text-muted-foreground">
                            Detailed insights into return patterns and trends
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  Integration Process
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Getting started with Lynop is simple and straightforward
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8 md:mt-12">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-medium">Initial Consultation</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our team meets with you to understand your specific needs and
                  challenges.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-medium">System Integration</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  We connect Lynop with your existing POS and e-commerce systems
                  with minimal disruption.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-medium">Staff Training</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  We provide comprehensive training for your team on using the
                  Lynop system.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-medium">Go Live</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Launch the system with our team on standby to ensure a smooth
                  transition.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">5</span>
                  </div>
                  <h3 className="font-medium">Ongoing Support</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Continuous support and regular updates to keep your system
                  optimized.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-xl font-bold text-primary">6</span>
                  </div>
                  <h3 className="font-medium">Performance Review</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Regular analysis of results and optimization recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  Ready to reduce returns and fight fraud?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join leading retailers who trust Lynop to protect their
                  business and improve customer satisfaction.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-6">
                <Link href="/contact">
                  <Button size="lg" className="px-8">
                    Request Demo
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="px-8">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
