import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { checkDuplicate } from "../patientApi.js";
import colors from "../theme.js";
import { validateDemographics } from "../utils/validation";

export default function DemographicsScreen({ navigation }) {
  const [data, setData] = useState({
    fullName: "",
    nicOrPassport: "",
    dob: "",
    sex: "",
    address: "",
    phone: "",
    email: "",
    emergencyContact: "",
  });
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (loading) return;

    const isValid = validateDemographics(data);
    if (!isValid) return;

    const dobISO = new Date(data.dob).toISOString().split("T")[0];
    setLoading(true);

    try {
      const result = await checkDuplicate({
        fullName: data.fullName,
        nicOrPassport: data.nicOrPassport,
        dob: dobISO,
      });

      if (result?.isDuplicate) {
        Alert.alert("Duplicate Found", `Reason: ${result.reason}`);
      } else {
        navigation.navigate("MedicalHistory", { patient: data });
      }
    } catch (err) {
      Alert.alert(
        "Server Error",
        err.response?.data?.message || "Internal server error."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderField = (
    field,
    label,
    required = false,
    placeholder = "",
    keyboardType = "default"
  ) => {
    return (
      <View key={field} style={styles.fieldContainer}>
        <Text style={styles.label}>
          {label} {required && <Text style={styles.required}>*</Text>}
        </Text>
        <TextInput
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          value={data[field]}
          onChangeText={(t) => setData({ ...data, [field]: t })}
          style={styles.input}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          returnKeyType="next"
          editable={!loading}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Patient Demographics</Text>
            <Text style={styles.subtitle}>
              Please provide your basic information
            </Text>

            {renderField("fullName", "Full Name", true, "John Doe")}
            {renderField(
              "nicOrPassport",
              "NIC/Passport Number",
              true,
              "123456789V"
            )}
            {renderField("dob", "Date of Birth", true, "YYYY-MM-DD")}
            {renderField("sex", "Gender", false, "Male/Female/Other")}
            {renderField(
              "phone",
              "Phone Number",
              true,
              "+94 77 123 4567",
              "phone-pad"
            )}
            {renderField(
              "email",
              "Email Address",
              false,
              "john.doe@example.com",
              "email-address"
            )}
            {renderField(
              "address",
              "Home Address",
              false,
              "123 Main Street, City"
            )}
            {renderField(
              "emergencyContact",
              "Emergency Contact",
              false,
              "Name and Phone"
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.backButton, loading && styles.buttonDisabled]}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.nextButton, loading && styles.buttonDisabled]}
                onPress={handleNext}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text style={styles.nextButtonText}>Next</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Extra space for keyboard */}
            <View style={styles.keyboardSpacer} />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30,
  },
  innerContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 30,
    textAlign: "center",
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surface,
    fontSize: 16,
    color: colors.textPrimary,
    minHeight: 50,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 56,
    justifyContent: "center",
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 18,
    borderRadius: 12,
    minHeight: 56,
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  keyboardSpacer: {
    height: 2,
  },
});
