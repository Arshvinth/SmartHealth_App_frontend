// src/components/appointment/ScheduleCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../assets/theme';
import { AntDesign } from '@expo/vector-icons';

const ScheduleCard = ({ schedule, selectedSchedule, onSelectSchedule }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return timeString; 
    };

    return (
        <TouchableOpacity
            style={[
                styles.scheduleCard,
                selectedSchedule?._id === schedule._id && styles.selectedCard
            ]}
            onPress={() => onSelectSchedule(schedule)}
        >
            <View>
                <AntDesign name="calendar" size={34} color={theme.colors.secondary} />
            </View>

            <View>
                <Text style={styles.date}>{formatDate(schedule.scheduleDate)}</Text>
                <Text style={styles.time}>{formatTime(schedule.startTime)}</Text>

            </View>
            <View style={styles.count}>
                <Text style={styles.availableText}>{schedule.BookedCount}</Text>

            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    scheduleCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        borderWidth: 2,
        borderColor: theme.colors.border,
        marginBottom: theme.spacing.sm,
        flexDirection: "row",
        justifyContent: "space-around",
        padding: theme.spacing.md,
        alignItems: "center"
    },
    selectedCard: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.accent + '20',
    },
    date: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    time: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '500',
        color: theme.colors.primary,
        marginBottom: theme.spacing.xs,
    },
    duration: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    availableText: {
        fontSize: theme.typography.h2.fontSize,
        color: theme.colors.success,
        fontWeight: '500',
    },
});

export default ScheduleCard;