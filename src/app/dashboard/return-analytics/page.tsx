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
  Store,
  MapPin,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReturnAnalyticsPage() {
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

  // Store performance data
  const storePerformance = [
    { name: "New York - Main Street", returns: 15, returnRate: 2.1, fraudAttempts: 3 },
    { name: "Brooklyn - Atlantic Ave", returns: 8, returnRate: 1.8, fraudAttempts: 1 },
    { name: "Queens - Northern Blvd", returns: 12, returnRate: 3.2, fraudAttempts: 4 },
    { name: "Manhattan - 5th Avenue", returns: 10, returnRate: 1.5, fraudAttempts: 0 },
    { name: "Bronx - Fordham Road", returns: 7, returnRate: 2.8, fraudAttempts: 2 },
  ];

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Return Analytics</h1>
          <p className="text-muted-foreground">Monitor and analyze product returns across your retail locations</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Defective Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">75.7% of returns</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3%</div>
              <p className="text-xs text-muted-foreground">-0.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Potential Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Requiring attention</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Return Trends</CardTitle>
              <CardDescription>Return volume over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded bg-muted/20">
                <p className="text-muted-foreground">Chart visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Return Reasons</CardTitle>
              <CardDescription>Breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reasonsSummary.map((reason) => (
                  <div key={reason.reason} className="flex items-center">
                    <div className="w-1/3">
                      <span className="text-sm font-medium">{reason.reason}</span>
                    </div>
                    <div className="w-2/3 flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${reason.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-muted-foreground w-12 text-right">
                        {reason.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Product Returns</CardTitle>
                <CardDescription>Detailed list of returned items</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-8 w-[200px] md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Returns</TabsTrigger>
                <TabsTrigger value="defective">Defective</TabsTrigger>
                <TabsTrigger value="size">Size Issues</TabsTrigger>
                <TabsTrigger value="dissatisfaction">Dissatisfaction</TabsTrigger>
              </TabsList>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-3 h-8 data-[state=open]:bg-accent"
                          onClick={() => {
                            setSortBy("date");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          }}
                        >
                          Date
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="-ml-3 h-8 data-[state=open]:bg-accent"
                          onClick={() => {
                            setSortBy("quantity");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                          }}
                        >
                          Quantity
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReturns.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.sku}</div>
                        </TableCell>
                        <TableCell>{formatDate(item.returnDate)}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.reason === "Defective"
                                ? "bg-red-100 text-red-800 border-red-200"
                                : item.reason === "Wrong Size"
                                ? "bg-amber-100 text-amber-800 border-amber-200"
                                : item.reason === "Wrong Item"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-green-100 text-green-800 border-green-200"
                            }
                          >
                            {item.reason}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span>{item.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              item.status === "Processed"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-amber-100 text-amber-800 border-amber-200"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Automated analysis of return patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex gap-4 p-3 border rounded-lg">
                    <div className="mt-0.5">
                      {insight.type === "issue" ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : insight.type === "trend" ? (
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                      ) : insight.type === "suggestion" ? (
                        <Lightbulb className="h-5 w-5 text-amber-500" />
                      ) : (
                        <RefreshCw className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm">{insight.name}</h4>
                        <span className="text-xs text-muted-foreground">{insight.sku}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Store Performance</CardTitle>
              <CardDescription>Return rates by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {storePerformance.map((store, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{store.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {store.returns} returns ({store.returnRate}% rate)
                        </p>
                      </div>
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          store.fraudAttempts > 3
                            ? "bg-red-100 text-red-800 border-red-200"
                            : store.fraudAttempts > 0
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }
                      >
                        {store.fraudAttempts} fraud attempts
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );