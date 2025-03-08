import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, Button, ListItem, Icon } from "react-native-elements";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function WalletScreen() {
  const { colors } = useTheme();
  const { supabase, session } = useAuth();
  const [walletBalance, setWalletBalance] = useState(1250.75);
  const [isLoading, setIsLoading] = useState(false);

  // Payment methods state
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "1",
      type: "card",
      name: "Visa ending in 4242",
      details: "Expires 12/2025",
      isDefault: true,
      icon: "credit-card",
    },
    {
      id: "2",
      type: "bank",
      name: "Chase Checking",
      details: "Account ending in 6789",
      isDefault: false,
      icon: "bank",
    },
    {
      id: "3",
      type: "digital",
      name: "PayPal",
      details: "Connected",
      isDefault: false,
      icon: "paypal",
    },
  ]);

  // Recent transactions
  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: "t1",
      date: "2023-10-15",
      description: "Added funds",
      amount: 500,
      status: "completed",
      paymentMethod: "Visa ending in 4242",
    },
    {
      id: "t2",
      date: "2023-10-10",
      description: "Withdrawal",
      amount: -200,
      status: "completed",
      paymentMethod: "Chase Checking",
    },
    {
      id: "t3",
      date: "2023-10-05",
      description: "Added funds",
      amount: 1000,
      status: "completed",
      paymentMethod: "Bank Transfer",
    },
    {
      id: "t4",
      date: "2023-10-01",
      description: "In-store payment",
      amount: -45.99,
      status: "completed",
      paymentMethod: "NFC Payment at Starbucks",
    },
  ]);

  const [activeTab, setActiveTab] = useState("payment-methods");

  const handleAddPaymentMethod = (type) => {
    Alert.alert(
      "Add Payment Method",
      `In a real app, this would open a flow to add a new ${type}.`,
      [{ text: "OK" }],
    );
  };

  const handleSetDefaultPaymentMethod = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    );
  };

  const handleRemovePaymentMethod = (id) => {
    Alert.alert(
      "Remove Payment Method",
      "Are you sure you want to remove this payment method?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () =>
            setPaymentMethods(
              paymentMethods.filter((method) => method.id !== id),
            ),
        },
      ],
    );
  };

  const handleAddFunds = () => {
    Alert.alert(
      "Add Funds",
      "In a real app, this would open a payment flow to add funds to your wallet.",
      [{ text: "OK" }],
    );
  };

  const handleWithdraw = () => {
    Alert.alert(
      "Withdraw Funds",
      "In a real app, this would open a flow to withdraw funds from your wallet.",
      [{ text: "OK" }],
    );
  };

  const handleNFCPayment = () => {
    Alert.alert(
      "NFC Payment",
      "In a real app, this would activate NFC for in-store payments at POS terminals.",
      [{ text: "OK" }],
    );
  };

  const handleConnectDigitalWallet = (walletType) => {
    Alert.alert(
      `Connect ${walletType}`,
      `In a real app, this would connect to ${walletType}.`,
      [{ text: "OK" }],
    );
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
    balanceCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    balanceTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    balanceDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 12,
    },
    balanceAmount: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    buttonRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    quickActionsCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    quickActionsTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    quickActionsDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 12,
    },
    quickActionsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    quickActionButton: {
      width: "48%",
      height: 100,
      backgroundColor: colors.background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    quickActionText: {
      marginTop: 8,
      fontSize: 14,
      color: colors.text,
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
      fontSize: 14,
      color: colors.mutedForeground,
    },
    activeTabText: {
      color: colors.primary,
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
    paymentMethodCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    paymentMethodRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    paymentMethodInfo: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    paymentMethodDetails: {
      flex: 1,
    },
    paymentMethodName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    paymentMethodSubtext: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    defaultBadge: {
      backgroundColor: colors.primary + "20",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 8,
    },
    defaultBadgeText: {
      fontSize: 12,
      color: colors.primary,
    },
    actionButtons: {
      flexDirection: "row",
    },
    transactionCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
    },
    transactionRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    transactionDetails: {
      flex: 1,
    },
    transactionDescription: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    transactionMeta: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    transactionAmount: {
      fontSize: 16,
      fontWeight: "bold",
    },
    positiveAmount: {
      color: "green",
    },
    negativeAmount: {
      color: colors.text,
    },
    statusBadge: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
      marginLeft: 8,
    },
    completedBadge: {
      backgroundColor: "#d1fae5",
    },
    completedBadgeText: {
      fontSize: 12,
      color: "#065f46",
    },
    pendingBadge: {
      backgroundColor: "#fef3c7",
    },
    pendingBadgeText: {
      fontSize: 12,
      color: "#92400e",
    },
    digitalWalletCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      alignItems: "center",
    },
    walletIcon: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    walletName: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    walletStatus: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 12,
    },
    nfcCard: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    nfcTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.primaryForeground,
      marginBottom: 8,
    },
    nfcDescription: {
      fontSize: 14,
      color: colors.primaryForeground,
      marginBottom: 16,
      opacity: 0.9,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wallet</Text>
        <Text style={styles.subtitle}>
          Manage your payment methods and balance
        </Text>
      </View>

      {/* NFC Payment Card */}
      <TouchableOpacity style={styles.nfcCard} onPress={handleNFCPayment}>
        <Text style={styles.nfcTitle}>Tap to Pay</Text>
        <Text style={styles.nfcDescription}>
          Use NFC to pay at in-store terminals
        </Text>
        <Button
          title="Activate NFC Payment"
          buttonStyle={{ backgroundColor: colors.primaryForeground }}
          titleStyle={{ color: colors.primary }}
          icon={
            <MaterialCommunityIcons
              name="contactless-payment"
              size={20}
              color={colors.primary}
              style={{ marginRight: 10 }}
            />
          }
          onPress={handleNFCPayment}
        />
      </TouchableOpacity>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Wallet Balance</Text>
        <Text style={styles.balanceDescription}>
          Your current available balance
        </Text>
        <Text style={styles.balanceAmount}>${walletBalance.toFixed(2)}</Text>
        <View style={styles.buttonRow}>
          <Button
            title="Add Funds"
            buttonStyle={{
              backgroundColor: colors.primary,
              borderRadius: 8,
              paddingHorizontal: 16,
            }}
            onPress={handleAddFunds}
          />
          <Button
            title="Withdraw"
            type="outline"
            buttonStyle={{
              borderColor: colors.border,
              borderRadius: 8,
              paddingHorizontal: 16,
            }}
            titleStyle={{ color: colors.text }}
            onPress={handleWithdraw}
          />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsCard}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <Text style={styles.quickActionsDescription}>
          Common wallet operations
        </Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialCommunityIcons
              name="credit-card"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.quickActionText}>Pay Bills</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialCommunityIcons
              name="cellphone"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.quickActionText}>Mobile Top-up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialCommunityIcons
              name="bank"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.quickActionText}>Bank Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <MaterialCommunityIcons
              name="cash-plus"
              size={24}
              color={colors.primary}
            />
            <Text style={styles.quickActionText}>Request Money</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabs}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "payment-methods" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("payment-methods")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "payment-methods" && styles.activeTabText,
            ]}
          >
            Payment Methods
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "transactions" && styles.activeTab]}
          onPress={() => setActiveTab("transactions")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "transactions" && styles.activeTabText,
            ]}
          >
            Transactions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "subscriptions" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("subscriptions")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "subscriptions" && styles.activeTabText,
            ]}
          >
            Subscriptions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "digital-wallets" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("digital-wallets")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "digital-wallets" && styles.activeTabText,
            ]}
          >
            Digital Wallets
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Payment Methods Tab */}
      {activeTab === "payment-methods" && (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={styles.sectionTitle}>Your Payment Methods</Text>
            <View style={{ flexDirection: "row" }}>
              <Button
                title="Add Card"
                type="outline"
                buttonStyle={{ borderColor: colors.border, marginRight: 8 }}
                titleStyle={{ color: colors.text, fontSize: 12 }}
                icon={
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color={colors.text}
                  />
                }
                onPress={() => handleAddPaymentMethod("card")}
              />
              <Button
                title="Add Bank"
                type="outline"
                buttonStyle={{ borderColor: colors.border }}
                titleStyle={{ color: colors.text, fontSize: 12 }}
                icon={
                  <MaterialCommunityIcons
                    name="plus"
                    size={16}
                    color={colors.text}
                  />
                }
                onPress={() => handleAddPaymentMethod("bank")}
              />
            </View>
          </View>

          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethodCard}>
              <View style={styles.paymentMethodRow}>
                <View style={styles.paymentMethodInfo}>
                  <View style={styles.iconContainer}>
                    <MaterialCommunityIcons
                      name={method.icon}
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.paymentMethodDetails}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={styles.paymentMethodName}>
                        {method.name}
                      </Text>
                      {method.isDefault && (
                        <View style={styles.defaultBadge}>
                          <Text style={styles.defaultBadgeText}>Default</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.paymentMethodSubtext}>
                      {method.details}
                    </Text>
                  </View>
                </View>
                <View style={styles.actionButtons}>
                  {!method.isDefault && (
                    <TouchableOpacity
                      onPress={() => handleSetDefaultPaymentMethod(method.id)}
                      style={{ padding: 8 }}
                    >
                      <MaterialCommunityIcons
                        name="star-outline"
                        size={20}
                        color={colors.text}
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => handleRemovePaymentMethod(method.id)}
                    style={{ padding: 8 }}
                  >
                    <MaterialCommunityIcons
                      name="delete-outline"
                      size={20}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <View>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionRow}>
                <View style={styles.transactionDetails}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.transactionDescription}>
                      {transaction.description}
                    </Text>
                    <View
                      style={[
                        styles.statusBadge,
                        transaction.status === "completed"
                          ? styles.completedBadge
                          : styles.pendingBadge,
                      ]}
                    >
                      <Text
                        style={
                          transaction.status === "completed"
                            ? styles.completedBadgeText
                            : styles.pendingBadgeText
                        }
                      >
                        {transaction.status === "completed"
                          ? "Completed"
                          : "Pending"}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.transactionMeta}>
                    {new Date(transaction.date).toLocaleDateString()} •{" "}
                    {transaction.paymentMethod}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.transactionAmount,
                    transaction.amount > 0
                      ? styles.positiveAmount
                      : styles.negativeAmount,
                  ]}
                >
                  {transaction.amount > 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}

          <Button
            title="View All Transactions"
            type="outline"
            buttonStyle={{ borderColor: colors.border, marginTop: 8 }}
            titleStyle={{ color: colors.text }}
          />
        </View>
      )}

      {/* Subscriptions Tab */}
      {activeTab === "subscriptions" && (
        <View>
          <Text style={styles.sectionTitle}>Active Subscriptions</Text>
          <Text style={{ color: colors.mutedForeground, marginBottom: 16 }}>
            Recurring payments detected from your transaction history
          </Text>

          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodRow}>
              <View style={styles.paymentMethodInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#0070f320" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="bell-ring"
                    size={20}
                    color="#0070f3"
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>Netflix</Text>
                  <Text style={styles.paymentMethodSubtext}>Entertainment</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "right",
                  }}
                >
                  $14.99
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.mutedForeground,
                    textAlign: "right",
                  }}
                >
                  Monthly • Next: Jun 15
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Cancel Subscription",
                      "To cancel your Netflix subscription, please visit netflix.com/account and select Cancel Membership.",
                      [{ text: "OK" }],
                    )
                  }
                  style={{ marginTop: 6 }}
                >
                  <Text style={{ fontSize: 12, color: colors.mutedForeground }}>
                    Cancel subscription
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodRow}>
              <View style={styles.paymentMethodInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#10b98120" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="music"
                    size={20}
                    color="#10b981"
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>Spotify</Text>
                  <Text style={styles.paymentMethodSubtext}>Music</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "right",
                  }}
                >
                  $9.99
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.mutedForeground,
                    textAlign: "right",
                  }}
                >
                  Monthly • Next: Jun 22
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Cancel Subscription",
                      "To cancel your Spotify subscription, please visit spotify.com/account and select Cancel Subscription.",
                      [{ text: "OK" }],
                    )
                  }
                  style={{ marginTop: 6 }}
                >
                  <Text style={{ fontSize: 12, color: colors.mutedForeground }}>
                    Cancel subscription
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodRow}>
              <View style={styles.paymentMethodInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#8b5cf620" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="adobe"
                    size={20}
                    color="#8b5cf6"
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>
                    Adobe Creative Cloud
                  </Text>
                  <Text style={styles.paymentMethodSubtext}>Software</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "right",
                  }}
                >
                  $52.99
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.mutedForeground,
                    textAlign: "right",
                  }}
                >
                  Monthly • Next: Jun 05
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodRow}>
              <View style={styles.paymentMethodInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#f59e0b20" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="newspaper"
                    size={20}
                    color="#f59e0b"
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>New York Times</Text>
                  <Text style={styles.paymentMethodSubtext}>News</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "right",
                  }}
                >
                  $17.00
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.mutedForeground,
                    textAlign: "right",
                  }}
                >
                  Monthly • Next: Jun 18
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodRow}>
              <View style={styles.paymentMethodInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#ef444420" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="youtube"
                    size={20}
                    color="#ef4444"
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>YouTube Premium</Text>
                  <Text style={styles.paymentMethodSubtext}>Entertainment</Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "right",
                  }}
                >
                  $11.99
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.mutedForeground,
                    textAlign: "right",
                  }}
                >
                  Monthly • Next: Jun 10
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.paymentMethodCard}>
            <View style={styles.paymentMethodRow}>
              <View style={styles.paymentMethodInfo}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: "#06b6d420" },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="wallet"
                    size={20}
                    color="#06b6d4"
                  />
                </View>
                <View style={styles.paymentMethodDetails}>
                  <Text style={styles.paymentMethodName}>Lynop Pro</Text>
                  <Text style={styles.paymentMethodSubtext}>
                    Financial Services
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text,
                    textAlign: "right",
                  }}
                >
                  $29.00
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.mutedForeground,
                    textAlign: "right",
                  }}
                >
                  Annual • Next: Dec 01
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              marginBottom: 16,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingTop: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  Total Monthly Subscriptions
                </Text>
                <Text style={{ fontSize: 14, color: colors.mutedForeground }}>
                  Your recurring monthly expenses
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color: colors.text,
                  }}
                >
                  $106.96
                </Text>
                <Text style={{ fontSize: 12, color: colors.mutedForeground }}>
                  + $29.00/year for annual subscriptions
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Digital Wallets Tab */}
      {activeTab === "digital-wallets" && (
        <View>
          <Text style={styles.sectionTitle}>Connect Digital Wallets</Text>
          <Text style={{ color: colors.mutedForeground, marginBottom: 16 }}>
            Link your digital wallets for seamless payments
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Apple Pay */}
            <View style={[styles.digitalWalletCard, { width: "48%" }]}>
              <View style={[styles.walletIcon, { backgroundColor: "#000" }]}>
                <MaterialCommunityIcons name="apple" size={30} color="#fff" />
              </View>
              <Text style={styles.walletName}>Apple Pay</Text>
              <Text style={styles.walletStatus}>Not connected</Text>
              <Button
                title="Connect"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("Apple Pay")}
              />
            </View>

            {/* Google Pay */}
            <View style={[styles.digitalWalletCard, { width: "48%" }]}>
              <View style={styles.walletIcon}>
                <MaterialCommunityIcons
                  name="google"
                  size={30}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.walletName}>Google Pay</Text>
              <Text style={styles.walletStatus}>Not connected</Text>
              <Button
                title="Connect"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("Google Pay")}
              />
            </View>

            {/* PayPal */}
            <View
              style={[
                styles.digitalWalletCard,
                { width: "48%", marginTop: 12 },
              ]}
            >
              <View style={[styles.walletIcon, { backgroundColor: "#0070ba" }]}>
                <MaterialCommunityIcons name="paypal" size={30} color="#fff" />
              </View>
              <Text style={styles.walletName}>PayPal</Text>
              <Text style={styles.walletStatus}>Connected</Text>
              <Button
                title="Manage"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("PayPal")}
              />
            </View>

            {/* Samsung Pay */}
            <View
              style={[
                styles.digitalWalletCard,
                { width: "48%", marginTop: 12 },
              ]}
            >
              <View style={[styles.walletIcon, { backgroundColor: "#1428a0" }]}>
                <MaterialCommunityIcons name="samsung" size={30} color="#fff" />
              </View>
              <Text style={styles.walletName}>Samsung Pay</Text>
              <Text style={styles.walletStatus}>Not connected</Text>
              <Button
                title="Connect"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("Samsung Pay")}
              />
            </View>
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
            Buy Now, Pay Later
          </Text>
          <Text style={{ color: colors.mutedForeground, marginBottom: 16 }}>
            Connect BNPL services for installment payments
          </Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {/* Klarna */}
            <View style={[styles.digitalWalletCard, { width: "48%" }]}>
              <View style={[styles.walletIcon, { backgroundColor: "#ffb3c7" }]}>
                <MaterialCommunityIcons
                  name="credit-card"
                  size={30}
                  color="#0a0f14"
                />
              </View>
              <Text style={styles.walletName}>Klarna</Text>
              <Text style={styles.walletStatus}>Not connected</Text>
              <Button
                title="Connect"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("Klarna")}
              />
            </View>

            {/* Affirm */}
            <View style={[styles.digitalWalletCard, { width: "48%" }]}>
              <View style={[styles.walletIcon, { backgroundColor: "#7a2ff3" }]}>
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={30}
                  color="white"
                />
              </View>
              <Text style={styles.walletName}>Affirm</Text>
              <Text style={styles.walletStatus}>Not connected</Text>
              <Button
                title="Connect"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("Affirm")}
              />
            </View>

            {/* Sezzle */}
            <View
              style={[
                styles.digitalWalletCard,
                { width: "48%", marginTop: 12 },
              ]}
            >
              <View style={[styles.walletIcon, { backgroundColor: "#392b85" }]}>
                <MaterialCommunityIcons
                  name="cash-multiple"
                  size={30}
                  color="white"
                />
              </View>
              <Text style={styles.walletName}>Sezzle</Text>
              <Text style={styles.walletStatus}>Not connected</Text>
              <Button
                title="Connect"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("Sezzle")}
              />
            </View>

            {/* PayPal Pay Later */}
            <View
              style={[
                styles.digitalWalletCard,
                { width: "48%", marginTop: 12 },
              ]}
            >
              <View style={[styles.walletIcon, { backgroundColor: "#0070ba" }]}>
                <MaterialCommunityIcons
                  name="credit-card-clock"
                  size={30}
                  color="white"
                />
              </View>
              <Text style={styles.walletName}>PayPal Pay Later</Text>
              <Text style={styles.walletStatus}>Connected</Text>
              <Button
                title="Manage"
                buttonStyle={{ backgroundColor: colors.primary, width: "100%" }}
                onPress={() => handleConnectDigitalWallet("PayPal Pay Later")}
              />
            </View>
          </View>

          {/* Plaid Integration */}
          <View style={[styles.paymentMethodCard, { marginTop: 16 }]}>
            <Text style={[styles.paymentMethodName, { marginBottom: 8 }]}>
              Connect with Plaid
            </Text>
            <Text style={[styles.paymentMethodSubtext, { marginBottom: 12 }]}>
              Securely connect your bank accounts using Plaid
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <MaterialCommunityIcons
                name="bank"
                size={24}
                color={colors.primary}
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{ fontSize: 14, color: colors.text, marginBottom: 8 }}
                >
                  Plaid allows you to securely connect your bank accounts
                  without sharing your credentials. Your data is encrypted and
                  protected.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="green"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={{ fontSize: 14, color: colors.text }}>
                    Bank-level security
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="green"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={{ fontSize: 14, color: colors.text }}>
                    2,000+ financial institutions
                  </Text>
                </View>
              </View>
            </View>
            <Button
              title="Connect with Plaid"
              buttonStyle={{ backgroundColor: colors.primary }}
              onPress={() => handleConnectDigitalWallet("Plaid")}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
