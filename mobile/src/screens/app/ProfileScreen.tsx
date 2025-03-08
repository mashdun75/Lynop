import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { Card, Button, Input } from "react-native-elements";
import { useTheme } from "../../theme/ThemeProvider";
import { useAuth } from "../../providers/AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const { supabase, session } = useAuth();
  const [loading, setLoading] = useState(false);

  // User data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [personalAddress, setPersonalAddress] = useState("");
  const [personalCity, setPersonalCity] = useState("");
  const [personalState, setPersonalState] = useState("");
  const [personalZip, setPersonalZip] = useState("");
  const [personalCountry, setPersonalCountry] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessState, setBusinessState] = useState("");
  const [businessZip, setBusinessZip] = useState("");
  const [businessCountry, setBusinessCountry] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingCity, setBillingCity] = useState("");
  const [billingState, setBillingState] = useState("");
  const [billingZip, setBillingZip] = useState("");
  const [billingCountry, setBillingCountry] = useState("");
  const [businessEIN, setBusinessEIN] = useState("");
  const [userId, setUserId] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");

  useEffect(() => {
    if (session?.user) {
      // Load user data
      const userData = session.user.user_metadata;
      setFirstName(userData?.first_name || "");
      setLastName(userData?.last_name || "");
      setEmail(session.user.email || "");
      setPhoneNumber(userData?.phone_number || "");
      setCompanyName(userData?.company_name || "");
      setIndustry(userData?.industry || "");
      setPersonalAddress(userData?.personal_address || "");
      setPersonalCity(userData?.personal_city || "");
      setPersonalState(userData?.personal_state || "");
      setPersonalZip(userData?.personal_zip || "");
      setPersonalCountry(userData?.personal_country || "");
      setBusinessAddress(userData?.business_address || "");
      setBusinessCity(userData?.business_city || "");
      setBusinessState(userData?.business_state || "");
      setBusinessZip(userData?.business_zip || "");
      setBusinessCountry(userData?.business_country || "");
      setBillingAddress(userData?.billing_address || "");
      setBillingCity(userData?.billing_city || "");
      setBillingState(userData?.billing_state || "");
      setBillingZip(userData?.billing_zip || "");
      setBillingCountry(userData?.billing_country || "");
      setBusinessEIN(userData?.business_ein || "");
      setUserId(
        userData?.user_id ||
          `USR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setBusinessId(
        userData?.business_id ||
          `BUS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
      setManufacturerId(
        userData?.manufacturer_id ||
          `MFR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      );
    }
  }, [session]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          company_name: companyName,
          industry: industry,
          personal_address: personalAddress,
          personal_city: personalCity,
          personal_state: personalState,
          personal_zip: personalZip,
          personal_country: personalCountry,
          business_address: businessAddress,
          business_city: businessCity,
          business_state: businessState,
          business_zip: businessZip,
          business_country: businessCountry,
          billing_address: billingAddress,
          billing_city: billingCity,
          billing_state: billingState,
          billing_zip: billingZip,
          billing_country: billingCountry,
          business_ein: businessEIN,
          user_id: userId,
          business_id: businessId,
          manufacturer_id: manufacturerId,
        },
      });

      if (error) throw error;
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      console.error("Update error:", error);
      Alert.alert("Error", error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const userType = session?.user?.user_metadata?.user_type || "consumer";

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
    card: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    inputContainer: {
      marginBottom: 16,
    },
    inputLabel: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      color: colors.text,
      backgroundColor: colors.background,
    },
    disabledInput: {
      backgroundColor: colors.muted,
    },
    inputNote: {
      fontSize: 12,
      color: colors.mutedForeground,
      marginTop: 4,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 20,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    halfWidth: {
      width: "48%",
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
        <Text style={styles.subtitle}>Manage your personal information</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Basic Information</Text>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="First Name"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>Last Name</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder="Last Name"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={email}
            editable={false}
            placeholder="Email"
            placeholderTextColor={colors.mutedForeground}
          />
          <Text style={styles.inputNote}>Email cannot be changed</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Phone Number"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>User ID</Text>
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={userId}
            editable={false}
            placeholder="User ID"
            placeholderTextColor={colors.mutedForeground}
          />
          <Text style={styles.inputNote}>
            System-generated ID cannot be changed
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Address</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={personalAddress}
            onChangeText={setPersonalAddress}
            placeholder="Street Address"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              value={personalCity}
              onChangeText={setPersonalCity}
              placeholder="City"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>State/Province</Text>
            <TextInput
              style={styles.input}
              value={personalState}
              onChangeText={setPersonalState}
              placeholder="State/Province"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>ZIP/Postal Code</Text>
            <TextInput
              style={styles.input}
              value={personalZip}
              onChangeText={setPersonalZip}
              placeholder="ZIP/Postal Code"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>Country</Text>
            <TextInput
              style={styles.input}
              value={personalCountry}
              onChangeText={setPersonalCountry}
              placeholder="Country"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
        </View>
      </View>

      {userType === "manufacturer" && (
        <>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Business Information</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Company Name</Text>
              <TextInput
                style={styles.input}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Company Name"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Industry</Text>
              <TextInput
                style={styles.input}
                value={industry}
                onChangeText={setIndustry}
                placeholder="Industry"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Business EIN</Text>
              <TextInput
                style={styles.input}
                value={businessEIN}
                onChangeText={setBusinessEIN}
                placeholder="Business EIN"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Business ID</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={businessId}
                editable={false}
                placeholder="Business ID"
                placeholderTextColor={colors.mutedForeground}
              />
              <Text style={styles.inputNote}>
                System-generated ID cannot be changed
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Manufacturer ID</Text>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={manufacturerId}
                editable={false}
                placeholder="Manufacturer ID"
                placeholderTextColor={colors.mutedForeground}
              />
              <Text style={styles.inputNote}>
                System-generated ID cannot be changed
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Business Address</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Street Address</Text>
              <TextInput
                style={styles.input}
                value={businessAddress}
                onChangeText={setBusinessAddress}
                placeholder="Street Address"
                placeholderTextColor={colors.mutedForeground}
              />
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>City</Text>
                <TextInput
                  style={styles.input}
                  value={businessCity}
                  onChangeText={setBusinessCity}
                  placeholder="City"
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>State/Province</Text>
                <TextInput
                  style={styles.input}
                  value={businessState}
                  onChangeText={setBusinessState}
                  placeholder="State/Province"
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>ZIP/Postal Code</Text>
                <TextInput
                  style={styles.input}
                  value={businessZip}
                  onChangeText={setBusinessZip}
                  placeholder="ZIP/Postal Code"
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>
              <View style={styles.halfWidth}>
                <Text style={styles.inputLabel}>Country</Text>
                <TextInput
                  style={styles.input}
                  value={businessCountry}
                  onChangeText={setBusinessCountry}
                  placeholder="Country"
                  placeholderTextColor={colors.mutedForeground}
                />
              </View>
            </View>
          </View>
        </>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Billing Address</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Street Address</Text>
          <TextInput
            style={styles.input}
            value={billingAddress}
            onChangeText={setBillingAddress}
            placeholder="Street Address"
            placeholderTextColor={colors.mutedForeground}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              value={billingCity}
              onChangeText={setBillingCity}
              placeholder="City"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>State/Province</Text>
            <TextInput
              style={styles.input}
              value={billingState}
              onChangeText={setBillingState}
              placeholder="State/Province"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>ZIP/Postal Code</Text>
            <TextInput
              style={styles.input}
              value={billingZip}
              onChangeText={setBillingZip}
              placeholder="ZIP/Postal Code"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>Country</Text>
            <TextInput
              style={styles.input}
              value={billingCountry}
              onChangeText={setBillingCountry}
              placeholder="Country"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>
        </View>
      </View>

      <Button
        title="Save Changes"
        onPress={handleUpdateProfile}
        loading={loading}
        buttonStyle={{ backgroundColor: colors.primary, marginBottom: 30 }}
      />
    </ScrollView>
  );
}
