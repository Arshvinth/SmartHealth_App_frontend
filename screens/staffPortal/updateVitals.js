import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme"; // Import your theme
import { dummyData } from "./patientReport"; // Make sure dummyData is exported

export default function UpdateVitals({ route }) {
  const navigation = useNavigation();
  const { patient } = route.params;

  const data = dummyData[patient.id];

  const [vitals, setVitals] = useState({
    bp: data?.vitals?.bp || "",
    hr: data?.vitals?.hr?.toString() || "",
    temp: data?.vitals?.temp || "",
  });

  const handleChange = (key, value) => setVitals({ ...vitals, [key]: value });

  const handleSubmit = () => {
    // Update dummyData vitals
    dummyData[patient.id].vitals = {
      bp: vitals.bp,
      hr: Number(vitals.hr),
      temp: vitals.temp,
    };

    Alert.alert("Success", "Vitals updated successfully!", [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: theme.spacing.xl }}>
      <Text style={styles.title}>Update Vitals for {patient.name}</Text>

      {/* Blood Pressure */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Pressure</Text>
        <TextInput
          style={styles.input}
          value={vitals.bp}
          onChangeText={(text) => handleChange("bp", text)}
          placeholder="e.g., 120/80 mmHg"
        />
      </View>

      {/* Heart Rate */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Heart Rate</Text>
        <TextInput
          style={styles.input}
          value={vitals.hr}
          onChangeText={(text) => handleChange("hr", text)}
          keyboardType="numeric"
          placeholder="e.g., 72"
        />
      </View>

      {/* Temperature */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Temperature</Text>
        <TextInput
          style={styles.input}
          value={vitals.temp}
          onChangeText={(text) => handleChange("temp", text)}
          placeholder="e.g., 98.6°F"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update Vitals</Text>
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
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
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
    marginBottom: theme.spacing.xs,
    fontWeight: "600",
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.body.fontSize,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
    alignItems: "center",
    width: "75%",
    alignSelf: "center",
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
  },
});
