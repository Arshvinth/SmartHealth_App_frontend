import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppointmentNavigation } from '../../hooks/useAppointmentNavigation';
import { APPOINTMENT_OPTIONS } from '../../constants/AppointmnetOptions';
import { AppointmentOptionCard } from '../../components/AppointmentCard';
import { theme } from '../../assets/theme';

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
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        paddingTop: 60,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    headerTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.textPrimary,
    },
    scrollContent: {
        flexGrow: 1,
        padding: theme.spacing.lg,
        justifyContent: "center",
    },
    optionCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        flexDirection: "row",
        marginBottom: theme.spacing.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: "center",
        gap: theme.spacing.xs
    },
    optionTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.success,
        marginBottom: theme.spacing.sm,
    },
    optionDescription: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        lineHeight: 20,
        maxWidth: 260
    }
});

export default ManageAppointmentScreen;