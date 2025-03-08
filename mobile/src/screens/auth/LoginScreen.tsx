import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Input, Button, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as LocalAuthentication from "expo-local-authentication";
import BiometricSignIn from "../../components/BiometricSignIn";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);

  const navigation = useNavigation();
  const { signIn, signInWithProvider } = useAuth();
  const { colors } = useTheme();

  useEffect(() => {
    // Check if device supports biometric authentication
    const checkBiometricSupport = async () => {
      try {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setBiometricSupported(compatible && enrolled);
      } catch (error) {
        console.error("Error checking biometric support:", error);
        setBiometricSupported(false);
      }
    };

    checkBiometricSupport();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = () => {
    setIsBiometricOpen(true);
  };

  const handleBiometricSuccess = async () => {
    try {
      // In a real app, you would validate the biometric auth with your backend
      // Here we're simulating a successful login with the last used credentials
      await signIn("saved_email@example.com", "saved_password");
    } catch (error: any) {
      setError("Failed to sign in after biometric authentication");
    }
  };

  const handleBiometricError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleSocialLogin = async (
    provider: "google" | "github" | "discord",
  ) => {
    try {
      setLoading(true);
      await signInWithProvider(provider);
    } catch (error: any) {
      setError(`An error occurred during ${provider} login`);
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    header: {
      marginTop: 40,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: "center",
      marginTop: 8,
    },
    socialButton: {
      marginVertical: 8,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    socialButtonTitle: {
      color: colors.text,
    },
    dividerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: colors.border,
    },
    dividerText: {
      marginHorizontal: 10,
      color: colors.mutedForeground,
      fontSize: 12,
      textTransform: "uppercase",
    },
    errorText: {
      color: colors.destructive,
      marginTop: 10,
      textAlign: "center",
    },
    footer: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    footerText: {
      color: colors.mutedForeground,
    },
    linkText: {
      color: colors.primary,
      fontWeight: "bold",
      marginLeft: 5,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Login to Lynop</Text>
        <Text style={styles.subtitle}>
          Enter your credentials to access your account
        </Text>
      </View>

      <Button
        title="Continue with Google"
        icon={
          <Icon
            name="google"
            size={20}
            color={colors.text}
            style={{ marginRight: 10 }}
          />
        }
        buttonStyle={styles.socialButton}
        titleStyle={styles.socialButtonTitle}
        onPress={() => handleSocialLogin("google")}
        disabled={loading}
      />

      <Button
        title="Continue with GitHub"
        icon={
          <Icon
            name="github"
            size={20}
            color={colors.text}
            style={{ marginRight: 10 }}
          />
        }
        buttonStyle={styles.socialButton}
        titleStyle={styles.socialButtonTitle}
        onPress={() => handleSocialLogin("github")}
        disabled={loading}
      />

      <Button
        title="Continue with Discord"
        icon={
          <Icon
            name="discord"
            size={20}
            color={colors.text}
            style={{ marginRight: 10 }}
          />
        }
        buttonStyle={styles.socialButton}
        titleStyle={styles.socialButtonTitle}
        onPress={() => handleSocialLogin("discord")}
        disabled={loading}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or continue with email</Text>
        <View style={styles.divider} />
      </View>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        leftIcon={
          <Icon name="email" size={20} color={colors.mutedForeground} />
        }
        inputStyle={{ color: colors.text }}
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={<Icon name="lock" size={20} color={colors.mutedForeground} />}
        inputStyle={{ color: colors.text }}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Button
        title={loading ? "" : "Login"}
        icon={
          loading ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : null
        }
        onPress={handleLogin}
        disabled={loading}
        buttonStyle={{ backgroundColor: colors.primary, marginTop: 10 }}
      />

      {biometricSupported && (
        <Button
          title="Sign in with Biometrics"
          icon={
            <Icon
              name="fingerprint"
              size={20}
              color="white"
              style={{ marginRight: 10 }}
            />
          }
          onPress={handleBiometricLogin}
          disabled={loading}
          buttonStyle={{ backgroundColor: colors.primary, marginTop: 10 }}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup" as never)}
        >
          <Text style={styles.linkText}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <BiometricSignIn
        isVisible={isBiometricOpen}
        onClose={() => setIsBiometricOpen(false)}
        onSuccess={handleBiometricSuccess}
        onError={handleBiometricError}
      />
    </ScrollView>
  );
}
