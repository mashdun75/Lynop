import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card, SearchBar } from "react-native-elements";
import { useTheme } from "../../theme/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const [search, setSearch] = React.useState("");

  // Mock transaction data
  const transactions = [
    {
      id: "1",
      merchant: "Grocery Store",
      date: "2023-10-15",
      amount: -85.42,
      category: "Groceries",
      icon: "cart",
    },
    {
      id: "2",
      merchant: "Coffee Shop",
      date: "2023-10-14",
      amount: -4.5,
      category: "Food & Drink",
      icon: "coffee",
    },
    {
      id: "3",
      merchant: "Gas Station",
      date: "2023-10-12",
      amount: -38.67,
      category: "Transportation",
      icon: "gas-station",
    },
    {
      id: "4",
      merchant: "Online Store",
      date: "2023-10-10",
      amount: -129.99,
      category: "Shopping",
      icon: "shopping",
    },
    {
      id: "5",
      merchant: "Pharmacy",
      date: "2023-10-08",
      amount: -22.54,
      category: "Health",
      icon: "medical-bag",
    },
    {
      id: "6",
      merchant: "Salary Deposit",
      date: "2023-10-01",
      amount: 2450.0,
      category: "Income",
      icon: "cash-plus",
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const renderItem = ({ item }: { item: (typeof transactions)[0] }) => (
    <Card containerStyle={styles.transactionCard}>
      <View style={styles.transactionRow}>
        <View style={styles.iconContainer}>
          <Icon name={item.icon} size={24} color={colors.text} />
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.merchantName}>{item.merchant}</Text>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text
            style={[
              styles.amountText,
              { color: item.amount >= 0 ? "green" : colors.text },
            ]}
          >
            {formatAmount(item.amount)}
          </Text>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        </View>
      </View>
    </Card>
  );

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
    searchBarContainer: {
      backgroundColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: "transparent",
      paddingHorizontal: 0,
    },
    searchBarInputContainer: {
      backgroundColor: colors.muted,
      borderRadius: 8,
    },
    transactionCard: {
      borderRadius: 8,
      marginHorizontal: 16,
      marginBottom: 8,
      padding: 12,
    },
    transactionRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.muted,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 12,
    },
    transactionDetails: {
      flex: 1,
    },
    merchantName: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    categoryText: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    amountContainer: {
      alignItems: "flex-end",
    },
    amountText: {
      fontSize: 16,
      fontWeight: "500",
    },
    dateText: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    emptyText: {
      fontSize: 16,
      color: colors.mutedForeground,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>View and manage your transactions</Text>
      </View>

      <SearchBar
        placeholder="Search transactions..."
        onChangeText={setSearch}
        value={search}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        lightTheme={true}
        round={true}
      />

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No transactions found</Text>
          </View>
        }
      />
    </View>
  );
}
