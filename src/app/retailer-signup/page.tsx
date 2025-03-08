import { SignupFormRetailer } from "@/components/auth/signup-form-retailer";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

export default function RetailerSignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-8">
            Retailer Signup
          </h1>
          <SignupFormRetailer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
