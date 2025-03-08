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
  CheckCircle2,
  Search,
  Download,
  Filter,
  ArrowUpDown,
  Package,
  MapPin,
  Store,
  Calendar,
  RefreshCw,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SalesPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("30"); // days
  const [sortBy, setSortBy] = useState("sales"); // sales, date, returns
  const [sortOrder, setSortOrder] = useState("desc"); // asc, desc

  // Mock product sales data
  const [productSales, setProductSales] = useState([
    {
      id: "1",
      sku: "LYN-CHAIR-001",
      name: "Ergonomic Office Chair",
      totalSales: 1245,
      revenue: 124500,
      locations: ["New York", "Los Angeles", "Chicago"],
      retailers: ["Office Depot", "Staples", "Amazon"],
      lastSold: "2023-10-15T14:30:00Z",
      returns: 12,
      returnRate: 0.96,
      trend: "up",
      inventory: 230,
      reorderPoint: 100,
    },
    {
      id: "2",
      sku: "LYN-DESK-002",
      name: "Standing Desk",
      totalSales: 876,
      revenue: 262800,
      locations: ["San Francisco", "Seattle", "Boston"],
      retailers: ["IKEA", "Wayfair", "Amazon"],
      lastSold: "2023-10-16T09:15:00Z",
      returns: 23,
      returnRate: 2.63,
      trend: "up",
      inventory: 145,
      reorderPoint: 75,
    },
    {
      id: "3",
      sku: "LYN-LAMP-003",
      name: "LED Desk Lamp",
      totalSales: 2134,
      revenue: 85360,
      locations: ["Chicago", "Houston", "Phoenix"],
      retailers: ["Target", "Walmart", "Best Buy"],
      lastSold: "2023-10-16T11:45:00Z",
      returns: 45,
      returnRate: 2.11,
      trend: "stable",
      inventory: 560,
      reorderPoint: 200,
    },
    {
      id: "4",
      sku: "LYN-MONITOR-004",
      name: "32-inch Curved Monitor",
      totalSales: 532,
      revenue: 159600,
      locations: ["Miami", "Dallas", "Atlanta"],
      retailers: ["Best Buy", "Micro Center", "Newegg"],
      lastSold: "2023-10-15T16:20:00Z",
      returns: 31,
      returnRate: 5.83,
      trend: "down",
      inventory: 78,
      reorderPoint: 50,
    },
    {
      id: "5",
      sku: "LYN-KEYBOARD-005",
      name: "Mechanical Keyboard",
      totalSales: 1567,
      revenue: 109690,
      locations: ["Seattle", "Portland", "San Francisco"],
      retailers: ["Amazon", "Best Buy", "Micro Center"],
      lastSold: "2023-10-16T10:30:00Z",
      returns: 28,
      returnRate: 1.79,
      trend: "up",
      inventory: 320,
      reorderPoint: 150,
    },
    {
      id: "6",
      sku: "LYN-MOUSE-006",
      name: "Wireless Ergonomic Mouse",
      totalSales: 1892,
      revenue: 75680,
      locations: ["Boston", "New York", "Washington DC"],
      retailers: ["Staples", "Office Depot", "Amazon"],
      lastSold: "2023-10-16T13:10:00Z",
      returns: 15,
      returnRate: 0.79,
      trend: "up",
      inventory: 425,
      reorderPoint: 200,
    },
    {
      id: "7",
      sku: "LYN-HEADSET-007",
      name: "Noise Cancelling Headset",
      totalSales: 743,
      revenue: 81730,
      locations: ["Los Angeles", "San Diego", "San Francisco"],
      retailers: ["Best Buy", "Apple Store", "Amazon"],
      lastSold: "2023-10-15T15:45:00Z",
      returns: 42,
      returnRate: 5.65,
      trend: "down",
      inventory: 95,
      reorderPoint: 100,
    },
    {
      id: "8",
      sku: "LYN-DOCKING-008",
      name: "USB-C Docking Station",
      totalSales: 621,
      revenue: 62100,
      locations: ["Chicago", "Detroit", "Indianapolis"],
      retailers: ["Micro Center", "Best Buy", "Newegg"],
      lastSold: "2023-10-16T08:50:00Z",
      returns: 19,
      returnRate: 3.06,
      trend: "stable",
      inventory: 140,
      reorderPoint: 75,
    },
  ]);

  // AI insights
  const insights = [
    {
      type: "hot",
      sku: "LYN-CHAIR-001",
      name: "Ergonomic Office Chair",
      message:
        "Sales increased by 23% in the last 30 days. Consider increasing production to meet growing demand.",
    },
    {
      type: "hot",
      sku: "LYN-KEYBOARD-005",
      name: "Mechanical Keyboard",
      message:
        "Trending in Seattle and Portland. Partner with local retailers for promotional events.",
    },
    {
      type: "low",
      sku: "LYN-MONITOR-004",
      name: "32-inch Curved Monitor",
      message:
        "Sales declining by 12%. High return rate of 5.83% suggests potential quality issues.",
    },
    {
      type: "inventory",
      sku: "LYN-HEADSET-007",
      name: "Noise Cancelling Headset",
      message:
        "Inventory below reorder point. Contact suppliers to place new orders within 7 days.",
    },
    {
      type: "opportunity",
      sku: "LYN-DESK-002",
      name: "Standing Desk",
      message:
        "High demand in San Francisco but limited retail presence. Consider expanding distribution channels.",
    },
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

  const filteredProducts = productSales
    .filter((product) => {
      if (!searchQuery) return true;
      return (
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "sales") {
        return sortOrder === "asc"
          ? a.totalSales - b.totalSales
          : b.totalSales - a.totalSales;
      } else if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.lastSold).getTime() - new Date(b.lastSold).getTime()
          : new Date(b.lastSold).getTime() - new Date(a.lastSold).getTime();
      } else if (sortBy === "returns") {
        return sortOrder === "asc"
          ? a.returnRate - b.returnRate
          : b.returnRate - a.returnRate;
      }
      return 0;
    });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

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
          <h1 className="text-3xl font-bold tracking-tight">My Sales</h1>
          <p className="text-muted-foreground">
            Track your product sales, analyze performance, and get AI-powered
            insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10,610</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$961,460</div>
              <p className="text-xs text-muted-foreground">
                +8.2% from last month
              </p>
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
                Active Retailers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +3 from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>
              Smart recommendations based on your sales data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border rounded-md"
                >
                  {insight.type === "hot" && (
                    <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                  {insight.type === "low" && (
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <TrendingDown className="h-5 w-5 text-amber-600" />
                    </div>
                  )}
                  {insight.type === "inventory" && (
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                    </div>
                  )}
                  {insight.type === "opportunity" && (
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Lightbulb className="h-5 w-5 text-green-600" />
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
            <CardTitle>Product Sales</CardTitle>
            <CardDescription>
              Detailed breakdown of your product sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
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

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">SKU</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3"
                        onClick={() => {
                          setSortBy("sales");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Sales
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3"
                        onClick={() => {
                          setSortBy("returns");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Returns
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3"
                        onClick={() => {
                          setSortBy("date");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Last Sold
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.sku}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="text-right">
                        {product.totalSales.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(product.revenue)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{product.returns}</span>
                          <span className="text-xs text-muted-foreground">
                            {product.returnRate}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(product.lastSold)}</TableCell>
                      <TableCell>
                        {product.inventory <= product.reorderPoint ? (
                          <Badge variant="destructive">Low Stock</Badge>
                        ) : product.trend === "up" ? (
                          <Badge variant="default" className="bg-green-500">
                            Trending Up
                          </Badge>
                        ) : product.trend === "down" ? (
                          <Badge
                            variant="outline"
                            className="text-amber-500 border-amber-500"
                          >
                            Trending Down
                          </Badge>
                        ) : (
                          <Badge variant="outline">Stable</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Locations</CardTitle>
              <CardDescription>
                Geographic distribution of your sales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="font-medium">1,245 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>New York, NY</span>
                  </div>
                  <div className="font-medium">1,120 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Seattle, WA</span>
                  </div>
                  <div className="font-medium">987 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Los Angeles, CA</span>
                  </div>
                  <div className="font-medium">876 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Chicago, IL</span>
                  </div>
                  <div className="font-medium">754 units</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Retailers</CardTitle>
              <CardDescription>
                Your best performing retail partners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Amazon</span>
                  </div>
                  <div className="font-medium">3,245 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Best Buy</span>
                  </div>
                  <div className="font-medium">2,120 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Walmart</span>
                  </div>
                  <div className="font-medium">1,987 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Office Depot</span>
                  </div>
                  <div className="font-medium">1,456 units</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Store className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Staples</span>
                  </div>
                  <div className="font-medium">1,234 units</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
