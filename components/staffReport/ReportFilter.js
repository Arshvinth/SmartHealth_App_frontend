import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { theme } from "../../theme";

const ReportFilter = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState("This Month");
  const [department, setDepartment] = useState("All");
  const [patientType, setPatientType] = useState("All");

  const handleFilterChange = (key, value) => {
    const newFilters = {
      dateRange,
      department,
      patientType,
      [key]: value,
    };
    if (onFilterChange) onFilterChange(newFilters);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Filter Reports</Text>

      {/* Date Range */}
      <View style={styles.filterRow}>
        <Text style={styles.label}>Date Range</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={dateRange}
            onValueChange={(value) => {
              setDateRange(value);
              handleFilterChange("dateRange", value);
            }}
            style={styles.picker}
            dropdownIconColor={theme.colors.primary}
          >
            <Picker.Item label="Today" value="Today" />
            <Picker.Item label="This Week" value="This Week" />
            <Picker.Item label="This Month" value="This Month" />
            <Picker.Item label="Custom" value="Custom" />
          </Picker>
        </View>
      </View>

      {/* Department */}
      <View style={styles.filterRow}>
        <Text style={styles.label}>Department</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={department}
            onValueChange={(value) => {
              setDepartment(value);
              handleFilterChange("department", value);
            }}
            style={styles.picker}
            dropdownIconColor={theme.colors.primary}
          >
            <Picker.Item label="All Departments" value="All" />
            <Picker.Item label="Cardiology" value="Cardiology" />
            <Picker.Item label="Radiology" value="Radiology" />
            <Picker.Item label="Pediatrics" value="Pediatrics" />
          </Picker>
        </View>
      </View>

      {/* Patient Type */}
      <View style={styles.filterRow}>
        <Text style={styles.label}>Patient Type</Text>
        <View style={styles.dropdownContainer}>
          <Picker
            selectedValue={patientType}
            onValueChange={(value) => {
              setPatientType(value);
              handleFilterChange("patientType", value);
            }}
            style={styles.picker}
            dropdownIconColor={theme.colors.primary}
          >
            <Picker.Item label="All Patients" value="All" />
            <Picker.Item label="In-Patient" value="In-Patient" />
            <Picker.Item label="Out-Patient" value="Out-Patient" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    marginHorizontal: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  heading: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
    color: theme.colors.primary,
  },
  filterRow: {
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.body,
    fontWeight: "600",
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  dropdownContainer: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },
  picker: {
    height: 49,
    color: theme.colors.textPrimary,
  },
});

export default ReportFilter;