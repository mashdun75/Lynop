import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Secure Itemized Purchase Data Management
            </h1>
            <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
              Lynop provides quantum-resistant encrypted financial data
              management for consumers and real-time SKU-level insights for
              manufacturers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
            <Link href="/signup">
              <Button size="lg" className="px-8">
                Get Started
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
  );
}
