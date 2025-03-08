"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HelpPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending support ticket
    setTimeout(() => {
      setIsSending(false);
      setSuccessMessage(
        "Your support ticket has been submitted. We will respond within 24 hours.",
      );
      setSubject("");
      setMessage("");
    }, 1500);
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

  const userType = session.user.user_metadata?.user_type || "consumer";

  const faqs = [
    {
      question: "How secure is my financial data?",
      answer:
        "Lynop uses quantum-resistant encryption to protect all your financial data. This means your information is secure against both current and future threats, including those from quantum computers.",
    },
    {
      question: "How do I connect my accounting software?",
      answer:
        "Go to Settings > Integrations and select your accounting software from the list. Follow the prompts to authorize the connection. We support QuickBooks, Sage, NetSuite, Xero, and many others.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Yes, you can export your data in various formats including CSV, Excel, and PDF. Go to the relevant section (Transactions, Analytics, etc.), and look for the Export button in the top right corner.",
    },
    {
      question:
        userType === "manufacturer"
          ? "How detailed is the SKU-level data?"
          : "How accurate is the AI categorization?",
      answer:
        userType === "manufacturer"
          ? "Our SKU-level data includes product variations, purchase locations, time of purchase, and associated customer demographics (anonymized for privacy)."
          : "Our AI categorization system has over 95% accuracy and improves over time as it learns from your corrections and patterns.",
    },
    {
      question: "What happens if I need to cancel my subscription?",
      answer:
        "You can cancel your subscription at any time from your Account settings. Your data will remain accessible until the end of your billing period, after which you'll have 30 days to export your data before it's archived.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Get assistance and answers to your questions
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Submit a ticket for personalized assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {successMessage ? (
                <div className="p-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                  {successMessage}
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Please provide details about your issue or question"
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSending}>
                    {isSending ? "Sending..." : "Submit Ticket"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Documentation & Resources</CardTitle>
            <CardDescription>Helpful guides and tutorials</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Getting Started Guide</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn the basics of using Lynop for your financial data
              </p>
              <Button variant="outline" size="sm">
                View Guide
              </Button>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Watch step-by-step tutorials on key features
              </p>
              <Button variant="outline" size="sm">
                Watch Videos
              </Button>
            </div>
            <div className="p-4 border rounded-md">
              <h3 className="font-medium mb-2">
                {userType === "manufacturer"
                  ? "Manufacturer Handbook"
                  : "Consumer Handbook"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive guide to all {userType} features
              </p>
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
