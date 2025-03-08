import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Contact Us
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Have questions or need assistance? We're here to help.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Whether you have questions about our products, need technical
                  support, or want to explore partnership opportunities, our
                  team is ready to assist you.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary h-5 w-5"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-muted-foreground">+1 (800) 123-4567</p>
                      <p className="text-sm text-muted-foreground">
                        Monday-Friday, 9am-5pm PT
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary h-5 w-5"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground">support@lynop.com</p>
                      <p className="text-sm text-muted-foreground">
                        We aim to respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary h-5 w-5"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">Office</h3>
                      <p className="text-muted-foreground">
                        123 Innovation Way
                        <br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Send us a message</h3>
                <form className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (optional)</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
              Frequently Asked Questions
            </h2>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-bold mb-2">
                  How quickly can I expect a response?
                </h3>
                <p className="text-muted-foreground">
                  We aim to respond to all inquiries within 24 hours during
                  business days. For urgent matters, please call our support
                  line.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-bold mb-2">
                  Do you offer technical support?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we provide technical support for all our products.
                  Depending on your plan, you may have access to email support,
                  phone support, or a dedicated account manager.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-bold mb-2">How can I request a demo?</h3>
                <p className="text-muted-foreground">
                  You can request a demo by filling out the contact form on this
                  page or by emailing sales@lynop.com with your requirements.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-bold mb-2">
                  Do you offer custom solutions?
                </h3>
                <p className="text-muted-foreground">
                  Yes, we offer custom solutions for enterprise clients with
                  specific needs. Please contact our sales team to discuss your
                  requirements.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
