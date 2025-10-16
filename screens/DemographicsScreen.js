import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { checkDuplicate } from '../patientApi.js';

export default function DemographicsScreen({ navigation }) {
  const [data, setData] = useState({
    fullName: '', nicOrPassport: '', dob: '', sex: '', address: '', phone: '', email: ''
  });

  const handleNext = async () => {
  console.log("NEXT button pressed");
  if (!data.fullName || !data.nicOrPassport || !data.dob) {
    console.log("Missing fields:", data);
    return Alert.alert('Missing Fields', 'Please complete all required fields.');
  }
  
  try {
    console.log("Checking duplicate...");
    const result = await checkDuplicate(data);
    console.log("Duplicate check result:", result);

    if (result?.isDuplicate) {
      console.log("Duplicate found");
      return Alert.alert('Duplicate Found', `Reason: ${result.reason}`);
    }

    console.log("Navigating to MedicalHistory...");
    navigation.navigate('MedicalHistory', { patient: data });
  } catch (err) {
    console.error("Error in handleNext:", err);
    Alert.alert('Error', 'Something went wrong.');
  }
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Demographics</Text>
      {Object.keys(data).map((field) => (
        <TextInput
          key={field}
          placeholder={field}
          value={data[field]}
          onChangeText={(t) => setData({ ...data, [field]: t })}
          style={styles.input}
        />
      ))}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
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
