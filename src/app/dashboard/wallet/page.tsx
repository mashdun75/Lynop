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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Plus,
  Trash2,
  Edit,
  Star,
  Building,
  Smartphone,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Wallet,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CancelSubscriptionDialog } from "@/components/subscriptions/cancel-subscription-dialog";

export default function WalletPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [addingPayment, setAddingPayment] = useState(false);
  const [paymentType, setPaymentType] = useState<"card" | "bank" | null>(null);
  const [walletBalance, setWalletBalance] = useState(1250.75);
  const [cancelingSubscription, setCancelingSubscription] = useState(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<{
    name: string;
    amount: string;
    billingCycle: string;
    cancelUrl?: string;
  } | null>(null);

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 12/2025",
      isDefault: true,
      icon: "visa",
    },
    {
      id: "2",
      type: "bank",
      name: "Chase Checking",
      details: "Account ending in 6789",
      isDefault: false,
      icon: "bank",
    },
  ]);

  // Recent transactions
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: "t1",
      date: "2023-10-15",
      description: "Added funds",
      amount: 500,
      status: "completed",
      paymentMethod: "Visa ending in 4242",
    },
    {
      id: "t2",
      date: "2023-10-10",
      description: "Withdrawal",
      amount: -200,
      status: "completed",
      paymentMethod: "Chase Checking",
    },
    {
      id: "t3",
      date: "2023-10-05",
      description: "Added funds",
      amount: 1000,
      status: "completed",
      paymentMethod: "Bank Transfer",
    },
  ]);

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

  const handleAddPaymentMethod = (type: "card" | "bank") => {
    setPaymentType(type);
    setAddingPayment(true);
  };

  const handleSetDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleRemovePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
  };

  const handleAddFunds = () => {
    // This would integrate with a payment processor in a real app
    alert(
      "In a real app, this would open a payment flow to add funds to your wallet.",
    );
  };

  const handleConnectDigitalWallet = (walletType: string) => {
    // This would integrate with the respective digital wallet API
    alert(`In a real app, this would connect to ${walletType}.`);
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

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
          <p className="text-muted-foreground">
            Manage your payment methods and wallet balance
          </p>
        </div>

        {subscriptionToCancel && (
          <CancelSubscriptionDialog
            isOpen={cancelingSubscription}
            onClose={() => {
              setCancelingSubscription(false);
              setSubscriptionToCancel(null);
            }}
            subscriptionName={subscriptionToCancel.name}
            subscriptionAmount={subscriptionToCancel.amount}
            billingCycle={subscriptionToCancel.billingCycle}
            cancelUrl={subscriptionToCancel.cancelUrl}
          />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
              <CardDescription>Your current available balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">
                ${walletBalance.toFixed(2)}
              </div>
              <div className="mt-4 flex space-x-2">
                <Button onClick={handleAddFunds}>Add Funds</Button>
                <Button variant="outline">Withdraw</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common wallet operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                  onClick={() => router.push("/dashboard/wallet/nfc")}
                >
                  <Wallet className="h-6 w-6" />
                  <span>Tap to Pay</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <Smartphone className="h-6 w-6" />
                  <span>Mobile Top-up</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <Building className="h-6 w-6" />
                  <span>Bank Transfer</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <CreditCard className="h-6 w-6" />
                  <span>Request Money</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payment-methods" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="subscriptions">My Subscriptions</TabsTrigger>
            <TabsTrigger value="digital-wallets">Digital Wallets</TabsTrigger>
            <TabsTrigger value="crypto">Cryptocurrency</TabsTrigger>
          </TabsList>

          <TabsContent value="payment-methods" className="mt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Payment Methods</h2>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddPaymentMethod("card")}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Card
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddPaymentMethod("bank")}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Bank
                </Button>
              </div>
            </div>

            {paymentMethods.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <CreditCard className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center mb-4">
                    You haven't added any payment methods yet.
                  </p>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleAddPaymentMethod("card")}>
                      <Plus className="h-4 w-4 mr-2" /> Add Card
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleAddPaymentMethod("bank")}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Bank
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          {method.type === "card" ? (
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Building className="h-6 w-6 text-primary" />
                            </div>
                          )}
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium">{method.name}</p>
                              {method.isDefault && (
                                <Badge variant="outline" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {method.details}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!method.isDefault && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleSetDefaultPaymentMethod(method.id)
                              }
                            >
                              <Star className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemovePaymentMethod(method.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="transactions" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>

            {recentTransactions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground text-center">
                    No transactions yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <Card key={transaction.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center">
                            <p className="font-medium">
                              {transaction.description}
                            </p>
                            {transaction.status === "completed" ? (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              >
                                Completed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                              >
                                Pending
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()} •{" "}
                            {transaction.paymentMethod}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${transaction.amount > 0 ? "text-green-600" : ""}`}
                          >
                            {transaction.amount > 0 ? "+" : ""}$
                            {Math.abs(transaction.amount).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <div className="flex justify-center">
                  <Button variant="outline">View All Transactions</Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Active Subscriptions</h2>
            <p className="text-muted-foreground">
              Recurring payments detected from your transaction history
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#0070f3"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Netflix</p>
                        <p className="text-sm text-muted-foreground">
                          Entertainment
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-right">
                        <p className="font-medium">$14.99</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly • Next: Jun 15
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-destructive mt-2"
                        onClick={() => {
                          setSubscriptionToCancel({
                            name: "Netflix",
                            amount: "$14.99",
                            billingCycle: "monthly",
                            cancelUrl: "netflix.com/account",
                          });
                          setCancelingSubscription(true);
                        }}
                      >
                        Cancel subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18V5l12-2v13" />
                          <circle cx="6" cy="18" r="3" />
                          <circle cx="18" cy="16" r="3" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Spotify</p>
                        <p className="text-sm text-muted-foreground">Music</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-right">
                        <p className="font-medium">$9.99</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly • Next: Jun 22
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hover:text-destructive mt-2"
                        onClick={() => {
                          setSubscriptionToCancel({
                            name: "Spotify",
                            amount: "$9.99",
                            billingCycle: "monthly",
                            cancelUrl: "spotify.com/account",
                          });
                          setCancelingSubscription(true);
                        }}
                      >
                        Cancel subscription
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Adobe Creative Cloud</p>
                        <p className="text-sm text-muted-foreground">
                          Software
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$52.99</p>
                      <p className="text-sm text-muted-foreground">
                        Monthly • Next: Jun 05
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">New York Times</p>
                        <p className="text-sm text-muted-foreground">News</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$17.00</p>
                      <p className="text-sm text-muted-foreground">
                        Monthly • Next: Jun 18
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                          <path d="M9 12h6" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">YouTube Premium</p>
                        <p className="text-sm text-muted-foreground">
                          Entertainment
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$11.99</p>
                      <p className="text-sm text-muted-foreground">
                        Monthly • Next: Jun 10
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Lynop Pro</p>
                        <p className="text-sm text-muted-foreground">
                          Financial Services
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$29.00</p>
                      <p className="text-sm text-muted-foreground">
                        Annual • Next: Dec 01
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between items-center mt-6">
              <div>
                <h3 className="text-lg font-medium">
                  Total Monthly Subscriptions
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your recurring monthly expenses
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">$106.96</p>
                <p className="text-sm text-muted-foreground">
                  + $29.00/year for annual subscriptions
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="digital-wallets" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Connect Digital Wallets</h2>
            <p className="text-muted-foreground">
              Link your digital wallets for seamless payments
            </p>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Digital Wallets</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 8v8"></path>
                        <path d="M8 12h8"></path>
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Apple Pay</h3>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("Apple Pay")}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M8 12h8"></path>
                        <path d="M12 8v8"></path>
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Google Pay</h3>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("Google Pay")}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-[#0070ba] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        <rect width="18" height="11" x="3" y="11" rx="2"></rect>
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">PayPal</h3>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("PayPal")}
                    >
                      Manage
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 6h-5a4 4 0 1 0 0 8h5a4 4 0 1 1 0 8h-5"></path>
                        <path d="M12 4v16"></path>
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Samsung Pay</h3>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("Samsung Pay")}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-medium mt-8">Buy Now, Pay Later</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-[#ffb3c7] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#0a0f14"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Klarna</h3>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("Klarna")}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-[#7a2ff3] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
                        <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
                        <line x1="12" x2="12" y1="22" y2="13" />
                        <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Affirm</h3>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("Affirm")}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-[#392b85] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22v-5" />
                        <path d="M9 8V2" />
                        <path d="M15 8V2" />
                        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">Sezzle</h3>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnectDigitalWallet("Sezzle")}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col items-center justify-center space-y-4">
                    <div className="h-16 w-16 rounded-full bg-[#0070ba] flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                        <path d="M7 15h.01" />
                        <path d="M11 15h2" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium">PayPal Pay Later</h3>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() =>
                        handleConnectDigitalWallet("PayPal Pay Later")
                      }
                    >
                      Manage
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Connect with Plaid</CardTitle>
                <CardDescription>
                  Securely connect your bank accounts using Plaid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      Plaid allows you to securely connect your bank accounts
                      without sharing your credentials. Your data is encrypted
                      and protected.
                    </p>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Bank-level security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        2,000+ financial institutions
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => handleConnectDigitalWallet("Plaid")}
                >
                  Connect with Plaid
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="crypto" className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold">Cryptocurrency Wallets</h2>
            <p className="text-muted-foreground mb-6">
              Track and manage your cryptocurrency assets in one place
            </p>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f7931a"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11.767 19.089c4.924.868 9.593-2.535 10.461-7.603.868-5.069-2.382-9.93-7.305-10.799-4.923-.868-9.593 2.535-10.46 7.603-.869 5.068 2.381 9.93 7.304 10.799z" />
                          <path d="M15.032 8.512c.215-1.623-.946-2.026-2.555-2.49l.522-2.377-1.275-.301-.508 2.315c-.334-.083-.677-.161-1.018-.24l.511-2.33-1.274-.3-.522 2.376c-.276-.063-.548-.125-.811-.19l.001-.005-1.758-.415-.339 1.546s.946.232.927.246c.518.122.611.446.595.703l-.596 2.713c.035.009.081.021.131.041l-.133-.031-.836 3.802c-.062.158-.221.396-.578.305.013.018-.928-.248-.928-.248l-.633 1.656 1.659.392c.308.077.61.158.909.234l-.528 2.4 1.273.3.522-2.38c.347.09.684.174 1.015.253l-.521 2.37 1.274.3.528-2.397c2.167.39 3.797.233 4.486-1.938.556-1.752-.028-2.763-1.172-3.42.836-.205 1.464-.787 1.633-1.989zm-2.922 4.342c-.394 1.76-3.058.809-3.923.57l.699-3.18c.865.238 3.642.71 3.224 2.61zm.394-4.57c-.36 1.604-2.58.788-3.298.588l.635-2.885c.717.2 3.04.574 2.663 2.297z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Bitcoin</p>
                        <p className="text-sm text-muted-foreground">BTC</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">0.45 BTC</p>
                      <p className="text-sm text-muted-foreground">
                        ≈ $27,450.00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#627eea"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                          <path d="M12 16.5v3" />
                          <path d="M12 12v1.5" />
                          <path d="M12 2v4.5" />
                          <path d="M12 7.5v3" />
                          <path d="M8.4 7.5h7.2" />
                          <path d="M7.5 12h9" />
                          <path d="M8.4 16.5h7.2" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Ethereum</p>
                        <p className="text-sm text-muted-foreground">ETH</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">2.35 ETH</p>
                      <p className="text-sm text-muted-foreground">
                        ≈ $5,875.00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#26a17b"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v12" />
                          <path d="M8 10h8" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">USD Coin</p>
                        <p className="text-sm text-muted-foreground">USDC</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">1,250.00 USDC</p>
                      <p className="text-sm text-muted-foreground">
                        ≈ $1,250.00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-medium">Cryptocurrency Payments</h3>
              <p className="text-sm text-muted-foreground">
                Use your cryptocurrency to make payments at supported retailers
              </p>

              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Pay with Bitcoin</span>
                      </div>
                      <Badge variant="outline">15+ retailers</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Pay with Ethereum</span>
                      </div>
                      <Badge variant="outline">12+ retailers</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        <span>Pay with Stablecoins (USDC, USDT)</span>
                      </div>
                      <Badge variant="outline">20+ retailers</Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Connect External Wallet</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={addingPayment} onOpenChange={setAddingPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {paymentType === "card"
                ? "Add Credit/Debit Card"
                : "Add Bank Account"}
            </DialogTitle>
            <DialogDescription>
              {paymentType === "card"
                ? "Add a new card to your wallet for payments and deposits."
                : "Connect a bank account for transfers and withdrawals."}
            </DialogDescription>
          </DialogHeader>

          {paymentType === "card" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="defaultPayment" />
                <Label htmlFor="defaultPayment">
                  Set as default payment method
                </Label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-md flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Secure Connection</p>
                  <p className="text-sm">
                    In a real app, this would connect to Plaid or a similar
                    service to securely link your bank account.
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  placeholder="Chase, Bank of America, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <select
                  id="accountType"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="checking">Checking</option>
                  <option value="savings">Savings</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="defaultBank" />
                <Label htmlFor="defaultBank">
                  Set as default payment method
                </Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddingPayment(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would validate and process the form
                setAddingPayment(false);
                const newId = `${paymentMethods.length + 1}`;
                const newMethod = {
                  id: newId,
                  type: paymentType || "card",
                  name:
                    paymentType === "card" ? "New Card" : "New Bank Account",
                  details:
                    paymentType === "card"
                      ? "Expires 01/2028"
                      : "Account ending in 1234",
                  isDefault: paymentMethods.length === 0,
                  icon: paymentType === "card" ? "visa" : "bank",
                };
                setPaymentMethods([...paymentMethods, newMethod]);
              }}
            >
              {paymentType === "card" ? "Add Card" : "Connect Bank"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
