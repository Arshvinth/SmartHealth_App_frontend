// navigation/AppointmentStackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManageAppointmentScreen from '../screens/appointment/ManageAppointment';
import CancelAppointment from '../screens/appointment/CancelAppointmentScreen';
import ViewAppointments from '../screens/appointment/ViewAppointmentsScreen';
import ScheduleAppointmentScreen from '../screens/appointment/ScheduleAppointmentScreen';

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
        </Stack.Navigator>
    );
};

export default AppointmentStackNavigator;