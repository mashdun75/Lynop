import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const navigation = useNavigation();
  const { signUp, signInWithProvider } = useAuth();
  const { colors } = useTheme();

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        onboarding_completed: false,
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
      await signInWithProvider(provider);
    } catch (error: any) {
      setError(`An error occurred during ${provider} signup`);
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
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    halfInput: {
      width: "48%",
    },
    successContainer: {
      alignItems: "center",
      padding: 20,
    },
    successTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 10,
    },
    successText: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: "center",
      marginBottom: 20,
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

  if (success) {
    return (
      <View style={[styles.container, styles.successContainer]}>
        <Icon name="email-check" size={60} color={colors.primary} />
        <Text style={styles.successTitle}>Check your email</Text>
        <Text style={styles.successText}>
          We've sent you a confirmation link to {email}. Please check your inbox
          to complete your registration.
        </Text>
        <Button
          title="Back to Login"
          onPress={() => navigation.navigate("Login" as never)}
          buttonStyle={{ backgroundColor: colors.primary }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create a Lynop Account</Text>
        <Text style={styles.subtitle}>Sign up to get started with Lynop</Text>
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
        onPress={() => handleSocialSignup("google")}
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
        onPress={() => handleSocialSignup("github")}
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
        onPress={() => handleSocialSignup("discord")}
        disabled={loading}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or continue with email</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.row}>
        <Input
          containerStyle={styles.halfInput}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          inputStyle={{ color: colors.text }}
        />
        <Input
          containerStyle={styles.halfInput}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          inputStyle={{ color: colors.text }}
        />
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
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        leftIcon={
          <Icon name="phone" size={20} color={colors.mutedForeground} />
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
        title={loading ? "" : "Sign Up"}
        icon={
          loading ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : null
        }
        onPress={handleSignup}
        disabled={loading}
        buttonStyle={{ backgroundColor: colors.primary, marginTop: 10 }}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login" as never)}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
