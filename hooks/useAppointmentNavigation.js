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
    const navigateToConfirm = () => {
        navigation.navigate('BookingConfirmation');
    };

    return {
        navigateToSchedule,
        navigateToView,
        navigateToCancel,
        navigateToConfirm
    };
};