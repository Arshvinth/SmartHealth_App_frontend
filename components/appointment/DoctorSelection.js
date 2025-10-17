// src/components/appointment/DoctorSelection.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SectionList } from 'react-native';
import { theme } from '../../assets/theme';

const DoctorSelection = ({ doctors, selectedDoctor, onSelectDoctor, loading }) => {
    const [expandedSections, setExpandedSections] = useState({});

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={styles.sectionTitle}>Select Doctor</Text>
                <Text style={styles.loadingText}>Loading doctors...</Text>
            </View>
        );
    }

    // Group doctors by specialization
    const groupedDoctors = doctors.reduce((acc, doctor) => {
        const specialization = doctor.specialization || 'General';
        if (!acc[specialization]) {
            acc[specialization] = [];
        }
        acc[specialization].push(doctor);
        return acc;
    }, {});

    // Convert to section data format
    const sections = Object.keys(groupedDoctors).map(specialization => ({
        title: specialization,
        data: groupedDoctors[specialization],
        id: specialization
    }));

    const toggleSection = (specialization) => {
        setExpandedSections(prev => ({
            ...prev,
            [specialization]: !prev[specialization]
        }));
    };

    const ProfileIcon = ({ name, isSelected }) => {
        const initials = name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

        return (
            <View style={[
                styles.profileIcon,
                isSelected && styles.selectedProfileIcon
            ]}>
                <Text style={[
                    styles.initials,
                    isSelected && styles.selectedInitials
                ]}>
                    {initials}
                </Text>
            </View>
        );
    };

    const renderDoctorItem = ({ item: doctor }) => (
        <TouchableOpacity
            style={[
                styles.doctorItem,
                selectedDoctor?._id === doctor._id && styles.selectedItem
            ]}
            onPress={() => onSelectDoctor(doctor)}
        >
            <ProfileIcon
                name={doctor.name}
                isSelected={selectedDoctor?._id === doctor._id}
            />
            <View style={styles.doctorInfo}>
                <Text style={styles.doctorName} numberOfLines={1}>
                    {doctor.name}
                </Text>
                <Text style={styles.experience} numberOfLines={1}>
                    {doctor.experience || 'Experienced'} Experince
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderSectionHeader = ({ section }) => (

        <View style={styles.sectionHeaderContent}>
            <Text style={styles.specializationTitle}>
                {section.title}
            </Text>
            <Text style={styles.doctorCount}>
                ({section.data.length} doctor{section.data.length !== 1 ? 's' : ''})
            </Text>

        </View>

    );

    const renderSection = ({ section }) => {


        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.doctorsContainer}>
                    {section.data.map((doctor) => (
                        <View key={doctor._id}>
                            {renderDoctorItem({ item: doctor })}
                        </View>
                    ))}
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Select Your Doctor</Text>

            {sections.length === 0 ? (
                <Text style={styles.noDoctorsText}>No doctors available</Text>
            ) : (
                <View style={styles.sectionsContainer}>
                    {sections.map((section) => (
                        <View key={section.id} style={styles.section}>
                            {renderSectionHeader({ section })}
                            {renderSection({ section })}
                        </View>
                    ))}
                </View>
            )}
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
    sectionsContainer: {
        gap: theme.spacing.sm,

    },
    section: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
    },
    sectionHeader: {
        backgroundColor: theme.colors.primary + '15',
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,

    },
    sectionHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    specializationTitle: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        flex: 1,
    },
    doctorCount: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginRight: theme.spacing.sm,
    },

    scrollContainer: {
        padding: theme.spacing.sm,
    },
    doctorsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
    },
    doctorItem: {
        alignItems: 'center',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.lg,
        minWidth: 90,
        maxWidth: 100,
    },
    selectedItem: {
        backgroundColor: theme.colors.accent + '20',
    },
    profileIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: theme.colors.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.xs,
    },
    selectedProfileIcon: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + '20',
    },
    initials: {
        fontSize: 16,
        fontWeight: '600',
        color: theme.colors.textPrimary,
    },
    selectedInitials: {
        color: theme.colors.primary,
    },
    doctorInfo: {
        alignItems: 'center',
        width: '100%',
    },
    doctorName: {
        fontSize: theme.typography.small.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: 2,
    },
    experience: {
        fontSize: theme.typography.small.fontSize - 2,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        padding: theme.spacing.lg,
    },
    noDoctorsText: {
        textAlign: 'center',
        color: theme.colors.textSecondary,
        fontStyle: 'italic',
        padding: theme.spacing.lg,
    },
});

export default DoctorSelection;