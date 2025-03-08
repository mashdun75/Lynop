"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Fingerprint, Scan, X } from "lucide-react";
import { useSupabase } from "@/components/supabase-provider";

interface BiometricAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  transactionDetails?: {
    amount: number;
    recipient?: string;
    description?: string;
  };
}

export function BiometricAuth({
  isOpen,
  onClose,
  onSuccess,
  onError,
  transactionDetails,
}: BiometricAuthProps) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"fingerprint" | "face" | null>(null);
  const { supabase } = useSupabase();

  const handleAuthenticate = async (type: "fingerprint" | "face") => {
    setMethod(type);
    setLoading(true);

    try {
      // In a real implementation, this would use the Web Authentication API
      // or a similar biometric authentication service

      // Simulate authentication process
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log the authentication attempt
      await supabase.from("auth_logs").insert({
        user_id: supabase.auth.getUser().then(({ data }) => data.user?.id),
        auth_type: type,
        transaction_amount: transactionDetails?.amount,
        transaction_recipient: transactionDetails?.recipient,
        success: true,
      });

      onSuccess();
    } catch (error) {
      console.error("Biometric authentication error:", error);
      onError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
      setMethod(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Biometric Authentication Required</DialogTitle>
          <DialogDescription>
            Please authenticate to approve this transaction of{" "}
            <span className="font-semibold">
              ${transactionDetails?.amount.toFixed(2)}
            </span>
            {transactionDetails?.recipient && (
              <> to {transactionDetails.recipient}</>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center space-x-8 py-8">
          <Button
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-32 w-32 space-y-2"
            onClick={() => handleAuthenticate("fingerprint")}
            disabled={loading}
          >
            {loading && method === "fingerprint" ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            ) : (
              <Fingerprint className="h-12 w-12" />
            )}
            <span>Fingerprint</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="flex flex-col items-center justify-center h-32 w-32 space-y-2"
            onClick={() => handleAuthenticate("face")}
            disabled={loading}
          >
            {loading && method === "face" ? (
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            ) : (
              <Scan className="h-12 w-12" />
            )}
            <span>Face ID</span>
          </Button>
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <p className="text-sm text-muted-foreground">
            Your biometric data never leaves your device
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
