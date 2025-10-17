import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { theme } from '../../assets/theme';

const PatientForm = ({ onSubmit, onBack, appointmentData }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        reason: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('Cash');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            Alert.alert('Error', 'Please fix the validation errors before submitting');
            return;
        }

        // Create the patientInfo object with correct field names
        const patientInfo = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim()
        };

        const completeAppointmentData = {
            ...appointmentData,
            patientInfo: patientInfo,
            paymentMethod: paymentMethod
        };

        console.log('✅ Submitting appointment data:', completeAppointmentData);
        onSubmit(completeAppointmentData);
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const paymentMethods = [
        { id: 'Cash', name: '💵 Cash', description: 'Pay at hospital counter' },
        { id: 'Card', name: '💳 Card', description: 'Secure online payment' },
        { id: 'Insurance', name: '🏥 Insurance', description: 'Bill to insurance provider' }
    ];

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Patient Information</Text>

            <View style={styles.appointmentSummary}>
                <Text style={styles.summaryTitle}>Appointment Summary</Text>
                <Text style={styles.summaryText}>Doctor: {appointmentData.doctor?.name}</Text>
                <Text style={styles.summaryText}>Hospital: {appointmentData.hospital?.name}</Text>
                <Text style={styles.summaryText}>Date: {appointmentData.schedule?.scheduleDate}</Text>
                <Text style={styles.summaryText}>Time: {appointmentData.schedule?.startTime}</Text>
                <Text style={styles.summaryText}>Total Charge: Rs. {appointmentData.hospital?.totalCharge}</Text>
            </View>

            {/* Name Field */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                    style={[
                        styles.input,
                        errors.name && styles.inputError
                    ]}
                    value={formData.name}
                    onChangeText={(text) => updateFormData('name', text)}
                    placeholder="Enter your full name"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            {/* Email Field */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                    style={[
                        styles.input,
                        errors.email && styles.inputError
                    ]}
                    value={formData.email}
                    onChangeText={(text) => updateFormData('email', text)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Phone Field */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Phone Number *</Text>
                <TextInput
                    style={[
                        styles.input,
                        errors.phone && styles.inputError
                    ]}
                    value={formData.phone}
                    onChangeText={(text) => updateFormData('phone', text)}
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    maxLength={10}
                />
                {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
            </View>

            {/* Payment Method Selection */}
            <View style={styles.paymentSection}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <Text style={styles.paymentDescription}>
                    Choose how you would like to pay for your appointment
                </Text>

                {paymentMethods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.paymentOption,
                            paymentMethod === method.id && styles.paymentOptionSelected
                        ]}
                        onPress={() => setPaymentMethod(method.id)}
                    >
                        <View style={styles.paymentOptionContent}>
                            <View style={styles.paymentRadio}>
                                <View style={[
                                    styles.radioCircle,
                                    paymentMethod === method.id && styles.radioCircleSelected
                                ]}>
                                    {paymentMethod === method.id && <View style={styles.radioInner} />}
                                </View>
                            </View>
                            <View style={styles.paymentInfo}>
                                <Text style={styles.paymentName}>{method.name}</Text>
                                <Text style={styles.paymentDescription}>{method.description}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Payment Status Note */}
            {paymentMethod === 'Cash' && (
                <View style={styles.paymentNote}>
                    <Text style={styles.paymentNoteText}>
                        💡 <Text style={styles.paymentNoteBold}>Cash Payment:</Text> Payment will be collected when you visit the hospital. Your appointment is confirmed.
                    </Text>
                </View>
            )}

            {/* Reason Field (Optional) */}
            <View style={styles.formGroup}>
                <Text style={styles.label}>Reason for Visit (Optional)</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={formData.reason}
                    onChangeText={(text) => updateFormData('reason', text)}
                    placeholder="Briefly describe the reason for your visit"
                    multiline
                    numberOfLines={3}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.backButton} onPress={onBack}>
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>
                        Confirm Appointment {paymentMethod !== 'Cash' && '& Pay'}
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        marginBottom: theme.spacing.md,
        color: theme.colors.textPrimary,
    },
    appointmentSummary: {
        backgroundColor: theme.colors.background,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        marginBottom: theme.spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: theme.colors.primary,
    },
    summaryTitle: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: 'bold',
        marginBottom: theme.spacing.sm,
        color: theme.colors.textPrimary,
    },
    summaryText: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
    },
    formGroup: {
        marginBottom: theme.spacing.md,
    },
    label: {
        fontSize: theme.typography.small.fontSize,
        fontWeight: '600',
        marginBottom: theme.spacing.sm,
        color: theme.colors.textPrimary,
    },
    input: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.sm,
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textPrimary,
    },
    inputError: {
        borderColor: theme.colors.error,
        borderWidth: 2,
    },
    errorText: {
        color: theme.colors.error,
        fontSize: theme.typography.small.fontSize,
        marginTop: 4,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    // Payment Section Styles
    paymentSection: {
        marginBottom: theme.spacing.lg,
    },
    paymentDescription: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.md,
    },
    paymentOption: {
        backgroundColor: theme.colors.surface,
        borderWidth: 2,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.sm,
    },
    paymentOptionSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary + '10',
    },
    paymentOptionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentRadio: {
        marginRight: theme.spacing.md,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        borderColor: theme.colors.primary,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentName: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: 2,
    },
    paymentDescription: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
    },
    paymentNote: {
        backgroundColor: '#e3f2fd',
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        marginBottom: theme.spacing.lg,
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    paymentNoteText: {
        fontSize: theme.typography.small.fontSize,
        color: '#1976D2',
        lineHeight: 18,
    },
    paymentNoteBold: {
        fontWeight: '600',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    backButton: {
        flex: 1,
        backgroundColor: theme.colors.textSecondary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
    },
    submitButton: {
        flex: 2,
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
    },
    backButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    submitButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
});

export default PatientForm;