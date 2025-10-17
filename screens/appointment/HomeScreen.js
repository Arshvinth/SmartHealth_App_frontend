import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { theme } from '../../assets/theme';
import { useScheduleData } from '../../hooks/useScheduleData';
import { AppointmentService } from '../../services/api/appointmentService';
import { useAppointmentNavigation } from '../../hooks/useAppointmentNavigation';
import Greeting from '../../components/Greeting';


const HomeScreen = ({ navigation }) => {

    const { navigateToSchedule, navigateToView } = useAppointmentNavigation();
    const [appointments, setAppointments] = useState([]);
    const [nextAppointment, setNextAppointment] = useState(null);
    const appointmentService = new AppointmentService();
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

    useEffect(() => {
        loadDoctors();
        loadAppointments();
        console.log(doctors);
    }, []);


    const loadAppointments = async () => {
        try {

            // Replace with actual user ID from auth context
            const userId = '68efe6401c0f65de24140471';
            const userAppointments = await appointmentService.getUserAppointments(userId);
            setAppointments(userAppointments || []);
            findNextAppointment(userAppointments);
        } catch (error) {
            console.error('Failed to load appointments:', error);
            Alert.alert('Error', 'Failed to load appointments');
        }
    };

    const findNextAppointment = (appointments) => {
        if (!appointments || appointments.length === 0) {
            setNextAppointment(null);
            return;
        }

        const now = new Date();
        const upcomingAppointments = appointments.filter(apt => {
            // Parse appointment date and time
            const appointmentDate = new Date(apt.date);
            return appointmentDate > now;
        });

        upcomingAppointments.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (upcomingAppointments.length > 0) {
            const nextApt = upcomingAppointments[0];
            setNextAppointment({
                doctor: nextApt.doctor?.name || 'Doctor',
                specialization: nextApt.doctor?.specialization || 'Specialization',
                time: formatTime(nextApt.time || nextApt.startTime),
                date: formatDate(nextApt.date),
                type: nextApt.doctor?.specialization || 'General',
                hospital: nextApt.hospital?.name || 'Hospital',
                charges: nextApt.charges || '0',
                status: nextApt.status || 'scheduled'
            });
        } else {
            setNextAppointment(null);
        }
    };

    const formatTime = (timeString) => {
        if (!timeString) return '10:00 AM';

        // Handle different time formats
        if (timeString.includes(':')) {
            const [hours, minutes] = timeString.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        }
        return timeString;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Today';

        const appointmentDate = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (appointmentDate.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return appointmentDate.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });
        }
    };

    // Mock user data
    const user = {
        name: 'Dini Gamage',
        nextAppointment: {
            doctor: 'Dr. Fernando',
            time: '10:30 AM',
            date: 'Today',
            type: 'Cardiology'
        }
    };

    // Quick actions
    const quickActions = [
        {
            id: 1,
            title: 'Book Appointment',
            description: 'Schedule with a specialist',
            icon: 'calendar',
            iconType: 'Ionicons',
            color: theme.colors.primary,
            onPress: () => navigation.navigate('Appointments', {
                screen: 'ScheduleAppointment'
            }),
        },
        {
            id: 2,
            title: 'My Health',
            description: 'View health records',
            icon: 'heart-pulse',
            iconType: 'MaterialCommunityIcons',
            color: theme.colors.error,
            onPress: () => navigation.navigate('HealthRecords'),
        },
        {
            id: 3,
            title: 'Medications',
            description: 'Manage prescriptions',
            icon: 'pills',
            iconType: 'FontAwesome5',
            color: theme.colors.warning,
            onPress: () => navigation.navigate('Medications'),
        },
        {
            id: 4,
            title: 'Emergency',
            description: 'Quick emergency access',
            icon: 'emergency',
            iconType: 'MaterialIcons',
            color: theme.colors.error,
            onPress: () => navigation.navigate('Emergency'),
        },
    ];

    // Health stats
    const healthStats = [
        { id: 1, title: 'Heart Rate', value: '72', unit: 'bpm', trend: 'normal' },
        { id: 2, title: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'normal' },
        { id: 3, title: 'Steps', value: '8,542', unit: 'steps', trend: 'up' },
        { id: 4, title: 'Sleep', value: '7.2', unit: 'hours', trend: 'down' },
    ];


    const renderIcon = (icon, type, color) => {
        const size = 24;
        const iconProps = { size, color };

        switch (type) {
            case 'Ionicons':
                return <Ionicons name={icon} {...iconProps} />;
            case 'MaterialIcons':
                return <MaterialIcons name={icon} {...iconProps} />;
            case 'FontAwesome5':
                return <FontAwesome5 name={icon} {...iconProps} />;
            case 'MaterialCommunityIcons':
                return <MaterialIcons name={icon} {...iconProps} />;
            default:
                return <Ionicons name="medical" {...iconProps} />;
        }
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up':
                return <Ionicons name="trending-up" size={16} color={theme.colors.success} />;
            case 'down':
                return <Ionicons name="trending-down" size={16} color={theme.colors.error} />;
            default:
                return <Ionicons name="remove" size={16} color={theme.colors.textSecondary} />;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        {/* Using the Greeting component */}
                        <Greeting
                            userName={user.name}
                            showUserName={true}
                            showAsSeparateLines={true}
                            style={styles.greetingText}
                            greetingStyle={styles.greeting}
                            nameStyle={styles.userName}
                            containerStyle={styles.greetingContainer}
                        />
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Next Appointment Card */}
                {nextAppointment ? (
                    <View style={styles.nextAppointmentCard}>
                        <View style={styles.appointmentHeader}>
                            <Text style={styles.appointmentTitle}>Next Appointment</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Appointments', {
                                screen: 'ViewAppointments'
                            })}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.appointmentContent}>
                            <View style={styles.appointmentIcon}>
                                <Ionicons name="calendar" size={24} color={theme.colors.primary} />
                            </View>
                            <View style={styles.appointmentDetails}>
                                <Text style={styles.doctorName}>{nextAppointment.doctor}</Text>
                                <Text style={styles.appointmentType}>{nextAppointment.specialization}</Text>
                                <View style={styles.appointmentTime}>
                                    <Ionicons name="time" size={14} color={theme.colors.textSecondary} />
                                    <Text style={styles.timeText}>
                                        {nextAppointment.date} • {nextAppointment.time}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.joinButton}>
                                <Text style={styles.joinButtonText}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.noAppointmentContainer}>
                        <Ionicons name="calendar-outline" size={32} color={theme.colors.textSecondary} />
                        <Text style={styles.noAppointmentText}>No upcoming appointments</Text>
                    </View>
                )}


                {/* Quick Actions Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <View style={styles.actionsGrid}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.actionscrollContainer}
                        >
                            {quickActions.map((action) => (
                                <TouchableOpacity
                                    key={action.id}
                                    style={styles.actionCard}
                                    onPress={action.onPress}
                                >
                                    <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                                        {renderIcon(action.icon, action.iconType, action.color)}
                                    </View>
                                    <Text style={styles.actionTitle}>{action.title}</Text>
                                    <Text style={styles.actionDescription}>{action.description}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                </View>

                {/* Health Stats */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Health Overview</Text>
                    <View style={styles.statsGrid}>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.actionscrollContainer}
                        >
                            {healthStats.map((stat) => (
                                <View key={stat.id} style={styles.statCard}>
                                    <View style={styles.statHeader}>
                                        <Text style={styles.statTitle}>{stat.title}</Text>
                                        {getTrendIcon(stat.trend)}
                                    </View>
                                    <View style={styles.statValueContainer}>
                                        <Text style={styles.statValue}>{stat.value}</Text>
                                        <Text style={styles.statUnit}>{stat.unit}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Recent Doctors */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Doctors</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.doctorsList}>
                        {doctors.map((doctor) => (
                            <TouchableOpacity key={doctor._id} style={styles.doctorCard}>
                                <View style={styles.doctorAvatar}>
                                    <Text style={styles.doctorAvatarText}>
                                        {doctor.name.split(' ').map(n => n[0]).join('')}
                                    </Text>
                                </View>
                                <View style={styles.doctorInfo}>
                                    <Text style={styles.doctorName}>{doctor.name}</Text>
                                    <Text style={styles.doctorSpecialization}>{doctor.specialization}</Text>
                                    <Text style={styles.lastVisit}>{doctor.lastVisit}</Text>
                                </View>
                                <TouchableOpacity style={styles.messageButton}>
                                    <Ionicons name="chatbubble" size={20} color={theme.colors.primary} />
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Health Tips */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Health Tips</Text>
                    <View style={styles.tipCard}>
                        <View style={styles.tipContent}>
                            <Text style={styles.tipTitle}>Stay Hydrated</Text>
                            <Text style={styles.tipDescription}>
                                Drink at least 8 glasses of water daily to maintain optimal health.
                            </Text>
                        </View>
                        <View style={styles.tipIcon}>
                            <Ionicons name="water" size={32} color={theme.colors.info} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,

    },
    header: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    greetingText: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.surface,
        opacity: 0.9,
        fontWeight: '500',

    },
    greeting: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.surface,
        opacity: 0.9,
    },
    userName: {
        fontSize: theme.typography.h1.fontSize,
        fontWeight: theme.typography.h1.fontWeight,
        color: theme.colors.surface,
        marginTop: theme.spacing.xs,
    },
    profileButton: {
        padding: theme.spacing.xs,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xl,
    },
    nextAppointmentCard: {
        backgroundColor: theme.colors.surface,
        margin: theme.spacing.lg,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.lg,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    appointmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    appointmentTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.textPrimary,
    },
    viewAllText: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: theme.typography.small.fontSize,
    },
    appointmentContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    appointmentIcon: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.primary + '15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    appointmentDetails: {
        flex: 1,
    },
    doctorName: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    appointmentType: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    appointmentTime: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeText: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.xs,
    },
    joinButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.sm,
    },
    joinButtonText: {
        color: theme.colors.surface,
        fontWeight: '600',
        fontSize: theme.typography.small.fontSize,
    },
    section: {
        marginHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,

    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.textPrimary,
    },
    noAppointmentContainer: {
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    noAppointmentText: {
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.md,
    },
    actionscrollContainer: {
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.md,
    },
    actionsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    actionCard: {
        width: 140,
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionIcon: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    actionTitle: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    actionDescription: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.md,
    },
    statCard: {
        width: '150',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    statTitle: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        fontWeight: '500',
    },
    statValueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.textPrimary,
        marginRight: theme.spacing.xs,
    },
    statUnit: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
    },
    doctorsList: {
        gap: theme.spacing.md,
    },
    doctorCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    doctorAvatar: {
        width: 44,
        height: 44,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.primary + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    doctorAvatarText: {
        color: theme.colors.primary,
        fontWeight: '600',
        fontSize: 16,
    },
    doctorInfo: {
        flex: 1,
    },
    doctorName: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    doctorSpecialization: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    lastVisit: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
    },
    messageButton: {
        padding: theme.spacing.sm,
    },
    tipCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.lg,
        borderRadius: theme.radius.lg,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    tipContent: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    tipTitle: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    tipDescription: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        lineHeight: 18,
    },
    tipIcon: {
        width: 56,
        height: 56,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.info + '15',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;