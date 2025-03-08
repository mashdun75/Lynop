import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FAQsPage() {
  const faqs = [
    {
      question: "What is Lynop?",
      answer:
        "Lynop is a comprehensive financial platform that offers secure transaction tracking, digital receipts, and analytics for consumers, manufacturers, and retailers. Our platform uses quantum-resistant encryption to protect your financial data.",
    },
    {
      question: "How does Lynop protect my data?",
      answer:
        "Lynop uses quantum-resistant encryption to secure all your financial data. This advanced encryption method is designed to withstand attacks from both conventional and quantum computers, ensuring your information remains protected well into the future.",
    },
    {
      question: "What features are available for consumers?",
      answer:
        "Consumer features include transaction tracking, spending analytics, digital wallet management, cryptocurrency tracking, and secure digital receipts. You can easily categorize expenses, set budgets, and gain insights into your spending habits.",
    },
    {
      question: "What features are available for manufacturers?",
      answer:
        "Manufacturers can track product sales across retailers, analyze return patterns, identify quality issues, and gain insights into customer behavior. Our platform helps you understand how your products perform in the market and identify opportunities for improvement.",
    },
    {
      question: "What features are available for retailers?",
      answer:
        "Retailers get access to POS system integration, fraud prevention tools, return analytics, and remote firmware management. Our platform helps you reduce return fraud, manage your point-of-sale devices, and gain insights into customer behavior.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Yes, Lynop offers native mobile apps for both iOS and Android devices. The mobile apps include features like biometric authentication, digital wallet access, transaction tracking, and push notifications for real-time updates.",
    },
    {
      question: "How much does Lynop cost?",
      answer:
        "Lynop offers several pricing tiers to meet different needs. Our Consumer Basic plan starts at $9/month, Consumer Pro at $29/month, and Business Complete at $99/month. Retailer accounts are free. Annual billing options are available with significant discounts. Visit our Pricing page for more details.",
    },
    {
      question: "Can I connect my existing accounting software?",
      answer:
        "Yes, Lynop integrates with popular accounting software including QuickBooks, Xero, Sage, NetSuite, FreshBooks, and Wave. These integrations allow for seamless data transfer between Lynop and your accounting system.",
    },
    {
      question: "Which POS systems does Lynop support?",
      answer:
        "Lynop supports a wide range of POS systems including Square, Shopify POS, Clover, Toast, Lightspeed, Vend, Revel, NCR, and Oracle MICROS. We also offer custom API integration for other systems.",
    },
    {
      question: "How does the fraud prevention system work?",
      answer:
        "Our fraud prevention system uses AI algorithms to detect suspicious return patterns and potential fraud attempts in real-time. It can identify issues like receipt tampering, wardrobing (buying, using, and returning items), and cross-store return fraud. The system is highly configurable to meet your specific needs.",
    },
    {
      question: "Is Lynop compliant with financial regulations?",
      answer:
        "Yes, Lynop is fully compliant with relevant financial regulations including PCI DSS for handling payment card data. Our platform is regularly audited to ensure compliance with the latest security standards and regulations.",
    },
    {
      question: "How do I get started with Lynop?",
      answer:
        "Getting started is easy! Simply sign up for an account that matches your needs (consumer, manufacturer, or retailer), complete the onboarding process, and start using the platform. For retailers and businesses, our team can provide additional support for integration and setup.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Frequently Asked Questions
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Find answers to common questions about Lynop's features,
                  pricing, and security.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-md px-6"
                >
                  <AccordionTrigger className="text-lg font-medium py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">
              Still have questions?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground mb-8">
              Our support team is here to help. Contact us for personalized
              assistance with any questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="px-8">
                  Contact Support
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
