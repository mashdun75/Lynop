"use client";

import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Fingerprint,
} from "lucide-react";

export default function IntegrationsPage() {
  const accountingIntegrations = [
    {
      name: "QuickBooks",
      description:
        "Sync transactions, categories, and receipts with QuickBooks Online or Desktop.",
      logo: "/images/quickbooks.svg", // You would need to add these logo files
      popular: true,
    },
    {
      name: "Sage",
      description:
        "Connect your Lynop account with Sage for seamless financial data transfer.",
      logo: "/images/sage.svg",
      popular: false,
    },
    {
      name: "NetSuite",
      description:
        "Enterprise-grade integration with Oracle NetSuite ERP system.",
      logo: "/images/netsuite.svg",
      popular: false,
    },
    {
      name: "Xero",
      description:
        "Automatically sync your itemized expenses with your Xero account.",
      logo: "/images/xero.svg",
      popular: true,
    },
    {
      name: "FreshBooks",
      description:
        "Connect Lynop with FreshBooks for simplified expense tracking and reporting.",
      logo: "/images/freshbooks.svg",
      popular: false,
    },
    {
      name: "Wave",
      description:
        "Free accounting software integration for small businesses and freelancers.",
      logo: "/images/wave.svg",
      popular: false,
    },
  ];

  const otherIntegrations = [
    {
      name: "Zapier",
      description:
        "Connect Lynop with 3,000+ apps through custom Zapier workflows.",
      logo: "/images/zapier.svg",
      popular: true,
    },
    {
      name: "Shopify",
      description:
        "For manufacturers: Connect your Shopify store for direct sales data.",
      logo: "/images/shopify.svg",
      popular: false,
    },
    {
      name: "Salesforce",
      description: "Integrate customer purchase data with your Salesforce CRM.",
      logo: "/images/salesforce.svg",
      popular: false,
    },
    {
      name: "Microsoft Power BI",
      description: "Create custom dashboards and reports with your Lynop data.",
      logo: "/images/powerbi.svg",
      popular: false,
    },
  ];

  // List of POS vendors and e-commerce platforms that integrate with Lynop
  const posVendors = [
    {
      name: "Square",
      type: "POS System",
      website: "square.com",
      status: "Live",
    },
    {
      name: "Shopify POS",
      type: "POS System",
      website: "shopify.com/pos",
      status: "Live",
    },
    {
      name: "Clover",
      type: "POS System",
      website: "clover.com",
      status: "Live",
    },
    {
      name: "Toast",
      type: "POS System",
      website: "toasttab.com",
      status: "Live",
    },
    {
      name: "Lightspeed",
      type: "POS System",
      website: "lightspeedhq.com",
      status: "Live",
    },
    { name: "Vend", type: "POS System", website: "vendhq.com", status: "Beta" },
    {
      name: "Revel",
      type: "POS System",
      website: "revelsystems.com",
      status: "Beta",
    },
    {
      name: "Amazon",
      type: "E-commerce",
      website: "amazon.com",
      status: "Live",
    },
    {
      name: "Walmart",
      type: "E-commerce",
      website: "walmart.com",
      status: "Live",
    },
    {
      name: "Target",
      type: "E-commerce",
      website: "target.com",
      status: "Live",
    },
    {
      name: "Best Buy",
      type: "E-commerce",
      website: "bestbuy.com",
      status: "Live",
    },
    { name: "Etsy", type: "E-commerce", website: "etsy.com", status: "Beta" },
    { name: "eBay", type: "E-commerce", website: "ebay.com", status: "Beta" },
    {
      name: "Wayfair",
      type: "E-commerce",
      website: "wayfair.com",
      status: "Coming Soon",
    },
    {
      name: "Newegg",
      type: "E-commerce",
      website: "newegg.com",
      status: "Coming Soon",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Integrations
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Connect Lynop with your favorite tools and services for a
                  seamless workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Accounting Software Integrations
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accountingIntegrations.map((integration) => (
                <Card key={integration.name} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {integration.name}
                        </h3>
                        {integration.popular && (
                          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                            Popular
                          </span>
                        )}
                        <p className="text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                        {/* Placeholder for logo */}
                        <span className="text-xs text-muted-foreground">
                          Logo
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
                POS & E-commerce Integrations
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Lynop seamlessly integrates with these point-of-sale systems and
                e-commerce platforms to capture itemized transaction data
                automatically.
              </p>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Website</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posVendors.map((vendor) => (
                    <TableRow key={vendor.name}>
                      <TableCell className="font-medium">
                        {vendor.name}
                      </TableCell>
                      <TableCell>{vendor.type}</TableCell>
                      <TableCell>{vendor.website}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${vendor.status === "Live" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : vendor.status === "Beta" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"}`}
                        >
                          {vendor.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Don't see your POS system or e-commerce platform? Contact us to
                request an integration.
              </p>
              <Button variant="outline">Request Integration</Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tight mb-8">
              Other Integrations
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherIntegrations.map((integration) => (
                <Card key={integration.name} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg mb-2">
                          {integration.name}
                        </h3>
                        {integration.popular && (
                          <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                            Popular
                          </span>
                        )}
                        <p className="text-muted-foreground">
                          {integration.description}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                        {/* Placeholder for logo */}
                        <span className="text-xs text-muted-foreground">
                          Logo
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
                Mobile App Integrations
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Lynop works seamlessly with your favorite mobile apps and
                platforms.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex justify-center items-center">
                <div className="space-y-4 max-w-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>iOS and Android native apps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Apple Wallet and Google Pay</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Biometric authentication support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Push notifications for transactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Offline mode with data sync</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 sm:flex-row justify-center">
                    <Link href="/signup">
                      <Button className="px-8">Get Started</Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="outline" className="px-8">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Mobile Integration</h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-600"
                          >
                            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                            <path d="M10 2c1 .5 2 2 2 5"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">iOS Integration</p>
                          <p className="text-sm text-muted-foreground">
                            Native iOS app with Apple Wallet support
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-green-600"
                          >
                            <path d="M5 17h14v4H5z"></path>
                            <path d="M15 3h4l-4 8h4"></path>
                            <path d="M5 3h4l-4 8h4"></path>
                            <path d="M8 3v2"></path>
                            <path d="M16 3v2"></path>
                            <path d="M12 3v8"></path>
                            <path d="M12 16v1"></path>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Android Integration</p>
                          <p className="text-sm text-muted-foreground">
                            Native Android app with Google Pay support
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Fingerprint className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Biometric Security</p>
                          <p className="text-sm text-muted-foreground">
                            Fingerprint and Face ID authentication
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

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Need a custom integration?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our team can build custom integrations for your specific
                  needs. Contact us to discuss your requirements.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6 mt-6">
                <Link href="#">
                  <Button size="lg" className="px-8">
                    Contact Sales
                  </Button>
                </Link>
                <Link href="#">
                  <Button size="lg" variant="outline" className="px-8">
                    API Documentation
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
