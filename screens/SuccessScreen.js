import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function SuccessScreen({ route, navigation }) {
  const { patient } = route.params;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/success.png')} style={styles.image} />

      <Text style={styles.title}>Account Created!</Text>
      <Text style={styles.text}>Patient ID: {patient.patientId}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ECFDF5', padding: 20 },
  image: { width: 150, height: 150, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#16A34A' },
  text: { fontSize: 16, marginVertical: 10 },
  button: { backgroundColor: '#4F46E5', padding: 15, borderRadius: 12, marginTop: 20, width: '80%' },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
});
