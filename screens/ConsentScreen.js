import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function ConsentScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Consent & Privacy Notice</Text>
        <Text style={styles.text}>
          By proceeding, you consent to SmartHealth collecting and processing your health data for care and analytics in compliance with privacy laws.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Demographics')}>
          <Text style={styles.buttonText}>I Accept</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#EEF2FF' },
  title: { fontSize: 22, fontWeight: '700', color: '#1E3A8A', marginBottom: 20 },
  text: { fontSize: 15, lineHeight: 22, marginBottom: 30 },
  button: { backgroundColor: '#4F46E5', padding: 15, borderRadius: 12 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
