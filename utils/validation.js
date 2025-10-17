// utils/validation.js

import { Alert } from "react-native";

export const validateDemographics = (data) => {
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const nicRegex = /^[0-9]{9}[VvXx]$|^[A-Z0-9]{6,}$/;
  const phoneRegex = /^\+?[0-9]{9,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.fullName || !nameRegex.test(data.fullName)) {
    Alert.alert(
      "Invalid Full Name",
      "Please enter a valid name (letters only)."
    );
    return false;
  }

  if (!data.nicOrPassport || !nicRegex.test(data.nicOrPassport)) {
    Alert.alert(
      "Invalid NIC/Passport",
      "Please enter a valid NIC or Passport number."
    );
    return false;
  }

  const isValidDate = (str) =>
    /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str).getTime());

  if (!data.dob || !isValidDate(data.dob)) {
    Alert.alert("Invalid DOB", "Enter a valid date in YYYY-MM-DD format.");
    return false;
  }

  const dobDate = new Date(data.dob);
  const today = new Date();
  if (dobDate > today) {
    Alert.alert("Invalid DOB", "Date of birth cannot be in the future.");
    return false;
  }

  if (!data.phone || !phoneRegex.test(data.phone)) {
    Alert.alert("Invalid Phone Number", "Enter a valid phone number.");
    return false;
  }

  if (data.email && !emailRegex.test(data.email)) {
    Alert.alert("Invalid Email", "Enter a valid email address.");
    return false;
  }

  if (
    data.sex &&
    !["male", "female", "other"].includes(data.sex.toLowerCase().trim())
  ) {
    Alert.alert("Invalid Gender", "Gender must be Male, Female, or Other.");
    return false;
  }

  if (data.emergencyContact && data.emergencyContact.length < 3) {
    Alert.alert(
      "Invalid Emergency Contact",
      "Please enter a valid emergency contact (name and phone)."
    );
    return false;
  }

  return true;
};
