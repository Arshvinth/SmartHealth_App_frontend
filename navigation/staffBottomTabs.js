import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScanQr from '../screens/staffPortal/scanQR';
import PatientReport from '../screens/staffPortal/patientReport';
import AddPatientRecord from '../screens/staffPortal/addPatientRecord';
import StaffProfile from '../screens/staffPortal/staffProfile';
import UpdateVitals from '../screens/staffPortal/updateVitals';
import PatientMedicalRecords from '../screens/staffPortal/patientAllReports';
import patientAllMedicalRecords from '../screens/staffPortal/patientAllReports';
import { theme } from '../theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Dummy Screens
const DummyScreen = ({ title }) => (
  <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
    <Text style={{ ...theme.typography.h2, color: theme.colors.textPrimary }}>{title} Screen</Text>
  </View>
);

// --- SCAN TAB SCREENS ---
const ScanMainScreen = ({ navigation }) => (
  <View style={[styles.screenContainer, { backgroundColor: theme.colors.background }]}>
    <TouchableOpacity
      style={[styles.scanButton, { backgroundColor: theme.colors.primary, borderRadius: theme.radius.md }]}
      onPress={() => navigation.navigate('ScanQr')}
    >
      <Text style={{ ...theme.typography.h2, color: theme.colors.surface }}>Scan QR</Text>
    </TouchableOpacity>
  </View>
);

// Stack for Scan tab (to allow navigation inside it)
function ScanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ScanMain"
        component={ScanMainScreen}
        options={{ headerTitle: 'Scan', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ScanQr"
        component={ScanQr}
        options={{ headerTitle: 'QR Scanner', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="PatientReport"
        component={PatientReport}
        options={{ headerTitle: 'Patient Report', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="UpdateVitals"
        component={UpdateVitals}
        options={{ headerTitle: 'Update Vitals', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="AddPatientRecord"
        component={AddPatientRecord}
        options={{ headerTitle: 'Add Report', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="staffProfile"
        component={StaffProfile}
        options={{ headerTitle: 'Staff Profile', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="patientMedicalRecords"
        component={PatientMedicalRecords}
        options={{ headerTitle: 'Past Medical Records', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="patientAllMedicalRecords"
        component={patientAllMedicalRecords}
        options={{ headerTitle: 'Past Reports', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}

// Custom Tab Bar
const CustomTabBar = ({ state, navigation }) => {
  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: theme.colors.surface }}>
      <View style={[styles.tabContainer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          let icon;
          const color = isFocused ? theme.colors.primary : 'gray';

          if (route.name === 'Scan')
            icon = <Ionicons name="scan" size={26} color={color} />;
          else if (route.name === 'Reports')
            icon = <MaterialIcons name="description" size={26} color={color} />;
          else if (route.name === 'Profile')
            icon = <Ionicons name="person" size={26} color={color} />;

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabButton}
              onPress={onPress}
              activeOpacity={0.7}
            >
              {icon}
              <Text
                style={{
                  color,
                  fontSize: 12,
                  marginTop: theme.spacing.xs,
                }}
              >
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

// Bottom Tabs
export default function BottomTabs({ route }) {
  const staff = route.params?.staff;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Scan" component={ScanStack} />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: true }}
      >
        {(props) => <StaffProfile {...props} staff={staff} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 65,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingBottom: Platform.OS === 'android' ? theme.spacing.sm : 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
});
