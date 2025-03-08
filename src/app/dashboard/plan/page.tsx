"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, CreditCard } from "lucide-react";

export default function PlanPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  useEffect(() => {
    if (session === null && !isLoading) {
      router.push("/login");
    } else if (session) {
      setIsLoading(false);
    }
  }, [session, router, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect in useEffect
  }

  const userType = session.user.user_metadata?.user_type || "consumer";

  // Assume the user is on the Pro plan for this example
  const currentPlan =
    userType === "manufacturer" ? "Manufacturer" : "Consumer Pro";
  const nextBillingDate = new Date();
  nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

  const formattedNextBillingDate = nextBillingDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const consumerPlans = [
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
        "Email support",
      ],
      current: currentPlan === "Consumer Basic",
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
        "Priority support",
        "Data export options",
        "Multi-account management",
      ],
      current: currentPlan === "Consumer Pro",
    },
    {
      name: "Manufacturer",
      description: "Real-time SKU data for manufacturers and suppliers.",
      price: billingCycle === "monthly" ? "$99" : "$990",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $198" : null,
      features: [
        "Real-time SKU sales data",
        "Product variation tracking",
        "Purchase location insights",
        "AI supply chain optimization",
        "Dedicated account manager",
        "API access",
        "Custom reporting",
        "Data visualization tools",
        "SLA guarantees",
      ],
      current: currentPlan === "Manufacturer",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Plan</h1>
          <p className="text-muted-foreground">
            Manage your subscription and billing details
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Your active plan and billing information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{currentPlan}</h3>
                <p className="text-sm text-muted-foreground">
                  {billingCycle === "monthly" ? "Monthly" : "Annual"} billing
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  {userType === "manufacturer"
                    ? billingCycle === "monthly"
                      ? "$99"
                      : "$990"
                    : billingCycle === "monthly"
                      ? "$29"
                      : "$290"}
                  <span className="text-sm font-normal text-muted-foreground">
                    {billingCycle === "monthly" ? "/month" : "/year"}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Next billing: {formattedNextBillingDate}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-4">
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
                Annual (Save 15%)
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline">Cancel Subscription</Button>
            <Button>Update Payment Method</Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Available Plans
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {consumerPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`flex flex-col ${plan.current ? "border-primary" : ""}`}
              >
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{plan.price}</span>
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
                  {plan.current ? (
                    <Button className="w-full" variant="outline" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full">
                      {userType === plan.name.toLowerCase().includes(userType)
                        ? "Upgrade"
                        : "Switch Plan"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Remove</Button>
            <Button variant="outline">Update</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View your past invoices and receipts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Invoice #LYN-2023-0012</p>
                  <p className="text-sm text-muted-foreground">
                    October 1, 2023
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {userType === "manufacturer" ? "$99.00" : "$29.00"}
                  </p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Invoice #LYN-2023-0011</p>
                  <p className="text-sm text-muted-foreground">
                    September 1, 2023
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {userType === "manufacturer" ? "$99.00" : "$29.00"}
                  </p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Invoice #LYN-2023-0010</p>
                  <p className="text-sm text-muted-foreground">
                    August 1, 2023
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {userType === "manufacturer" ? "$99.00" : "$29.00"}
                  </p>
                  <p className="text-sm text-green-600">Paid</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Invoices
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
