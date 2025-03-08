"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConnectAccountsPage() {
  const { session, supabase } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [session, router]);

  const handleConnectAccount = (accountName: string) => {
    // Simulate connecting an account
    setConnectedAccounts([...connectedAccounts, accountName]);
  };

  const handleFinish = async () => {
    try {
      // Update user metadata with connected accounts
      await supabase.auth.updateUser({
        data: {
          connected_accounts: connectedAccounts,
        },
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating connected accounts:", error);
    }
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
            <h1 className="text-3xl font-bold mb-4">Connect Your Accounts</h1>
            <p className="text-muted-foreground">
              Link your financial accounts to get the most out of Lynop
            </p>
          </div>

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
                        className={`cursor-pointer ${connectedAccounts.includes(bank) ? "border-primary" : "hover:border-primary"}`}
                      >
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{bank}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">
                            {connectedAccounts.includes(bank)
                              ? `${bank} account connected`
                              : `Connect your ${bank} accounts`}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            variant={
                              connectedAccounts.includes(bank)
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            className="w-full"
                            onClick={() => handleConnectAccount(bank)}
                          >
                            {connectedAccounts.includes(bank)
                              ? "Connected"
                              : "Connect"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="credit-cards" className="space-y-4 mt-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    {["Visa", "Mastercard", "American Express", "Discover"].map(
                      (card) => (
                        <Card
                          key={card}
                          className={`cursor-pointer ${connectedAccounts.includes(card) ? "border-primary" : "hover:border-primary"}`}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{card}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {connectedAccounts.includes(card)
                                ? `${card} cards connected`
                                : `Connect your ${card} credit cards`}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant={
                                connectedAccounts.includes(card)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="w-full"
                              onClick={() => handleConnectAccount(card)}
                            >
                              {connectedAccounts.includes(card)
                                ? "Connected"
                                : "Connect"}
                            </Button>
                          </CardFooter>
                        </Card>
                      ),
                    )}
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
                          className={`cursor-pointer ${connectedAccounts.includes(processor) ? "border-primary" : "hover:border-primary"}`}
                        >
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                              {processor}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground">
                              {connectedAccounts.includes(processor)
                                ? `${processor} account connected`
                                : `Connect your ${processor} account`}
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant={
                                connectedAccounts.includes(processor)
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              className="w-full"
                              onClick={() => handleConnectAccount(processor)}
                            >
                              {connectedAccounts.includes(processor)
                                ? "Connected"
                                : "Connect"}
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
              <Button onClick={handleFinish}>
                {connectedAccounts.length > 0
                  ? "Continue to Dashboard"
                  : "Skip for Now"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
