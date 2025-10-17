// src/components/appointment/HospitalSelection.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';

const HospitalSelection = ({ hospitals, selectedHospital, onSelectHospital, loading }) => {
    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Hospital</Text>
                <Text style={styles.loadingText}>Loading hospitals...</Text>
            </View>
        );
    }

    if (!hospitals || hospitals.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Hospital</Text>
                <Text style={styles.noDataText}>No hospitals available for selected doctor</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Hospital</Text>
            <View style={styles.hospitalsContainer}>
                {hospitals.map((hospital, index) => (

                    <TouchableOpacity
                        key={hospital._id || `${hospital.name}-${index}`}
                        style={[
                            styles.hospitalCard,
                            selectedHospital?.id === hospital.id && styles.selectedCard
                        ]}
                        onPress={() => {
                            console.log('✅ Hospital selected:', hospital);
                            onSelectHospital(hospital);
                        }}
                    >

                        <Text style={styles.hospitalName}>{hospital.name}</Text>
                        <Text style={styles.hospitalLocation}>{hospital.branch}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        marginBottom: theme.spacing.md,
        color: theme.colors.textPrimary,
    },
    hospitalsContainer: {
        gap: theme.spacing.sm,
    },
    hospitalCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        borderWidth: 2,
        borderColor: theme.colors.secondary,
    },
    selectedCard: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.accent + '20',
    },
    hospitalName: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    hospitalLocation: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
    },
    noDataText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        padding: theme.spacing.lg,
    },
    loadingText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        padding: theme.spacing.lg,
    },
});

export default HospitalSelection;