import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle,
  Shield,
  Zap,
  Receipt,
  FileText,
  Wallet,
  CreditCard,
  BarChart,
  BellRing,
  Eye,
  Lock,
  History,
  TrendingUp,
  Lightbulb,
  AlertCircle,
  Target,
  BarChart4,
  CheckCircle2,
  Smartphone,
  Bell,
  Camera,
  Fingerprint,
  RefreshCw,
  MountainIcon,
  AppleIcon,
  AndroidIcon,
} from "lucide-react";

export default function ConsumerFeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Consumer & Business Features
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Take control of your financial data with Lynop's powerful
                  tools for individuals and businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Receipt className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Digitized Receipts</h3>
                <p className="text-muted-foreground">
                  Post-quantum secure integrations with online retailers and
                  in-store POS systems automatically track your itemized
                  transaction data. Your data is fully encrypted and never sold
                  or shared. Even Lynop cannot see it because it is encrypted
                  and only decrypted when you are logged in.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Categorization</h3>
                <p className="text-muted-foreground">
                  Our advanced AI automatically categorizes your expenses,
                  learning from your patterns to improve over time. Perfect for
                  budgeting and tax preparation.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">
                  Quantum-Resistant Encryption
                </h3>
                <p className="text-muted-foreground">
                  Your financial data is protected with state-of-the-art
                  encryption that's secure against even quantum computing
                  threats.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <Wallet className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Digital Wallet</h3>
                <p className="text-muted-foreground">
                  Manage all your payment methods in one secure digital wallet.
                  Add funds, make payments, and track your balance with ease.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Subscription Management</h3>
                <p className="text-muted-foreground">
                  Track all your recurring subscriptions in one place. Get
                  notified before billing and easily manage or cancel services.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="rounded-lg bg-primary p-3 text-primary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Accounting Integration</h3>
                <p className="text-muted-foreground">
                  Seamlessly export itemized transaction data to popular
                  accounting software. Save hours of manual data entry and
                  reduce accounting costs for your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight mb-4">
                Digital Wallet & Payments
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Manage your digital wallet, make contactless payments, and track
                all your subscriptions in one place.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex justify-center items-center">
                <div className="space-y-4 max-w-md">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>NFC contactless payments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Multiple payment methods</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Biometric authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Digital wallet integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>Subscription tracking</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 sm:flex-row justify-center">
                    <Link href="/signup">
                      <Button className="px-8">Get Started</Button>
                    </Link>
                    <Link href="/pricing">
                      <Button variant="outline" className="px-8">
                        View Pricing
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-lg border bg-card p-8 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Digital Wallet</h3>
                    <Button variant="outline" size="sm">
                      <Wallet className="h-4 w-4 mr-2" /> Add Funds
                    </Button>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-muted-foreground">
                            Default payment method
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Wallet className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">Wallet Balance</p>
                          <p className="text-sm text-muted-foreground">
                            Available for payments
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$1,250.75</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <RefreshCw className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Active Subscriptions</p>
                          <p className="text-sm text-muted-foreground">
                            Monthly recurring payments
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">6 services</p>
                        <p className="text-xs text-muted-foreground">
                          $106.96/month
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  Business Benefits
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Save time and money with powerful tools designed for
                  businesses of all sizes
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Reduced Accounting Costs</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Save up to 80% of manual data entry time with automatic
                  transaction categorization and accounting software
                  integration.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Tax Preparation</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Automatically categorize business expenses and generate
                  reports ready for tax filing, saving hours of preparation
                  time.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Expense Management</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Track and manage employee expenses with digital receipts and
                  automated approval workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  AI-Powered Financial Insights
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our advanced AI analyzes your financial data to provide
                  personalized recommendations and insights.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Spending Trends</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Identify patterns in your spending habits and get
                  recommendations for optimization.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Budget Recommendations</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Receive personalized budget suggestions based on your income
                  and spending history.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Savings Opportunities</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Discover potential savings opportunities and ways to reduce
                  unnecessary expenses.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Unusual Activity Detection</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  AI algorithms detect unusual spending patterns and potential
                  fraud attempts.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Financial Goal Tracking</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Set and track financial goals with AI-powered progress
                  monitoring and adjustments.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex items-center space-x-2">
                  <BarChart4 className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Investment Insights</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get insights on your investment portfolio performance and
                  diversification opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                  Ready to transform your financial management?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join thousands of individuals and businesses who trust Lynop
                  for secure, intelligent financial data management.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:gap-6">
                <Link href="/signup">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="px-8">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
