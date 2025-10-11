import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

// Dummy Screens
const DummyScreen = ({ title }) => (
  <View style={styles.screenContainer}>
    <Text style={styles.screenText}>{title} Screen</Text>
  </View>
);

// Custom Tab Bar
const CustomTabBar = ({ state, navigation }) => {
  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          // Define icons for each tab
          let icon;
          if (route.name === 'Home') icon = <Ionicons name="home" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;
          else if (route.name === 'Records') icon = <Ionicons name="document-text" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;
          else if (route.name === 'Appointments') icon = <MaterialIcons name="event" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;
          else if (route.name === 'Profile') icon = <Ionicons name="person" size={26} color={isFocused ? '#1E90FF' : 'gray'} />;

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
        headerShown: true,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
        },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" children={() => <DummyScreen title="Home" />} />
      <Tab.Screen name="Records" children={() => <DummyScreen title="Records" />} />
      <Tab.Screen name="Appointments" children={() => <DummyScreen title="Appointments" />} />
      <Tab.Screen name="Profile" children={() => <DummyScreen title="Profile" />} />
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
});
