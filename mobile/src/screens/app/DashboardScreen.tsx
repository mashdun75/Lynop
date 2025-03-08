import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TransactionsScreen from "./TransactionsScreen";
import AnalyticsScreen from "./AnalyticsScreen";
import SettingsScreen from "./SettingsScreen";

const Tab = createBottomTabNavigator();

function DashboardContent() {
  const { session } = useAuth();
  const { colors } = useTheme();

  const userType = session?.user?.user_metadata?.user_type || "consumer";
  const firstName = session?.user?.user_metadata?.first_name || "User";

  const consumerStats = [
    {
      title: "Total Expenses",
      value: "$2,345.67",
      description: "Last 30 days",
      icon: "currency-usd",
    },
    {
      title: "Transactions",
      value: "42",
      description: "Last 30 days",
      icon: "credit-card",
    },
    {
      title: "Categories",
      value: "8",
      description: "Active categories",
      icon: "tag",
    },
    {
      title: "Monthly Change",
      value: "+12.5%",
      description: "vs. previous month",
      icon: "trending-up",
    },
  ];

  const manufacturerStats = [
    {
      title: "Total Sales",
      value: "$124,567.89",
      description: "Last 30 days",
      icon: "currency-usd",
    },
    {
      title: "SKUs Tracked",
      value: "156",
      description: "Active products",
      icon: "barcode",
    },
    {
      title: "Retail Partners",
      value: "12",
      description: "Connected stores",
      icon: "store",
    },
    {
      title: "Growth Rate",
      value: "+8.3%",
      description: "vs. previous month",
      icon: "trending-up",
    },
  ];

  const stats = userType === "manufacturer" ? manufacturerStats : consumerStats;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    header: {
      marginBottom: 24,
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
    statsGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    statCard: {
      width: "48%",
      marginBottom: 16,
      borderRadius: 12,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    statHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    statTitle: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    statValue: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginVertical: 4,
    },
    statDescription: {
      fontSize: 12,
      color: colors.mutedForeground,
    },
    chartCard: {
      marginTop: 8,
      borderRadius: 12,
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    chartTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    chartSubtitle: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    chartPlaceholder: {
      height: 200,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      marginTop: 16,
    },
    placeholderText: {
      color: colors.mutedForeground,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome back, {firstName}</Text>
        <Text style={styles.subtitle}>
          Here's an overview of your {userType} account
        </Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} containerStyle={styles.statCard}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Icon name={stat.icon} size={16} color={colors.mutedForeground} />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statDescription}>{stat.description}</Text>
          </Card>
        ))}
      </View>

      <Card containerStyle={styles.chartCard}>
        <Card.Title>
          <View>
            <Text style={styles.chartTitle}>Recent Activity</Text>
            <Text style={styles.chartSubtitle}>
              {userType === "manufacturer"
                ? "Your product sales across all channels"
                : "Your recent transactions and expenses"}
            </Text>
          </View>
        </Card.Title>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart will appear here</Text>
        </View>
      </Card>

      <Card containerStyle={styles.chartCard}>
        <Card.Title>
          <View>
            <Text style={styles.chartTitle}>
              {userType === "manufacturer" ? "Top Products" : "Top Categories"}
            </Text>
            <Text style={styles.chartSubtitle}>
              {userType === "manufacturer"
                ? "Your best performing SKUs"
                : "Where your money is going"}
            </Text>
          </View>
        </Card.Title>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.placeholderText}>Chart will appear here</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

export default function DashboardScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Transactions") {
            iconName = "credit-card";
          } else if (route.name === "Wallet") {
            iconName = "wallet";
          } else if (route.name === "Analytics") {
            iconName = "chart-bar";
          } else if (route.name === "Settings") {
            iconName = "cog";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardContent} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
