// import React, { useEffect, useState, useCallback } from "react";
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
// import { useNavigation, useFocusEffect } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import { theme } from "../../theme";
// import { API_BASE_URL } from "../../config";

// export default function PatientReports({ route }) {
//   const navigation = useNavigation();
//   const { patient } = route.params;

//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedIds, setExpandedIds] = useState([]); // store IDs of expanded cards

//   const fetchRecords = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${API_BASE_URL}/api/medicalRecords/patientMedicalRecords/${patient._id}`);
//       const data = await res.json();
//       const sorted = data.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
//       setRecords(sorted);
//     } catch (err) {
//       console.error("Failed to fetch medical records:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       fetchRecords();
//     }, [])
//   );

//   const toggleExpand = (id) => {
//     setExpandedIds((prev) =>
//       prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
//     );
//   };

//   const renderRecord = ({ item }) => {
//     const isExpanded = expandedIds.includes(item._id);
//     const visitDate = item.visitDate ? new Date(item.visitDate).toLocaleDateString() : "-";
//     const diagnosisData = item.diagnosis?.[0] || { diagnosis: "-", condition: "-", medication: [] };
//     const vitals = item.vitals?.[0] || {};
//     const staffNotes = item.notes || "-";

//     return (
//       <View style={styles.card}>
//         <TouchableOpacity
//           style={styles.cardHeader}
//           onPress={() => toggleExpand(item._id)}
//         >
//           <View>
//             <Text style={styles.cardTitle}>Visit Date: {visitDate}</Text>
//             <Text style={styles.detailText}>Diagnosis: {diagnosisData.diagnosis}</Text>
//           </View>
//           <Ionicons
//             name={isExpanded ? "chevron-up" : "chevron-down"}
//             size={24}
//             color={theme.colors.primary}
//           />
//         </TouchableOpacity>

//         {isExpanded && (
//           <View style={styles.cardContent}>
//             <Text style={styles.detailText}>Condition: {diagnosisData.condition}</Text>
//             {diagnosisData.medication?.length > 0 && (
//               <Text style={styles.detailText}>Medication: {diagnosisData.medication.join(", ")}</Text>
//             )}

//             {/* Vitals nested card */}
//             {Object.keys(vitals).length > 0 && (
//               <View style={styles.vitalsCard}>
//                 <Text style={styles.vitalsTitle}>Vitals</Text>
//                 {vitals.bloodPressure && <Text style={styles.detailText}>Blood Pressure: {vitals.bloodPressure}</Text>}
//                 {vitals.heartRate && <Text style={styles.detailText}>Heart Rate: {vitals.heartRate}</Text>}
//                 {vitals.temperature && <Text style={styles.detailText}>Temperature: {vitals.temperature}</Text>}
//                 {vitals.weight && <Text style={styles.detailText}>Weight: {vitals.weight}</Text>}
//                 {vitals.height && <Text style={styles.detailText}>Height: {vitals.height}</Text>}
//               </View>
//             )}

//             {/* Staff Notes */}
//             <Text style={styles.detailText}>Staff Notes: {staffNotes}</Text>
//           </View>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color={theme.colors.primary} style={{ flex: 1, justifyContent: "center" }} />;
//   }

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
//       <Text style={styles.header}>{patient.fullName}'s Medical Records</Text>
//       {records.length === 0 ? (
//         <Text style={styles.noDataText}>No records found for this patient.</Text>
//       ) : (
//         <FlatList
//           data={records}
//           keyExtractor={(item) => item._id}
//           renderItem={renderRecord}
//           contentContainerStyle={{ paddingBottom: 40 }}
//           scrollEnabled={false} // FlatList inside ScrollView
//         />
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: theme.colors.background, padding: 15 },
//   header: { fontSize: 22, fontWeight: "bold", color: theme.colors.primary, marginVertical: 15, textAlign: "center" },
//   card: {
//     width: "95%",
//     backgroundColor: theme.colors.surface,
//     borderRadius: 12,
//     marginBottom: 15,
//     shadowColor: theme.colors.shadow,
//     shadowOpacity: 0.25,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//   },
//   cardTitle: { fontSize: 16, fontWeight: "bold", color: theme.colors.primary, marginBottom: 5 },
//   cardContent: { paddingHorizontal: 15, paddingBottom: 15 },
//   detailText: { fontSize: 14, color: theme.colors.textSecondary, marginVertical: 2 },
//   vitalsCard: {
//     backgroundColor: theme.colors.background,
//     borderRadius: 8,
//     padding: 10,
//     marginVertical: 10,
//     borderWidth: 1,
//     borderColor: theme.colors.border,
//   },
//   vitalsTitle: { fontSize: 14, fontWeight: "bold", color: theme.colors.primary, marginBottom: 5 },
//   noDataText: { marginTop: 20, fontSize: 16, color: theme.colors.textSecondary, textAlign: "center" },
// });

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system/legacy"; 
import { theme } from "../../theme";
import { API_BASE_URL } from "../../config";

export default function PatientReports({ route }) {
  const navigation = useNavigation();
  const { patient } = route.params;

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);

  // Fetch patient records
  const fetchRecords = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/medicalRecords/patientMedicalRecords/${patient._id}`
      );
      const data = await res.json();
      const sorted = data.sort(
        (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
      );
      setRecords(sorted);
    } catch (err) {
      console.error("Failed to fetch medical records:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecords();
    }, [])
  );

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  // Generate PDF and show Save/Share/Cancel alert
  const handleDownloadPress = async () => {
    if (records.length === 0) {
      Alert.alert("No Data", "No medical records to download.");
      return;
    }

    try {
      // Build HTML for PDF
      const rows = records
        .map((rec) => {
          const diagnosis = rec.diagnosis?.[0] || {};
          const vitals = rec.vitals?.[0] || {};
          return `
            <tr>
              <td>${new Date(rec.visitDate).toLocaleDateString()}</td>
              <td>${diagnosis.diagnosis || "-"}</td>
              <td>${diagnosis.condition || "-"}</td>
              <td>${diagnosis.medication?.join(", ") || "-"}</td>
              <td>${vitals.bloodPressure || "-"}</td>
              <td>${vitals.heartRate || "-"}</td>
              <td>${vitals.temperature || "-"}</td>
            </tr>
          `;
        })
        .join("");

      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
              h1 { text-align: center; color: #007bff; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f4f4f4; }
              tr:nth-child(even) { background-color: #f9f9f9; }
            </style>
          </head>
          <body>
            <h1>Patient Report - ${patient.fullName}</h1>
            <p><strong>Generated on:</strong> ${new Date().toLocaleString()}</p>
            <table>
              <tr>
                <th>Visit Date</th><th>Diagnosis</th><th>Condition</th><th>Medication</th><th>BP</th><th>HR</th><th>Temp</th>
              </tr>
              ${rows}
            </table>
          </body>
        </html>
      `;

      // Generate PDF file
      const { uri } = await Print.printToFileAsync({ html });

      // Show Alert with Share / Save / Cancel
      Alert.alert(
        "Download Report",
        "Choose an option:",
        [
          {
            text: "Share",
            onPress: async () => {
              if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                  mimeType: "application/pdf",
                  dialogTitle: `Share ${patient.fullName} Report`,
                  UTI: "com.adobe.pdf",
                });
              } else {
                Alert.alert("Sharing not available on this device.");
              }
            },
          },
          {
            text: "Save",
            onPress: async () => {
              try {
                // ✅ SAF: Ask user for folder to save PDF
                const permissions =
                  await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

                if (!permissions.granted) {
                  Alert.alert(
                    "Permission Denied",
                    "You need to select a folder to save the PDF."
                  );
                  return;
                }

                // Read file as Base64 and create new PDF file
                const base64 = await FileSystem.readAsStringAsync(uri, {
                  encoding: FileSystem.EncodingType.Base64,
                });

                const fileName = `${patient.fullName.replace(
                  /\s/g,
                  "_"
                )}_report.pdf`;

                const newFileUri =
                  await FileSystem.StorageAccessFramework.createFileAsync(
                    permissions.directoryUri,
                    fileName,
                    "application/pdf"
                  );

                await FileSystem.writeAsStringAsync(newFileUri, base64, {
                  encoding: FileSystem.EncodingType.Base64,
                });

                Alert.alert("Saved", "PDF successfully saved to selected folder.");
              } catch (err) {
                console.error("Save failed:", err);
                Alert.alert("Error", "Failed to save PDF.");
              }
            },
          },
          { text: "Cancel", style: "cancel" },
        ],
        { cancelable: true }
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert("Error", "Failed to create PDF.");
    }
  };

  // Render each record
  const renderRecord = ({ item }) => {
    const isExpanded = expandedIds.includes(item._id);
    const visitDate = item.visitDate
      ? new Date(item.visitDate).toLocaleDateString()
      : "-";
    const diagnosisData = item.diagnosis?.[0] || {
      diagnosis: "-",
      condition: "-",
      medication: [],
    };
    const vitals = item.vitals?.[0] || {};
    const staffNotes = item.notes || "-";

    return (
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardHeader}
          onPress={() => toggleExpand(item._id)}
        >
          <View>
            <Text style={styles.cardTitle}>Visit Date: {visitDate}</Text>
            <Text style={styles.detailText}>
              Diagnosis: {diagnosisData.diagnosis}
            </Text>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={24}
            color={theme.colors.primary}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.cardContent}>
            <Text style={styles.detailText}>
              Condition: {diagnosisData.condition}
            </Text>
            {diagnosisData.medication?.length > 0 && (
              <Text style={styles.detailText}>
                Medication: {diagnosisData.medication.join(", ")}
              </Text>
            )}

            {Object.keys(vitals).length > 0 && (
              <View style={styles.vitalsCard}>
                <Text style={styles.vitalsTitle}>Vitals</Text>
                {vitals.bloodPressure && (
                  <Text style={styles.detailText}>
                    Blood Pressure: {vitals.bloodPressure}
                  </Text>
                )}
                {vitals.heartRate && (
                  <Text style={styles.detailText}>
                    Heart Rate: {vitals.heartRate}
                  </Text>
                )}
                {vitals.temperature && (
                  <Text style={styles.detailText}>
                    Temperature: {vitals.temperature}
                  </Text>
                )}
              </View>
            )}

            <Text style={styles.detailText}>Staff Notes: {staffNotes}</Text>
          </View>
        )}
      </View>
    );
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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <Text style={styles.header}>{patient.fullName}'s Medical Records</Text>

      {records.length === 0 ? (
        <Text style={styles.noDataText}>No records found for this patient.</Text>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item._id}
          renderItem={renderRecord}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false}
        />
      )}

      {/* Download / Share / Save Button */}
      <View style={styles.downloadButton}>
        <Button
          title="Download / Share PDF"
          color={theme.colors.primary}
          onPress={handleDownloadPress}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background, padding: 10 },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginVertical: 15,
    textAlign: "center",
  },
  card: {
    width: 300,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 5,
  },
  cardContent: { paddingHorizontal: 15, paddingBottom: 15 },
  detailText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginVertical: 2,
  },
  vitalsCard: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  vitalsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.primary,
    marginBottom: 5,
  },
  noDataText: {
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: "center",
  },
  downloadButton: {
    marginTop: 20,
    width: "90%",
    borderRadius: 10,
    overflow: "hidden",
  },
});



