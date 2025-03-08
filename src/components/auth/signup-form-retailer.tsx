"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Store, Shield, BarChart4 } from "lucide-react";

export function SignupFormRetailer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [numberOfLocations, setNumberOfLocations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { supabase } = useSupabase();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/onboarding`,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            company_name: companyName,
            number_of_locations: numberOfLocations,
            user_type: "retailer",
            onboarding_completed: false,
          },
        },
      });

      if (error) throw error;
      setSuccess(true);
    } catch (error: any) {
      setError(error.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card">
      <CardHeader>
        <CardTitle>Create a Retailer Account</CardTitle>
        <CardDescription>
          Sign up for free POS integration and fraud prevention
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <div className="text-center py-4">
            <h3 className="text-lg font-medium">Check your email</h3>
            <p className="text-muted-foreground mt-2">
              We&apos;ve sent you a confirmation link to {email}. Please check
              your inbox to complete your registration.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 p-4 border rounded-md bg-primary/10 border-primary">
              <div className="flex items-center">
                <Store className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Retailer Account</h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Connect POS systems and monitor transactions
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center p-2">
                  <Store className="h-8 w-8 text-primary mb-1" />
                  <span className="text-xs">POS Integration</span>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <Shield className="h-8 w-8 text-primary mb-1" />
                  <span className="text-xs">Fraud Prevention</span>
                </div>
                <div className="flex flex-col items-center text-center p-2">
                  <BarChart4 className="h-8 w-8 text-primary mb-1" />
                  <span className="text-xs">Return Analytics</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfLocations">Number of Locations</Label>
                <Input
                  id="numberOfLocations"
                  type="number"
                  min="1"
                  value={numberOfLocations}
                  onChange={(e) => setNumberOfLocations(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up as Retailer"}
              </Button>
            </form>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Link href="/login">
            <Button variant="link" className="p-0 h-auto">
              Login
            </Button>
          </Link>
        </p>
        <p className="text-xs text-muted-foreground text-center">
          Looking for a different account type?{" "}
          <Link href="/signup">
            <Button variant="link" className="p-0 h-auto text-xs">
              Standard Signup
            </Button>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
