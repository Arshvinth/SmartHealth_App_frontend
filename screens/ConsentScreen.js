import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { Checkbox } from "react-native-paper";
import colors from "../theme";

export default function ConsentScreen({ navigation }) {
  const [accepted, setAccepted] = useState(false);
  const [readPrivacy, setReadPrivacy] = useState(false);

  const handleAccept = () => {
    if (!accepted) {
      Alert.alert(
        "Consent Required",
        "Please read and accept the privacy policy to continue."
      );
      return;
    }
    navigation.navigate("Demographics");
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      "Privacy Policy",
      "Opening external privacy policy document...",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Open",
          onPress: () => Linking.openURL("https://example.com/privacy-policy"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Consent & Privacy</Text>
          <Text style={styles.subtitle}>
            Your privacy and transparency matter to us
          </Text>
        </View>

        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Data Collection Purpose</Text>
          <Text style={styles.paragraph}>
            We collect and process your health data to provide you with the best
            possible healthcare experience. Your information helps us:
          </Text>

          <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Deliver personalized medical care
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Maintain accurate health records
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Coordinate with healthcare providers
              </Text>
            </View>
            <View style={styles.bulletItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>
                Generate anonymous statistics for healthcare improvement
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Your Rights</Text>
          <Text style={styles.paragraph}>
            You have the right to access, correct, or delete your personal data.
            You can withdraw consent at any time by contacting our privacy
            officer.
          </Text>

          <Text style={styles.sectionTitle}>Data Protection</Text>
          <Text style={styles.paragraph}>
            We implement industry-standard security measures to protect your
            data. Your information is encrypted and stored securely in
            compliance with healthcare privacy regulations.
          </Text>

          <Text style={styles.importantNote}>
            🔒 Important: Your health data is treated with the highest
            confidentiality and is only accessible to authorized healthcare
            professionals involved in your care.
          </Text>
        </View>

        <View style={styles.checkboxContainer}>
          <View style={styles.checkboxRow}>
            <Checkbox.Android
              status={readPrivacy ? "checked" : "unchecked"}
              onPress={() => setReadPrivacy(!readPrivacy)}
              color="#4F46E5"
            />
            <Text style={styles.checkboxLabel}>
              I have read and understood the{" "}
              <Text style={styles.link} onPress={handlePrivacyPolicy}>
                Privacy Policy
              </Text>
            </Text>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox.Android
              status={accepted ? "checked" : "unchecked"}
              onPress={() => setAccepted(!accepted)}
              color="#4F46E5"
              disabled={!readPrivacy}
            />
            <Text
              style={[
                styles.checkboxLabel,
                !readPrivacy && styles.disabledText,
              ]}
            >
              I agree to the collection and processing of my health data for
              healthcare purposes
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.acceptButton,
              !accepted && styles.acceptButtonDisabled,
            ]}
            onPress={handleAccept}
            disabled={!accepted}
          >
            <Text
              style={[
                styles.acceptButtonText,
                !accepted && styles.acceptButtonTextDisabled,
              ]}
            >
              I Accept & Continue
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Questions about our privacy practices?{"\n"}
            Contact: privacy@urbanhealth.com
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 30, // ⬅️ added space from top edge
    paddingBottom: 30, // ⬅️ added space from bottom edge
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  contentCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 16,
  },

  bulletList: {
    marginBottom: 20,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 16,
    color: colors.primary,
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    flex: 1,
  },

  importantNote: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.error,
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.error,
    marginTop: 16,
  },

  checkboxContainer: {
    marginBottom: 30,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    flex: 1,
    marginLeft: 8,
    marginTop: 2,
  },
  disabledText: {
    color: colors.textSecondary,
  },
  link: {
    color: colors.secondary,
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  backButton: {
    flex: 1,
    backgroundColor: colors.secondary,
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  acceptButton: {
    flex: 2,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginLeft: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  acceptButtonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  acceptButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  acceptButtonTextDisabled: {
    color: "#E5E7EB",
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 20,
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 18,
  },
});
