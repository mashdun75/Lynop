"use client";

import { useState } from "react";
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
  Smartphone,
  QrCode,
  Download,
  CheckCircle2,
  Fingerprint,
  Shield,
  CreditCard,
  Bell,
  Wallet,
} from "lucide-react";

export default function MobileAppPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSendLink = () => {
    setIsLoading(true);
    // Simulate sending email
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mobile App</h1>
          <p className="text-muted-foreground">
            Access your Lynop account on the go with our mobile apps
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Download the App</CardTitle>
              <CardDescription>
                Get the Lynop mobile app for iOS and Android
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <a
                  href="https://apps.apple.com/app/lynop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full" variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"></path>
                      <path d="M10 2c1 .5 2 2 2 5"></path>
                    </svg>
                    App Store
                  </Button>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.lynop.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button className="w-full" variant="outline">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M5 17h14v4H5z"></path>
                      <path d="M15 3h4l-4 8h4"></path>
                      <path d="M5 3h4l-4 8h4"></path>
                      <path d="M8 3v2"></path>
                      <path d="M16 3v2"></path>
                      <path d="M12 3v8"></path>
                      <path d="M12 16v1"></path>
                    </svg>
                    Google Play
                  </Button>
                </a>
              </div>

              <div className="flex justify-center py-4">
                <div className="bg-muted p-4 rounded-lg">
                  <QrCode className="h-32 w-32 mx-auto" />
                  <p className="text-center text-sm mt-2">Scan to download</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Send App Link</CardTitle>
              <CardDescription>
                Send a download link to your email or phone
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                      onClick={handleSendLink}
                      disabled={isLoading || !email || emailSent}
                    >
                      {isLoading ? "Sending..." : emailSent ? "Sent" : "Send"}
                    </Button>
                  </div>
                </div>
                {emailSent && (
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md text-green-800 dark:text-green-400 text-sm flex items-start">
                    <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <p>
                      Download link sent to {email}. Please check your inbox and
                      spam folder.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mobile App Features</CardTitle>
            <CardDescription>
              Everything you need to manage your finances on the go
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <Fingerprint className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium mb-1">Biometric Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Secure access with fingerprint and face recognition
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <Wallet className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium mb-1">Digital Wallet</h3>
                <p className="text-sm text-muted-foreground">
                  Manage payment methods and make contactless payments
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <CreditCard className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium mb-1">Transaction Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  View and categorize transactions in real-time
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <Bell className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium mb-1">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get alerts for transactions, security events, and more
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <Shield className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium mb-1">Secure Encryption</h3>
                <p className="text-sm text-muted-foreground">
                  Quantum-resistant encryption for all your data
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                <Smartphone className="h-10 w-10 text-primary mb-2" />
                <h3 className="font-medium mb-1">Offline Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Access key features even without an internet connection
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
