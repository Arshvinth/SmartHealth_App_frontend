import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import colors from "../theme";

const DigitalHealthCard = ({ patient, qrData, viewShotRef, hideActions }) => {
  // Format DOB as YYYY-MM-DD
  const formattedDob = patient.dob?.split("T")[0] || patient.dob;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardLogo}>Health+</Text>
        <Text style={styles.cardType}>Digital ID</Text>
      </View>

      {/* Capture QR + details */}
      <ViewShot
        ref={viewShotRef}
        options={{ format: "png", quality: 1.0, result: "tmpfile" }}
      >
        <View style={styles.qrSection}>
          <View style={styles.qrBox}>
            <QRCode
              value={qrData}
              size={240}
              backgroundColor="white"
              color="#1E3A8A"
            />

            <Text style={styles.scanText}>Scan for patient details</Text>

            <Text style={styles.name}>{patient.fullName}</Text>
            <Text style={styles.dob}>DOB: {formattedDob}</Text>
            <Text style={styles.id}>ID: {patient.patientId}</Text>

            <Text style={styles.validText}>Valid until: 12/2026</Text>
          </View>
        </View>
      </ViewShot>

      {/* Hide internal buttons if hideActions is true */}
      {!hideActions && (
        <View style={styles.buttonContainer}>
          <Button title="📥 Save to Phone" onPress={saveToGallery} />
          <View style={{ height: 10 }} />
          <Button title="📤 Share QR Code" onPress={shareQRCode} />
        </View>
      )}
    </View>
  );
};

export default DigitalHealthCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  cardLogo: { fontSize: 18, fontWeight: "700", color: colors.error },
  cardType: { fontSize: 14, color: "#6B7280" },

  qrSection: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  qrBox: {
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 20,
    width: 300,
  },
  scanText: { marginTop: 10, fontSize: 14, color: "#1E3A8A" },
  name: { marginTop: 15, fontSize: 16, fontWeight: "bold", color: "#111827" },
  dob: { fontSize: 14, color: "#4B5563" },
  id: { fontSize: 14, color: "#4B5563" },
  validText: { marginTop: 10, fontSize: 12, color: "#10B981" },
  buttonContainer: { marginTop: 20, width: "100%" },
});
