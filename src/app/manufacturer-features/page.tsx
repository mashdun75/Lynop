import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BarChart,
  TrendingUp,
  Map,
  ShoppingCart,
  Truck,
  Brain,
} from "lucide-react";

export default function ManufacturerFeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Manufacturer Features
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Gain unprecedented visibility into your product sales with
                  real-time SKU-level data.
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
                  <BarChart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Real-time SKU Analytics</h3>
                <p className="text-muted-foreground">
                  Access detailed sales data at the SKU level in real-time.
                  Track performance across different retailers and regions.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">
                  Product Variation Tracking
                </h3>
                <p className="text-muted-foreground">
                  Monitor performance of different product variations, colors,
                  sizes, and models to optimize your product lineup.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Map className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Geographic Insights</h3>
                <p className="text-muted-foreground">
                  Understand where your products are selling best with detailed
                  location data, helping you target marketing and distribution.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">
                  AI Supply Chain Optimization
                </h3>
                <p className="text-muted-foreground">
                  Our AI analyzes sales patterns to provide recommendations for
                  inventory management and production planning.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Competitive Analysis</h3>
                <p className="text-muted-foreground">
                  Gain insights into market trends and competitive positioning
                  while maintaining consumer privacy.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Distribution Optimization</h3>
                <p className="text-muted-foreground">
                  Identify the most effective distribution channels and retail
                  partners based on actual sales performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Transform your supply chain with real-time data
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join leading manufacturers who use Lynop to make data-driven
                  decisions for production and distribution.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
                <Link href="/signup">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="#">
                  <Button size="lg" variant="outline" className="px-8">
                    Request Demo
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
