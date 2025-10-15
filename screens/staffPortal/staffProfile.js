import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function StaffProfile({ route }) {
  // Dummy staff data
  const staffData = {
    name: "Alice Johnson",
    staffId: "S12345",
    role: "Nurse",
    department: "Cardiology",
    email: "alice.johnson@hospital.com",
    phone: "+94 77 123 4567",
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>
      <Text style={styles.nameText}>{staffData.name}</Text>
      <Text style={styles.idText}>Staff ID: {staffData.staffId}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Role & Department</Text>
        <Text style={styles.detailText}>Role: {staffData.role}</Text>
        <Text style={styles.detailText}>Department: {staffData.department}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Info</Text>
        <Text style={styles.detailText}>Email: {staffData.email}</Text>
        <Text style={styles.detailText}>Phone: {staffData.phone}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F1F1" },
  nameText: { fontSize: 26, fontWeight: "700", color: "#146C94", marginTop: 20 },
  idText: { fontSize: 18, color: "#333", marginBottom: 20 },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#146C94", marginBottom: 8 },
  detailText: { fontSize: 16, color: "#555", marginVertical: 2 },
});
