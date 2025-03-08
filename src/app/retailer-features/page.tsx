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
  Settings,
  Smartphone,
  Server,
  Lock,
} from "lucide-react";

export default function RetailerFeaturesPage() {
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
                  Free POS integration, fraud prevention, and remote management
                  for retail businesses
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-6">
                <Link href="/retailer-signup">
                  <Button size="lg" className="px-8">
                    Sign Up Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 text-foreground"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Key Features
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl max-w-[700px] mx-auto">
                Everything you need to manage your retail operations securely
                and efficiently
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Store className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">POS Integration</h3>
                <p className="text-muted-foreground">
                  Connect all your point-of-sale systems to Lynop's secure
                  platform. Monitor transactions in real-time and manage your
                  entire retail network from one dashboard.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Fraud Prevention</h3>
                <p className="text-muted-foreground">
                  Advanced AI algorithms detect suspicious return patterns and
                  potential fraud attempts in real-time, protecting your bottom
                  line and reducing losses.
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
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Remote Firmware Updates</h3>
                <p className="text-muted-foreground">
                  Manage and update your POS system firmware remotely through
                  our secure platform. Keep all your devices up-to-date without
                  on-site visits.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <BarChart4 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Return Analytics</h3>
                <p className="text-muted-foreground">
                  Gain valuable insights into return patterns, identify
                  problematic products, and take proactive measures to reduce
                  return rates and improve customer satisfaction.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">API Management</h3>
                <p className="text-muted-foreground">
                  Access secure APIs to integrate Lynop with your existing
                  retail management systems. Our encrypted API endpoints ensure
                  data security while enabling powerful integrations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
                How It Works
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Getting started with Lynop is simple and straightforward
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex justify-center items-center">
                <div className="space-y-4 max-w-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          1
                        </span>
                      </div>
                      <span className="font-medium">
                        Sign up for a free retailer account
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          2
                        </span>
                      </div>
                      <span className="font-medium">
                        Connect your POS systems
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          3
                        </span>
                      </div>
                      <span className="font-medium">
                        Configure fraud prevention settings
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          4
                        </span>
                      </div>
                      <span className="font-medium">
                        Monitor and manage from your dashboard
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-lg font-bold text-primary">
                          5
                        </span>
                      </div>
                      <span className="font-medium">
                        Reduce fraud and returns immediately
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 sm:flex-row justify-center">
                    <Link href="/retailer-signup">
                      <Button className="px-8">Get Started</Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="px-8">
                        Contact Sales
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Retailer Dashboard</h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Store className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">POS Systems</p>
                          <p className="text-sm text-muted-foreground">
                            Manage all your connected devices
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Fraud Prevention</p>
                          <p className="text-sm text-muted-foreground">
                            Configure AI-powered protection
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <BarChart4 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Analytics Dashboard</p>
                          <p className="text-sm text-muted-foreground">
                            Real-time insights and reporting
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
                  Supported POS Systems
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Lynop integrates with all major point-of-sale systems
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 mt-8 md:mt-12">
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Square</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Shopify POS</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Clover</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Toast</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Lightspeed</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Vend</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Revel</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">NCR</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Oracle MICROS</h3>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm flex flex-col items-center justify-center">
                <Store className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium text-center">Custom API</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  Security & Compliance
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Enterprise-grade security for your retail operations
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-8 md:mt-12">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Lock className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Quantum-Resistant Encryption</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Future-proof encryption that protects your data against even
                  quantum computing threats.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">PCI DSS Compliant</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fully compliant with Payment Card Industry Data Security
                  Standards for handling card data.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Server className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Secure API Endpoints</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  All API communications are encrypted and authenticated with
                  multiple security layers.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  Ready to transform your retail operations?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of retailers who trust Lynop to secure their
                  transactions and reduce fraud.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-6">
                <Link href="/retailer-signup">
                  <Button size="lg" className="px-8">
                    Sign Up Free
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="px-8">
                    Contact Sales
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
