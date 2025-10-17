// src/screens/appointment/BookingConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { theme } from '../../assets/theme';
import appointmentDataService from '../../services/api/appointmentDataService';
import CalendarEventBuilder from '../../builders/CalenderEventBuilder';
import calendarUtils from '../../utils/calendarUtils';
import AlertServices from '../../services/AlertServices';

const BookingConfirmationScreen = ({ route, navigation }) => {
    const { appointment } = route.params || {};

    // Mock data structure in case appointment data is not passed
    const number = appointment?.appointment.appointmentNumber;
    const appointmentId = appointment?.appointment._id;

    const appointmentData = appointment || {}

    console.log("appoint", appointmentData);

    const hospital = appointmentData.hospital || 'Not specified';
    const doctor = appointmentData.doctor || 'Not specified';
    const date = appointmentData.date || 'Not specified';
    const time = appointmentData.time || 'Not specified';
    const charges = appointmentData.charges || 'Not specified';

    const handleCalendarAction = async (type = 'appointment') => {
        try {

            const formattedDate = calendarUtils.formatDateForCalendar(date);
            const formatTime = calendarUtils.formatTimeForCalendar(date);
            const calendarData = {
                number: number,
                hospital: hospital,
                doctor: doctor,
                date: formattedDate,
                time: formatTime,
                charges: charges
            }
            console.log('📅 Calendar data:', calendarData);

            // Validate the data before proceeding
            appointmentDataService.validateAppointmentData(calendarData);

            const eventBuilder = new CalendarEventBuilder();

            if (type === 'reminder') {
                eventBuilder
                    .setTitle(`Reminder: Appointment with ${doctor}`)
                    .setLocation(hospital)
                    .setNotes(`Don't forget your appointment!`)
                    .setStartDate(date, time, -24 * 60) // 24 hours before
                    .setEndDate(date, time, -24 * 60 + 30) // 30 min event
                    .addAlarm(60);
            } else {
                eventBuilder
                    .setTitle(`Doctor Appointment - ${doctor}`)
                    .setLocation(hospital)
                    .setNotes(`Appointment with ${doctor} at ${hospital}. Appointment ID: ${number}`)
                    .setStartDate(date, time)
                    .setEndDate(date, time, 60) // 1 hour duration
                    .addAlarm(60);
            }

            const eventConfig = eventBuilder.build();
            const result = await calendarUtils.addToCalendar(eventConfig);

            if (result) {
                const message = type === 'reminder'
                    ? 'Reminder set successfully!'
                    : 'Appointment added to calendar successfully!';
                AlertServices.showSuccess('Success', message);
            }
        } catch (error) {
            console.error(`${type} error:`, error);
            const errorMessage = type === 'reminder'
                ? 'Failed to set reminder. Please check app permissions.'
                : 'Failed to add to calendar. Please check app permissions.';
            AlertServices.showError('Error', errorMessage);
        }
    };
    const handleAddToCalendar = () => handleCalendarAction('appointment');


    const handleSetReminder = () => handleCalendarAction('reminder');

    const handleCancelAppointment = () => {
        Alert.alert(
            'Cancel Appointment',
            'Are you sure you want to cancel this appointment?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => {
                        // Navigate to CancelAppointment screen with the appointment ID
                        console.log('🎯 Passing appointment to cancel:', {
                            id: appointmentId,
                            number: number,
                            fullData: appointmentData
                        });

                        navigation.navigate('CancelAppointment', {
                            appointment: {
                                _id: appointmentId,
                                appointmentNumber: number,
                                hospital: appointmentData.hospital,
                                doctor: appointmentData.doctor,
                                date: appointmentData.date,
                                time: appointmentData.time,
                                charges: appointmentData.charges
                            }
                        });
                    }
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
                        <Text style={styles.detailLabel}>Appointment Number:</Text>
                        <Text style={styles.detailValue}>{number}</Text>
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
        </View >
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