// navigation/AppointmentStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManageAppointmentScreen from '../screen/appointment/ManageAppointment';
import CancelAppointment from '../screen/appointment/CancelAppointmentScreen';
import ViewAppointments from '../screen/appointment/ViewAppointmentsScreen';
import ScheduleAppointmentScreen from '../screen/appointment/ScheduleAppointmentScreen';
import AppointmentConfirmationScreen from '../screen/appointment/AppointmentConfirmationScreen';
import BookingConfirmationScreen from '../screen/appointment/AppointmentConfirmationScreen';

const Stack = createStackNavigator();

const AppointmentStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="ManageAppointment"
                component={ManageAppointmentScreen}
            />
            <Stack.Screen
                name="ScheduleAppointment"
                component={ScheduleAppointmentScreen}
            />
            <Stack.Screen
                name="ViewAppointments"
                component={ViewAppointments}
            />
            <Stack.Screen
                name="CancelAppointment"
                component={CancelAppointment}
            />
            <Stack.Screen
                name="BookingConfirmation"
                component={BookingConfirmationScreen}
            />
        </Stack.Navigator>
    );
};

export default AppointmentStackNavigator;