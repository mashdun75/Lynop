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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Search,
  Download,
  Filter,
  ArrowUpDown,
  Package,
  Calendar,
  RefreshCw,
  Lightbulb,
  ChevronRight,
  Info,
  ThumbsDown,
  Zap,
  Settings,
  PieChart,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReturnsPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("30"); // days
  const [sortBy, setSortBy] = useState("date"); // date, reason, quantity
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc
  const [activeTab, setActiveTab] = useState("all"); // all, defective, size, other

  // Mock product returns data
  const [productReturns, setProductReturns] = useState([
    {
      id: "1",
      sku: "LYN-CHAIR-001",
      name: "Ergonomic Office Chair",
      returnDate: "2023-10-15T14:30:00Z",
      quantity: 3,
      reason: "Defective",
      details: "Armrest broke during assembly",
      location: "New York",
      retailer: "Office Depot",
      status: "Processed",
    },
    {
      id: "2",
      sku: "LYN-CHAIR-001",
      name: "Ergonomic Office Chair",
      returnDate: "2023-10-12T11:15:00Z",
      quantity: 1,
      reason: "Wrong Size",
      details: "Customer expected larger chair",
      location: "Los Angeles",
      retailer: "Staples",
      status: "Processed",
    },
    {
      id: "3",
      sku: "LYN-DESK-002",
      name: "Standing Desk",
      returnDate: "2023-10-14T09:45:00Z",
      quantity: 2,
      reason: "Defective",
      details: "Motor not working properly",
      location: "San Francisco",
      retailer: "IKEA",
      status: "Investigating",
    },
    {
      id: "4",
      sku: "LYN-MONITOR-004",
      name: "32-inch Curved Monitor",
      returnDate: "2023-10-16T16:20:00Z",
      quantity: 5,
      reason: "Defective",
      details: "Dead pixels on screen",
      location: "Miami",
      retailer: "Best Buy",
      status: "Processed",
    },
    {
      id: "5",
      sku: "LYN-MONITOR-004",
      name: "32-inch Curved Monitor",
      returnDate: "2023-10-13T13:10:00Z",
      quantity: 3,
      reason: "Customer Dissatisfaction",
      details: "Not as curved as expected",
      location: "Dallas",
      retailer: "Micro Center",
      status: "Processed",
    },
    {
      id: "6",
      sku: "LYN-HEADSET-007",
      name: "Noise Cancelling Headset",
      returnDate: "2023-10-15T15:45:00Z",
      quantity: 8,
      reason: "Defective",
      details: "Poor sound quality",
      location: "Los Angeles",
      retailer: "Best Buy",
      status: "Investigating",
    },
    {
      id: "7",
      sku: "LYN-HEADSET-007",
      name: "Noise Cancelling Headset",
      returnDate: "2023-10-14T10:30:00Z",
      quantity: 4,
      reason: "Defective",
      details: "Microphone not working",
      location: "San Diego",
      retailer: "Apple Store",
      status: "Processed",
    },
    {
      id: "8",
      sku: "LYN-KEYBOARD-005",
      name: "Mechanical Keyboard",
      returnDate: "2023-10-16T14:15:00Z",
      quantity: 2,
      reason: "Wrong Item",
      details: "Received wrong color",
      location: "Seattle",
      retailer: "Amazon",
      status: "Processed",
    },
    {
      id: "9",
      sku: "LYN-MOUSE-006",
      name: "Wireless Ergonomic Mouse",
      returnDate: "2023-10-15T11:20:00Z",
      quantity: 3,
      reason: "Customer Dissatisfaction",
      details: "Not comfortable for user's hand size",
      location: "Boston",
      retailer: "Staples",
      status: "Processed",
    },
    {
      id: "10",
      sku: "LYN-LAMP-003",
      name: "LED Desk Lamp",
      returnDate: "2023-10-13T09:30:00Z",
      quantity: 6,
      reason: "Defective",
      details: "Flickering light",
      location: "Chicago",
      retailer: "Target",
      status: "Investigating",
    },
  ]);

  // AI insights
  const insights = [
    {
      type: "issue",
      sku: "LYN-HEADSET-007",
      name: "Noise Cancelling Headset",
      message:
        "12 units returned in the last 30 days with sound quality issues. Consider quality control review with manufacturer.",
    },
    {
      type: "issue",
      sku: "LYN-MONITOR-004",
      name: "32-inch Curved Monitor",
      message:
        "High return rate of 5.83%. Multiple reports of dead pixels suggest a potential manufacturing defect in recent batch.",
    },
    {
      type: "trend",
      sku: "LYN-CHAIR-001",
      name: "Ergonomic Office Chair",
      message:
        "Size-related returns increased by 15%. Consider updating product dimensions in marketing materials for better clarity.",
    },
    {
      type: "suggestion",
      sku: "LYN-LAMP-003",
      name: "LED Desk Lamp",
      message:
        "6 units returned due to flickering. Engineering team should investigate potential electrical component issues.",
    },
    {
      type: "improvement",
      sku: "LYN-MOUSE-006",
      name: "Wireless Ergonomic Mouse",
      message:
        "Customer feedback indicates ergonomic design could be improved. Consider offering multiple size options in future models.",
    },
  ];

  // Return reasons summary
  const reasonsSummary = [
    { reason: "Defective", count: 28, percentage: 75.7 },
    { reason: "Customer Dissatisfaction", count: 6, percentage: 16.2 },
    { reason: "Wrong Size", count: 1, percentage: 2.7 },
    { reason: "Wrong Item", count: 2, percentage: 5.4 },
  ];

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

  const filteredReturns = productReturns
    .filter((returnItem) => {
      if (!searchQuery) {
        if (activeTab === "all") return true;
        return returnItem.reason
          .toLowerCase()
          .includes(activeTab.toLowerCase());
      }
      return (
        (returnItem.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          returnItem.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (activeTab === "all" ||
          returnItem.reason.toLowerCase().includes(activeTab.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.returnDate).getTime() - new Date(b.returnDate).getTime()
          : new Date(b.returnDate).getTime() - new Date(a.returnDate).getTime();
      } else if (sortBy === "quantity") {
        return sortOrder === "asc"
          ? a.quantity - b.quantity
          : b.quantity - a.quantity;
      } else if (sortBy === "reason") {
        return sortOrder === "asc"
          ? a.reason.localeCompare(b.reason)
          : b.reason.localeCompare(a.reason);
      }
      return 0;
    });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <h1 className="text-3xl font-bold tracking-tight">Product Returns</h1>
          <p className="text-muted-foreground">
            Analyze return patterns and identify quality improvement
            opportunities
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
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
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Defective Returns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">
                75.7% of all returns
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Processing Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 days</div>
              <p className="text-xs text-muted-foreground">
                -0.3 days from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Return Reasons</CardTitle>
              <CardDescription>
                Breakdown of why customers are returning products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reasonsSummary.map((reason, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{reason.reason}</span>
                      <span className="text-sm text-muted-foreground">
                        {reason.count} returns ({reason.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${reason.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Most Returned Products</CardTitle>
              <CardDescription>
                Products with the highest return rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Noise Cancelling Headset</span>
                  </div>
                  <div className="font-medium">12 returns (5.65%)</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>32-inch Curved Monitor</span>
                  </div>
                  <div className="font-medium">8 returns (5.83%)</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>LED Desk Lamp</span>
                  </div>
                  <div className="font-medium">6 returns (2.11%)</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Ergonomic Office Chair</span>
                  </div>
                  <div className="font-medium">4 returns (0.96%)</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Wireless Ergonomic Mouse</span>
                  </div>
                  <div className="font-medium">3 returns (0.79%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>
              Smart analysis of return patterns and quality improvement
              opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border rounded-md"
                >
                  {insight.type === "issue" && (
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  {insight.type === "trend" && (
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                  {insight.type === "suggestion" && (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  {insight.type === "improvement" && (
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-green-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="font-semibold">{insight.name}</h4>
                      <Badge variant="outline" className="ml-2">
                        {insight.sku}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {insight.message}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Return Details</CardTitle>
            <CardDescription>
              Detailed breakdown of individual product returns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Returns</TabsTrigger>
                <TabsTrigger value="Defective">Defective</TabsTrigger>
                <TabsTrigger value="Customer">Customer Issues</TabsTrigger>
                <TabsTrigger value="Wrong">Wrong Item/Size</TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by SKU or name"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="365">Last year</option>
                  </select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3"
                            onClick={() => {
                              setSortBy("date");
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc",
                              );
                            }}
                          >
                            Return Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3"
                            onClick={() => {
                              setSortBy("quantity");
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc",
                              );
                            }}
                          >
                            Quantity
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3"
                            onClick={() => {
                              setSortBy("reason");
                              setSortOrder(
                                sortOrder === "asc" ? "desc" : "asc",
                              );
                            }}
                          >
                            Reason
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </Button>
                        </TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReturns.map((returnItem) => (
                        <TableRow key={returnItem.id}>
                          <TableCell className="font-medium">
                            {returnItem.sku}
                          </TableCell>
                          <TableCell>{returnItem.name}</TableCell>
                          <TableCell>
                            {formatDate(returnItem.returnDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            {returnItem.quantity}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{returnItem.reason}</span>
                              <span className="text-xs text-muted-foreground">
                                {returnItem.details}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{returnItem.location}</TableCell>
                          <TableCell>
                            {returnItem.status === "Processed" ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
                              >
                                Processed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50"
                              >
                                Investigating
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="Defective" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReturns.map((returnItem) => (
                        <TableRow key={returnItem.id}>
                          <TableCell className="font-medium">
                            {returnItem.sku}
                          </TableCell>
                          <TableCell>{returnItem.name}</TableCell>
                          <TableCell>
                            {formatDate(returnItem.returnDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            {returnItem.quantity}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {returnItem.details}
                            </span>
                          </TableCell>
                          <TableCell>{returnItem.location}</TableCell>
                          <TableCell>
                            {returnItem.status === "Processed" ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
                              >
                                Processed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50"
                              >
                                Investigating
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="Customer" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReturns.map((returnItem) => (
                        <TableRow key={returnItem.id}>
                          <TableCell className="font-medium">
                            {returnItem.sku}
                          </TableCell>
                          <TableCell>{returnItem.name}</TableCell>
                          <TableCell>
                            {formatDate(returnItem.returnDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            {returnItem.quantity}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {returnItem.details}
                            </span>
                          </TableCell>
                          <TableCell>{returnItem.location}</TableCell>
                          <TableCell>
                            {returnItem.status === "Processed" ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
                              >
                                Processed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50"
                              >
                                Investigating
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="Wrong" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReturns.map((returnItem) => (
                        <TableRow key={returnItem.id}>
                          <TableCell className="font-medium">
                            {returnItem.sku}
                          </TableCell>
                          <TableCell>{returnItem.name}</TableCell>
                          <TableCell>
                            {formatDate(returnItem.returnDate)}
                          </TableCell>
                          <TableCell className="text-right">
                            {returnItem.quantity}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {returnItem.details}
                            </span>
                          </TableCell>
                          <TableCell>{returnItem.location}</TableCell>
                          <TableCell>
                            {returnItem.status === "Processed" ? (
                              <Badge
                                variant="outline"
                                className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-900/50"
                              >
                                Processed
                              </Badge>
                            ) : (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-900/50"
                              >
                                Investigating
                              </Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
