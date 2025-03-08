"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Fingerprint,
  Shield,
  Lock,
  AlertTriangle,
  Scan,
  Smartphone,
  MessageSquare,
} from "lucide-react";
import { BiometricAuth } from "@/components/auth/biometric-auth";

export default function SecurityPage() {
  const { session, supabase } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Security settings
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [smsApprovalEnabled, setSmsApprovalEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [transactionLimit, setTransactionLimit] = useState(1000);
  const [requireBiometricAbove, setRequireBiometricAbove] = useState(100);
  const [deviceInfo, setDeviceInfo] = useState({
    name: "iPhone 13 Pro",
    os: "iOS 16.5",
    lastSync: "2023-10-15T14:30:00Z",
    status: "Active",
  });

  useEffect(() => {
    if (session === null && !isLoading) {
      router.push("/login");
    } else if (session) {
      // Load user security settings
      const loadSecuritySettings = async () => {
        try {
          const { data, error } = await supabase
            .from("user_security_settings")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (data) {
            setBiometricEnabled(data.biometric_enabled || false);
            setFingerprintEnabled(data.fingerprint_enabled || false);
            setFaceIdEnabled(data.face_id_enabled || false);
            setSmsApprovalEnabled(data.sms_approval_enabled || false);
            setTwoFactorEnabled(data.two_factor_enabled || false);
            setTransactionLimit(data.transaction_limit || 1000);
            setRequireBiometricAbove(data.require_biometric_above || 100);
          }
        } catch (error) {
          console.error("Error loading security settings:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadSecuritySettings();
    }
  }, [session, router, isLoading, supabase]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSaveBiometricSettings = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      if (biometricEnabled) {
        setIsBiometricOpen(true);
      } else {
        await saveSettings();
      }
    } catch (error: any) {
      console.error("Error saving biometric settings:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save settings",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleBiometricSuccess = async () => {
    try {
      await saveSettings();
      setMessage({
        type: "success",
        text: "Biometric settings saved successfully",
      });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to save settings",
      });
    } finally {
      setIsBiometricOpen(false);
    }
  };

  const handleBiometricError = (errorMessage: string) => {
    setMessage({ type: "error", text: errorMessage });
    setIsBiometricOpen(false);
  };

  const saveSettings = async () => {
    await supabase.from("user_security_settings").upsert({
      user_id: session?.user.id,
      biometric_enabled: biometricEnabled,
      fingerprint_enabled: fingerprintEnabled,
      face_id_enabled: faceIdEnabled,
      sms_approval_enabled: smsApprovalEnabled,
      require_biometric_above: requireBiometricAbove,
    });

    if (!biometricEnabled) {
      setMessage({
        type: "success",
        text: "Biometric settings saved successfully",
      });
    }
  };

  const handleSaveTwoFactorSettings = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      await supabase.from("user_security_settings").upsert({
        user_id: session?.user.id,
        two_factor_enabled: twoFactorEnabled,
      });
      setMessage({
        type: "success",
        text: "Two-factor settings saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving two-factor settings:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save settings",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveTransactionSettings = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      await supabase.from("user_security_settings").upsert({
        user_id: session?.user.id,
        transaction_limit: transactionLimit,
      });
      setMessage({
        type: "success",
        text: "Transaction settings saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving transaction settings:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to save settings",
      });
    } finally {
      setIsSaving(false);
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

  if (!session) {
    return null; // Will redirect in useEffect
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Security Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account security and transaction approval methods
          </p>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
          >
            {message.text}
          </div>
        )}

        <Tabs defaultValue="biometric" className="w-full">
          <TabsList className="flex flex-wrap md:flex-nowrap w-full overflow-auto">
            <TabsTrigger
              value="biometric"
              className="flex-1 whitespace-nowrap px-2 md:px-3"
            >
              Biometric Auth
            </TabsTrigger>
            <TabsTrigger
              value="sms"
              className="flex-1 whitespace-nowrap px-2 md:px-3"
            >
              SMS Approval
            </TabsTrigger>
            <TabsTrigger
              value="two-factor"
              className="flex-1 whitespace-nowrap px-2 md:px-3"
            >
              Two-Factor Auth
            </TabsTrigger>
            <TabsTrigger
              value="transaction"
              className="flex-1 whitespace-nowrap px-2 md:px-3"
            >
              Transaction Limits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="biometric" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Biometric Authentication</CardTitle>
                <CardDescription>
                  Use your device's biometric features to approve transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="biometric-auth">
                      Enable Biometric Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or facial recognition to approve
                      transactions
                    </p>
                  </div>
                  <Switch
                    id="biometric-auth"
                    checked={biometricEnabled}
                    onCheckedChange={setBiometricEnabled}
                  />
                </div>

                {biometricEnabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="fingerprint-auth"
                          className="flex items-center"
                        >
                          <Fingerprint className="h-4 w-4 mr-2" /> Fingerprint
                          Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Use your fingerprint to approve transactions
                        </p>
                      </div>
                      <Switch
                        id="fingerprint-auth"
                        checked={fingerprintEnabled}
                        onCheckedChange={setFingerprintEnabled}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label
                          htmlFor="face-id-auth"
                          className="flex items-center"
                        >
                          <Scan className="h-4 w-4 mr-2" /> Face ID
                          Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Use facial recognition to approve transactions
                        </p>
                      </div>
                      <Switch
                        id="face-id-auth"
                        checked={faceIdEnabled}
                        onCheckedChange={setFaceIdEnabled}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="biometric-threshold">
                        Require Biometric Authentication Above
                      </Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium">$</span>
                        <Input
                          id="biometric-threshold"
                          type="number"
                          value={requireBiometricAbove}
                          onChange={(e) =>
                            setRequireBiometricAbove(
                              parseInt(e.target.value) || 0,
                            )
                          }
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Transactions above this amount will require biometric
                        authentication
                      </p>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium mb-4">
                        Registered Device
                      </h3>
                      <div className="bg-muted p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Device Name</p>
                            <p className="text-sm text-muted-foreground">
                              {deviceInfo.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Operating System
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {deviceInfo.os}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Last Synced</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(deviceInfo.lastSync).toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Status</p>
                            <p className="text-sm text-muted-foreground">
                              {deviceInfo.status}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          <Scan className="h-4 w-4 mr-2" /> Register New Device
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveBiometricSettings}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Biometric Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="sms" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>SMS Transaction Approval</CardTitle>
                <CardDescription>
                  Approve transactions via SMS message to your verified phone
                  number
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-approval">
                      Enable SMS Transaction Approval
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive SMS messages to approve high-value transactions
                    </p>
                  </div>
                  <Switch
                    id="sms-approval"
                    checked={smsApprovalEnabled}
                    onCheckedChange={setSmsApprovalEnabled}
                  />
                </div>

                {smsApprovalEnabled && (
                  <>
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-md">
                      <div className="flex items-start">
                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                            Premium Feature
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-500 mt-1">
                            SMS transaction approval requires a Premium
                            subscription ($5/month). This will be added to your
                            next billing cycle.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone-number">
                        Verified Phone Number
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="phone-number"
                          value="+1 (555) 123-4567"
                          disabled
                          className="bg-muted"
                        />
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This is the phone number that will receive approval
                        requests
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sms-threshold">
                        Require SMS Approval Above
                      </Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-medium">$</span>
                        <Input
                          id="sms-threshold"
                          type="number"
                          defaultValue="500"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Transactions above this amount will require SMS approval
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveBiometricSettings}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save SMS Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="two-factor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">
                      Enable Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive a verification code via SMS or authenticator app
                      when signing in
                    </p>
                  </div>
                  <Switch
                    id="two-factor-auth"
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                {twoFactorEnabled && (
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <p className="text-sm">
                        Two-factor authentication setup requires additional
                        steps. Please contact support to complete the setup
                        process.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveTwoFactorSettings}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Two-Factor Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="transaction" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Limits</CardTitle>
                <CardDescription>
                  Set limits for your transactions to enhance security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="transaction-limit">
                    Daily Transaction Limit
                  </Label>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">$</span>
                    <Input
                      id="transaction-limit"
                      type="number"
                      value={transactionLimit}
                      onChange={(e) =>
                        setTransactionLimit(parseInt(e.target.value) || 0)
                      }
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maximum amount you can transact in a single day
                  </p>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">
                        Security Recommendation
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We recommend setting transaction limits and enabling
                        biometric authentication for all transactions above $100
                        to protect your account.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSaveTransactionSettings}
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Transaction Settings"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Security Activity</CardTitle>
            <CardDescription>
              Review recent security events on your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Lock className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Successful login</p>
                  <p className="text-xs text-muted-foreground">
                    Today at 10:45 AM • IP: 192.168.1.1
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Fingerprint className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Transaction approved with biometrics
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Yesterday at 3:20 PM • Amount: $250.00
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Failed login attempt</p>
                  <p className="text-xs text-muted-foreground">
                    3 days ago at 8:15 PM • IP: 203.0.113.42
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Security Activity
            </Button>
          </CardFooter>
        </Card>
      </div>

      <BiometricAuth
        isOpen={isBiometricOpen}
        onClose={() => setIsBiometricOpen(false)}
        onSuccess={handleBiometricSuccess}
        onError={handleBiometricError}
        transactionDetails={{
          amount: 0,
          recipient: "Biometric Setup",
          description: "Verify identity to enable biometric authentication",
        }}
      />
    </DashboardLayout>
  );
}
