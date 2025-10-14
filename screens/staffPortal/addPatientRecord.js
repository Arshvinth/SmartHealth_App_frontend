import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme"; // your theme

export default function AddPatientRecord({ route }) {
  const navigation = useNavigation();
  const { patient, data, type } = route.params;

  // Essential form state
  const [form, setForm] = useState({
    lastVisit: data?.lastVisit || "",
    diagnosis: data?.diagnosis || "",
    medication: data?.medication || "",
    vitalsBp: data?.vitals?.bp || "",
    vitalsHr: data?.vitals?.hr?.toString() || "",
    vitalsTemp: data?.vitals?.temp || "",
    staffNotes: data?.staffNotes || "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = () => {
    // Here you would call your backend API to save the record
    Alert.alert(
      "Success",
      `Medical record ${type === "add" ? "added" : "updated"} successfully!`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: theme.spacing.xl }}
    >
      <Text style={styles.title}>
        {type === "add" ? "Add Medical Record" : "Update Medical Record"} for {patient.name}
      </Text>

      {[
        { label: "Visit Date", key: "lastVisit", placeholder: "YYYY-MM-DD" },
        { label: "Diagnosis", key: "diagnosis", placeholder: "Diagnosis details" },
        { label: "Medication", key: "medication", placeholder: "Prescribed medication" },
        { label: "Blood Pressure", key: "vitalsBp", placeholder: "e.g. 120/80 mmHg" },
        { label: "Heart Rate", key: "vitalsHr", placeholder: "BPM" },
        { label: "Temperature", key: "vitalsTemp", placeholder: "°F / °C" },
        { label: "Staff Notes", key: "staffNotes", placeholder: "Notes for patient care" },
      ].map((field) => (
        <View style={styles.inputContainer} key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={form[field.key]}
            onChangeText={(text) => handleChange(field.key, text)}
            placeholder={field.placeholder}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{type === "add" ? "Add Record" : "Update Record"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.primary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  inputContainer: {
    width: "90%",
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textPrimary,
    fontWeight: "600",
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
    alignItems: "center",
    width: "90%",
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
  },
});
