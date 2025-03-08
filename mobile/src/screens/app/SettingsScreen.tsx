import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card, Button, ListItem } from "react-native-elements";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SettingsScreen() {
  const { colors, theme, setTheme } = useTheme();
  const { session, signOut } = useAuth();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  const userType = session?.user?.user_metadata?.user_type || "consumer";
  const firstName = session?.user?.user_metadata?.first_name || "";
  const lastName = session?.user?.user_metadata?.last_name || "";
  const userInitials = firstName?.[0] + lastName?.[0] || "U";

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: async () => {
          await signOut();
        },
        style: "destructive",
      },
    ]);
  };

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
    profileSection: {
      alignItems: "center",
      padding: 20,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    avatarText: {
      fontSize: 32,
      fontWeight: "bold",
      color: colors.primaryForeground,
    },
    userName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    userEmail: {
      fontSize: 16,
      color: colors.mutedForeground,
    },
    userType: {
      fontSize: 14,
      color: colors.primary,
      marginTop: 4,
      textTransform: "capitalize",
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      marginTop: 8,
      marginBottom: 4,
      paddingHorizontal: 16,
    },
    listItemContainer: {
      backgroundColor: colors.card,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    listItemTitle: {
      color: colors.text,
    },
    listItemSubtitle: {
      color: colors.mutedForeground,
    },
    signOutButton: {
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 32,
      backgroundColor: colors.destructive,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Manage your application preferences</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{userInitials}</Text>
        </View>
        <Text style={styles.userName}>
          {firstName} {lastName}
        </Text>
        <Text style={styles.userEmail}>{session?.user?.email}</Text>
        <Text style={styles.userType}>{userType} Account</Text>
      </View>

      <Text style={styles.sectionTitle}>Account</Text>
      <ListItem
        containerStyle={styles.listItemContainer}
        onPress={() => navigation.navigate("Profile" as never)}
      >
        <Icon name="account" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Profile Information
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Update your personal details
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={colors.mutedForeground} />
      </ListItem>

      <ListItem
        containerStyle={styles.listItemContainer}
        onPress={() => navigation.navigate("SecuritySettings" as never)}
      >
        <Icon name="shield-lock" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>Security</ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Change password and security settings
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={colors.mutedForeground} />
      </ListItem>

      <ListItem containerStyle={styles.listItemContainer} onPress={() => {}}>
        <Icon name="credit-card" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Subscription
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Manage your plan and billing
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={colors.mutedForeground} />
      </ListItem>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <ListItem containerStyle={styles.listItemContainer}>
        <Icon name="theme-light-dark" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>Theme</ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Choose light, dark, or system theme
          </ListItem.Subtitle>
        </ListItem.Content>
        <TouchableOpacity
          onPress={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Text style={{ color: colors.primary }}>
            {theme === "light" ? "Dark" : "Light"}
          </Text>
        </TouchableOpacity>
      </ListItem>

      <Text style={styles.sectionTitle}>Notifications</Text>
      <ListItem containerStyle={styles.listItemContainer}>
        <Icon name="email" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Email Notifications
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Receive important updates about your account
          </ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={emailNotifications}
          onValueChange={setEmailNotifications}
          trackColor={{ false: colors.muted, true: colors.primary }}
        />
      </ListItem>

      <ListItem containerStyle={styles.listItemContainer}>
        <Icon name="email-newsletter" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Marketing Emails
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Receive promotional offers and updates
          </ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={marketingEmails}
          onValueChange={setMarketingEmails}
          trackColor={{ false: colors.muted, true: colors.primary }}
        />
      </ListItem>

      <Text style={styles.sectionTitle}>Privacy</Text>
      <ListItem containerStyle={styles.listItemContainer}>
        <Icon name="database" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Data Sharing
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            {userType === "manufacturer"
              ? "Share anonymized sales data to improve industry insights"
              : "Share anonymized purchase data to improve product recommendations"}
          </ListItem.Subtitle>
        </ListItem.Content>
        <Switch
          value={dataSharing}
          onValueChange={setDataSharing}
          trackColor={{ false: colors.muted, true: colors.primary }}
        />
      </ListItem>

      <ListItem containerStyle={styles.listItemContainer} onPress={() => {}}>
        <Icon name="download" size={24} color={colors.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.listItemTitle}>
            Data Export
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listItemSubtitle}>
            Download all your data stored in our system
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={colors.mutedForeground} />
      </ListItem>

      <Button
        title="Sign Out"
        onPress={handleSignOut}
        buttonStyle={styles.signOutButton}
      />
    </ScrollView>
  );
}
