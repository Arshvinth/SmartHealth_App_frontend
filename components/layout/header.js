import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Header = () => {
  return (
    <LinearGradient 
      colors={['#19A7CE', '#146C94']}
      style={styles.header}
    >
      <Text style={styles.title}>Smart HealthCare</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    height:70,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4, 
  },
  title: {
    color: '#F6F1F1',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
});

export default Header;
