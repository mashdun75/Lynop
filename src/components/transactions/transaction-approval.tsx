"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BiometricAuth } from "@/components/auth/biometric-auth";
import { useSupabase } from "@/components/supabase-provider";
import { useToast } from "@/components/ui/use-toast";
import { Fingerprint, AlertCircle } from "lucide-react";

interface TransactionApprovalProps {
  transaction: {
    id: string;
    amount: number;
    recipient: string;
    description?: string;
    date: string;
  };
  onApprove: (transactionId: string) => void;
  onReject: (transactionId: string) => void;
}

export function TransactionApproval({
  transaction,
  onApprove,
  onReject,
}: TransactionApprovalProps) {
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const handleApproveClick = () => {
    setIsBiometricOpen(true);
  };

  const handleBiometricSuccess = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Record the transaction approval
      await supabase
        .from("transactions")
        .update({
          status: "approved",
          approved_at: new Date().toISOString(),
        })
        .eq("id", transaction.id);

      onApprove(transaction.id);

      toast({
        title: "Transaction Approved",
        description: `$${transaction.amount.toFixed(2)} to ${transaction.recipient} has been approved.`,
      });
    } catch (error) {
      console.error("Transaction approval error:", error);
      setError("Failed to approve transaction. Please try again.");
    } finally {
      setIsLoading(false);
      setIsBiometricOpen(false);
    }
  };

  const handleBiometricError = (errorMessage: string) => {
    setError(errorMessage);
    setIsBiometricOpen(false);
  };

  const handleReject = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Record the transaction rejection
      await supabase
        .from("transactions")
        .update({
          status: "rejected",
          rejected_at: new Date().toISOString(),
        })
        .eq("id", transaction.id);

      onReject(transaction.id);

      toast({
        title: "Transaction Rejected",
        description: `$${transaction.amount.toFixed(2)} to ${transaction.recipient} has been rejected.`,
      });
    } catch (error) {
      console.error("Transaction rejection error:", error);
      setError("Failed to reject transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Approval Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Amount
                </p>
                <p className="text-lg font-bold">
                  ${transaction.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Date
                </p>
                <p className="text-lg">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Recipient
              </p>
              <p className="text-lg">{transaction.recipient}</p>
            </div>

            {transaction.description && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Description
                </p>
                <p className="text-lg">{transaction.description}</p>
              </div>
            )}

            {error && (
              <div className="bg-destructive/10 p-3 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReject} disabled={isLoading}>
            Reject
          </Button>
          <Button onClick={handleApproveClick} disabled={isLoading}>
            <Fingerprint className="mr-2 h-4 w-4" />
            Approve with Biometrics
          </Button>
        </CardFooter>
      </Card>

      <BiometricAuth
        isOpen={isBiometricOpen}
        onClose={() => setIsBiometricOpen(false)}
        onSuccess={handleBiometricSuccess}
        onError={handleBiometricError}
        transactionDetails={{
          amount: transaction.amount,
          recipient: transaction.recipient,
          description: transaction.description,
        }}
      />
    </>
  );
}
