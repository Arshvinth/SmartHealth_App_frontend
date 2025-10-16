import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../../config"; 

export default function ScanQr() {
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (!permission?.granted) {
            requestPermission();
        } else {
            Speech.speak("Please scan patient's QR code", { language: "en" });
        }
    }, [permission]);

    const handleBarCodeScanned = async ({ data }) => {
        if (scanned) return;
        setScanned(true);

        try {
            const res = await axios.get(`${API_BASE_URL}/api/patients/qr/${data}`);

            const patient = res.data.patient;
            Speech.speak(`Patient ${patient.fullName} found`, { language: "en" });
            navigation.navigate("PatientReport", { patient });

        } catch (error) {
            // Handle 404 specifically
            if (error.response && error.response.status === 404) {
                Speech.speak("Patient not registered", { language: "en" });
                Alert.alert(
                    "Unregistered Patient",
                    "This patient is not registered.",
                    [{ text: "OK", onPress: () => setScanned(false) }]
                );
            } else {
                // Other errors 
                Speech.speak("Server error or network issue", { language: "en" });
                Alert.alert(
                    "Error",
                    "Could not reach the server. Please try again.",
                    [{ text: "OK", onPress: () => setScanned(false) }]
                );
            }
        }
    };

    if (!permission) {
        return (
            <View style={styles.centerContainer}>
                <Text style={{ fontSize: 18 }}>Requesting camera permission...</Text>
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.centerContainer}>
                <Text style={{ fontSize: 18 }}>Camera permission required</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            />

            {/* Scan frame overlay */}
            <View style={styles.overlay}>
                <View style={styles.topOverlay} />
                <View style={styles.middleRow}>
                    <View style={styles.sideOverlay} />
                    <View style={styles.scanBox} />
                    <View style={styles.sideOverlay} />
                </View>
                <View style={styles.bottomOverlay} />
            </View>

            <Text style={styles.instructionText}>
                Align the QR code within the frame to scan
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
    topOverlay: { flex: 1, width: "100%", backgroundColor: "rgba(0,0,0,0.6)" },
    middleRow: { flexDirection: "row", alignItems: "center" },
    sideOverlay: { flex: 1, height: 250, backgroundColor: "rgba(0,0,0,0.6)" },
    scanBox: { width: 250, height: 250, borderWidth: 3, borderColor: "#1E90FF", borderRadius: 10 },
    bottomOverlay: { flex: 1, width: "100%", backgroundColor: "rgba(0,0,0,0.6)" },
    instructionText: {
        position: "absolute",
        bottom: 40,
        width: "100%",
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        textShadowColor: "rgba(0,0,0,0.7)",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
        paddingHorizontal: 20,
    },
    centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F1F1" },
});
