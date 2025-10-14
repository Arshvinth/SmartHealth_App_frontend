import React, { useState } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Layout from "../components/layout/layout";

export default function PatientReport({ route }) {
  const navigation = useNavigation();

  return (
    <Layout title="Reports and Analytics">
    <ScrollView
      contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}
    >
      <Text>Recordss...</Text>     
    </ScrollView>
    </Layout>
  );
}

