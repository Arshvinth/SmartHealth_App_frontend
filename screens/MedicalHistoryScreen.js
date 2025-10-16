import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function MedicalHistoryScreen({ route, navigation }) {
  const { patient } = route.params;
  const [history, setHistory] = useState({ allergies: '', chronicConditions: '', medications: '', bloodGroup: '' });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Medical History</Text>
      {Object.keys(history).map((key) => (
        <TextInput
          key={key}
          placeholder={key}
          value={history[key]}
          onChangeText={(t) => setHistory({ ...history, [key]: t })}
          style={styles.input}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReviewSubmit', { patient, history })}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#A5B4FC', borderRadius: 10, padding: 12, marginBottom: 15 },
  button: { backgroundColor: '#4F46E5', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', textAlign: 'center' },
});
