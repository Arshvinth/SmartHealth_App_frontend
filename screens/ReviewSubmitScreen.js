import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { registerPatient } from '../patientApi.js';

export default function ReviewSubmitScreen({ route, navigation }) {
  const { patient, history } = route.params;

  const handleSubmit = async () => {
    try {
      const payload = { ...patient, medicalHistory: history };
      const res = await registerPatient(payload);
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Success', { patient: res.patient });
    } catch (err) {
      Alert.alert('Error', 'Registration failed.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Review & Submit</Text>
      <Text>{JSON.stringify({ ...patient, medicalHistory: history }, null, 2)}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  button: { backgroundColor: '#10B981', padding: 15, borderRadius: 10, marginTop: 20 },
  buttonText: { color: '#fff', textAlign: 'center' },
});
