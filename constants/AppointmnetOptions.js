export const APPOINTMENT_OPTIONS = [
    {
        id: 1,
        title: 'Schedule Appointment',
        description: 'Book a new appointment with your doctor',
        icon: 'calendar-sharp',
        iconLibrary: 'Ionicons',
        iconColor: '#4FC3F7',
        onPress: 'navigateToSchedule',
    },
    {
        id: 2,
        title: 'View Appointments',
        description: 'Check your upcoming and past appointments',
        icon: 'eye',
        iconLibrary: 'Ionicons',
        iconColor: '#4FC3F7',
        onPress: 'navigateToView',
    },
    {
        id: 3,
        title: 'Cancel Appointment',
        description: 'Cancel or reschedule existing appointments',
        icon: 'cancel',
        iconLibrary: 'MaterialIcons',
        iconColor: '#E57373',
        onPress: 'navigateToCancel',
    },
];