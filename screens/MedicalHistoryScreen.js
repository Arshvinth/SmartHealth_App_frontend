import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "../theme";

export default function MedicalHistoryScreen({ route, navigation }) {
  const { patient } = route.params;
  const [history, setHistory] = useState({
    allergies: "",
    chronicConditions: "",
    medications: "",
    bloodGroup: "",
    knownConditions: "",
  });

  const handleNext = () => {
    if (
      !history.allergies &&
      !history.chronicConditions &&
      !history.medications
    ) {
      Alert.alert(
        "Skip Medical History?",
        "You can provide medical history later.",
        [
          {
            text: "Add Later",
            onPress: () =>
              navigation.navigate("ReviewSubmit", {
                patient,
                history: { ...history, deferred: true },
              }),
          },
          { text: "Continue", style: "cancel" },
        ]
      );
    } else {
      navigation.navigate("ReviewSubmit", { patient, history });
    }
  };

  const renderMedicalField = (field, label, description, placeholder) => {
    return (
      <View key={field} style={styles.medicalField}>
        <Text style={styles.medicalLabel}>{label}</Text>
        <Text style={styles.medicalDescription}>{description}</Text>
        <TextInput
          placeholder={placeholder}
          value={history[field]}
          onChangeText={(t) => setHistory({ ...history, [field]: t })}
          style={styles.medicalInput}
          multiline={true}
          numberOfLines={3}
          textAlignVertical="top"
          placeholderTextColor="#9CA3AF"
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // adjust as needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Medical History</Text>
          <Text style={styles.subtitle}>
            Provide your medical information (optional)
          </Text>

          {renderMedicalField(
            "allergies",
            "Allergies",
            "List any known allergies",
            "Penicillin, Peanuts, Dust"
          )}

          {renderMedicalField(
            "chronicConditions",
            "Chronic Conditions",
            "Any ongoing health conditions",
            "Diabetes, Hypertension, Asthma"
          )}

          {renderMedicalField(
            "medications",
            "Current Medications",
            "Medications you are taking",
            "Metformin, Inhaler"
          )}

          {renderMedicalField(
            "knownConditions",
            "Known Medical Conditions",
            "Other relevant medical history",
            "Kidney surgery"
          )}

          <View style={styles.bloodGroupContainer}>
            <Text style={styles.medicalLabel}>Blood Group</Text>
            <Text style={styles.medicalDescription}>If known</Text>
            <View style={styles.bloodGroupOptions}>
              {[
                "A+",
                "A-",
                "B+",
                "B-",
                "AB+",
                "AB-",
                "O+",
                "O-",
                "Unknown",
              ].map((group) => (
                <TouchableOpacity
                  key={group}
                  style={[
                    styles.bloodOption,
                    history.bloodGroup === group && styles.bloodOptionSelected,
                  ]}
                  onPress={() => setHistory({ ...history, bloodGroup: group })}
                >
                  <Text
                    style={[
                      styles.bloodOptionText,
                      history.bloodGroup === group &&
                        styles.bloodOptionTextSelected,
                    ]}
                  >
                    {group}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonSection}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() =>
                navigation.navigate("ReviewSubmit", {
                  patient,
                  history: { ...history, deferred: true },
                })
              }
            >
              <Text style={styles.skipButtonText}>Skip for Later</Text>
            </TouchableOpacity>

            <View style={styles.navButtons}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                <Text style={styles.nextButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, marginTop: 30 },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingVertical: 20, flexGrow: 1 },
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
    marginBottom: 30,
    textAlign: "center",
  },

  medicalField: { marginBottom: 24 },
  medicalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 6,
  },
  medicalDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  medicalInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.surface,
    fontSize: 16,
    color: colors.textPrimary,
    minHeight: 100,
  },

  bloodGroupContainer: { marginBottom: 30 },
  bloodGroupOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    gap: 8,
  },
  bloodOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    minWidth: 70,
    alignItems: "center",
  },
  bloodOptionSelected: { backgroundColor: colors.error },
  bloodOptionText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "500",
  },
  bloodOptionTextSelected: { color: colors.surface },

  buttonSection: { marginTop: 20, marginBottom: 40 },
  skipButton: { padding: 16, alignItems: "center", marginBottom: 20 },
  skipButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: "500",
  },
  navButtons: { flexDirection: "row", gap: 16 },
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
    color: colors.surface,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    minHeight: 56,
    justifyContent: "center",
  },
  nextButtonText: {
    color: colors.surface,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
