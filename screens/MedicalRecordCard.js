import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import colors from "../theme";

export default function MedicalRecordCard({ route, navigation }) {
  const { qrDataID } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Record Card</Text>

      <View style={styles.qrContainer}>
        <QRCode value={qrDataID} size={200} />
      </View>

      <Text style={styles.infoText}>Scan this QR to access medical records.</Text>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 24,
  },
  qrContainer: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  infoText: {
    marginTop: 20,
    color: colors.textPrimary,
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    marginTop: 30,
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    width: "60%",
  },
  backButtonText: {
    color: colors.surface,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
