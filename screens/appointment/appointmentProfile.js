import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme"; // adjust import path as needed

export default function LogoutScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("loginScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Are you sure you want to logout?</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // centers vertically
    alignItems: "center", // centers horizontally
    backgroundColor: theme.colors.background,
    padding: 20,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.textPrimary,
    marginBottom: 30,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: theme.colors.surface,
    fontSize: theme.typography.body.fontSize,
    fontWeight: "600",
  },
});
