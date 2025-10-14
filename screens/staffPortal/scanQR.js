// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as Speech from "expo-speech"; // ✅ import speech

// export default function ScanQr() {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [scanned, setScanned] = useState(false);

//     // Request permission on load
//     useEffect(() => {
//         if (!permission?.granted) {
//             requestPermission();
//         } else {
//             speakInstruction(); // speak once permission granted
//         }
//     }, [permission]);

//     // Function to speak instruction
//     const speakInstruction = () => {
//         Speech.speak("Please scan patient's QR code", {
//             language: "en",
//             pitch: 1,
//             rate: 1,
//         });
//     };

//     const handleBarCodeScanned = ({ data }) => {
//         setScanned(true);
//         Alert.alert("QR Code Scanned", `Data: ${data}`, [
//             { text: "OK", onPress: () => setScanned(false) },
//         ]);
//     };

//     if (!permission) {
//         return (
//             <View style={styles.centerContainer}>
//                 <ActivityIndicator size="large" color="#1E90FF" />
//                 <Text style={styles.infoText}>Checking camera permission...</Text>
//             </View>
//         );
//     }

//     if (!permission.granted) {
//         return (
//             <View style={styles.centerContainer}>
//                 <Text style={styles.errorText}>Camera permission not granted</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <CameraView
//                 style={StyleSheet.absoluteFillObject}
//                 facing="back"
//                 barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
//                 onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
//             />

//             {/* Overlay scan frame */}
//             <View style={styles.overlay}>
//                 <View style={styles.topOverlay} />
//                 <View style={styles.middleRow}>
//                     <View style={styles.sideOverlay} />
//                     <View style={styles.scanBox} />
//                     <View style={styles.sideOverlay} />
//                 </View>
//                 <View style={styles.bottomOverlay} />
//             </View>

//             <Text style={styles.instructionText}>
//                 Align the QR code within the frame to scan
//             </Text>
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000",
//     },
//     overlay: {
//         ...StyleSheet.absoluteFillObject,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     topOverlay: {
//         flex: 1,
//         width: "100%",
//         backgroundColor: "rgba(0, 0, 0, 0.6)",
//     },
//     middleRow: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     sideOverlay: {
//         flex: 1,
//         height: 250,
//         backgroundColor: "rgba(0, 0, 0, 0.6)",
//     },
//     scanBox: {
//         width: 250,
//         height: 250,
//         borderWidth: 3,
//         borderColor: "#1E90FF",
//         borderRadius: 10,
//         backgroundColor: "transparent",
//     },
//     bottomOverlay: {
//         flex: 1,
//         width: "100%",
//         backgroundColor: "rgba(0, 0, 0, 0.6)",
//     },
//     instructionText: {
//         position: "absolute",
//         bottom: 40, // slightly closer to bottom
//         width: "100%", // full width for proper centering
//         color: "#fff",
//         fontSize: 18, // slightly larger for better visibility
//         fontWeight: "700", // bold
//         textAlign: "center",
//         textShadowColor: "rgba(0, 0, 0, 0.7)", // shadow for readability
//         textShadowOffset: { width: 0, height: 1 },
//         textShadowRadius: 3,
//         paddingHorizontal: 20, // small padding for longer text
//     },
//     centerContainer: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#F6F1F1",
//     },
//     infoText: {
//         marginTop: 12,
//         fontSize: 16,
//         color: "#146C94",
//     },
//     errorText: {
//         fontSize: 18,
//         color: "red",
//         fontWeight: "500",
//     },
// });

//---------------------------------
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import { CameraView, useCameraPermissions } from "expo-camera";
// import * as Speech from "expo-speech";
// import { useNavigation } from "@react-navigation/native";

// export default function ScanQr() {
//     const navigation = useNavigation();
//     const [permission, requestPermission] = useCameraPermissions();
//     const [scanned, setScanned] = useState(false);

//     // Hardcoded registered patients
//     const registeredPatients = {
//         QR123: { name: "John Doe", id: 1 },
//         QR456: { name: "Jane Smith", id: 2 },
//     };

//     // Request permission and speak instruction
//     useEffect(() => {
//         if (!permission?.granted) requestPermission();
//         else {
//             Speech.speak("Please scan patient's QR code", { language: "en", pitch: 1, rate: 1 });
//         }
//     }, [permission]);

//     const handleBarCodeScanned = ({ data }) => {
//         if (scanned) return; // prevent multiple triggers
//         setScanned(true);

//         if (registeredPatients[data]) {
//             // Registered patient
//             Speech.speak("Registered patient", { language: "en" });
//             navigation.navigate("PatientReport", { patient: registeredPatients[data] });
//         } else {
//             // Not registered
//             Speech.speak("Patient not registered", { language: "en" });
//             // Show alert first
//             Alert.alert("Unregistered Patient", "This patient is not registered.", [
//                 {
//                     text: "OK",
//                     onPress: () => {
//                         setScanned(false); // allow scanning again after user dismisses alert
//                     },
//                 },
//             ]);
//         }
//     };

//     if (!permission || !permission.granted) {
//         return (
//             <View style={styles.centerContainer}>
//                 <Text style={{ fontSize: 18 }}>Camera permission required</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <CameraView
//                 style={StyleSheet.absoluteFillObject}
//                 facing="back"
//                 barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
//                 onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
//             />

//             {/* Overlay scan frame */}
//             <View style={styles.overlay}>
//                 <View style={styles.topOverlay} />
//                 <View style={styles.middleRow}>
//                     <View style={styles.sideOverlay} />
//                     <View style={styles.scanBox} />
//                     <View style={styles.sideOverlay} />
//                 </View>
//                 <View style={styles.bottomOverlay} />
//             </View>

//             <Text style={styles.instructionText}>Align the QR code within the frame to scan</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: "#000" },
//     overlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center" },
//     topOverlay: { flex: 1, width: "100%", backgroundColor: "rgba(0,0,0,0.6)" },
//     middleRow: { flexDirection: "row", alignItems: "center" },
//     sideOverlay: { flex: 1, height: 250, backgroundColor: "rgba(0,0,0,0.6)" },
//     scanBox: { width: 250, height: 250, borderWidth: 3, borderColor: "#1E90FF", borderRadius: 10 },
//     bottomOverlay: { flex: 1, width: "100%", backgroundColor: "rgba(0,0,0,0.6)" },
//     instructionText: {
//         position: "absolute",
//         bottom: 40,
//         width: "100%",
//         color: "#fff",
//         fontSize: 18,
//         fontWeight: "700",
//         textAlign: "center",
//         textShadowColor: "rgba(0,0,0,0.7)",
//         textShadowOffset: { width: 0, height: 1 },
//         textShadowRadius: 3,
//         paddingHorizontal: 20,
//     },
//     centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F6F1F1" },
// });

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Speech from "expo-speech";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_BASE_URL } from "../../config"; // make sure your config file has this

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
                // Other errors (network, server, etc.)
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
