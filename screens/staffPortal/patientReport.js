// import React, { useEffect, useState, useCallback } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { theme } from "../../theme";
// import { API_BASE_URL } from "../../config";

// export default function PatientReport({ route }) {
//   const navigation = useNavigation();
//   const { patient } = route.params;

//   const [latestRecord, setLatestRecord] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchLatestRecord = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/medicalRecords/patientMedicalRecords/${patient._id}`);
//       const records = await res.json();
//       if (records && records.length > 0) {
//         const sorted = records.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
//         setLatestRecord(sorted[0]);
//       }
//     } catch (err) {
//       console.error("Failed to fetch medical records:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchLatestRecord();
//   }, [patient._id]);

//   // Refetch every time screen is focused
//   useFocusEffect(
//     useCallback(() => {
//       fetchLatestRecord();
//     }, [])
//   );

//   function calculateAge(dobString) {
//     if (!dobString) return "-";
//     const dob = new Date(dobString);
//     const today = new Date();
//     let age = today.getFullYear() - dob.getFullYear();
//     const monthDiff = today.getMonth() - dob.getMonth();
//     const dayDiff = today.getDate() - dob.getDate();
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
//     return age;
//   }

//   if (loading) {
//     return (
//       <ActivityIndicator
//         size="large"
//         color={theme.colors.primary}
//         style={{ flex: 1, justifyContent: "center" }}
//       />
//     );
//   }

//   const personalInfo = {
//     age: calculateAge(patient.dob),
//     gender: patient.sex || "-",
//     bloodType: patient.medicalHistory?.bloodGroup || "-",
//   };

//   const medicalHistory = {
//     allergies: (patient.medicalHistory?.allergies || []).join(", ") || "-",
//     chronicConditions: (patient.medicalHistory?.chronicConditions || []).join(", ") || "-",
//     medicationHistory: (patient.medicalHistory?.medications || []).join(", ") || "-",
//   };

//   const vitals = latestRecord?.vitals?.[0] || {};
//   const diagnosisData = latestRecord?.diagnosis?.[0] || { diagnosis: "-", condition: "-", medication: [] };
//   const staffNotes = latestRecord?.notes || "-";
//   const visitDate = latestRecord?.visitDate ? new Date(latestRecord.visitDate).toLocaleDateString() : "-";

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: theme.spacing.xl }}>
//       <Text style={styles.nameText}>{patient.fullName}</Text>
//       <Text style={styles.idText}>Patient ID: {patient.patientId}</Text>

//       {/* Personal Info */}
//       {(personalInfo.age !== "-" || personalInfo.gender !== "-" || personalInfo.bloodType !== "-") && (
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Personal Info</Text>
//           {personalInfo.age !== "-" && <Text style={styles.detailText}>Age: {personalInfo.age}</Text>}
//           {personalInfo.gender !== "-" && <Text style={styles.detailText}>Gender: {personalInfo.gender}</Text>}
//           {personalInfo.bloodType !== "-" && <Text style={styles.detailText}>Blood Type: {personalInfo.bloodType}</Text>}
//         </View>
//       )}

//       {/* Medical History */}
//       {(medicalHistory.allergies !== "-" || medicalHistory.chronicConditions !== "-" || medicalHistory.medicationHistory !== "-") && (
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Medical History</Text>
//           {medicalHistory.allergies !== "-" && <Text style={styles.detailText}>Allergies: {medicalHistory.allergies}</Text>}
//           {medicalHistory.chronicConditions !== "-" && <Text style={styles.detailText}>Chronic Conditions: {medicalHistory.chronicConditions}</Text>}
//           {medicalHistory.medicationHistory !== "-" && <Text style={styles.detailText}>Medication: {medicalHistory.medicationHistory}</Text>}
//         </View>
//       )}

//       {/* Diagnosis Card */}
//       {latestRecord && (
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Diagnosis</Text>
//           <Text style={styles.detailText}>Visit Date: {visitDate}</Text>
//           {diagnosisData.diagnosis && <Text style={styles.detailText}>Diagnosis: {diagnosisData.diagnosis}</Text>}
//           {diagnosisData.condition && <Text style={styles.detailText}>Condition: {diagnosisData.condition}</Text>}
//           {diagnosisData.medication?.length > 0 && (
//             <Text style={styles.detailText}>Medication: {diagnosisData.medication.join(", ")}</Text>
//           )}
//         </View>
//       )}

//       {/* Vitals Card with Edit Button */}
//       {latestRecord && (
//         <View style={styles.card}>
//           <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
//             <Text style={styles.cardTitle}>Vitals</Text>
//             <TouchableOpacity
//               onPress={() =>
//                 navigation.navigate("UpdateVitals", {
//                   record: latestRecord,
//                   patientName: patient.fullName,
//                 })
//               }
//               style={styles.editButton}
//             >
//               <Text style={styles.editButtonText}>Edit</Text>
//             </TouchableOpacity>
//           </View>
//           {vitals.bloodPressure && <Text style={styles.detailText}>Blood Pressure: {vitals.bloodPressure}</Text>}
//           {vitals.heartRate && <Text style={styles.detailText}>Heart Rate: {vitals.heartRate}</Text>}
//           {vitals.temperature && <Text style={styles.detailText}>Temperature: {vitals.temperature}</Text>}
//           {vitals.weight && <Text style={styles.detailText}>Weight: {vitals.weight}</Text>}
//           {vitals.height && <Text style={styles.detailText}>Height: {vitals.height}</Text>}
//         </View>
//       )}

//       {/* Staff Notes Card */}
//       {latestRecord && staffNotes && (
//         <View style={styles.card}>
//           <Text style={styles.cardTitle}>Staff Notes</Text>
//           <Text style={styles.detailText}>{staffNotes}</Text>
//         </View>
//       )}

//       {/* Add Record Button */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, { backgroundColor: theme.colors.primary }]}
//           onPress={() => navigation.navigate("AddPatientRecord", { patient })}
//         >
//           <Text style={styles.buttonText}>Add Medical Record</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: theme.colors.background },
//   nameText: {
//     fontSize: theme.typography.h1.fontSize,
//     fontWeight: theme.typography.h1.fontWeight,
//     color: theme.colors.primary,
//     marginTop: theme.spacing.xl,
//   },
//   idText: {
//     fontSize: theme.typography.h2.fontSize,
//     fontWeight: theme.typography.h2.fontWeight,
//     color: theme.colors.textPrimary,
//     marginBottom: theme.spacing.xl,
//   },
//   card: {
//     width: "90%",
//     backgroundColor: theme.colors.surface,
//     borderRadius: theme.radius.md,
//     padding: theme.spacing.lg,
//     marginBottom: theme.spacing.lg,
//     shadowColor: theme.colors.shadow,
//     shadowOpacity: 1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: theme.typography.h2.fontSize,
//     fontWeight: theme.typography.h2.fontWeight,
//     color: theme.colors.primary,
//     marginBottom: theme.spacing.sm,
//   },
//   detailText: {
//     fontSize: theme.typography.body.fontSize,
//     color: theme.colors.textSecondary,
//     marginVertical: theme.spacing.xs,
//   },
//   buttonContainer: { flexDirection: "row", justifyContent: "space-between", width: "75%", marginTop: theme.spacing.md, marginBottom: theme.spacing.lg },
//   button: { backgroundColor: theme.colors.secondary, paddingVertical: theme.spacing.lg, paddingHorizontal: theme.spacing.md, borderRadius: theme.radius.md, alignItems: "center" },
//   buttonText: { color: theme.colors.surface, fontSize: theme.typography.h2.fontSize, fontWeight: theme.typography.h2.fontWeight },
//   editButton: {
//     backgroundColor: theme.colors.secondary,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//     borderRadius: theme.radius.sm,
//   },
//   editButtonText: {
//     color: theme.colors.surface,
//     fontSize: theme.typography.body.fontSize,
//     fontWeight: theme.typography.body.fontWeight,
//   },
// });

import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { theme } from "../../theme";
import { API_BASE_URL } from "../../config";

export default function PatientReport({ route }) {
  const navigation = useNavigation();
  const { patient } = route.params;

  const [latestRecord, setLatestRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatestRecord = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/medicalRecords/patientMedicalRecords/${patient._id}`);
      const records = await res.json();
      if (records && records.length > 0) {
        const sorted = records.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
        setLatestRecord(sorted[0]);
      }
    } catch (err) {
      console.error("Failed to fetch medical records:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestRecord();
  }, [patient._id]);

  useFocusEffect(
    useCallback(() => {
      fetchLatestRecord();
    }, [])
  );

  const calculateAge = (dobString) => {
    if (!dobString) return "-";
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
    return age;
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={{ flex: 1, justifyContent: "center" }}
      />
    );
  }

  const personalInfo = {
    age: calculateAge(patient.dob),
    gender: patient.sex || "-",
    bloodType: patient.medicalHistory?.bloodGroup || "-",
  };

  const medicalHistory = {
    allergies: (patient.medicalHistory?.allergies || []).join(", ") || "-",
    chronicConditions: (patient.medicalHistory?.chronicConditions || []).join(", ") || "-",
    medicationHistory: (patient.medicalHistory?.medications || []).join(", ") || "-",
  };

  const vitals = latestRecord?.vitals?.[0] || {};
  const diagnosisData = latestRecord?.diagnosis?.[0] || { diagnosis: "-", condition: "-", medication: [] };
  const staffNotes = latestRecord?.notes || "-";
  const visitDate = latestRecord?.visitDate ? new Date(latestRecord.visitDate).toLocaleDateString() : "-";

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center", paddingBottom: 140 }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.nameText}>{patient.fullName}</Text>
          <Text style={styles.idText}>Patient ID: {patient.patientId}</Text>
        </View>

        {/* Personal Info Card */}
        {(personalInfo.age !== "-" || personalInfo.gender !== "-" || personalInfo.bloodType !== "-") && (
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Personal Info</Text>
            {personalInfo.age !== "-" && <Text style={styles.detailText}>Age: {personalInfo.age}</Text>}
            {personalInfo.gender !== "-" && <Text style={styles.detailText}>Gender: {personalInfo.gender}</Text>}
            {personalInfo.bloodType !== "-" && <Text style={styles.detailText}>Blood Type: {personalInfo.bloodType}</Text>}
          </View>
        )}

        {/* Medical History Card */}
        {(medicalHistory.allergies !== "-" || medicalHistory.chronicConditions !== "-" || medicalHistory.medicationHistory !== "-") && (
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Medical History</Text>
            {medicalHistory.allergies !== "-" && <Text style={styles.detailText}>Allergies: {medicalHistory.allergies}</Text>}
            {medicalHistory.chronicConditions !== "-" && <Text style={styles.detailText}>Chronic Conditions: {medicalHistory.chronicConditions}</Text>}
            {medicalHistory.medicationHistory !== "-" && <Text style={styles.detailText}>Medication: {medicalHistory.medicationHistory}</Text>}
          </View>
        )}

        {/* Diagnosis Card */}
        {latestRecord && (
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Diagnosis</Text>
            <Text style={styles.detailText}>Visit Date: {visitDate}</Text>
            {diagnosisData.diagnosis && <Text style={styles.detailText}>Diagnosis: {diagnosisData.diagnosis}</Text>}
            {diagnosisData.condition && <Text style={styles.detailText}>Condition: {diagnosisData.condition}</Text>}
            {diagnosisData.medication?.length > 0 && <Text style={styles.detailText}>Medication: {diagnosisData.medication.join(", ")}</Text>}
          </View>
        )}

        {/* Vitals Card */}
        {latestRecord && Object.keys(vitals).length > 0 && (
          <View style={styles.infoCard}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Vitals</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate("UpdateVitals", { record: latestRecord, patientName: patient.fullName })}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            {vitals.bloodPressure && <Text style={styles.detailText}>Blood Pressure: {vitals.bloodPressure}</Text>}
            {vitals.heartRate && <Text style={styles.detailText}>Heart Rate: {vitals.heartRate}</Text>}
            {vitals.temperature && <Text style={styles.detailText}>Temperature: {vitals.temperature}</Text>}
            {vitals.weight && <Text style={styles.detailText}>Weight: {vitals.weight}</Text>}
            {vitals.height && <Text style={styles.detailText}>Height: {vitals.height}</Text>}
          </View>
        )}

        {/* Staff Notes */}
        {latestRecord && staffNotes && (
          <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Staff Notes</Text>
            <Text style={styles.detailText}>{staffNotes}</Text>
          </View>
        )}
      </ScrollView>

      {/* Floating Buttons */}
      <TouchableOpacity
        style={styles.addRecordButton}
        onPress={() => navigation.navigate("AddPatientRecord", { patient })}
      >
        <Text style={styles.floatingButtonText}>Add Medical Record</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.pastRecordsButton}
        onPress={() => navigation.navigate("patientMedicalRecords", { patient })}
      >
        <Text style={styles.floatingButtonText}> Past Records</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerContainer: { marginVertical: 20, alignItems: "center" },
  nameText: { fontSize: 26, fontWeight: "700", color: theme.colors.primary },
  idText: { fontSize: 16, color: "#666", marginTop: 4 },

  infoCard: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: theme.colors.primary, marginBottom: 8 },
  detailText: { fontSize: 15, color: "#555", marginVertical: 3, lineHeight: 22 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    width:"75",
    height:40
  },
  editButtonText: {
    paddingTop:5,
    alignSelf:"center",
    color: "#fff",
    fontWeight: "600",
  },

  addRecordButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    backgroundColor: theme.colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  pastRecordsButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  floatingButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
});
