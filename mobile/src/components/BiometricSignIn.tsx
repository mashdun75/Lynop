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

interface BiometricSignInProps {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export default function BiometricSignIn({
  isVisible,
  onClose,
  onSuccess,
  onError,
}: BiometricSignInProps) {
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState<"fingerprint" | "face" | null>(null);
  const { colors } = useTheme();

  const handleAuthenticate = async (type: "fingerprint" | "face") => {
    setMethod(type);
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
        promptMessage: `Sign in to Lynop`,
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
      setMethod(null);
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
    methodsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginBottom: 20,
    },
    methodButton: {
      width: 100,
      height: 100,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    methodLabel: {
      marginTop: 8,
      fontSize: 14,
      color: colors.text,
      textAlign: "center",
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
          <Text style={styles.title}>Sign in with Biometrics</Text>
          <Text style={styles.description}>
            Use your biometric data to quickly and securely sign in to your
            account
          </Text>

          <View style={styles.methodsContainer}>
            <TouchableOpacity
              style={styles.methodButton}
              onPress={() => handleAuthenticate("fingerprint")}
              disabled={loading}
            >
              {loading && method === "fingerprint" ? (
                <ActivityIndicator color={colors.primary} size="large" />
              ) : (
                <Icon name="fingerprint" size={40} color={colors.primary} />
              )}
              <Text style={styles.methodLabel}>Fingerprint</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.methodButton}
              onPress={() => handleAuthenticate("face")}
              disabled={loading}
            >
              {loading && method === "face" ? (
                <ActivityIndicator color={colors.primary} size="large" />
              ) : (
                <Icon
                  name="face-recognition"
                  size={40}
                  color={colors.primary}
                />
              )}
              <Text style={styles.methodLabel}>Face ID</Text>
            </TouchableOpacity>
          </View>

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
          </View>
        </View>
      </View>
    </Modal>
  );
}
