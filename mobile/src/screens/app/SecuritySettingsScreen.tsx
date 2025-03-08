import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Card, Button, ListItem } from "react-native-elements";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SecuritySettingsScreen() {
  const { colors } = useTheme();
  const { supabase, session } = useAuth();

  // Security settings
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricSignInEnabled, setBiometricSignInEnabled] = useState(false);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false);
  const [faceIdEnabled, setFaceIdEnabled] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [transactionLimit, setTransactionLimit] = useState("1000");
  const [requireBiometricAbove, setRequireBiometricAbove] = useState("100");
  const [activeTab, setActiveTab] = useState("biometric");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user security settings
    const loadSecuritySettings = async () => {
      try {
        if (session?.user) {
          const { data, error } = await supabase
            .from("user_security_settings")
            .select("*")
            .eq("user_id", session.user.id)
            .single();

          if (data) {
            setBiometricEnabled(data.biometric_enabled || false);
            setFingerprintEnabled(data.fingerprint_enabled || false);
            setFaceIdEnabled(data.face_id_enabled || false);
            setBiometricSignInEnabled(data.biometric_signin_enabled || false);
            setTwoFactorEnabled(data.two_factor_enabled || false);
            setTransactionLimit(String(data.transaction_limit || 1000));
            setRequireBiometricAbove(
              String(data.require_biometric_above || 100),
            );
          }
        }
      } catch (error) {
        console.error("Error loading security settings:", error);
      }
    };

    loadSecuritySettings();
  }, [session, supabase]);

  const handleSaveBiometricSettings = async () => {
    setLoading(true);
    try {
      if (session?.user) {
        await supabase.from("user_security_settings").upsert({
          user_id: session.user.id,
          biometric_enabled: biometricEnabled,
          fingerprint_enabled: fingerprintEnabled,
          face_id_enabled: faceIdEnabled,
          biometric_signin_enabled: biometricSignInEnabled,
          require_biometric_above: parseInt(requireBiometricAbove),
        });
      }
    } catch (error) {
      console.error("Error saving biometric settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTwoFactorSettings = async () => {
    setLoading(true);
    try {
      if (session?.user) {
        await supabase.from("user_security_settings").upsert({
          user_id: session.user.id,
          two_factor_enabled: twoFactorEnabled,
        });
      }
    } catch (error) {
      console.error("Error saving two-factor settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTransactionSettings = async () => {
    setLoading(true);
    try {
      if (session?.user) {
        await supabase.from("user_security_settings").upsert({
          user_id: session.user.id,
          transaction_limit: parseInt(transactionLimit),
        });
      }
    } catch (error) {
      console.error("Error saving transaction settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    tabs: {
      flexDirection: "row",
      marginBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      color: colors.mutedForeground,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: "bold",
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    cardDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 16,
    },
    settingRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    settingLabel: {
      fontSize: 16,
      color: colors.text,
    },
    settingDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 4,
      maxWidth: "80%",
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    dollarSign: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginRight: 8,
    },
    input: {
      flex: 1,
      height: 40,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      color: colors.text,
      backgroundColor: colors.background,
    },
    inputDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    alertBox: {
      backgroundColor: colors.muted,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    alertIcon: {
      marginRight: 8,
      marginTop: 2,
    },
    alertText: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
    },
    activityItem: {
      flexDirection: "row",
      marginBottom: 12,
    },
    activityIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    activityContent: {
      flex: 1,
    },
    activityTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: colors.text,
    },
    activityTime: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 2,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Security Settings</Text>
        <Text style={styles.subtitle}>
          Manage your account security and transaction approval methods
        </Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "biometric" && styles.activeTab]}
          onPress={() => setActiveTab("biometric")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "biometric" && styles.activeTabText,
            ]}
          >
            Biometric
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "two-factor" && styles.activeTab]}
          onPress={() => setActiveTab("two-factor")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "two-factor" && styles.activeTabText,
            ]}
          >
            Two-Factor
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "transaction" && styles.activeTab]}
          onPress={() => setActiveTab("transaction")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "transaction" && styles.activeTabText,
            ]}
          >
            Transaction
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "biometric" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Biometric Authentication</Text>
          <Text style={styles.cardDescription}>
            Use your device's biometric features to approve transactions
          </Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>
                Enable Biometric Authentication
              </Text>
              <Text style={styles.settingDescription}>
                Use fingerprint or facial recognition to approve transactions
              </Text>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: colors.muted, true: colors.primary }}
            />
          </View>

          {biometricEnabled && (
            <>
              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingLabel}>
                    <Icon name="fingerprint" size={16} color={colors.text} />{" "}
                    Fingerprint Authentication
                  </Text>
                  <Text style={styles.settingDescription}>
                    Use your fingerprint to approve transactions
                  </Text>
                </View>
                <Switch
                  value={fingerprintEnabled}
                  onValueChange={setFingerprintEnabled}
                  trackColor={{ false: colors.muted, true: colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingLabel}>
                    <Icon name="login" size={16} color={colors.text} />{" "}
                    Biometric Sign In
                  </Text>
                  <Text style={styles.settingDescription}>
                    Use biometrics to quickly sign in to your account
                  </Text>
                </View>
                <Switch
                  value={biometricSignInEnabled}
                  onValueChange={setBiometricSignInEnabled}
                  trackColor={{ false: colors.muted, true: colors.primary }}
                />
              </View>

              <View style={styles.settingRow}>
                <View>
                  <Text style={styles.settingLabel}>
                    <Icon
                      name="face-recognition"
                      size={16}
                      color={colors.text}
                    />{" "}
                    Face ID Authentication
                  </Text>
                  <Text style={styles.settingDescription}>
                    Use facial recognition to approve transactions
                  </Text>
                </View>
                <Switch
                  value={faceIdEnabled}
                  onValueChange={setFaceIdEnabled}
                  trackColor={{ false: colors.muted, true: colors.primary }}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Require Biometric Authentication Above
                </Text>
                <View style={styles.inputWrapper}>
                  <Text style={styles.dollarSign}>$</Text>
                  <TextInput
                    style={styles.input}
                    value={requireBiometricAbove}
                    onChangeText={setRequireBiometricAbove}
                    keyboardType="numeric"
                    placeholder="100"
                  />
                </View>
                <Text style={styles.inputDescription}>
                  Transactions above this amount will require biometric
                  authentication
                </Text>
              </View>
            </>
          )}

          <Button
            title="Save Biometric Settings"
            onPress={handleSaveBiometricSettings}
            loading={loading}
            buttonStyle={{ backgroundColor: colors.primary, marginTop: 16 }}
          />
        </View>
      )}

      {activeTab === "two-factor" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Two-Factor Authentication</Text>
          <Text style={styles.cardDescription}>
            Add an extra layer of security to your account
          </Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>
                Enable Two-Factor Authentication
              </Text>
              <Text style={styles.settingDescription}>
                Receive a verification code via SMS or authenticator app when
                signing in
              </Text>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: colors.muted, true: colors.primary }}
            />
          </View>

          {twoFactorEnabled && (
            <View style={styles.alertBox}>
              <Icon
                name="alert"
                size={20}
                color="#f59e0b"
                style={styles.alertIcon}
              />
              <Text style={styles.alertText}>
                Two-factor authentication setup requires additional steps.
                Please contact support to complete the setup process.
              </Text>
            </View>
          )}

          <Button
            title="Save Two-Factor Settings"
            onPress={handleSaveTwoFactorSettings}
            loading={loading}
            buttonStyle={{ backgroundColor: colors.primary, marginTop: 16 }}
          />
        </View>
      )}

      {activeTab === "transaction" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Transaction Limits</Text>
          <Text style={styles.cardDescription}>
            Set limits for your transactions to enhance security
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Daily Transaction Limit</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.input}
                value={transactionLimit}
                onChangeText={setTransactionLimit}
                keyboardType="numeric"
                placeholder="1000"
              />
            </View>
            <Text style={styles.inputDescription}>
              Maximum amount you can transact in a single day
            </Text>
          </View>

          <View style={styles.alertBox}>
            <Icon
              name="shield"
              size={20}
              color={colors.primary}
              style={styles.alertIcon}
            />
            <Text style={styles.alertText}>
              <Text style={{ fontWeight: "bold" }}>
                Security Recommendation
              </Text>
              \n\nWe recommend setting transaction limits and enabling biometric
              authentication for all transactions above $100 to protect your
              account.
            </Text>
          </View>

          <Button
            title="Save Transaction Settings"
            onPress={handleSaveTransactionSettings}
            loading={loading}
            buttonStyle={{ backgroundColor: colors.primary, marginTop: 16 }}
          />
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Recent Security Activity</Text>
        <Text style={styles.cardDescription}>
          Review recent security events on your account
        </Text>

        <View style={styles.activityItem}>
          <Icon
            name="lock"
            size={20}
            color="#10b981"
            style={styles.activityIcon}
          />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Successful login</Text>
            <Text style={styles.activityTime}>
              Today at 10:45 AM • IP: 192.168.1.1
            </Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <Icon
            name="fingerprint"
            size={20}
            color="#10b981"
            style={styles.activityIcon}
          />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>
              Transaction approved with biometrics
            </Text>
            <Text style={styles.activityTime}>
              Yesterday at 3:20 PM • Amount: $250.00
            </Text>
          </View>
        </View>

        <View style={styles.activityItem}>
          <Icon
            name="alert-triangle"
            size={20}
            color="#f59e0b"
            style={styles.activityIcon}
          />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Failed login attempt</Text>
            <Text style={styles.activityTime}>
              3 days ago at 8:15 PM • IP: 203.0.113.42
            </Text>
          </View>
        </View>

        <Button
          title="View All Security Activity"
          type="outline"
          buttonStyle={{ borderColor: colors.border, marginTop: 16 }}
          titleStyle={{ color: colors.text }}
        />
      </View>
    </ScrollView>
  );
}
