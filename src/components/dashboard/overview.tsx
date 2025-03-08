"use client";

import { useSupabase } from "@/components/supabase-provider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, DollarSign, TrendingUp, Users } from "lucide-react";

export function DashboardOverview() {
  const { session } = useSupabase();
  const userType = session?.user?.user_metadata?.user_type || "consumer";
  const firstName = session?.user?.user_metadata?.first_name || "User";

  const consumerStats = [
    {
      title: "Total Expenses",
      value: "$2,345.67",
      description: "Last 30 days",
      icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Transactions",
      value: "42",
      description: "Last 30 days",
      icon: <CreditCard className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Categories",
      value: "8",
      description: "Active categories",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Monthly Change",
      value: "+12.5%",
      description: "vs. previous month",
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  const manufacturerStats = [
    {
      title: "Total Sales",
      value: "$124,567.89",
      description: "Last 30 days",
      icon: <DollarSign className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "SKUs Tracked",
      value: "156",
      description: "Active products",
      icon: <CreditCard className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Retail Partners",
      value: "12",
      description: "Connected stores",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Growth Rate",
      value: "+8.3%",
      description: "vs. previous month",
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  const stats = userType === "manufacturer" ? manufacturerStats : consumerStats;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your {userType} account
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              {userType === "manufacturer"
                ? "Your product sales across all channels"
                : "Your recent transactions and expenses"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {userType === "manufacturer" ? "Top Products" : "Top Categories"}
            </CardTitle>
            <CardDescription>
              {userType === "manufacturer"
                ? "Your best performing SKUs"
                : "Where your money is going"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <p className="text-muted-foreground">Chart will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
