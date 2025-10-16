import { useNavigation } from '@react-navigation/native';

export const useAppointmentNavigation = () => {
    const navigation = useNavigation();

    const navigateToSchedule = () => {
        navigation.navigate('ScheduleAppointment');
    };

    const navigateToView = () => {
        navigation.navigate('ViewAppointments');
    };

    const navigateToCancel = () => {
        navigation.navigate('CancelAppointment');
    };

    return {
        navigateToSchedule,
        navigateToView,
        navigateToCancel,
    };
};