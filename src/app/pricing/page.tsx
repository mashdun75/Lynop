import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Pricing } from "@/components/landing/pricing";
import { CheckCircle2, X, MountainIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Pricing Plans
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Choose the perfect plan for your needs with our transparent
                  pricing options.
                </p>
              </div>
            </div>
          </div>
        </section>
        <Pricing />

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-2xl font-bold tracking-tight text-center mb-8">
                Compare Plans
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="py-4 px-6 bg-muted">Feature</th>
                      <th className="py-4 px-6 bg-muted text-center">
                        Consumer Basic
                      </th>
                      <th className="py-4 px-6 bg-muted text-center">
                        Consumer Pro
                      </th>
                      <th className="py-4 px-6 bg-muted text-center">
                        Business Complete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-4 px-6 border">Consumer Features</td>
                      <td className="py-4 px-6 border text-center">Basic</td>
                      <td className="py-4 px-6 border text-center">Advanced</td>
                      <td className="py-4 px-6 border text-center">Complete</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">
                        Manufacturer Features
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">AI Insights</td>
                      <td className="py-4 px-6 border text-center">Basic</td>
                      <td className="py-4 px-6 border text-center">Advanced</td>
                      <td className="py-4 px-6 border text-center">
                        Enterprise
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">Digital Wallet</td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">
                        Cryptocurrency Wallet
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">Crypto Payments</td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">Sales Analytics</td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">Returns Analysis</td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">Retailer Integration</td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      </td>
                      <td className="py-4 px-6 border text-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mx-auto" />
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 border">Support</td>
                      <td className="py-4 px-6 border text-center">Email</td>
                      <td className="py-4 px-6 border text-center">Priority</td>
                      <td className="py-4 px-6 border text-center">
                        Dedicated Manager
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">
                    Can I access both consumer and manufacturer features?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, the Business Complete plan gives you access to both
                    consumer and manufacturer features, perfect for businesses
                    that need both perspectives.
                  </p>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">
                    Can I change plans later?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time.
                    Changes will be reflected in your next billing cycle.
                  </p>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">
                    Is there a free trial?
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, all paid plans come with a 14-day free trial so you can
                    test the features before committing.
                  </p>
                </div>
                <div className="rounded-lg border p-6">
                  <h3 className="text-lg font-medium">Do you offer refunds?</h3>
                  <p className="mt-2 text-muted-foreground">
                    If you're not satisfied, we offer a 30-day money-back
                    guarantee on all paid plans.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
