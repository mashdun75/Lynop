import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title:
        "The Future of Financial Data Security in a Quantum Computing World",
      excerpt:
        "As quantum computing advances, traditional encryption methods are at risk. Learn how quantum-resistant encryption is changing the game for financial data security.",
      date: "June 15, 2024",
      author: "Sarah Chen",
      category: "Security",
      slug: "financial-data-security-quantum-computing",
    },
    {
      id: 2,
      title:
        "How Manufacturers Are Using SKU-Level Data to Optimize Product Development",
      excerpt:
        "Real-time insights from point-of-sale systems are revolutionizing how manufacturers understand product performance and customer preferences.",
      date: "June 8, 2024",
      author: "Michael Rodriguez",
      category: "Manufacturing",
      slug: "manufacturers-sku-data-product-development",
    },
    {
      id: 3,
      title: "Reducing Return Fraud: New Approaches for Retailers",
      excerpt:
        "Return fraud costs retailers billions annually. Discover how digital receipts and AI-powered verification are helping stores fight back.",
      date: "May 30, 2024",
      author: "Alex Johnson",
      category: "Retail",
      slug: "reducing-return-fraud-retailers",
    },
    {
      id: 4,
      title:
        "The Rise of Contactless Payments and What It Means for Consumer Privacy",
      excerpt:
        "With NFC payments becoming ubiquitous, we examine the privacy implications and how encrypted digital wallets are protecting consumer data.",
      date: "May 22, 2024",
      author: "Sarah Chen",
      category: "Privacy",
      slug: "contactless-payments-consumer-privacy",
    },
    {
      id: 5,
      title: "AI-Powered Financial Insights: Beyond Basic Budgeting",
      excerpt:
        "How machine learning algorithms are transforming personal finance by providing predictive insights and personalized recommendations.",
      date: "May 15, 2024",
      author: "Michael Rodriguez",
      category: "AI",
      slug: "ai-powered-financial-insights",
    },
    {
      id: 6,
      title:
        "The Hidden Costs of Paper Receipts: Environmental and Business Impact",
      excerpt:
        "Paper receipts generate millions of tons of waste annually. Learn how digital receipts are benefiting both businesses and the environment.",
      date: "May 8, 2024",
      author: "Alex Johnson",
      category: "Sustainability",
      slug: "hidden-costs-paper-receipts",
    },
  ];

  const categories = [
    "All",
    "Security",
    "Privacy",
    "AI",
    "Manufacturing",
    "Retail",
    "Sustainability",
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
                  Lynop Blog
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Insights, updates, and perspectives on financial data
                  security, analytics, and innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-3/4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col">
                      <CardHeader>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {post.date}
                            </span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {post.category}
                            </span>
                          </div>
                          <CardTitle className="text-xl">
                            <Link
                              href={`/blog/${post.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {post.title}
                            </Link>
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground">{post.excerpt}</p>
                      </CardContent>
                      <CardFooter className="pt-4 border-t">
                        <div className="flex justify-between items-center w-full">
                          <span className="text-sm text-muted-foreground">
                            By {post.author}
                          </span>
                          <Link href={`/blog/${post.slug}`}>
                            <Button variant="ghost" size="sm">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="md:w-1/4">
                <div className="sticky top-20">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={`/blog/category/${category.toLowerCase()}`}
                        className="block p-2 hover:bg-muted rounded-md transition-colors"
                      >
                        {category}
                      </Link>
                    ))}
                  </div>

                  <h3 className="text-lg font-bold mt-8 mb-4">Subscribe</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest articles and insights delivered to your
                      inbox.
                    </p>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full p-2 rounded-md border"
                      />
                      <Button className="w-full">Subscribe</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
