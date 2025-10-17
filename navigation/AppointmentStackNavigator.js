// navigation/AppointmentStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManageAppointmentScreen from '../screens/appointment/ManageAppointment';

import CancelAppointment from '../screens/appointment/CancelAppointmentScreen';
import ViewAppointments from '../screens/appointment/ViewAppointmentsScreen';
import ScheduleAppointmentScreen from '../screens/appointment/ScheduleAppointmentScreen';
import AppointmentConfirmationScreen from '../screens/appointment/AppointmentConfirmationScreen';
import BookingConfirmationScreen from '../screens/appointment/AppointmentConfirmationScreen';
import CancelAppointmentScreen from '../screens/appointment/CancelAppointmentScreen';
import AppointmentsListScreen from '../screens/appointment/ViewAppointmentsScreen';
import AppointmentProfile from '../screens/appointment/appointmentProfile';

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
                component={AppointmentsListScreen}
            />
            <Stack.Screen
                name="CancelAppointment"
                component={CancelAppointmentScreen}
            />
            <Stack.Screen
                name="BookingConfirmation"
                component={BookingConfirmationScreen}
            />
            <Stack.Screen
                name="AppointmentProfile"
                component={AppointmentProfile}
            />
        </Stack.Navigator>
    );
};

export default AppointmentStackNavigator;