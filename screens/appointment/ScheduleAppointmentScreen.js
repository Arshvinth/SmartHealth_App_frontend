// src/screens/appointment/ScheduleAppointmentScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAppointmentFlow } from '../../hooks/useAppointmentFlow';
import { useScheduleData } from '../../hooks/useScheduleData';
import { AppointmentService } from '../../services/api/appointmentService';
import DoctorSelection from '../../components/appointment/DoctorSelection';
import HospitalSelection from '../../components/appointment/HospitalSelection';
import ScheduleCard from '../../components/appointment/ScheduleCard';
import PatientForm from '../../components/appointment/PatientForm';
import ChatButton from '../../components/appointment/chatButton';
import QuickAppointmentChat from '../../components/appointment/QuickAppointmentChat';
import { theme } from '../../assets/theme';

const ScheduleAppointmentScreen = ({ navigation }) => {
    const appointmentService = new AppointmentService();
    const {
        currentStep,
        selectedDoctor,
        selectedHospital,
        selectedSchedule,
        prevStep,
        nextStep,
        selectDoctor,
        selectHospital,
        selectSchedule,
        resetFlow,
        getStepTitle,
        canProceedToNext
    } = useAppointmentFlow();

    const {
        doctors,
        hospitals,
        schedules,
        loading,
        error,
        loadDoctors,
        loadDoctorHospitals,
        loadSchedules,
        clearHospitals,
        clearSchedules
    } = useScheduleData(appointmentService);

    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        loadDoctors();
    }, []);

    useEffect(() => {
        if (selectedDoctor) {
            loadDoctorHospitals(selectedDoctor._id);
        } else {
            clearHospitals();
        }
    }, [selectedDoctor]);

    useEffect(() => {
        console.log('📅 Schedules data updated:', {
            count: schedules.length,
            data: schedules
        });
    }, [schedules]);

    useEffect(() => {
        console.log('🏥 Hospital changed:', selectedHospital?.id, selectedHospital?.name);

        if (selectedDoctor && selectedDoctor._id && selectedHospital && selectedHospital.id) {
            console.log('🔄 Loading schedules for:', {
                doctorId: selectedDoctor._id,
                hospitalId: selectedHospital.id
            });
            loadSchedules(selectedDoctor._id, selectedHospital.id);
        } else {
            console.log('🔄 Clearing schedules - missing doctor or hospital');
            clearSchedules();
        }
    }, [selectedDoctor, selectedHospital]);

    const handleConfirmAppointment = async (appointmentData) => {
        try {
            const appointmentPayload = {
                patientId: '68efe6401c0f65de24140471', // This should come from auth context
                doctorId: appointmentData.doctor._id,
                hospitalId: appointmentData.hospital.id,
                scheduleId: appointmentData.schedule._id,
                charges: appointmentData.hospital.totalCharge || 50,
                patientInfo: appointmentData.patientInfo,
                paymentMethod: appointmentData.paymentMethod
            };

            console.log('📋 Appointment Payload:', appointmentPayload);

            const result = await appointmentService.scheduleAppointment(appointmentPayload);

            const appointmentResult = result;
            console.log("result", appointmentResult);

            const confirmationData = {
                appointment: appointmentResult.appointment,
                _id: appointmentResult._id || appointmentResult.id,
                id: appointmentResult._id || appointmentResult.id,
                hospital: selectedHospital?.name || 'Hospital',
                doctor: selectedDoctor?.name || 'Doctor',
                date: selectedSchedule?.scheduleDate || new Date().toLocaleDateString(),
                time: selectedSchedule?.startTime || '9:00 AM',
                charges: appointmentPayload.charges || 'Rs 1500',
                ...result // Include any additional data from API
            };

            console.log('✅ Confirmation Data:', confirmationData);

            Alert.alert(
                'Success',
                "Appointment scheduled successfully!",
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            resetFlow();
                            // Navigate to confirmation screen with data
                            navigation.navigate('BookingConfirmation', {
                                appointment: confirmationData
                            });
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to schedule appointment');
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <DoctorSelection
                        doctors={doctors}
                        selectedDoctor={selectedDoctor}
                        onSelectDoctor={selectDoctor}
                        loading={loading}
                    />
                );
            case 2:
                return (
                    <HospitalSelection
                        hospitals={hospitals}
                        selectedHospital={selectedHospital}
                        onSelectHospital={selectHospital}
                        loading={loading}
                    />
                );
            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.sectionTitle}>Available Time Slots</Text>
                        {schedules.map((schedule) => (
                            <ScheduleCard
                                key={schedule._id}
                                schedule={schedule}
                                selectedSchedule={selectedSchedule}
                                onSelectSchedule={selectSchedule}
                            />
                        ))}
                    </View>
                );
            case 4:
                return (
                    <PatientForm
                        onSubmit={handleConfirmAppointment}
                        onBack={prevStep}
                        appointmentData={{
                            doctor: selectedDoctor,
                            hospital: selectedHospital,
                            schedule: selectedSchedule
                        }}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Schedule Appointment</Text>
                <Text style={styles.stepTitle}>{getStepTitle()}</Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}

                {renderStepContent()}
            </ScrollView>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, styles.backButton]}
                        onPress={prevStep}
                        disabled={currentStep === 1}
                    >
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.nextButton, !canProceedToNext && styles.disabledButton]}
                        onPress={nextStep}
                        disabled={!canProceedToNext}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Chat Bot */}
            <ChatButton onPress={() => setShowChat(true)} />

            <QuickAppointmentChat
                visible={showChat}
                onClose={() => setShowChat(false)}
                appointmentService={appointmentService}
                onQuickAppointmentComplete={(data) => {
                    // Auto-fill the form with quick appointment data
                    selectDoctor(data.doctor);
                    selectHospital(data.hospital);
                    selectSchedule(data.schedule);
                    setShowChat(false);
                }}
            />
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
    stepTitle: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.xs,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        padding: theme.spacing.lg,
    },
    stepContainer: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        marginBottom: theme.spacing.md,
        color: theme.colors.textPrimary,
    },
    footer: {
        flexDirection: 'row',
        padding: theme.spacing.lg,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        gap: theme.spacing.sm,
    },
    button: {
        flex: 1,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: theme.colors.textSecondary,
    },
    nextButton: {
        backgroundColor: theme.colors.primary,
    },
    disabledButton: {
        backgroundColor: theme.colors.border,
    },
    buttonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    errorContainer: {
        backgroundColor: theme.colors.error + '20', // Add transparency
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        marginBottom: theme.spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.error,
    },
    errorText: {
        color: theme.colors.error,
        fontSize: theme.typography.small.fontSize,
    },
});

export default ScheduleAppointmentScreen;