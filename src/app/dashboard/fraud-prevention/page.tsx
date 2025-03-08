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
import { Switch } from "@/components/ui/switch";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  ThumbsDown,
  RefreshCw,
  Settings,
  BarChart4,
  Receipt,
  UserX,
  Clock,
  DollarSign,
  Fingerprint,
} from "lucide-react";

export default function FraudPreventionPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Fraud prevention settings
  const [settings, setSettings] = useState({
    returnFraudDetection: true,
    receiptVerification: true,
    wardrobingDetection: true,
    highValueAuthentication: true,
    crossStoreMonitoring: true,
    realTimeAlerts: true,
    aiPoweredAnalysis: true,
    returnThreshold: 500,
    returnTimeWindow: 30,
    maxReturnsPerCustomer: 3,
  });

  // Recent fraud alerts
  const [fraudAlerts, setFraudAlerts] = useState([
    {
      id: "1",
      type: "Multiple Returns",
      description: "Customer attempted to return 5 items within 48 hours",
      timestamp: "2023-10-16T14:30:00Z",
      location: "New York - Main Street",
      status: "flagged",
      risk: "medium",
    },
    {
      id: "2",
      type: "Receipt Tampering",
      description: "Digital receipt validation failed - possible tampering",
      timestamp: "2023-10-16T12:15:00Z",
      location: "Brooklyn - Atlantic Ave",
      status: "confirmed",
      risk: "high",
    },
    {
      id: "3",
      type: "Wardrobing",
      description: "Customer returning items with signs of use",
      timestamp: "2023-10-15T16:45:00Z",
      location: "Queens - Northern Blvd",
      status: "resolved",
      risk: "medium",
    },
    {
      id: "4",
      type: "High Value Return",
      description: "Return value exceeds $1,000 threshold",
      timestamp: "2023-10-15T11:20:00Z",
      location: "New York - Main Street",
      status: "verified",
      risk: "low",
    },
    {
      id: "5",
      type: "Cross-Store Returns",
      description: "Customer attempting returns at multiple locations",
      timestamp: "2023-10-14T15:30:00Z",
      location: "Multiple Locations",
      status: "flagged",
      risk: "high",
    },
  ]);

  const handleSettingChange = (setting: string, value: boolean | number) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Fraud Prevention
          </h1>
          <p className="text-muted-foreground">
            Configure and monitor fraud prevention settings for your retail
            operations
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Fraud Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fraudAlerts.length}</div>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {fraudAlerts.filter((alert) => alert.risk === "high").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Needs immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Prevented Fraud
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1,245.00</div>
              <p className="text-xs text-muted-foreground">Estimated savings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <p className="text-xs text-muted-foreground">
                -0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="alerts">Fraud Alerts</TabsTrigger>
            <TabsTrigger value="blocklist">Blocklist</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Fraud Detection Settings</CardTitle>
                <CardDescription>
                  Configure how Lynop detects and prevents return fraud
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Return Fraud Detection</p>
                    <p className="text-sm text-muted-foreground">
                      Detect suspicious return patterns and potential fraud
                    </p>
                  </div>
                  <Switch
                    checked={settings.returnFraudDetection}
                    onCheckedChange={(checked) =>
                      handleSettingChange("returnFraudDetection", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Digital Receipt Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Verify digital receipts to prevent tampering and forgery
                    </p>
                  </div>
                  <Switch
                    checked={settings.receiptVerification}
                    onCheckedChange={(checked) =>
                      handleSettingChange("receiptVerification", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Wardrobing Detection</p>
                    <p className="text-sm text-muted-foreground">
                      Identify customers who buy, use, and return items
                    </p>
                  </div>
                  <Switch
                    checked={settings.wardrobingDetection}
                    onCheckedChange={(checked) =>
                      handleSettingChange("wardrobingDetection", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High-Value Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Require additional verification for high-value returns
                    </p>
                  </div>
                  <Switch
                    checked={settings.highValueAuthentication}
                    onCheckedChange={(checked) =>
                      handleSettingChange("highValueAuthentication", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cross-Store Monitoring</p>
                    <p className="text-sm text-muted-foreground">
                      Track returns across multiple store locations
                    </p>
                  </div>
                  <Switch
                    checked={settings.crossStoreMonitoring}
                    onCheckedChange={(checked) =>
                      handleSettingChange("crossStoreMonitoring", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Real-Time Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive immediate notifications for suspicious activity
                    </p>
                  </div>
                  <Switch
                    checked={settings.realTimeAlerts}
                    onCheckedChange={(checked) =>
                      handleSettingChange("realTimeAlerts", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">AI-Powered Analysis</p>
                    <p className="text-sm text-muted-foreground">
                      Use machine learning to improve fraud detection accuracy
                    </p>
                  </div>
                  <Switch
                    checked={settings.aiPoweredAnalysis}
                    onCheckedChange={(checked) =>
                      handleSettingChange("aiPoweredAnalysis", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Threshold Settings</CardTitle>
                <CardDescription>
                  Configure thresholds for triggering fraud alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="returnThreshold">
                    High-Value Return Threshold ($)
                  </Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="returnThreshold"
                      type="number"
                      value={settings.returnThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "returnThreshold",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="max-w-[200px]"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Returns above this value will require additional
                    verification
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="returnTimeWindow">
                    Return Time Window (days)
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="returnTimeWindow"
                      type="number"
                      value={settings.returnTimeWindow}
                      onChange={(e) =>
                        handleSettingChange(
                          "returnTimeWindow",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="max-w-[200px]"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maximum number of days after purchase for returns
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxReturnsPerCustomer">
                    Max Returns Per Customer
                  </Label>
                  <div className="flex items-center space-x-2">
                    <UserX className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="maxReturnsPerCustomer"
                      type="number"
                      value={settings.maxReturnsPerCustomer}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxReturnsPerCustomer",
                          parseInt(e.target.value) || 0,
                        )
                      }
                      className="max-w-[200px]"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Maximum number of returns allowed per customer in a 30-day
                    period
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Fraud Alerts</CardTitle>
                <CardDescription>
                  Review and manage detected fraud attempts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fraudAlerts.map((alert) => (
                    <div key={alert.id} className="border rounded-md p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`mt-0.5 rounded-full p-1 ${alert.risk === "high" ? "bg-red-100" : alert.risk === "medium" ? "bg-amber-100" : "bg-blue-100"}`}
                          >
                            {alert.risk === "high" ? (
                              <AlertTriangle
                                className={`h-5 w-5 ${alert.risk === "high" ? "text-red-600" : alert.risk === "medium" ? "text-amber-600" : "text-blue-600"}`}
                              />
                            ) : alert.type === "Wardrobing" ? (
                              <ThumbsDown
                                className={`h-5 w-5 ${alert.risk === "high" ? "text-red-600" : alert.risk === "medium" ? "text-amber-600" : "text-blue-600"}`}
                              />
                            ) : alert.type === "Receipt Tampering" ? (
                              <Receipt
                                className={`h-5 w-5 ${alert.risk === "high" ? "text-red-600" : alert.risk === "medium" ? "text-amber-600" : "text-blue-600"}`}
                              />
                            ) : (
                              <AlertTriangle
                                className={`h-5 w-5 ${alert.risk === "high" ? "text-red-600" : alert.risk === "medium" ? "text-amber-600" : "text-blue-600"}`}
                              />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-semibold">{alert.type}</h4>
                              <Badge
                                variant="outline"
                                className={`ml-2 ${alert.status === "confirmed" ? "bg-red-100 text-red-800 border-red-200" : alert.status === "flagged" ? "bg-amber-100 text-amber-800 border-amber-200" : alert.status === "verified" ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200"}`}
                              >
                                {alert.status.charAt(0).toUpperCase() +
                                  alert.status.slice(1)}
                              </Badge>
                              <Badge
                                variant="outline"
                                className={`ml-2 ${alert.risk === "high" ? "bg-red-100 text-red-800 border-red-200" : alert.risk === "medium" ? "bg-amber-100 text-amber-800 border-amber-200" : "bg-blue-100 text-blue-800 border-blue-200"}`}
                              >
                                {alert.risk.charAt(0).toUpperCase() +
                                  alert.risk.slice(1)}{" "}
                                Risk
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {alert.description}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-muted-foreground">
                              <span>{formatDate(alert.timestamp)}</span>
                              <span className="mx-2">•</span>
                              <span>{alert.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                          <Button variant="ghost" size="sm">
                            Dismiss
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocklist" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Blocklist</CardTitle>
                <CardDescription>
                  Manage customers with suspicious return activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <UserX className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">John Smith</p>
                        <p className="text-sm text-muted-foreground">
                          Blocked for multiple return fraud attempts
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <UserX className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-sm text-muted-foreground">
                          Blocked for receipt tampering
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Michael Brown</p>
                        <p className="text-sm text-muted-foreground">
                          Flagged for suspicious return patterns
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Manage Blocklist
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Methods</CardTitle>
                <CardDescription>
                  Configure additional verification methods for suspicious
                  returns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">ID Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Require government-issued ID for high-value returns
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Biometric Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or facial recognition for verification
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Verification</p>
                    <p className="text-sm text-muted-foreground">
                      Send verification codes via SMS for confirmation
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Manager Approval</p>
                    <p className="text-sm text-muted-foreground">
                      Require manager approval for suspicious returns
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
