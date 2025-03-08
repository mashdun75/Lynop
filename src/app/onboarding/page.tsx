"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

export default function OnboardingPage() {
  const { session, supabase } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  // User profile data
  const [userType, setUserType] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [selectedPlan, setSelectedPlan] = useState("");

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  const handleCompleteProfile = async () => {
    try {
      await supabase.auth.updateUser({
        data: {
          address,
          city,
          state,
          zip_code: zipCode,
          country,
          user_types: userType,
          onboarding_completed: true,
        },
      });
      setStep(2);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSelectPlan = async () => {
    try {
      await supabase.auth.updateUser({
        data: {
          selected_plan: selectedPlan,
          billing_cycle: billingCycle,
        },
      });
      setStep(3);
    } catch (error) {
      console.error("Error selecting plan:", error);
    }
  };

  const handleFinishOnboarding = () => {
    router.push("/dashboard");
  };

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
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <header className="h-16 border-b bg-card flex items-center px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-xl">Lynop</span>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold">
                Complete Your Account Setup
              </h1>
              <div className="flex items-center space-x-2">
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  1
                </div>
                <div
                  className={`h-1 w-8 ${step >= 2 ? "bg-primary" : "bg-muted"}`}
                ></div>
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  2
                </div>
                <div
                  className={`h-1 w-8 ${step >= 3 ? "bg-primary" : "bg-muted"}`}
                ></div>
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  3
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">
              {step === 1
                ? "Complete your profile information"
                : step === 2
                  ? "Choose your subscription plan"
                  : "Connect your accounts"}
            </p>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Tell us more about yourself</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>How will you use Lynop?</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consumer-personal"
                        checked={userType.includes("consumer-personal")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setUserType([...userType, "consumer-personal"]);
                          } else {
                            setUserType(
                              userType.filter((t) => t !== "consumer-personal"),
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor="consumer-personal"
                        className="cursor-pointer"
                      >
                        Personal finances
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="consumer-business"
                        checked={userType.includes("consumer-business")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setUserType([...userType, "consumer-business"]);
                          } else {
                            setUserType(
                              userType.filter((t) => t !== "consumer-business"),
                            );
                          }
                        }}
                      />
                      <Label
                        htmlFor="consumer-business"
                        className="cursor-pointer"
                      >
                        Business finances
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="manufacturer"
                        checked={userType.includes("manufacturer")}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setUserType([...userType, "manufacturer"]);
                          } else {
                            setUserType(
                              userType.filter((t) => t !== "manufacturer"),
                            );
                          }
                        }}
                      />
                      <Label htmlFor="manufacturer" className="cursor-pointer">
                        Manufacturing and SKU tracking
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Address Information</Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Street Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="State/Province"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Zip/Postal Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handleCompleteProfile}
                  disabled={
                    userType.length === 0 ||
                    !address ||
                    !city ||
                    !state ||
                    !zipCode ||
                    !country
                  }
                >
                  Continue to Plan Selection
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Button
                  variant={billingCycle === "monthly" ? "default" : "outline"}
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly Billing
                </Button>
                <Button
                  variant={billingCycle === "annual" ? "default" : "outline"}
                  onClick={() => setBillingCycle("annual")}
                >
                  Annual Billing (Save 15%)
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {consumerPlans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={`flex flex-col cursor-pointer ${selectedPlan === plan.name ? "border-primary ring-2 ring-primary" : ""}`}
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div className="mb-6">
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">
                          {plan.period}
                        </span>
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
                        className="w-full"
                        variant={
                          selectedPlan === plan.name ? "default" : "outline"
                        }
                      >
                        {selectedPlan === plan.name
                          ? "Selected"
                          : "Select Plan"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button onClick={handleSelectPlan} disabled={!selectedPlan}>
                  Continue to Connect Accounts
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Accounts</CardTitle>
                <CardDescription>
                  Link your financial accounts for better insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="banking">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="banking">Banking</TabsTrigger>
                    <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
                    <TabsTrigger value="payment-processors">
                      Payment Processors
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="banking" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        "Chase",
                        "Bank of America",
                        "Wells Fargo",
                        "Citibank",
                      ].map((bank) => (
                        <Card
                          key={bank}
                          className="cursor-pointer hover:border-primary"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{bank}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Connect your {bank} accounts
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Connect
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="credit-cards" className="space-y-4 mt-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        "Visa",
                        "Mastercard",
                        "American Express",
                        "Discover",
                      ].map((card) => (
                        <Card
                          key={card}
                          className="cursor-pointer hover:border-primary"
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{card}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              Connect your {card} credit cards
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              Connect
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="payment-processors"
                    className="space-y-4 mt-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      {["PayPal", "Stripe", "Square", "Shopify Payments"].map(
                        (processor) => (
                          <Card
                            key={processor}
                            className="cursor-pointer hover:border-primary"
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-lg">
                                {processor}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-muted-foreground">
                                Connect your {processor} account
                              </p>
                            </CardContent>
                            <CardFooter>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full"
                              >
                                Connect
                              </Button>
                            </CardFooter>
                          </Card>
                        ),
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  You can always connect more accounts later
                </p>
                <Button onClick={handleFinishOnboarding}>Complete Setup</Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
