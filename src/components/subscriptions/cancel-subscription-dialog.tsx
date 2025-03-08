"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface CancelSubscriptionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionName: string;
  subscriptionAmount: string;
  billingCycle: string;
  cancelUrl?: string;
}

export function CancelSubscriptionDialog({
  isOpen,
  onClose,
  subscriptionName,
  subscriptionAmount,
  billingCycle,
  cancelUrl,
}: CancelSubscriptionDialogProps) {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleCancel = () => {
    setIsConfirming(true);
    // In a real app, this would call an API to cancel the subscription
    setTimeout(() => {
      setIsConfirming(false);
      onClose();
      alert(
        `Your ${subscriptionName} subscription has been canceled. You will have access until the end of your current billing period.`,
      );
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel {subscriptionName} Subscription</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel your {subscriptionName}{" "}
            subscription?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start space-x-4 p-4 bg-amber-50 dark:bg-amber-950/30 rounded-md">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                Subscription details
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-500">
                You are currently paying {subscriptionAmount} {billingCycle}.
                Your subscription will remain active until the end of your
                current billing period.
              </p>
            </div>
          </div>

          {cancelUrl && (
            <div className="text-sm text-muted-foreground">
              <p>
                Note: Some subscriptions can only be canceled through the
                service provider's website.
              </p>
              <p className="mt-1">
                To cancel your {subscriptionName} subscription, please visit:{" "}
                <a
                  href={cancelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {cancelUrl}
                </a>
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Keep Subscription
          </Button>
          {!cancelUrl && (
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isConfirming}
            >
              {isConfirming ? "Canceling..." : "Confirm Cancellation"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
