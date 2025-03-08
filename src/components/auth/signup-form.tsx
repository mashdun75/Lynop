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
import { Factory, User, Store } from "lucide-react";

export function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userType, setUserType] = useState<
    "consumer" | "manufacturer" | "both" | "retailer"
  >("consumer");
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
            user_type: userType === "both" ? "both" : userType,
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

  const handleSocialSignup = async (
    provider: "google" | "github" | "discord",
  ) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
          scopes: provider === "google" ? "profile email" : undefined,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      console.error(`${provider} login error:`, error);
      setError(error.message || `An error occurred during ${provider} signup`);
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-card">
      <CardHeader>
        <CardTitle>Create a Lynop Account</CardTitle>
        <CardDescription>Sign up to get started with Lynop</CardDescription>
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
            <div className="flex flex-col space-y-4 mb-4">
              <div
                className={`p-4 border rounded-md cursor-pointer ${userType === "consumer" ? "border-primary bg-primary/10" : ""}`}
                onClick={() => setUserType("consumer")}
              >
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Consumer</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Track personal finances and spending
                </p>
              </div>
              <div
                className={`p-4 border rounded-md cursor-pointer ${userType === "manufacturer" ? "border-primary bg-primary/10" : ""}`}
                onClick={() => setUserType("manufacturer")}
              >
                <div className="flex items-center">
                  <Factory className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Manufacturer</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Track product sales and distribution
                </p>
              </div>
              <div
                className={`p-4 border rounded-md cursor-pointer ${userType === "both" ? "border-primary bg-primary/10" : ""}`}
                onClick={() => setUserType("both")}
              >
                <div className="flex items-center">
                  <Factory className="h-5 w-5 mr-2" />
                  <User className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Business (Both)</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Access both consumer and manufacturer features
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Requires Business plan subscription
                </p>
              </div>
              <div
                className={`p-4 border rounded-md cursor-pointer ${userType === "retailer" ? "border-primary bg-primary/10" : ""}`}
                onClick={() => setUserType("retailer")}
              >
                <div className="flex items-center">
                  <Store className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Retailer</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect POS systems and monitor transactions
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Free for retailers - reduce fraud and returns
                </p>
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
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login">
            <Button variant="link" className="p-0 h-auto">
              Login
            </Button>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
