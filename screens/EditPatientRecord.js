import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Dummy patient data storage (same as in PatientReport)
import { dummyData } from "../screens/patientReport"; // make sure it's exported from PatientReport.js

export default function EditPatientRecord({ route }) {
  const navigation = useNavigation();
  const { patient, data, type } = route.params;

  // Initialize state
  const [form, setForm] = useState({
    age: data?.age || "",
    gender: data?.gender || "",
    bloodType: data?.bloodType || "",
    allergies: data?.allergies || "",
    chronicConditions: data?.chronicConditions || "",
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
    // Update dummyData
    dummyData[patient.id] = {
      age: form.age,
      gender: form.gender,
      bloodType: form.bloodType,
      allergies: form.allergies,
      chronicConditions: form.chronicConditions,
      lastVisit: form.lastVisit,
      diagnosis: form.diagnosis,
      medication: form.medication,
      vitals: { bp: form.vitalsBp, hr: Number(form.vitalsHr), temp: form.vitalsTemp },
      staffNotes: form.staffNotes,
    };

    Alert.alert("Success", `Patient record ${type === "add" ? "added" : "updated"} successfully!`, [
      { text: "OK", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
      <Text style={styles.title}>
        {type === "add" ? "Add New Record" : "Update Record"} for {patient.name}
      </Text>

      {[
        { label: "Age", key: "age" },
        { label: "Gender", key: "gender" },
        { label: "Blood Type", key: "bloodType" },
        { label: "Allergies", key: "allergies" },
        { label: "Chronic Conditions", key: "chronicConditions" },
        { label: "Last Visit", key: "lastVisit" },
        { label: "Diagnosis", key: "diagnosis" },
        { label: "Medication", key: "medication" },
        { label: "Blood Pressure", key: "vitalsBp" },
        { label: "Heart Rate", key: "vitalsHr" },
        { label: "Temperature", key: "vitalsTemp" },
        { label: "Staff Notes", key: "staffNotes" },
      ].map((field) => (
        <View style={styles.inputContainer} key={field.key}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={form[field.key]}
            onChangeText={(text) => handleChange(field.key, text)}
            placeholder={field.label}
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
  container: { flex: 1, backgroundColor: "#F6F1F1" },
  title: { fontSize: 22, fontWeight: "700", color: "#146C94", marginTop: 20, marginBottom: 20, textAlign: "center" },
  inputContainer: { width: "90%", marginBottom: 12 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, fontSize: 16 },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
