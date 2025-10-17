// src/screens/appointment/BookingConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../assets/theme';

const BookingConfirmationScreen = ({ route, navigation }) => {
    const { appointment } = route.params || {};

    // Mock data structure in case appointment data is not passed
    const appointmentData = appointment || {
        id: '#APT-78945',
        hospital: 'General Hospital Colombo',
        doctor: 'Dr. Silva',
        date: 'Nov 18, 2025',
        time: '9:00 AM',
        charges: 'Rs.50'
    };

    const handleAddToCalendar = () => {
        Alert.alert('Success', 'Added to calendar successfully!');
    };

    const handleSetReminder = () => {
        Alert.alert('Success', 'Reminder set successfully!');
    };

    const handleCancelAppointment = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel this appointment?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => navigation.goBack()
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Appointment Confirmed</Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {/* Appointment Details Card */}
                <View style={styles.detailsCard}>
                    <Text style={styles.sectionTitle}>Appointment Details</Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment ID:</Text>
                        <Text style={styles.detailValue}>{appointmentData.appointmentNumber}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Hospital:</Text>
                        <Text style={styles.detailValue}>{appointmentData.hospital}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Doctor:</Text>
                        <Text style={styles.detailValue}>{appointmentData.doctor}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date:</Text>
                        <Text style={styles.detailValue}>{appointmentData.date}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Time:</Text>
                        <Text style={styles.detailValue}>{appointmentData.time}</Text>
                    </View>

                    {appointmentData.charges && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Charges: </Text>
                            <Text style={styles.detailValue}>{appointmentData.charges}</Text>
                        </View>
                    )}
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Action Buttons */}
                <Text style={styles.actionTitle}>Add to Calendar</Text>

                <TouchableOpacity style={styles.actionButton} onPress={handleAddToCalendar}>
                    <Text style={styles.actionButtonText}>Add to Calendar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleSetReminder}>
                    <Text style={styles.actionButtonText}>Set Reminder</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, styles.cancelButton]}
                    onPress={handleCancelAppointment}
                >
                    <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                </TouchableOpacity>

                {/* Notification Info */}
                <View style={styles.notificationInfo}>
                    <Text style={styles.notificationText}>
                        Push notification and email confirmation have been automatically sent
                    </Text>
                </View>


            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    detailsCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border + '30',
    },
    detailLabel: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    detailValue: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textPrimary,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.border,
        marginVertical: theme.spacing.lg,
    },
    actionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    actionButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    actionButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    cancelButtonText: {
        color: theme.colors.error,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    notificationInfo: {
        backgroundColor: theme.colors.success + '20',
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        marginTop: theme.spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.success,
    },
    notificationText: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.md,
        padding: theme.spacing.sm,
        marginTop: theme.spacing.xl,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        padding: theme.spacing.sm,
    },
    navText: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
});

export default BookingConfirmationScreen;