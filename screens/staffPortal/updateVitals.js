import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "../../config"; // ensure this is imported

export default function UpdateVitals({ route }) {
  const { patientName, record } = route.params;

  // Safely get vitals from the record
  const initialVitals = record?.vitals?.[0] || {};
  const navigation = useNavigation();

  const [vitals, setVitals] = useState({
    bloodPressure: initialVitals.bloodPressure?.toString() || "",
    heartRate: initialVitals.heartRate?.toString() || "",
    temperature: initialVitals.temperature?.toString() || "",
    weight: initialVitals.weight?.toString() || "",
    height: initialVitals.height?.toString() || "",
  });

  console.log("Incoming vitals data:", initialVitals._id);

  const handleChange = (key, value) => {
    setVitals((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/vitals/updateVitals/${initialVitals._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vitals),
      });

      if (!response.ok) {
        throw new Error("Failed to update vitals");
      }

      Alert.alert(
        "Success",
        "Medical record added successfully!",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
      
    } catch (err) {
      console.error("Update failed:", err);
      Alert.alert("Error", "Failed to update vitals.");
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.card}>
        <Text style={styles.header}>Update Vitals</Text>
        <Text style={styles.subHeader}>Patient: {patientName}</Text>

        {/* Blood Pressure */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Blood Pressure (mmHg)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 120/80"
            value={vitals.bloodPressure}
            onChangeText={(v) => handleChange("bloodPressure", v)}
          />
        </View>

        {/* Heart Rate */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Heart Rate (bpm)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 75"
            value={vitals.heartRate}
            onChangeText={(v) => handleChange("heartRate", v)}
          />
        </View>

        {/* Temperature */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Temperature (°F)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 98.6"
            value={vitals.temperature}
            onChangeText={(v) => handleChange("temperature", v)}
          />
        </View>

        {/* Weight */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Weight (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 70"
            value={vitals.weight}
            onChangeText={(v) => handleChange("weight", v)}
          />
        </View>

        {/* Height */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Height (cm)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 175"
            value={vitals.height}
            onChangeText={(v) => handleChange("height", v)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 15,
    padding: 20,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 5,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    marginBottom: 5,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 8,
    padding: 10,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: 16,
    fontWeight: "bold",
  },
});
