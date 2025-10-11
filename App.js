import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import PatientBottomTabs from './navigation/patientBottomTabs';


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        ...MaterialIcons.font, // preload MaterialIcons
      });
      setFontsLoaded(true);
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
          name="PatientBottomTabs"
          component={PatientBottomTabs}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

