import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
              Trusted by innovative teams
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers have to say about Lynop.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-12 pt-12">
          <Card className="border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                      alt="Alex Johnson"
                    />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Alex Johnson</p>
                    <p className="text-sm text-muted-foreground">
                      Small Business Owner
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "Lynop has transformed how I manage my finances. The AI
                  categorization is incredibly accurate, and I love knowing my
                  data is secure with quantum-resistant encryption."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      alt="Sarah Chen"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">
                      Supply Chain Director, InnovateCo
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "As a manufacturer, Lynop gives us unprecedented visibility
                  into our product sales. The real-time SKU data has helped us
                  optimize our supply chain and production planning."
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="border bg-card">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
                      alt="Michael Rodriguez"
                    />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Michael Rodriguez</p>
                    <p className="text-sm text-muted-foreground">
                      CEO, StartupX
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The integration with our accounting software is seamless.
                  Lynop has cut our bookkeeping time in half and improved our
                  financial reporting accuracy significantly."
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
