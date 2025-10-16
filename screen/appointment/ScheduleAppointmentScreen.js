// src/screens/appointment/ScheduleAppointmentScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AppointmentService } from '../../services/api/appointmentService';
import Button from '../../components/common/Button';
import { useAppointment } from '../../hooks/useAppointment';

const ScheduleAppointmentScreen = ({ navigation, route }) => {
    const appointmentService = new AppointmentService();
    const {
        doctors,
        loading,
        scheduleAppointment,
        loadDoctors
    } = useAppointment(appointmentService);

    const [selectedHospital, setSelectedHospital] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [patientId, setPatientId] = useState('1'); // Get from auth context

    const hospitals = [
        { id: '1', name: 'General Hospital', sector: 'Public' },
        { id: '2', name: 'City Medical Center', sector: 'Private' },
    ];

    const timeSlots = ['9:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '3:30 PM'];

    useEffect(() => {
        loadDoctors();
    }, []);

    const handleBookAppointment = async () => {
        if (!selectedHospital || !selectedDoctor || !selectedTime) {
            Alert.alert('Error', 'Please select hospital, doctor, and time slot');
            return;
        }

        try {
            const appointmentData = {
                patientId,
                doctorId: selectedDoctor,
                hospitalId: selectedHospital,
                scheduleId: Date.now().toString(),
                charges: 50, // Default charge
                date: new Date().toISOString(),
                timeSlot: selectedTime,
            };

            const result = await scheduleAppointment(appointmentData);

            Alert.alert(
                'Success',
                `Appointment Scheduled Successfully!\nAppointment Number: ${result.appointmentNumber}`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Dashboard'),
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to schedule appointment');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Select Hospital & Doctor</Text>

                {/* Hospital Selection */}
                <Text style={styles.label}>Hospital</Text>
                <View style={styles.optionsContainer}>
                    {hospitals.map(hospital => (
                        <TouchableOpacity
                            key={hospital.id}
                            style={[
                                styles.option,
                                selectedHospital === hospital.id && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedHospital(hospital.id)}
                        >
                            <Text style={[
                                styles.optionText,
                                selectedHospital === hospital.id && styles.selectedOptionText,
                            ]}>
                                {hospital.name}
                            </Text>
                            <Text style={styles.optionSubtext}>{hospital.sector} Services</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Doctor Selection */}
                <Text style={styles.label}>Select Doctor</Text>
                <View style={styles.optionsContainer}>
                    {doctors.map(doctor => (
                        <TouchableOpacity
                            key={doctor.id}
                            style={[
                                styles.option,
                                selectedDoctor === doctor.id && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedDoctor(doctor.id)}
                        >
                            <Text style={[
                                styles.optionText,
                                selectedDoctor === doctor.id && styles.selectedOptionText,
                            ]}>
                                {doctor.name}
                            </Text>
                            <Text style={styles.optionSubtext}>{doctor.specialization}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Time Slots */}
                <Text style={styles.label}>Available Time Slots</Text>
                <View style={styles.optionsContainer}>
                    {timeSlots.map(time => (
                        <TouchableOpacity
                            key={time}
                            style={[
                                styles.option,
                                selectedTime === time && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedTime(time)}
                        >
                            <Text style={[
                                styles.optionText,
                                selectedTime === time && styles.selectedOptionText,
                            ]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Back"
                    variant="outline"
                    onPress={() => navigation.goBack()}
                    fullWidth
                />
                <Button
                    title="Book Appointment"
                    onPress={handleBookAppointment}
                    disabled={!selectedHospital || !selectedDoctor || !selectedTime}
                    loading={loading}
                    fullWidth
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333',
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 24,
        gap: 8,
    },
    option: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: '48%',
    },
    selectedOption: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    optionText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    selectedOptionText: {
        color: '#fff',
    },
    optionSubtext: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#fff',
        gap: 12,
    },
});

export default ScheduleAppointmentScreen;