"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  const plans = [
    {
      name: "Consumer Basic",
      description: "Perfect for individuals managing personal finances.",
      price: billingCycle === "monthly" ? "$9" : "$90",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $18" : null,
      features: [
        "Digitized receipts",
        "AI categorization",
        "Basic accounting integration",
        "Quantum-resistant encryption",
        "Cryptocurrency wallet tracking",
        "Mobile app access",
        "Email support",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Consumer Pro",
      description: "Ideal for small business owners and professionals.",
      price: billingCycle === "monthly" ? "$29" : "$290",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $58" : null,
      features: [
        "Everything in Basic",
        "Advanced accounting integration",
        "Tax preparation reports",
        "Custom categories",
        "Cryptocurrency payments",
        "Priority support",
        "Data export options",
        "Multi-account management",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Business Complete",
      description: "Full access to both consumer and manufacturer features.",
      price: billingCycle === "monthly" ? "$99" : "$990",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $198" : null,
      features: [
        "All Consumer Pro features",
        "Real-time SKU sales data",
        "Product variation tracking",
        "Purchase location insights",
        "Returns analysis & fraud detection",
        "Retailer integration tools",
        "AI supply chain optimization",
        "Dedicated account manager",
        "API access",
        "Custom reporting",
        "Data visualization tools",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Plans for Every Need
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your specific requirements.
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-6">
            <Button
              variant={billingCycle === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === "annual" ? "default" : "outline"}
              size="sm"
              onClick={() => setBillingCycle("annual")}
            >
              Annual
            </Button>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col border ${plan.highlighted ? "border-primary shadow-lg" : ""}`}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                  {plan.discount && (
                    <p className="text-sm text-primary font-medium mt-1">
                      {plan.discount}
                    </p>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full ${plan.highlighted ? "" : ""}`}
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
