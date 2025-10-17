import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import colors from "../theme";

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../assets/healthcare.jpeg")}
          style={styles.image}
        />

        <Text style={styles.title}>urbanhealth</Text>
        <Text style={styles.subtitle}>smart healthcare</Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            <Text style={styles.featureText}>Register Patient Account</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.iconText}>📅</Text>
            </View>
            <Text style={styles.featureText}>Manage Appointment</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.iconText}>🏥</Text>
            </View>
            <Text style={styles.featureText}>
              View / Download Digital Health Card
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Consent")}
        >
          <Text style={styles.primaryButtonText}>Register Patient Account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Make Appointment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tertiaryButton}>
          <Text style={styles.tertiaryButtonText}>
            View Digital Health Card
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Your digital health begins here</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  content: {
    padding: 24,
    alignItems: "center",
    minHeight: "100%",
    paddingTop: 60, // ✅ Extra space from top
    paddingBottom: 80, // ✅ Extra space from bottom
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 5,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.textPrimary,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
    textTransform: "lowercase",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.textSecondary,
    marginBottom: 40,
    textTransform: "lowercase",
    fontWeight: "500",
  },

  featureList: {
    width: "110%",
    marginBottom: 40,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    flex: 1,
  },

  primaryButton: {
    backgroundColor: colors.success,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },

  secondaryButton: {
    backgroundColor: colors.secondary,
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    width: "100%",
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  secondaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },

  tertiaryButton: {
    backgroundColor: colors.warning,
    padding: 18,
    borderRadius: 12,
    marginBottom: 40,
    width: "100%",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  tertiaryButtonText: {
    color: colors.surface,
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
  },
});
