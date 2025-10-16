import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import PatientBottomTabs from './navigation/patientBottomTabs';
import staffBottomTabs from './navigation/staffBottomTabs';
import loginScreen from './screens/loginPortal/loginPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          ...Ionicons.font,
          ...MaterialCommunityIcons.font,
          ...MaterialIcons.font,
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Font loading failed:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#146C94" />
      </View>
    );
  }

  // Your original navigation structure remains untouched
  return (
    <NavigationContainer>
      <Stack.Navigator>

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
        <AppNavigator />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
