"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  User,
  BarChart,
  Shield,
  RefreshCw,
  Wallet,
  Smartphone,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { supabase, session } = useSupabase();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const userInitials =
    session?.user?.user_metadata?.first_name?.[0] +
      session?.user?.user_metadata?.last_name?.[0] || "U";

  const userType = session?.user?.user_metadata?.user_type || "consumer";

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: <CreditCard size={20} />,
      hidden: userType === "retailer",
    },
    {
      name:
        userType === "manufacturer" || userType === "both"
          ? "My Sales"
          : "Spending Analytics",
      href:
        userType === "manufacturer" || userType === "both"
          ? "/dashboard/sales"
          : "/dashboard/analytics",
      icon: <BarChart size={20} />,
      hidden: userType === "retailer",
    },
    {
      name:
        userType === "manufacturer" || userType === "both"
          ? "Product Returns"
          : "My Wallet",
      href:
        userType === "manufacturer" || userType === "both"
          ? "/dashboard/returns"
          : "/dashboard/wallet",
      icon:
        userType === "manufacturer" || userType === "both" ? (
          <RefreshCw size={20} />
        ) : (
          <CreditCard size={20} />
        ),
      hidden: userType === "retailer",
    },
    {
      name: userType === "both" ? "My Wallet" : "",
      href: "/dashboard/wallet",
      icon: <Wallet size={20} />,
      hidden: userType !== "both",
    },
    {
      name: "POS Systems",
      href: "/dashboard/pos-systems",
      icon: <Store size={20} />,
      hidden: userType !== "retailer",
    },
    {
      name: "Fraud Prevention",
      href: "/dashboard/fraud-prevention",
      icon: <Shield size={20} />,
      hidden: userType !== "retailer",
    },
    {
      name: "Return Analytics",
      href: "/dashboard/return-analytics",
      icon: <BarChart size={20} />,
      hidden: userType !== "retailer",
    },
    {
      name: "API Management",
      href: "/dashboard/api-management",
      icon: <Settings size={20} />,
      hidden: userType !== "retailer",
    },
    {
      name: "Firmware Updates",
      href: "/dashboard/firmware",
      icon: <RefreshCw size={20} />,
      hidden: userType !== "retailer",
    },
    {
      name: "Security",
      href: "/dashboard/security",
      icon: <Shield size={20} />,
    },
    {
      name: "My Profile",
      href: "/dashboard/account",
      icon: <User size={20} />,
    },
    {
      name: "My Plan",
      href: "/dashboard/plan",
      icon: <CreditCard size={20} />,
    },
    {
      name: "Integrations",
      href: "/dashboard/integrations",
      icon: <Settings size={20} />,
    },
    {
      name: "Mobile App",
      href: "/dashboard/mobile-app",
      icon: <Smartphone size={20} />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
    { name: "Help", href: "/dashboard/help", icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r">
        <div className="p-6 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold text-xl">Lynop</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleSignOut}
          >
            <LogOut size={20} className="mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-card p-6 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <span className="font-bold text-xl">Lynop</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(false)}
              >
                <X size={24} />
              </Button>
            </div>
            <nav className="space-y-1">
              {navItems
                .filter((item) => !item.hidden)
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-muted transition-colors"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}
              <Button
                variant="ghost"
                className="w-full justify-start mt-4"
                onClick={handleSignOut}
              >
                <LogOut size={20} className="mr-2" />
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 md:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </Button>
          <div className="flex items-center ml-auto space-x-4">
            <ThemeSwitcher />
            <Avatar>
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
