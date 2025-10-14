// import React, { useState } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// // Dummy patient data
// let dummyData = {
//   1: {
//     age: 35,
//     gender: "Male",
//     bloodType: "A+",
//     allergies: "Penicillin",
//     chronicConditions: "Hypertension",
//     lastVisit: "2025-10-01",
//     diagnosis: "Hypertension",
//     medication: "Amlodipine",
//     vitals: { bp: "130/85 mmHg", hr: 78, temp: "98.6°F" },
//     staffNotes: "Monitor blood pressure weekly",
//   },
//   2: {
//     age: 28,
//     gender: "Female",
//     bloodType: "B+",
//     allergies: "None",
//     chronicConditions: "Diabetes",
//     lastVisit: "2025-09-15",
//     diagnosis: "Diabetes",
//     medication: "Metformin",
//     vitals: { bp: "120/80 mmHg", hr: 72, temp: "98.4°F" },
//     staffNotes: "Check blood sugar before meals",
//   },
// };

// export default function PatientReport({ route }) {
//   const navigation = useNavigation();
//   const { patient } = route.params;

//   const data = dummyData[patient.id];

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
//     >
//       <Text style={styles.nameText}>{patient.name}</Text>
//       <Text style={styles.idText}>Patient ID: {patient.id}</Text>

//       {data ? (
//         <>
//           {/* Personal Info */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Personal Info</Text>
//             <Text style={styles.detailText}>Age: {data.age}</Text>
//             <Text style={styles.detailText}>Gender: {data.gender}</Text>
//             <Text style={styles.detailText}>Blood Type: {data.bloodType}</Text>
//           </View>

//           {/* Medical History */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Medical History</Text>
//             <Text style={styles.detailText}>Allergies: {data.allergies}</Text>
//             <Text style={styles.detailText}>Chronic Conditions: {data.chronicConditions}</Text>
//           </View>

//           {/* Current Visit */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Current Diagnosis</Text>
//             <Text style={styles.detailText}>Last Visit: {data.lastVisit}</Text>
//             <Text style={styles.detailText}>Diagnosis: {data.diagnosis}</Text>
//             <Text style={styles.detailText}>Medication: {data.medication}</Text>
//           </View>

//           {/* Vitals */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Vitals</Text>
//             <Text style={styles.detailText}>Blood Pressure: {data.vitals.bp}</Text>
//             <Text style={styles.detailText}>Heart Rate: {data.vitals.hr} bpm</Text>
//             <Text style={styles.detailText}>Temperature: {data.vitals.temp}</Text>
//           </View>

//           {/* Staff Notes */}
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Staff Notes</Text>
//             <Text style={styles.detailText}>{data.staffNotes}</Text>
//           </View>

//           {/* Update Button */}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               navigation.navigate("EditPatientRecord", { patient, data, type: "update" })
//             }
//           >
//             <Text style={styles.buttonText}>Update Record</Text>
//           </TouchableOpacity>
//         </>
//       ) : (
//         <>
//           <Text style={{ fontSize: 18, marginVertical: 20 }}>No record found for this patient.</Text>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() =>
//               navigation.navigate("EditPatientRecord", { patient, type: "add" })
//             }
//           >
//             <Text style={styles.buttonText}>Add New Record</Text>
//           </TouchableOpacity>
//         </>
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F6F1F1" },
//   nameText: { fontSize: 26, fontWeight: "700", color: "#146C94", marginTop: 20 },
//   idText: { fontSize: 18, color: "#333", marginBottom: 20 },
//   card: {
//     width: "90%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 15,
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardTitle: { fontSize: 18, fontWeight: "700", color: "#146C94", marginBottom: 8 },
//   detailText: { fontSize: 16, color: "#555", marginVertical: 2 },
//   button: {
//     backgroundColor: "#1E90FF",
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 12,
//     marginTop: 15,
//   },
//   buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
// });

import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme"; // Import your theme

// Dummy patient data
export let dummyData = {
  1: {
    age: 35,
    gender: "Male",
    bloodType: "A+",
    allergies: "Penicillin",
    chronicConditions: "Hypertension",
    lastVisit: "2025-10-01",
    diagnosis: "Hypertension",
    medication: "Amlodipine",
    vitals: { bp: "130/85 mmHg", hr: 78, temp: "98.6°F" },
    staffNotes: "Monitor blood pressure weekly",
  },
  2: {
    age: 28,
    gender: "Female",
    bloodType: "B+",
    allergies: "None",
    chronicConditions: "Diabetes",
    lastVisit: "2025-09-15",
    diagnosis: "Diabetes",
    medication: "Metformin",
    vitals: { bp: "120/80 mmHg", hr: 72, temp: "98.4°F" },
    staffNotes: "Check blood sugar before meals",
  },
};

export default function PatientReport({ route }) {
  const navigation = useNavigation();
  const { patient } = route.params;
  const data = dummyData[patient.id];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: theme.spacing.xl }}
    >
      <Text style={styles.nameText}>{patient.name}</Text>
      <Text style={styles.idText}>Patient ID: {patient.id}</Text>

      {data ? (
        <>
          {/* Personal Info */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Personal Info</Text>
            <Text style={styles.detailText}>Age: {data.age}</Text>
            <Text style={styles.detailText}>Gender: {data.gender}</Text>
            <Text style={styles.detailText}>Blood Type: {data.bloodType}</Text>
          </View>

          {/* Medical History */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Medical History</Text>
            <Text style={styles.detailText}>Allergies: {data.allergies}</Text>
            <Text style={styles.detailText}>Chronic Conditions: {data.chronicConditions}</Text>
          </View>

          {/* Current Visit */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Diagnosis</Text>
            <Text style={styles.detailText}>Last Visit: {data.lastVisit}</Text>
            <Text style={styles.detailText}>Diagnosis: {data.diagnosis}</Text>
            <Text style={styles.detailText}>Medication: {data.medication}</Text>
          </View>

          {/* Vitals */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Vitals</Text>
            <Text style={styles.detailText}>Blood Pressure: {data.vitals.bp}</Text>
            <Text style={styles.detailText}>Heart Rate: {data.vitals.hr} bpm</Text>
            <Text style={styles.detailText}>Temperature: {data.vitals.temp}</Text>
          </View>

          {/* Staff Notes */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Staff Notes</Text>
            <Text style={styles.detailText}>{data.staffNotes}</Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              onPress={() => navigation.navigate("AddPatientRecord", { patient })}
            >
              <Text style={styles.buttonText}>Add Medical Record</Text>
            </TouchableOpacity>
          </View>

          {/* Update Vitals Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.secondary, width: "75%", marginBottom: theme.spacing.xl }]}
            onPress={() => navigation.navigate("UpdateVitals", { patient })}
          >
            <Text style={styles.buttonText}>Update Vitals</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text
            style={{
              fontSize: theme.typography.body.fontSize,
              color: theme.colors.textSecondary,
              marginVertical: theme.spacing.lg,
            }}
          >
            No record found for this patient.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddMedicalRecord", { patient })}
          >
            <Text style={styles.buttonText}>Add New Record</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  nameText: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.primary,
    marginTop: theme.spacing.xl,
  },
  idText: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xl,
  },
  card: {
    width: "90%",
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  detailText: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.textSecondary,
    marginVertical: theme.spacing.xs,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "75%",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  button: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.md,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
  },
});
