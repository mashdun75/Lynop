import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ConnectAccountsScreen() {
  const [activeTab, setActiveTab] = useState("banking");
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([]);

  const navigation = useNavigation();
  const { supabase } = useAuth();
  const { colors } = useTheme();

  const handleConnectAccount = (accountName: string) => {
    // Simulate connecting an account
    setConnectedAccounts([...connectedAccounts, accountName]);
  };

  const handleFinish = async () => {
    try {
      // Update user metadata with connected accounts
      await supabase.auth.updateUser({
        data: {
          connected_accounts: connectedAccounts,
        },
      });
      navigation.navigate("Dashboard" as never);
    } catch (error) {
      console.error("Error updating connected accounts:", error);
    }
  };

  const bankingAccounts = [
    "Chase",
    "Bank of America",
    "Wells Fargo",
    "Citibank",
  ];
  const creditCards = ["Visa", "Mastercard", "American Express", "Discover"];
  const paymentProcessors = ["PayPal", "Stripe", "Square", "Shopify Payments"];

  const renderAccounts = (accounts: string[]) => {
    return accounts.map((account) => (
      <TouchableOpacity
        key={account}
        onPress={() => handleConnectAccount(account)}
      >
        <Card
          containerStyle={[
            styles.accountCard,
            connectedAccounts.includes(account) && styles.connectedCard,
          ]}
        >
          <View style={styles.accountHeader}>
            <Text style={styles.accountTitle}>{account}</Text>
          </View>
          <Text style={styles.accountDescription}>
            {connectedAccounts.includes(account)
              ? `${account} account connected`
              : `Connect your ${account} ${activeTab === "credit-cards" ? "cards" : "account"}`}
          </Text>
          <Button
            title={
              connectedAccounts.includes(account) ? "Connected" : "Connect"
            }
            buttonStyle={{
              backgroundColor: connectedAccounts.includes(account)
                ? colors.primary
                : colors.background,
              borderWidth: 1,
              borderColor: colors.border,
              marginTop: 12,
            }}
            titleStyle={{
              color: connectedAccounts.includes(account)
                ? colors.primaryForeground
                : colors.text,
            }}
            onPress={() => handleConnectAccount(account)}
          />
        </Card>
      </TouchableOpacity>
    ));
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      height: 60,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      justifyContent: "center",
      paddingHorizontal: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    content: {
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: colors.mutedForeground,
      marginBottom: 24,
    },
    tabs: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 16,
    },
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      marginRight: 8,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      fontWeight: "500",
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: "bold",
    },
    accountCard: {
      borderRadius: 8,
      marginBottom: 12,
      padding: 16,
    },
    connectedCard: {
      borderWidth: 1,
      borderColor: colors.primary,
    },
    accountHeader: {
      marginBottom: 8,
    },
    accountTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    accountDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    footerText: {
      color: colors.mutedForeground,
      fontSize: 14,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lynop</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Connect Your Accounts</Text>
        <Text style={styles.subtitle}>
          Link your financial accounts to get the most out of Lynop
        </Text>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "banking" && styles.activeTab]}
            onPress={() => setActiveTab("banking")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "banking" && styles.activeTabText,
              ]}
            >
              Banking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "credit-cards" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("credit-cards")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "credit-cards" && styles.activeTabText,
              ]}
            >
              Credit Cards
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === "payment-processors" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("payment-processors")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "payment-processors" && styles.activeTabText,
              ]}
            >
              Payment Processors
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "banking" && renderAccounts(bankingAccounts)}
        {activeTab === "credit-cards" && renderAccounts(creditCards)}
        {activeTab === "payment-processors" &&
          renderAccounts(paymentProcessors)}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          You can always connect more accounts later
        </Text>
        <Button
          title={
            connectedAccounts.length > 0
              ? "Continue to Dashboard"
              : "Skip for Now"
          }
          onPress={handleFinish}
          buttonStyle={{ backgroundColor: colors.primary }}
        />
      </View>
    </View>
  );
}
