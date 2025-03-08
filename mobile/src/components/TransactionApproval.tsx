import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "../theme/ThemeProvider";
import { useAuth } from "../providers/AuthProvider";
import BiometricAuth from "./BiometricAuth";

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

export default function TransactionApproval({
  transaction,
  onApprove,
  onReject,
}: TransactionApprovalProps) {
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();
  const { supabase } = useAuth();

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

      Alert.alert(
        "Transaction Approved",
        `$${transaction.amount.toFixed(2)} to ${transaction.recipient} has been approved.`,
      );
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

      Alert.alert(
        "Transaction Rejected",
        `$${transaction.amount.toFixed(2)} to ${transaction.recipient} has been rejected.`,
      );
    } catch (error) {
      console.error("Transaction rejection error:", error);
      setError("Failed to reject transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
    },
    label: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 4,
    },
    value: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
    },
    description: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 16,
    },
    errorContainer: {
      backgroundColor: "#FEE2E2",
      padding: 12,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16,
    },
    errorText: {
      color: "#DC2626",
      fontSize: 14,
      flex: 1,
      marginLeft: 8,
    },
    footer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    rejectButton: {
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    approveButton: {
      backgroundColor: colors.primary,
    },
  });

  return (
    <>
      <Card containerStyle={styles.container}>
        <Text style={styles.title}>Transaction Approval Required</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>${transaction.amount.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{formatDate(transaction.date)}</Text>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.label}>Recipient</Text>
          <Text style={styles.value}>{transaction.recipient}</Text>
        </View>

        {transaction.description && (
          <View style={{ marginBottom: 12 }}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.description}>{transaction.description}</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Icon name="alert-circle" size={20} color="#DC2626" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Button
            title="Reject"
            buttonStyle={styles.rejectButton}
            titleStyle={{ color: colors.text }}
            onPress={handleReject}
            disabled={isLoading}
          />
          <Button
            title="Approve with Biometrics"
            icon={
              <Icon
                name="fingerprint"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
            }
            buttonStyle={styles.approveButton}
            onPress={handleApproveClick}
            disabled={isLoading}
          />
        </View>
      </Card>

      <BiometricAuth
        isVisible={isBiometricOpen}
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
