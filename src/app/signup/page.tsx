import { SignupForm } from "@/components/auth/signup-form";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container flex items-center justify-center min-h-[calc(100vh-64px-200px)] py-12">
          <SignupForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
