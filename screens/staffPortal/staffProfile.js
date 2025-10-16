import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

export default function StaffProfile({ staff, navigation }) {
  if (!staff) return null; 

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => navigation.replace("loginScreen"),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.nameText}>{staff.fullName}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.idText}>Staff ID: {staff.staffId}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Role & Department</Text>
        <Text style={styles.detailText}>Role: {staff.role}</Text>
        <Text style={styles.detailText}>Department: {staff.department}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Info</Text>
        <Text style={styles.detailText}>Email: {staff.email}</Text>
        <Text style={styles.detailText}>Phone: {staff.phone}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F1F1" },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },

  nameText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#146C94",
  },

  logoutButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

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

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#146C94",
    marginBottom: 8,
  },

  detailText: { fontSize: 16, color: "#555", marginVertical: 2 },
});
