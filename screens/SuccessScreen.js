// src/screens/SuccessScreen.js
import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import DigitalHealthCard from "../components/DigitalHealthCard";
import ViewShot from "react-native-view-shot";
import colors from "../theme";
import { generatePatientCard, sharePatientCard } from "../utils/fileUtils";
import * as Sharing from "expo-sharing";

export default function SuccessScreen({ route, navigation }) {
  const { patient } = route.params;
  const viewShotRef = useRef();

  const formattedDob = patient.dob?.split("T")[0] || patient.dob;

  // const qrData = JSON.stringify({
  //   title: "Patient Details",
  //   patientId: patient.patientId,
  //   fullName: patient.fullName,
  //   dob: formattedDob,
  //   sex: patient.sex,
  //   phone: patient.phone,
  //   email: patient.email,
  //   address: patient.address,
  //   emergencyContact: patient.emergencyContact,
  //   medicalHistory: patient.medicalHistory
  // });

  const qrData = patient.card.qr;

  // ✅ Generate and Share PDF
  const handleSharePDF = async () => {
    try {
      const uri = await generatePatientCard(patient, formattedDob);
      if (uri) {
        await sharePatientCard(uri);
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to share PDF.");
    }
  };

  // ✅ Share QR Code (ViewShot)
  const handleShareQRCode = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      if (!uri) throw new Error("Failed to capture QR");

      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Share QR Code",
      });
    } catch (error) {
      Alert.alert("Error", error.message || "Unable to share QR code.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* ✅ Success Message */}
        <View style={styles.successBox}>
          <Image
            source={require("../assets/success.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Account Created!</Text>
          <Text style={styles.text}>Patient ID: {patient.patientId}</Text>
        </View>

        {/* ✅ Digital Health Card */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Digital Health Card</Text>
          <DigitalHealthCard
            patient={{ ...patient, dob: formattedDob }}
            qrData={qrData}
            viewShotRef={viewShotRef}
            hideActions
          />
        </View>

        {/* ✅ Buttons */}
        <TouchableOpacity style={styles.primaryButton} onPress={handleSharePDF}>
          <Text style={styles.primaryButtonText}>
            📤 Share Patient Details as PDF
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleShareQRCode}
        >
          <Text style={styles.secondaryButtonText}>🔗 Share QR Code</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
          <Text style={styles.homeLink}>← Go back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, alignItems: "center" },

  successBox: {
    backgroundColor: colors.accent,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
    marginTop: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: { width: 100, height: 100, marginBottom: 16 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
  },
  text: { fontSize: 16, color: colors.textPrimary, fontWeight: "500" },

  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    width: "100%",
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },

  primaryButton: {
    backgroundColor: colors.warning, // ✅ first button color
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
  },
  primaryButtonText: {
    color: colors.surface,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: colors.primary, // ✅ second button color
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
  },
  secondaryButtonText: {
    color: colors.surface,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  homeLink: {
    color: colors.info,
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 40,
  },
});
