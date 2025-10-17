// src/screens/appointment/CancelAppointmentScreen.js
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal
} from 'react-native';
import { theme } from '../../assets/theme';
import { AppointmentService } from '../../services/api/appointmentService';

const CancelAppointmentScreen = ({ route, navigation }) => {
    const { appointment } = route.params || {};
    const [loading, setLoading] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const appointmentService = new AppointmentService();

    if (!appointment) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Cancel Appointment</Text>
                </View>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>No appointment data found</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const handleCancelAppointment = async () => {
        try {
            setLoading(true);
            console.log('Cancelling appointment:', appointment.id || appointment._id);

            await appointmentService.cancelAppointment(appointment.id || appointment._id);

            setLoading(false);
            setShowCancelModal(false);

            Alert.alert(
                'Success',
                'Appointment cancelled successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('ViewAppointments')
                    }
                ]
            );
        } catch (error) {
            setLoading(false);
            setShowCancelModal(false);
            console.error('Cancel appointment error:', error);
            Alert.alert('Error', error.message || 'Failed to cancel appointment');
        }
    };

    const openCancelModal = () => {
        setShowCancelModal(true);
    };

    const closeCancelModal = () => {
        setShowCancelModal(false);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButtonHeader}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cancel Appointment</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {/* Warning Banner */}
                <View style={styles.warningBanner}>
                    <Text style={styles.warningIcon}>⚠️</Text>
                    <Text style={styles.warningText}>
                        Are you sure you want to cancel this appointment? This action cannot be undone.
                    </Text>
                </View>

                {/* Appointment Details Card */}
                <View style={styles.detailsCard}>
                    <Text style={styles.sectionTitle}>Appointment Details</Text>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Appointment ID:</Text>
                        <Text style={styles.detailValue}>
                            {appointment.id || appointment._id}
                        </Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Hospital:</Text>
                        <Text style={styles.detailValue}>{appointment.hospital}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Doctor:</Text>
                        <Text style={styles.detailValue}>{appointment.doctor}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Date:</Text>
                        <Text style={styles.detailValue}>{appointment.date}</Text>
                    </View>

                    <View style={styles.detailRow}>
                        <Text style={styles.detailLabel}>Time:</Text>
                        <Text style={styles.detailValue}>{appointment.time}</Text>
                    </View>

                    {appointment.charges && (
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Charges:</Text>
                            <Text style={styles.detailValue}>{appointment.charges}</Text>
                        </View>
                    )}
                </View>

                {/* Cancellation Policy */}
                <View style={styles.policyCard}>
                    <Text style={styles.policyTitle}>Cancellation Policy</Text>
                    <View style={styles.policyItem}>
                        <Text style={styles.policyBullet}>•</Text>
                        <Text style={styles.policyText}>
                            Cancellations made 24 hours before appointment are fully refundable
                        </Text>
                    </View>
                    <View style={styles.policyItem}>
                        <Text style={styles.policyBullet}>•</Text>
                        <Text style={styles.policyText}>
                            Late cancellations may incur a small fee
                        </Text>
                    </View>
                    <View style={styles.policyItem}>
                        <Text style={styles.policyBullet}>•</Text>
                        <Text style={styles.policyText}>
                            You will receive email confirmation of cancellation
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[styles.button, styles.keepButton]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.keepButtonText}>Keep Appointment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={openCancelModal}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFFFFF" size="small" />
                        ) : (
                            <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal
                visible={showCancelModal}
                transparent={true}
                animationType="slide"
                onRequestClose={closeCancelModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Cancellation</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to cancel your appointment with {appointment.doctor} on {appointment.date}?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalCancelButton]}
                                onPress={closeCancelModal}
                            >
                                <Text style={styles.modalCancelButtonText}>Go Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.modalConfirmButton]}
                                onPress={handleCancelAppointment}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFFFFF" size="small" />
                                ) : (
                                    <Text style={styles.modalConfirmButtonText}>Yes, Cancel</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButtonHeader: {
        padding: theme.spacing.sm,
    },
    headerTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        flex: 1,
    },
    placeholder: {
        width: 60,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    warningBanner: {
        backgroundColor: '#FFF3CD',
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: '#FFC107',
    },
    warningIcon: {
        fontSize: 20,
        marginRight: theme.spacing.sm,
    },
    warningText: {
        flex: 1,
        color: '#856404',
        fontSize: theme.typography.small.fontSize,
        lineHeight: 20,
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
    policyCard: {
        backgroundColor: '#E8F4FD',
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    policyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    policyItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    policyBullet: {
        color: theme.colors.primary,
        fontSize: 16,
        marginRight: theme.spacing.sm,
        marginTop: 2,
    },
    policyText: {
        flex: 1,
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        lineHeight: 20,
    },
    actionButtons: {
        gap: theme.spacing.sm,
    },
    button: {
        padding: theme.spacing.lg,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    keepButton: {
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    keepButtonText: {
        color: theme.colors.primary,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    cancelButton: {
        backgroundColor: theme.colors.error,
    },
    cancelButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    backButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        marginTop: theme.spacing.lg,
    },
    backButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    modalContent: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.xl,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
    },
    modalMessage: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: theme.spacing.xl,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    modalButton: {
        flex: 1,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
    },
    modalCancelButton: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    modalCancelButtonText: {
        color: theme.colors.textSecondary,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    modalConfirmButton: {
        backgroundColor: theme.colors.error,
    },
    modalConfirmButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
});

export default CancelAppointmentScreen;