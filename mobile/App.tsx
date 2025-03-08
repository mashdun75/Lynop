import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/theme/ThemeProvider";

// Auth Screens
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import OnboardingScreen from "./src/screens/auth/OnboardingScreen";
import ConnectAccountsScreen from "./src/screens/auth/ConnectAccountsScreen";

// Main App Screens
import DashboardScreen from "./src/screens/app/DashboardScreen";
import TransactionsScreen from "./src/screens/app/TransactionsScreen";
import AnalyticsScreen from "./src/screens/app/AnalyticsScreen";
import SettingsScreen from "./src/screens/app/SettingsScreen";
import ProfileScreen from "./src/screens/app/ProfileScreen";
import SecuritySettingsScreen from "./src/screens/app/SecuritySettingsScreen";

// Auth Provider
import { AuthProvider, useAuth } from "./src/providers/AuthProvider";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    // We could show a splash screen here
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!session ? (
        // Auth screens
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen
            name="ConnectAccounts"
            component={ConnectAccountsScreen}
          />
        </>
      ) : (
        // App screens
        <>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Transactions" component={TransactionsScreen} />
          <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen
            name="SecuritySettings"
            component={SecuritySettingsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
