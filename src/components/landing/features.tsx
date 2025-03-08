import { CheckCircle, Zap, Shield, BarChart } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Advanced Financial Data Management
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Lynop offers powerful tools for both consumers and manufacturers
              with quantum-resistant encryption for ultimate privacy.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12 pt-12">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Post-Quantum Encryption</h3>
            </div>
            <p className="text-muted-foreground">
              Your financial data is protected with quantum-resistant
              encryption, ensuring privacy even against future quantum computing
              threats.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">AI-Powered Categorization</h3>
            </div>
            <p className="text-muted-foreground">
              Automatically categorize itemized expenses with our advanced AI,
              saving time and improving accuracy for accounting and tax
              purposes.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Accounting Integration</h3>
            </div>
            <p className="text-muted-foreground">
              Seamlessly sync with QuickBooks, Sage, NetSuite and other
              accounting software to streamline your financial management
              workflow.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <BarChart className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Real-time SKU Analytics</h3>
            </div>
            <p className="text-muted-foreground">
              Manufacturers gain valuable insights with real-time sales data at
              the SKU level, including product variations and purchase
              locations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
