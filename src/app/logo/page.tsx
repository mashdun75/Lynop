import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Logo } from "@/components/ui/logo";

export default function LogoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Lynop Logo</h1>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <div className="p-8 border rounded-lg flex items-center justify-center bg-white">
                <Logo size="xl" />
              </div>
              <div className="p-8 border rounded-lg flex items-center justify-center bg-primary">
                <Logo size="xl" variant="white" />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Logo Sizes</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-20 text-sm text-muted-foreground">
                      Small:
                    </span>
                    <Logo size="sm" />
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm text-muted-foreground">
                      Medium:
                    </span>
                    <Logo size="md" />
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm text-muted-foreground">
                      Large:
                    </span>
                    <Logo size="lg" />
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-sm text-muted-foreground">
                      XL:
                    </span>
                    <Logo size="xl" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Logo Description</h2>
                <p className="text-muted-foreground">
                  The Lynop logo represents security and financial data
                  management. The hexagonal shield symbolizes protection, while
                  the connected lines represent data flow and encryption. The
                  blue accent highlights the technology aspect of the brand, and
                  the overall design conveys trust, innovation, and reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
