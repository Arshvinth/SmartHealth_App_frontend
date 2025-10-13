import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScanQr from '../screens/scanQR'; 
import PatientReport from '../screens/patientReport'; 
import EditPatientRecord from '../screens/EditPatientRecord'; 
import staffProfile from '../screens/staffProfile'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Dummy Screens
const DummyScreen = ({ title }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>{title} Screen</Text>
  </View>
);

// --- SCAN TAB SCREENS ---
const ScanMainScreen = ({ navigation }) => (
  <View style={styles.screenContainer}>
    <TouchableOpacity
      style={styles.scanButton}
      onPress={() => navigation.navigate('ScanQr')}
    >
      <Text style={styles.scanButtonText}>Scan QR</Text>
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
        component={PatientReport} // ✅ Add PatientReport screen
        options={{ headerTitle: 'Patient Report', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="EditPatientRecord"
        component={EditPatientRecord} // ✅ Add PatientReport screen
        options={{ headerTitle: 'Patient Report', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="staffProfile"
        component={staffProfile} // ✅ Add PatientReport screen
        options={{ headerTitle: 'Staff Profile', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  );
}
// Custom Tab Bar
const CustomTabBar = ({ state, navigation }) => {
  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          let icon;
          if (route.name === 'Scan')
            icon = <Ionicons name="scan" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;
          else if (route.name === 'Reports')
            icon = <MaterialIcons name="description" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;
          else if (route.name === 'Profile')
            icon = <Ionicons name="person" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;

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
                  color: isFocused ? '#1E90FF' : 'gray',
                  fontSize: 12,
                  marginTop: 3,
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
export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // we handle headers in stacks
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Scan" component={ScanStack} />
      <Tab.Screen name="Reports" children={() => <DummyScreen title="Reports" />} />
      <Tab.Screen name="Profile" component={staffProfile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    height: 65,
    backgroundColor: '#F6F1F1',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#AFD3E2',
    paddingBottom: Platform.OS === 'android' ? 10 : 0,
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
    backgroundColor: '#F6F1F1',
  },
  screenText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#146C94',
  },
  scanButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
