import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  const { session } = useAuth();
  const userType = session?.user?.user_metadata?.user_type || "consumer";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
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
    },
    card: {
      borderRadius: 8,
      marginHorizontal: 16,
      marginBottom: 16,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
      marginBottom: 16,
    },
    chartPlaceholder: {
      height: 200,
      backgroundColor: colors.muted,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderText: {
      color: colors.mutedForeground,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    statItem: {
      alignItems: "center",
      width: "30%",
    },
    statValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.mutedForeground,
      textAlign: "center",
    },
    timeframeButtons: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 16,
    },
    timeframeButton: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      marginHorizontal: 4,
      borderRadius: 16,
    },
    activeTimeframe: {
      backgroundColor: colors.primary,
    },
    timeframeText: {
      fontSize: 12,
      fontWeight: "500",
    },
    activeTimeframeText: {
      color: colors.primaryForeground,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
        <Text style={styles.subtitle}>Insights and data visualization</Text>
      </View>

      <View style={styles.timeframeButtons}>
        {["Week", "Month", "Quarter", "Year"].map((period, index) => (
          <View
            key={period}
            style={[
              styles.timeframeButton,
              index === 1 ? styles.activeTimeframe : null,
            ]}
          >
            <Text
              style={[
                styles.timeframeText,
                index === 1
                  ? styles.activeTimeframeText
                  : { color: colors.text },
              ]}
            >
              {period}
            </Text>
          </View>
        ))}
      </View>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>
          {userType === "manufacturer" ? "Sales Overview" : "Spending Overview"}
        </Text>
        <Text style={styles.cardSubtitle}>
          {userType === "manufacturer"
            ? "Your product sales across all channels"
            : "Your spending patterns over time"}
        </Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart will appear here</Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {userType === "manufacturer" ? "$12,450" : "$2,345"}
            </Text>
            <Text style={styles.statLabel}>
              Total {userType === "manufacturer" ? "Sales" : "Spent"}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              {userType === "manufacturer" ? "156" : "42"}
            </Text>
            <Text style={styles.statLabel}>
              {userType === "manufacturer" ? "Products Sold" : "Transactions"}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: "green" }]}>+8.3%</Text>
            <Text style={styles.statLabel}>vs. Last Month</Text>
          </View>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>
          {userType === "manufacturer" ? "Top Products" : "Top Categories"}
        </Text>
        <Text style={styles.cardSubtitle}>
          {userType === "manufacturer"
            ? "Your best performing SKUs"
            : "Where your money is going"}
        </Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart will appear here</Text>
        </View>
      </Card>

      <Card containerStyle={styles.card}>
        <Text style={styles.cardTitle}>
          {userType === "manufacturer"
            ? "Geographic Distribution"
            : "Monthly Comparison"}
        </Text>
        <Text style={styles.cardSubtitle}>
          {userType === "manufacturer"
            ? "Where your products are selling"
            : "Compare spending month over month"}
        </Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart will appear here</Text>
        </View>
      </Card>
    </ScrollView>
  );
}
