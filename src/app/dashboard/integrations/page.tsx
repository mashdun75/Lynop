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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function IntegrationsPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  const accountingIntegrations = [
    {
      name: "QuickBooks",
      description:
        "Connect your QuickBooks account for seamless financial data sync",
      connected: false,
      logo: "QB",
    },
    {
      name: "Sage",
      description:
        "Integrate with Sage for comprehensive accounting management",
      connected: false,
      logo: "SG",
    },
    {
      name: "Xero",
      description: "Link your Xero account to streamline financial reporting",
      connected: true,
      logo: "XR",
    },
    {
      name: "NetSuite",
      description: "Enterprise-grade integration with Oracle NetSuite",
      connected: false,
      logo: "NS",
    },
  ];

  const otherIntegrations = [
    {
      name: "Zapier",
      description: "Connect with 3,000+ apps through custom Zapier workflows",
      connected: true,
      logo: "ZP",
    },
    {
      name: userType === "manufacturer" ? "Shopify" : "Mint",
      description:
        userType === "manufacturer"
          ? "Connect your Shopify store for direct sales data"
          : "Import your personal finance data from Mint",
      connected: false,
      logo: userType === "manufacturer" ? "SP" : "MT",
    },
    {
      name: userType === "manufacturer" ? "Salesforce" : "YNAB",
      description:
        userType === "manufacturer"
          ? "Integrate customer purchase data with your Salesforce CRM"
          : "Sync your budget data with You Need A Budget",
      connected: false,
      logo: userType === "manufacturer" ? "SF" : "YB",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your Lynop account with other services
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Accounting Software
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {accountingIntegrations.map((integration) => (
              <Card key={integration.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {integration.logo}
                      </div>
                      <CardTitle className="text-lg">
                        {integration.name}
                      </CardTitle>
                    </div>
                    <Switch
                      checked={integration.connected}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    {integration.connected ? "Manage Connection" : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Other Integrations
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {otherIntegrations.map((integration) => (
              <Card key={integration.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                        {integration.logo}
                      </div>
                      <CardTitle className="text-lg">
                        {integration.name}
                      </CardTitle>
                    </div>
                    <Switch
                      checked={integration.connected}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {integration.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    {integration.connected ? "Manage Connection" : "Connect"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Access</CardTitle>
            <CardDescription>
              Access the Lynop API for custom integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-muted p-2 rounded-md text-sm font-mono">
                  ••••••••••••••••••••••••••••••
                </div>
                <Button variant="outline" size="sm">
                  Show
                </Button>
                <Button variant="outline" size="sm">
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your API key provides full access to your account. Keep it
                secure.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View API Documentation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
