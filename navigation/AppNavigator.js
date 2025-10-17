import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import ConsentScreen from '../screens/ConsentScreen';
import DemographicsScreen from '../screens/DemographicsScreen';
import MedicalHistoryScreen from '../screens/MedicalHistoryScreen';
import ReviewSubmitScreen from '../screens/ReviewSubmitScreen';
import SuccessScreen from '../screens/SuccessScreen';
import PatientBottomTabs from '../navigation/patientBottomTabs';
import staffBottomTabs from '../navigation/staffBottomTabs';
import loginScreen from '../screens/loginPortal/loginPage';
import MedicalCard from '../screens/MedicalRecordCard';
import staffReportScreen from '../screens/staffReportScreen';
import ScheduleAppointmentScreen from '../screens/appointment/ScheduleAppointmentScreen';
import BookingConfirmationScreen from '../screens/appointment/AppointmentConfirmationScreen';
import CancelAppointmentScreen from '../screens/appointment/CancelAppointmentScreen';
import AppointmentsListScreen from '../screens/appointment/ViewAppointmentsScreen';
import ManageAppointmentScreen from '../screens/appointment/ManageAppointment';
import AppointmentProfile from '../screens/appointment/appointmentProfile';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Consent" component={ConsentScreen} />
        <Stack.Screen name="Demographics" component={DemographicsScreen} />
        <Stack.Screen name="MedicalHistory" component={MedicalHistoryScreen} />
        <Stack.Screen name="ReviewSubmit" component={ReviewSubmitScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
        <Stack.Screen name="MedicalCard" component={MedicalCard} />
        <Stack.Screen
          name="loginScreen"
          component={loginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="staffBottomTabs"
          component={staffBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientBottomTabs"
          component={PatientBottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="staffReportScreen"
          component={staffReportScreen}
          options={{ headerShown: false }}
        />
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
    </NavigationContainer>
  );
}
