import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { registerPatient } from "../patientApi.js";
import colors from "../theme.js";

export default function ReviewSubmitScreen({ route, navigation }) {
  const { patient, history } = route.params;

  const dobDate = new Date(patient.dob);
  if (isNaN(dobDate.getTime())) {
    Alert.alert("Error", "Please provide a valid date of birth");
    return;
  }
  const handleSubmit = async () => {
    try {
      const payload = {
        patientId: patient.patientId, // required
        fullName: patient.fullName, // required
        nicOrPassport: patient.nicOrPassport, // required
        dob: new Date(patient.dob), // ensure Date type
        sex: patient.sex,
        address: patient.address,
        phone: patient.phone,
        email: patient.email,
        emergencyContact: patient.emergencyContact,
        medicalHistory: history,
        registrationDate: new Date(),
        card: { status: "Active" }, // must match enum
      };

      const res = await registerPatient(payload);

      Alert.alert(
        "Success!",
        "Patient account has been created successfully.\n\nYour digital health card is ready.",
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.navigate("Success", {
                patient: {
                  ...res.patient,
                  emergencyContact: patient.emergencyContact || "Not Provided",
                  medicalHistory: history,
                },
              }),
          },
        ]
      );
    } catch (err) {
      console.log(err.response?.data || err.message); // debug
      Alert.alert(
        "Registration Failed",
        err.response?.data?.message ||
          "Unable to create patient account. Please check your connection and try again."
      );
    }
  };

  const formatField = (label, value) => {
    if (!value || value === "") return null;
    return (
      <View style={styles.field} key={label}>
        <Text style={styles.fieldLabel}>{label}:</Text>
        <Text style={styles.fieldValue}>{value}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review & Submit</Text>
      <Text style={styles.subtitle}>
        Please review all information before submitting
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demographics</Text>
        {formatField("Full Name", patient.fullName)}
        {formatField("NIC/Passport", patient.nicOrPassport)}
        {formatField("Date of Birth", patient.dob)}
        {formatField("Gender", patient.sex)}
        {formatField("Phone", patient.phone)}
        {formatField("Email", patient.email)}
        {formatField("Address", patient.address)}
        {formatField("Emergency Contact", patient.emergencyContact)}
      </View>

      {!history.deferred && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          {formatField("Allergies", history.allergies)}
          {formatField("Chronic Conditions", history.chronicConditions)}
          {formatField("Current Medications", history.medications)}
          {formatField("Known Conditions", history.knownConditions)}
          {formatField("Blood Group", history.bloodGroup)}
        </View>
      )}

      {history.deferred && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <Text style={styles.deferredText}>
            Medical history will be added later
          </Text>
        </View>
      )}

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ✓ Ready to create digital health card
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Submit Registration</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
    paddingTop: 45,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 25,
    textAlign: "center",
  },

  section: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
    paddingBottom: 8,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
    flex: 1,
  },
  fieldValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "400",
    flex: 2,
    textAlign: "right",
  },

  deferredText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
    textAlign: "center",
    padding: 10,
  },

  infoBox: {
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  infoText: {
    color: "#000",
    fontSize: 14,
    lineHeight: 20,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 100,
    gap: 16, // optional spacing between buttons
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    minHeight: 56,
    justifyContent: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.surface,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
