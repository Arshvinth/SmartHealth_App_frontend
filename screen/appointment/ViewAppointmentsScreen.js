// src/screens/appointment/AppointmentsListScreen.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    RefreshControl
} from 'react-native';
import { theme } from '../../assets/theme';
import { AppointmentService } from '../../services/api/appointmentService';

const AppointmentsListScreen = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const appointmentService = new AppointmentService();

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            // Replace with actual user ID from auth context
            const userId = '68efe6401c0f65de24140471';
            const userAppointments = await appointmentService.getUserAppointments(userId);
            setAppointments(userAppointments || []);
        } catch (error) {
            console.error('Failed to load appointments:', error);
            Alert.alert('Error', 'Failed to load appointments');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        loadAppointments();
    };

    const handleCancelAppointment = (appointment) => {
        navigation.navigate('CancelAppointment', { appointment });
    };

    const formatStatus = (status) => {
        const statusColors = {
            'Completed': '#28a745',
            'Cancelled': '#dc3545',
            'Scheduled': '#007bff',
            'Pending': '#ffc107'
        };

        return (
            <View style={[styles.statusBadge, { backgroundColor: statusColors[status] || '#6c757d' }]}>
                <Text style={styles.statusText}>{status}</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Appointments</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <Text>Loading appointments...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Appointments</Text>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.content}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {appointments.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No appointments found</Text>
                        <TouchableOpacity
                            style={styles.scheduleButton}
                            onPress={() => navigation.navigate('ScheduleAppointment')}
                        >
                            <Text style={styles.scheduleButtonText}>Schedule Appointment</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    appointments.map((appointment) => (
                        <View key={appointment._id} style={styles.appointmentCard}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.appointmentId}>
                                    #{appointment.appointmentNumber || appointment._id}
                                </Text>
                                {formatStatus(appointment.status)}
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Doctor:</Text>
                                <Text style={styles.detailValue}>
                                    {appointment.doctorId?.name || 'Doctor'}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Hospital:</Text>
                                <Text style={styles.detailValue}>
                                    {appointment.hospitalId?.name || 'Hospital'}
                                </Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Date:</Text>
                                <Text style={styles.detailValue}>{appointment.scheduleId?.scheduleDate}</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Time:</Text>
                                <Text style={styles.detailValue}>{appointment.scheduleId?.startTime}</Text>
                            </View>

                            {appointment.status === 'Scheduled' && (
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => handleCancelAppointment(appointment)}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))
                )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
    },
    emptyText: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.lg,
    },
    scheduleButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radius.sm,
    },
    scheduleButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    appointmentCard: {
        backgroundColor: theme.colors.surface,
        margin: theme.spacing.lg,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    appointmentId: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.sm,
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: theme.typography.small.fontSize,
        fontWeight: '600',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.xs,
    },
    detailLabel: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
    },
    detailValue: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    cancelButton: {
        backgroundColor: theme.colors.error,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
        marginTop: theme.spacing.md,
    },
    cancelButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.small.fontSize,
        fontWeight: '600',
    },
});

export default AppointmentsListScreen;