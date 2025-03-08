"use client";

import { useState } from "react";
import { useSupabase } from "@/components/supabase-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session } = useSupabase();
  const isLoggedIn = !!session;

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo size="md" />
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/consumer-features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Consumer Features
            </Link>
            <Link
              href="/manufacturer-features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Manufacturer Features
            </Link>
            <Link
              href="/retailer-features"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Retailer Features
            </Link>
            <Link
              href="/integrations"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Integrations
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/faqs"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQs
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <Button
                size="sm"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Link href="/signup">
                    <Button size="sm" variant="outline">
                      Sign up
                    </Button>
                  </Link>
                  <Link href="/retailer-signup">
                    <Button size="sm">Retailer Sign up</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t py-4">
          <nav className="container flex flex-col space-y-4">
            <Link
              href="/consumer-features"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Consumer Features
            </Link>
            <Link
              href="/manufacturer-features"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Manufacturer Features
            </Link>
            <Link
              href="/retailer-features"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Retailer Features
            </Link>
            <Link
              href="/integrations"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Integrations
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/faqs"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {isLoggedIn ? (
                <Button
                  className="w-full justify-start"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" className="w-full justify-start">
                      Sign up
                    </Button>
                  </Link>
                  <Link href="/retailer-signup">
                    <Button className="w-full justify-start">
                      Retailer Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
