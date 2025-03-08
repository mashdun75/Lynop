"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AccountPage() {
  const { session, supabase } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // User data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [personalAddress, setPersonalAddress] = useState("");
  const [personalCity, setPersonalCity] = useState("");
  const [personalState, setPersonalState] = useState("");
  const [personalZip, setPersonalZip] = useState("");
  const [personalCountry, setPersonalCountry] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessState, setBusinessState] = useState("");
  const [businessZip, setBusinessZip] = useState("");
  const [businessCountry, setBusinessCountry] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [businessEIN, setBusinessEIN] = useState("");
  const [userId, setUserId] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");

  useEffect(() => {
    if (session === null && !isLoading) {
      router.push("/login");
    } else if (session) {
      // Load user data
      const userData = session.user.user_metadata;
      setFirstName(userData?.first_name || "");
      setLastName(userData?.last_name || "");
      setEmail(session.user.email || "");
      setPhoneNumber(userData?.phone_number || "");
      setCompanyName(userData?.company_name || "");
      setIndustry(userData?.industry || "");
      setPersonalAddress(userData?.personal_address || "");
      setPersonalCity(userData?.personal_city || "");
      setPersonalState(userData?.personal_state || "");
      setPersonalZip(userData?.personal_zip || "");
      setPersonalCountry(userData?.personal_country || "");
      setBusinessAddress(userData?.business_address || "");
      setBusinessCity(userData?.business_city || "");
      setBusinessState(userData?.business_state || "");
      setBusinessZip(userData?.business_zip || "");
      setBusinessCountry(userData?.business_country || "");
      setBillingAddress(userData?.billing_address || "");
      setBillingCity(userData?.billing_city || "");
      setBillingState(userData?.billing_state || "");
      setBillingZip(userData?.billing_zip || "");
      setBillingCountry(userData?.billing_country || "");
      setBusinessEIN(userData?.business_ein || "");
      setUserId(
        userData?.user_id ||
          `USR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setBusinessId(
        userData?.business_id ||
          `BUS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setManufacturerId(
        userData?.manufacturer_id ||
          `MFR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setIsLoading(false);
    }
  }, [session, router, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          company_name: companyName,
          industry: industry,
          personal_address: personalAddress,
          personal_city: personalCity,
          personal_state: personalState,
          personal_zip: personalZip,
          personal_country: personalCountry,
          business_address: businessAddress,
          business_city: businessCity,
          business_state: businessState,
          business_zip: businessZip,
          business_country: businessCountry,
          billing_address: billingAddress,
          billing_city: billingCity,
          billing_state: billingState,
          billing_zip: billingZip,
          billing_country: billingCountry,
          business_ein: businessEIN,
          user_id: userId,
          business_id: businessId,
          manufacturer_id: manufacturerId,
        },
      });

      if (error) throw error;
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error: any) {
      console.error("Update error:", error);
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile",
      });
    } finally {
      setIsSaving(false);
    }
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
  const userInitials = firstName?.[0] + lastName?.[0] || "U";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and profile settings
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex justify-center mb-6">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="text-2xl">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>

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
                    value={email}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userId">User ID</Label>
                  <Input
                    id="userId"
                    value={userId}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground">
                    System-generated ID cannot be changed
                  </p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-4">Personal Address</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="personalAddress">Street Address</Label>
                      <Input
                        id="personalAddress"
                        value={personalAddress}
                        onChange={(e) => setPersonalAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="personalCity">City</Label>
                        <Input
                          id="personalCity"
                          value={personalCity}
                          onChange={(e) => setPersonalCity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="personalState">State/Province</Label>
                        <Input
                          id="personalState"
                          value={personalState}
                          onChange={(e) => setPersonalState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="personalZip">ZIP/Postal Code</Label>
                        <Input
                          id="personalZip"
                          value={personalZip}
                          onChange={(e) => setPersonalZip(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="personalCountry">Country</Label>
                        <Input
                          id="personalCountry"
                          value={personalCountry}
                          onChange={(e) => setPersonalCountry(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {userType === "manufacturer" && (
                  <>
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium mb-4">
                        Business Information
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Company Name</Label>
                          <Input
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Input
                            id="industry"
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessEIN">Business EIN</Label>
                          <Input
                            id="businessEIN"
                            value={businessEIN}
                            onChange={(e) => setBusinessEIN(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessId">Business ID</Label>
                          <Input
                            id="businessId"
                            value={businessId}
                            disabled
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            System-generated ID cannot be changed
                          </p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="manufacturerId">
                            Manufacturer ID
                          </Label>
                          <Input
                            id="manufacturerId"
                            value={manufacturerId}
                            disabled
                            className="bg-muted"
                          />
                          <p className="text-xs text-muted-foreground">
                            System-generated ID cannot be changed
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-medium mb-4">
                        Business Address
                      </h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="businessAddress">
                            Street Address
                          </Label>
                          <Input
                            id="businessAddress"
                            value={businessAddress}
                            onChange={(e) => setBusinessAddress(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessCity">City</Label>
                            <Input
                              id="businessCity"
                              value={businessCity}
                              onChange={(e) => setBusinessCity(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessState">
                              State/Province
                            </Label>
                            <Input
                              id="businessState"
                              value={businessState}
                              onChange={(e) => setBusinessState(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="businessZip">ZIP/Postal Code</Label>
                            <Input
                              id="businessZip"
                              value={businessZip}
                              onChange={(e) => setBusinessZip(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="businessCountry">Country</Label>
                            <Input
                              id="businessCountry"
                              value={businessCountry}
                              onChange={(e) =>
                                setBusinessCountry(e.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t pt-4 mt-4">
                  <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="billingAddress">Street Address</Label>
                      <Input
                        id="billingAddress"
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingCity">City</Label>
                        <Input
                          id="billingCity"
                          value={billingCity}
                          onChange={(e) => setBillingCity(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingState">State/Province</Label>
                        <Input
                          id="billingState"
                          value={billingState}
                          onChange={(e) => setBillingState(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billingZip">ZIP/Postal Code</Label>
                        <Input
                          id="billingZip"
                          value={billingZip}
                          onChange={(e) => setBillingZip(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billingCountry">Country</Label>
                        <Input
                          id="billingCountry"
                          value={billingCountry}
                          onChange={(e) => setBillingCountry(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {message && (
                  <div
                    className={`p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}
                  >
                    {message.text}
                  </div>
                )}

                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Manage your password and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    ••••••••••••
                  </span>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Not enabled
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/dashboard/security")}
                  >
                    Enable
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Biometric Authentication</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Configure fingerprint and facial recognition
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/dashboard/security")}
                  >
                    Configure
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Account Type</Label>
                <div className="flex items-center justify-between">
                  <span className="text-sm capitalize">{userType}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Your account type determines available features
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
