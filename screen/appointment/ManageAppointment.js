import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppointmentNavigation } from '../../hooks/useAppointmentNavigation';
import { APPOINTMENT_OPTIONS } from '../../constants/AppointmnetOptions';
import { AppointmentOptionCard } from '../../components/AppointmentCard';

const ManageAppointmentScreen = () => {
    const navigation = useAppointmentNavigation();

    const navigationMap = {
        navigateToSchedule: navigation.navigateToSchedule,
        navigateToView: navigation.navigateToView,
        navigateToCancel: navigation.navigateToCancel,
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Manage Appointment</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {APPOINTMENT_OPTIONS.map((option) => (
                    <AppointmentOptionCard
                        key={option.id}
                        option={option}
                        onPress={navigationMap[option.onPress]}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 60,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center",
    },
});

export default ManageAppointmentScreen;