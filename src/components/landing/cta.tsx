import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Ready to secure your financial data?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Join thousands of consumers and manufacturers using Lynop's
              quantum-resistant platform for financial data management and
              insights.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 px-8"
              >
                Get Started
              </Button>
            </Link>
            <Link href="#">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-foreground hover:bg-primary-foreground/10 px-8"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
