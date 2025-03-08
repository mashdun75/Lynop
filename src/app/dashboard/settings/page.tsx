"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SettingsPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [currency, setCurrency] = useState("usd");
  const [dateFormat, setDateFormat] = useState("mm/dd/yyyy");
  const [theme, setTheme] = useState("system");

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

  const handleSaveNotifications = () => {
    // Save notification settings
    console.log("Saving notification settings", {
      emailNotifications,
      marketingEmails,
    });
  };

  const handleSavePrivacy = () => {
    // Save privacy settings
    console.log("Saving privacy settings", { dataSharing });
  };

  const handleSavePreferences = () => {
    // Save preferences
    console.log("Saving preferences", { currency, dateFormat, theme });
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

  const userType = session.user.user_metadata?.user_type || "consumer";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application preferences and settings
          </p>
        </div>

        <Tabs defaultValue="notifications" className="w-full">
          <TabsList className="grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates about your account
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing-emails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional offers and updates
                    </p>
                  </div>
                  <Switch
                    id="marketing-emails"
                    checked={marketingEmails}
                    onCheckedChange={setMarketingEmails}
                  />
                </div>

                {userType === "manufacturer" && (
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sales-alerts">Sales Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified about significant changes in sales patterns
                      </p>
                    </div>
                    <Switch
                      id="sales-alerts"
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                )}

                <Button onClick={handleSaveNotifications}>
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your application experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <RadioGroup
                    value={currency}
                    onValueChange={setCurrency}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usd" id="usd" />
                      <Label htmlFor="usd" className="cursor-pointer">
                        USD ($)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eur" id="eur" />
                      <Label htmlFor="eur" className="cursor-pointer">
                        EUR (€)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="gbp" id="gbp" />
                      <Label htmlFor="gbp" className="cursor-pointer">
                        GBP (£)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <RadioGroup
                    value={dateFormat}
                    onValueChange={setDateFormat}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mm/dd/yyyy" id="mm/dd/yyyy" />
                      <Label htmlFor="mm/dd/yyyy" className="cursor-pointer">
                        MM/DD/YYYY
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dd/mm/yyyy" id="dd/mm/yyyy" />
                      <Label htmlFor="dd/mm/yyyy" className="cursor-pointer">
                        DD/MM/YYYY
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yyyy-mm-dd" id="yyyy-mm-dd" />
                      <Label htmlFor="yyyy-mm-dd" className="cursor-pointer">
                        YYYY-MM-DD
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Theme Preference</Label>
                  <RadioGroup
                    value={theme}
                    onValueChange={setTheme}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light" className="cursor-pointer">
                        Light
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark" className="cursor-pointer">
                        Dark
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system" className="cursor-pointer">
                        System
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your data and privacy preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-sharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      {userType === "manufacturer"
                        ? "Share anonymized sales data to improve industry insights"
                        : "Share anonymized purchase data to improve product recommendations"}
                    </p>
                  </div>
                  <Switch
                    id="data-sharing"
                    checked={dataSharing}
                    onCheckedChange={setDataSharing}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Data Export</Label>
                  <p className="text-sm text-muted-foreground">
                    Download all your data stored in our system
                  </p>
                  <Button variant="outline" className="mt-2">
                    Request Data Export
                  </Button>
                </div>

                <Button onClick={handleSavePrivacy}>
                  Save Privacy Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
