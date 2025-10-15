import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme";
import { API_BASE_URL } from "../../config";

export default function AddPatientRecord({ route }) {
  const navigation = useNavigation();
  const { patient } = route.params;
  const todayDate = new Date().toISOString().split("T")[0];

  const conditionOptions = [
    "Not selected", "Hypertension", "Diabetes Mellitus", "Asthma", "COPD", "Coronary Artery Disease",
    "Heart Failure", "Stroke", "Anemia", "Allergies", "Thyroid Disorders", "Kidney Disease",
    "Liver Disease", "Infectious Diseases", "Osteoarthritis", "Mental Health Conditions", "Other"
  ];

  const diagnosisOptions = [
    "Not selected", "Hypertension", "Diabetes", "Asthma", "COPD", "Heart Disease", "Stroke", "Anemia", "Other"
  ];

  const [form, setForm] = useState({
    visitDate: todayDate,
    notes: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
    diagnosis: diagnosisOptions[0],
    otherDiagnosis: "",
    condition: conditionOptions[0],
    otherCondition: "",
    medication: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
    validateField(key, value);
  };

  const validateField = (key, value) => {
    let errorMsg = "";

    switch (key) {
      case "bloodPressure":
        if (value && !/^\d{2,3}\/\d{2,3}$/.test(value)) errorMsg = "Format must be systolic/diastolic e.g. 120/80";
        break;
      case "heartRate":
        if (value && (!/^\d+$/.test(value) || parseInt(value) < 30 || parseInt(value) > 220))
          errorMsg = "Heart rate must be between 30-220 BPM";
        break;
      case "temperature":
        if (value && (isNaN(value) || parseFloat(value) < 30 || parseFloat(value) > 45))
          errorMsg = "Temperature must be between 30-45 °C";
        break;
      case "weight":
        if (value && (isNaN(value) || parseFloat(value) <= 0 || parseFloat(value) > 500))
          errorMsg = "Weight must be a positive number up to 500 kg";
        break;
      case "height":
        if (value && (isNaN(value) || parseFloat(value) <= 0 || parseFloat(value) > 300))
          errorMsg = "Height must be a positive number up to 300 cm";
        break;
      case "diagnosis":
        if (value === "Not selected") errorMsg = "Please select a diagnosis";
        break;
      case "otherDiagnosis":
        if (form.diagnosis === "Other" && !value.trim()) errorMsg = "Enter custom diagnosis";
        break;
      case "condition":
        if (value === "Not selected") errorMsg = "Please select a condition";
        break;
      case "otherCondition":
        if (form.condition === "Other" && !value.trim()) errorMsg = "Enter custom condition";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [key]: errorMsg }));
  };

  const validateForm = () => {
    Object.keys(form).forEach((key) => validateField(key, form[key]));
    // Return true if no errors
    return Object.values(errors).every((e) => !e);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert("Error", "Please fix validation errors before submitting.");
      return;
    }

    const finalDiagnosis = form.diagnosis === "Other" ? form.otherDiagnosis : form.diagnosis;
    const finalCondition = form.condition === "Other" ? form.otherCondition : form.condition;

    const payload = {
      patientId: patient._id,
      staffId: "staff123",
      notes: form.notes,
      vitalsData: [{
        bloodPressure: form.bloodPressure,
        heartRate: form.heartRate,
        temperature: form.temperature,
        weight: form.weight,
        height: form.height
      }],
      diagnosisData: [{
        diagnosis: finalDiagnosis,
        condition: finalCondition,
        medication: form.medication ? form.medication.split(",") : []
      }],
      actor: "staff"
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/medicalRecords/addMedicalRecord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await res.json();

      Alert.alert(
        "Success",
        "Medical record added successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (err) {
      Alert.alert("Error", "Failed to add medical record.");
      console.error(err);
    }
  };

  const renderError = (key) => {
    if (errors[key]) return <Text style={styles.errorText}>{errors[key]}</Text>;
    return null;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: theme.spacing.xl }}
    >
      <Text style={styles.title}>Add Medical Record for {patient.fullName}</Text>

      {/* Visit Date */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Visit Date</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.surface }]}
          value={form.visitDate}
          editable={false}  // make it read-only
        />
      </View>

      {/* Vitals */}
      <View style={styles.row}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Blood Pressure</Text>
          <TextInput
            style={styles.input}
            value={form.bloodPressure}
            onChangeText={(text) => handleChange("bloodPressure", text)}
            placeholder="e.g. 120/80"
          />
          {renderError("bloodPressure")}
        </View>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Heart Rate (BPM)</Text>
          <TextInput
            style={styles.input}
            value={form.heartRate}
            onChangeText={(text) => handleChange("heartRate", text)}
            keyboardType="numeric"
          />
          {renderError("heartRate")}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Temperature (°C)</Text>
          <TextInput
            style={styles.input}
            value={form.temperature}
            onChangeText={(text) => handleChange("temperature", text)}
            keyboardType="numeric"
          />
          {renderError("temperature")}
        </View>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            value={form.weight}
            onChangeText={(text) => handleChange("weight", text)}
            keyboardType="numeric"
          />
          {renderError("weight")}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputContainerHalf}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            value={form.height}
            onChangeText={(text) => handleChange("height", text)}
            keyboardType="numeric"
          />
          {renderError("height")}
        </View>
      </View>

      {/* Diagnosis */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Diagnosis</Text>
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={form.diagnosis}
            onValueChange={(itemValue) => handleChange("diagnosis", itemValue)}
            style={styles.dropdown}
          >
            {diagnosisOptions.map((d) => (
              <Picker.Item key={d} label={d} value={d} />
            ))}
          </Picker>
        </View>
        {form.diagnosis === "Other" && (
          <TextInput
            style={[styles.input, { marginTop: theme.spacing.sm }]}
            placeholder="Enter custom diagnosis"
            value={form.otherDiagnosis}
            onChangeText={(text) => handleChange("otherDiagnosis", text)}
          />
        )}
        {renderError("diagnosis")}
        {renderError("otherDiagnosis")}
      </View>

      {/* Condition */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Condition</Text>
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={form.condition}
            onValueChange={(itemValue) => handleChange("condition", itemValue)}
            style={styles.dropdown}
          >
            {conditionOptions.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>
        {form.condition === "Other" && (
          <TextInput
            style={[styles.input, { marginTop: theme.spacing.sm }]}
            placeholder="Enter custom condition"
            value={form.otherCondition}
            onChangeText={(text) => handleChange("otherCondition", text)}
          />
        )}
        {renderError("condition")}
        {renderError("otherCondition")}
      </View>

      {/* Medication */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medication</Text>
        <TextInput
          style={styles.input}
          value={form.medication}
          onChangeText={(text) => handleChange("medication", text)}
          placeholder="Prescribed medication (comma separated)"
          multiline
        />
      </View>

      {/* Notes */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={form.notes}
          onChangeText={(text) => handleChange("notes", text)}
          placeholder="Patient notes"
          multiline
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Add Record</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.primary,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    textAlign: "center",
  },
  inputContainer: { width: "90%", marginBottom: theme.spacing.md },
  inputContainerHalf: { width: "45%", marginBottom: theme.spacing.md },
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
  row: { flexDirection: "row", justifyContent: "space-between", width: "90%" },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.radius.md,
    marginTop: theme.spacing.lg,
    alignItems: "center",
    width: "50%",
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    backgroundColor: theme.colors.surface,
    marginTop: theme.spacing.xs,
  },
  dropdown: { width: "100%", color: theme.colors.textPrimary },
  errorText: { color: "red", marginTop: 4, fontSize: 12 },
});
