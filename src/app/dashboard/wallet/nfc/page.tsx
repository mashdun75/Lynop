"use client";

import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Smartphone,
  CreditCard,
  Wallet,
  ShieldCheck,
  Banknote,
  Wifi,
} from "lucide-react";

export default function NFCPaymentPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [nfcEnabled, setNfcEnabled] = useState(false);
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState("visa");
  const [requireAuthentication, setRequireAuthentication] = useState(true);
  const [transactionLimit, setTransactionLimit] = useState(100);

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

  const handleActivateNFC = () => {
    setNfcEnabled(true);
    // In a real app, this would activate the device's NFC capabilities
  };

  const handleDeactivateNFC = () => {
    setNfcEnabled(false);
    // In a real app, this would deactivate the device's NFC capabilities
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
          <h1 className="text-3xl font-bold tracking-tight">NFC Payments</h1>
          <p className="text-muted-foreground">
            Configure your in-store contactless payment settings
          </p>
        </div>

        <Card className={nfcEnabled ? "border-primary" : ""}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wifi className="mr-2 h-5 w-5" />
              NFC Payment Status
            </CardTitle>
            <CardDescription>
              Enable or disable contactless payments at point-of-sale terminals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">NFC Payments</p>
                <p className="text-sm text-muted-foreground">
                  {nfcEnabled
                    ? "Your device is ready for contactless payments"
                    : "Tap to pay is currently disabled"}
                </p>
              </div>
              <Switch
                checked={nfcEnabled}
                onCheckedChange={(checked) =>
                  checked ? handleActivateNFC() : handleDeactivateNFC()
                }
              />
            </div>
          </CardContent>
          {nfcEnabled && (
            <CardFooter>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md w-full flex items-start">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">
                    NFC Payment Active
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-500">
                    Your device is ready to make contactless payments. Hold your
                    phone near a payment terminal to pay.
                  </p>
                </div>
              </div>
            </CardFooter>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Select which payment method to use for contactless payments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={defaultPaymentMethod}
              onValueChange={setDefaultPaymentMethod}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="visa" id="visa" />
                <Label
                  htmlFor="visa"
                  className="flex items-center cursor-pointer"
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">
                      Expires 12/2025
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="chase" id="chase" />
                <Label
                  htmlFor="chase"
                  className="flex items-center cursor-pointer"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">Chase Checking</p>
                    <p className="text-sm text-muted-foreground">
                      Account ending in 6789
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-4 rounded-md">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label
                  htmlFor="paypal"
                  className="flex items-center cursor-pointer"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">PayPal</p>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>
              Configure authentication requirements for contactless payments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Require Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Use biometric authentication for all contactless payments
                </p>
              </div>
              <Switch
                checked={requireAuthentication}
                onCheckedChange={setRequireAuthentication}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transaction-limit">Transaction Limit</Label>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-medium">$</span>
                <input
                  id="transaction-limit"
                  type="number"
                  value={transactionLimit}
                  onChange={(e) =>
                    setTransactionLimit(parseInt(e.target.value) || 0)
                  }
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Maximum amount allowed for a single contactless payment
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Security Settings</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compatible Devices</CardTitle>
            <CardDescription>Devices that support NFC payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4 border-b pb-4">
                <Smartphone className="h-8 w-8 text-primary mt-1" />
                <div>
                  <p className="font-medium">iPhone 13 Pro</p>
                  <p className="text-sm text-muted-foreground">
                    iOS 16.5 • Last used today
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-green-500">
                      Active
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Smartphone className="h-8 w-8 text-muted-foreground mt-1" />
                <div>
                  <p className="font-medium">Samsung Galaxy S22</p>
                  <p className="text-sm text-muted-foreground">
                    Android 13 • Last used 5 days ago
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      Inactive
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Add New Device
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
