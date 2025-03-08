import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, CheckBox, Input, Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../providers/AuthProvider";
import { useTheme } from "../../theme/ThemeProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );

  // User profile data
  const [userTypes, setUserTypes] = useState<string[]>([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("United States");
  const [selectedPlan, setSelectedPlan] = useState("");

  const navigation = useNavigation();
  const { session, supabase } = useAuth();
  const { colors } = useTheme();

  const handleCompleteProfile = async () => {
    try {
      await supabase.auth.updateUser({
        data: {
          address,
          city,
          state,
          zip_code: zipCode,
          country,
          user_types: userTypes,
          onboarding_completed: true,
        },
      });
      setStep(2);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleSelectPlan = async () => {
    try {
      await supabase.auth.updateUser({
        data: {
          selected_plan: selectedPlan,
          billing_cycle: billingCycle,
        },
      });
      setStep(3);
    } catch (error) {
      console.error("Error selecting plan:", error);
    }
  };

  const handleFinishOnboarding = () => {
    navigation.navigate("ConnectAccounts" as never);
  };

  const toggleUserType = (type: string) => {
    if (userTypes.includes(type)) {
      setUserTypes(userTypes.filter((t) => t !== type));
    } else {
      setUserTypes([...userTypes, type]);
    }
  };

  const consumerPlans = [
    {
      name: "Consumer Basic",
      description: "Perfect for individuals managing personal finances.",
      price: billingCycle === "monthly" ? "$9" : "$90",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $18" : null,
      features: [
        "Digitized receipts",
        "AI categorization",
        "Basic accounting integration",
        "Quantum-resistant encryption",
        "Email support",
      ],
    },
    {
      name: "Consumer Pro",
      description: "Ideal for small business owners and professionals.",
      price: billingCycle === "monthly" ? "$29" : "$290",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $58" : null,
      features: [
        "Everything in Basic",
        "Advanced accounting integration",
        "Tax preparation reports",
        "Custom categories",
        "Priority support",
        "Data export options",
        "Multi-account management",
      ],
    },
    {
      name: "Manufacturer",
      description: "Real-time SKU data for manufacturers and suppliers.",
      price: billingCycle === "monthly" ? "$99" : "$990",
      period: billingCycle === "monthly" ? "/month" : "/year",
      discount: billingCycle === "annual" ? "Save $198" : null,
      features: [
        "Real-time SKU sales data",
        "Product variation tracking",
        "Purchase location insights",
        "AI supply chain optimization",
        "Dedicated account manager",
        "API access",
        "Custom reporting",
        "Data visualization tools",
        "SLA guarantees",
      ],
    },
  ];

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
    stepHeader: {
      marginBottom: 24,
    },
    stepTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    stepIndicator: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
    },
    stepCircle: {
      width: 30,
      height: 30,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    stepLine: {
      height: 2,
      width: 30,
    },
    stepText: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 12,
    },
    checkboxContainer: {
      backgroundColor: "transparent",
      borderWidth: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 8,
      padding: 0,
    },
    checkboxText: {
      fontWeight: "normal",
      color: colors.text,
    },
    inputRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    halfInput: {
      width: "48%",
    },
    buttonContainer: {
      marginTop: 24,
    },
    billingToggle: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 24,
    },
    billingButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    billingButtonText: {
      fontWeight: "bold",
    },
    planCard: {
      marginBottom: 16,
      borderRadius: 8,
      padding: 0,
    },
    selectedPlan: {
      borderWidth: 2,
      borderColor: colors.primary,
    },
    planHeader: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    planTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
    },
    planDescription: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    planContent: {
      padding: 16,
    },
    planPrice: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    planPeriod: {
      fontSize: 14,
      color: colors.mutedForeground,
    },
    planDiscount: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "bold",
      marginTop: 4,
    },
    featureItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    featureText: {
      fontSize: 14,
      color: colors.text,
      marginLeft: 8,
    },
    nextButton: {
      alignSelf: "flex-end",
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lynop</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.stepHeader}>
          <Text style={styles.stepTitle}>Complete Your Account Setup</Text>
          <View style={styles.stepIndicator}>
            <View
              style={[
                styles.stepCircle,
                { backgroundColor: step >= 1 ? colors.primary : colors.muted },
              ]}
            >
              <Text
                style={{
                  color:
                    step >= 1
                      ? colors.primaryForeground
                      : colors.mutedForeground,
                }}
              >
                1
              </Text>
            </View>
            <View
              style={[
                styles.stepLine,
                { backgroundColor: step >= 2 ? colors.primary : colors.muted },
              ]}
            />
            <View
              style={[
                styles.stepCircle,
                { backgroundColor: step >= 2 ? colors.primary : colors.muted },
              ]}
            >
              <Text
                style={{
                  color:
                    step >= 2
                      ? colors.primaryForeground
                      : colors.mutedForeground,
                }}
              >
                2
              </Text>
            </View>
            <View
              style={[
                styles.stepLine,
                { backgroundColor: step >= 3 ? colors.primary : colors.muted },
              ]}
            />
            <View
              style={[
                styles.stepCircle,
                { backgroundColor: step >= 3 ? colors.primary : colors.muted },
              ]}
            >
              <Text
                style={{
                  color:
                    step >= 3
                      ? colors.primaryForeground
                      : colors.mutedForeground,
                }}
              >
                3
              </Text>
            </View>
          </View>
          <Text style={styles.stepText}>
            {step === 1
              ? "Complete your profile information"
              : step === 2
                ? "Choose your subscription plan"
                : "Connect your accounts"}
          </Text>
        </View>

        {step === 1 && (
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card.Title>Your Profile</Card.Title>
            <Card.Divider />

            <Text style={styles.sectionTitle}>How will you use Lynop?</Text>

            <CheckBox
              title="Personal finances"
              checked={userTypes.includes("consumer-personal")}
              onPress={() => toggleUserType("consumer-personal")}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedColor={colors.primary}
            />

            <CheckBox
              title="Business finances"
              checked={userTypes.includes("consumer-business")}
              onPress={() => toggleUserType("consumer-business")}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedColor={colors.primary}
            />

            <CheckBox
              title="Manufacturing and SKU tracking"
              checked={userTypes.includes("manufacturer")}
              onPress={() => toggleUserType("manufacturer")}
              containerStyle={styles.checkboxContainer}
              textStyle={styles.checkboxText}
              checkedColor={colors.primary}
            />

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              Address Information
            </Text>

            <Input
              placeholder="Street Address"
              value={address}
              onChangeText={setAddress}
              inputStyle={{ color: colors.text }}
            />

            <View style={styles.inputRow}>
              <Input
                containerStyle={styles.halfInput}
                placeholder="City"
                value={city}
                onChangeText={setCity}
                inputStyle={{ color: colors.text }}
              />

              <Input
                containerStyle={styles.halfInput}
                placeholder="State/Province"
                value={state}
                onChangeText={setState}
                inputStyle={{ color: colors.text }}
              />
            </View>

            <View style={styles.inputRow}>
              <Input
                containerStyle={styles.halfInput}
                placeholder="Zip/Postal Code"
                value={zipCode}
                onChangeText={setZipCode}
                inputStyle={{ color: colors.text }}
              />

              <Input
                containerStyle={styles.halfInput}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
                inputStyle={{ color: colors.text }}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Continue to Plan Selection"
                onPress={handleCompleteProfile}
                disabled={
                  userTypes.length === 0 ||
                  !address ||
                  !city ||
                  !state ||
                  !zipCode ||
                  !country
                }
                buttonStyle={{ backgroundColor: colors.primary }}
              />
            </View>
          </Card>
        )}

        {step === 2 && (
          <View>
            <View style={styles.billingToggle}>
              <TouchableOpacity
                style={[
                  styles.billingButton,
                  {
                    backgroundColor:
                      billingCycle === "monthly"
                        ? colors.primary
                        : colors.muted,
                  },
                ]}
                onPress={() => setBillingCycle("monthly")}
              >
                <Text
                  style={[
                    styles.billingButtonText,
                    {
                      color:
                        billingCycle === "monthly"
                          ? colors.primaryForeground
                          : colors.text,
                    },
                  ]}
                >
                  Monthly Billing
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.billingButton,
                  {
                    backgroundColor:
                      billingCycle === "annual" ? colors.primary : colors.muted,
                  },
                ]}
                onPress={() => setBillingCycle("annual")}
              >
                <Text
                  style={[
                    styles.billingButtonText,
                    {
                      color:
                        billingCycle === "annual"
                          ? colors.primaryForeground
                          : colors.text,
                    },
                  ]}
                >
                  Annual Billing (Save 15%)
                </Text>
              </TouchableOpacity>
            </View>

            {consumerPlans.map((plan) => (
              <TouchableOpacity
                key={plan.name}
                onPress={() => setSelectedPlan(plan.name)}
              >
                <Card
                  containerStyle={[
                    styles.planCard,
                    selectedPlan === plan.name && styles.selectedPlan,
                  ]}
                >
                  <View style={styles.planHeader}>
                    <Text style={styles.planTitle}>{plan.name}</Text>
                    <Text style={styles.planDescription}>
                      {plan.description}
                    </Text>
                  </View>

                  <View style={styles.planContent}>
                    <View style={{ marginBottom: 16 }}>
                      <Text style={styles.planPrice}>
                        {plan.price}
                        <Text style={styles.planPeriod}>{plan.period}</Text>
                      </Text>
                      {plan.discount && (
                        <Text style={styles.planDiscount}>{plan.discount}</Text>
                      )}
                    </View>

                    {plan.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <Icon name="check" size={16} color={colors.primary} />
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}

                    <Button
                      title={
                        selectedPlan === plan.name ? "Selected" : "Select Plan"
                      }
                      buttonStyle={{
                        backgroundColor:
                          selectedPlan === plan.name
                            ? colors.primary
                            : colors.background,
                        borderWidth: 1,
                        borderColor: colors.primary,
                      }}
                      titleStyle={{
                        color:
                          selectedPlan === plan.name
                            ? colors.primaryForeground
                            : colors.primary,
                      }}
                      onPress={() => setSelectedPlan(plan.name)}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            ))}

            <View style={styles.nextButton}>
              <Button
                title="Continue to Connect Accounts"
                onPress={handleSelectPlan}
                disabled={!selectedPlan}
                buttonStyle={{ backgroundColor: colors.primary }}
              />
            </View>
          </View>
        )}

        {step === 3 && (
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card.Title>Connect Your Accounts</Card.Title>
            <Card.Divider />

            <Text style={{ marginBottom: 16, color: colors.text }}>
              In the next step, you'll be able to connect your financial
              accounts for better insights.
            </Text>

            <Button
              title="Continue to Connect Accounts"
              onPress={handleFinishOnboarding}
              buttonStyle={{ backgroundColor: colors.primary }}
            />
          </Card>
        )}
      </ScrollView>
    </View>
  );
}
