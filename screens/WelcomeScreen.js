import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
<Image source={require('../assets/healthcare.jpeg')} style={styles.image} />
      <Text style={styles.title}>Welcome to SmartHealth</Text>
      <Text style={styles.subtitle}>Your digital health begins here</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Consent')}>
        <Text style={styles.buttonText}>Register Patient Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEF2FF', padding: 20 },
  image: { width: 180, height: 180, marginBottom: 30 },
  title: { fontSize: 26, fontWeight: '700', color: '#1E3A8A' },
  subtitle: { fontSize: 16, textAlign: 'center', marginVertical: 10 },
  button: { backgroundColor: '#4F46E5', padding: 15, borderRadius: 12, marginTop: 20, width: '80%' },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
});
