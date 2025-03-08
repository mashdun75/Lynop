import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as LocalAuthentication from "expo-local-authentication";
import { useTheme } from "../theme/ThemeProvider";

interface BiometricAuthProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  transactionDetails?: {
    amount: number;
    recipient?: string;
    description?: string;
  };
}

export default function BiometricAuth({
  isVisible,
  onClose,
  onSuccess,
  onError,
  transactionDetails,
}: BiometricAuthProps) {
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const handleAuthenticate = async () => {
    setLoading(true);

    try {
      // Check if device supports biometric authentication
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        throw new Error(
          "This device does not support biometric authentication",
        );
      }

      // Check if user has enrolled in biometric authentication
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        throw new Error(
          "No biometrics found. Please set up biometric authentication in your device settings",
        );
      }

      // Authenticate user
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: `Authenticate to approve $${transactionDetails?.amount.toFixed(2)}`,
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        onSuccess();
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      console.error("Biometric authentication error:", error);
      onError(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      width: "85%",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    description: {
      fontSize: 14,
      color: colors.mutedForeground,
      textAlign: "center",
      marginBottom: 20,
    },
    amount: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 20,
    },
    biometricButton: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    footer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    securityNote: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
      marginTop: 10,
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Biometric Authentication Required</Text>
          <Text style={styles.description}>
            Please authenticate to approve this transaction
            {transactionDetails?.recipient &&
              ` to ${transactionDetails.recipient}`}
          </Text>

          <Text style={styles.amount}>
            ${transactionDetails?.amount.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.biometricButton}
            onPress={handleAuthenticate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator
                color={colors.primaryForeground}
                size="large"
              />
            ) : (
              <Icon
                name="fingerprint"
                size={40}
                color={colors.primaryForeground}
              />
            )}
          </TouchableOpacity>

          <Text style={styles.securityNote}>
            Your biometric data never leaves your device
          </Text>

          <View style={styles.footer}>
            <Button
              title="Cancel"
              type="clear"
              onPress={onClose}
              disabled={loading}
            />
            <Button
              title="Authenticate"
              onPress={handleAuthenticate}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
