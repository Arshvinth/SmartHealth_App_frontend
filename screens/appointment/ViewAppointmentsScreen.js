import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ViewAppointments = ({ navigation }) => {

    const handleScheduleAppointment = () => {
        navigation.navigate('ScheduleAppointment');
    };

    const handleViewAppointments = () => {
        navigation.navigate('ViewAppointments');
    };

    const handleCancelAppointment = () => {
        navigation.navigate('CancelAppointment');
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Manage Appointment</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={handleScheduleAppointment}
                >
                    <View style={styles.icomStyle}>
                        <Ionicons name="calendar-sharp"
                            size={30}
                            color={"#4FC3F7"} />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.optionTitle}>Schedule Appointment</Text>
                        <Text style={styles.optionDescription}>
                            Book a new appointment with your doctor
                        </Text>
                    </View>

                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={handleViewAppointments}
                >
                    <View style={styles.icomStyle}>
                        <Ionicons name="eye"
                            size={30}
                            color={"#4FC3F7"} />
                    </View>
                    <View style={styles.option}>
                        <Text style={styles.optionTitle}>View Appointments</Text>
                        <Text style={styles.optionDescription}>
                            Check your upcoming and past appointments
                        </Text>
                    </View>

                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.optionCard}
                    onPress={handleCancelAppointment}
                >

                    <View style={styles.icomStyle}>
                        <MaterialIcons
                            name="cancel"
                            size={30}
                            color={"#E57373"} />

                    </View>
                    <View style={styles.option}>
                        <Text style={styles.optionTitle}>Cancel Appointment</Text>
                        <Text style={styles.optionDescription}>
                            Cancel or reschedule existing appointments
                        </Text>
                    </View>

                </TouchableOpacity>

            </ScrollView>

        </View>
    )
}

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
    optionCard: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        flexDirection: "row",
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: "center",
        gap: 4
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        maxWidth: 260
    }
})

export default ViewAppointments;