import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
     <AppNavigator />
  );
}
