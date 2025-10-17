import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

const PaymentConfirmation = ({ appointment, onPaymentConfirm }) => {
    const handleConfirmPayment = async (paymentMethod) => {
        try {
            const paymentData = {
                appointmentId: appointment._id,
                totalAmount: appointment.charges || 50,
                paymentMethod: paymentMethod
            };

            // Call your API to create payment
            const response = await fetch('http://your-api/payments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData)
            });

            const result = await response.json();

            if (result.success) {
                Alert.alert(
                    "Success",
                    `Payment ${paymentMethod === "Cash" ? "will be collected at hospital" : "completed successfully!"}`,
                    [{ text: "OK", onPress: () => onPaymentConfirm(result.payment) }]
                );
            } else {
                Alert.alert("Error", result.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to process payment");
        }
    };

    // Format date and time for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        const time = new Date(timeString);
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Appointment Confirmed</Text>
            </View>

            {/* Appointment Details Section */}
            <View style={styles.detailsCard}>
                <Text style={styles.sectionTitle}>Appointment Details</Text>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Appointment ID:</Text>
                    <Text style={styles.detailValue}>#{appointment.appointmentNumber || 'APT-78945'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Hospital:</Text>
                    <Text style={styles.detailValue}>{appointment.hospitalId?.name || 'General Hospital Colombo'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Doctor:</Text>
                    <Text style={styles.detailValue}>{appointment.doctorId?.name || 'Dr. Silva'}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date:</Text>
                    <Text style={styles.detailValue}>
                        {appointment.appointmentDate ? formatDate(appointment.appointmentDate) : 'Nov 18, 2025'}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Time:</Text>
                    <Text style={styles.detailValue}>
                        {appointment.appointmentTime ? formatTime(appointment.appointmentTime) : '9:00 AM'}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Action Buttons */}
            <View style={styles.actionSection}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>📅 Add to Calendar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>⏰ Set Reminder</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                    <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                </TouchableOpacity>
            </View>

            {/* Notification Info */}
            <View style={styles.notificationInfo}>
                <Text style={styles.notificationText}>
                    Push notification and email confirmation have been automatically sent
                </Text>
            </View>

            {/* Payment Section */}
            <View style={styles.paymentSection}>
                <Text style={styles.paymentTitle}>Complete Payment</Text>

                <View style={styles.amountSection}>
                    <Text style={styles.amountLabel}>Total Amount:</Text>
                    <Text style={styles.amountValue}>${appointment.charges || 50}</Text>
                </View>

                <Text style={styles.methodTitle}>Select Payment Method:</Text>

                <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={() => handleConfirmPayment("Cash")}
                >
                    <Text style={styles.buttonText}>💵 Pay with Cash</Text>
                    <Text style={styles.buttonSubtext}>Pay at hospital counter</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={() => handleConfirmPayment("Card")}
                >
                    <Text style={styles.buttonText}>💳 Pay with Card</Text>
                    <Text style={styles.buttonSubtext}>Secure online payment</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.paymentButton}
                    onPress={() => handleConfirmPayment("Insurance")}
                >
                    <Text style={styles.buttonText}>🏥 Use Insurance</Text>
                    <Text style={styles.buttonSubtext}>Bill to insurance provider</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation (Mock) */}
            <View style={styles.bottomNav}>
                <Text style={styles.navText}>Home</Text>
                <Text style={styles.navText}>Records</Text>
                <Text style={[styles.navText, styles.activeNav]}>Appointments</Text>
                <Text style={styles.navText}>Profile</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    detailsCard: {
        backgroundColor: '#f8f9fa',
        margin: 16,
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    detailValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 16,
        marginVertical: 20,
    },
    actionSection: {
        paddingHorizontal: 16,
        gap: 12,
    },
    actionButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ff3b30',
    },
    cancelButtonText: {
        color: '#ff3b30',
        fontSize: 16,
        fontWeight: '600',
    },
    notificationInfo: {
        backgroundColor: '#e3f2fd',
        margin: 16,
        padding: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    notificationText: {
        fontSize: 14,
        color: '#1976D2',
        textAlign: 'center',
        lineHeight: 18,
    },
    paymentSection: {
        margin: 16,
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
    },
    paymentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center',
    },
    amountSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 20,
    },
    amountLabel: {
        fontSize: 18,
        color: '#666',
        fontWeight: '500',
    },
    amountValue: {
        fontSize: 24,
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 16,
        color: '#333',
    },
    paymentButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    buttonSubtext: {
        color: 'white',
        fontSize: 12,
        opacity: 0.9,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#f8f9fa',
    },
    navText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    activeNav: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default PaymentConfirmation;