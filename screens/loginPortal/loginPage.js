import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // 
import { theme } from '../../theme';
import { API_BASE_URL } from '../../config';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedPassword) {
            setError('Please enter both username and password.');
            return;
        }

        setError('');

        try {
            const response = await fetch(`${API_BASE_URL}/api/staff/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
            });

            const data = await response.json();

            if (data.success) {
                const role = data.staff.role.toLowerCase();
                if (role === 'nurse') {
                    Alert.alert('Success', 'Login successful! Redirecting to Nurse Dashboard...');
                    navigation.replace('staffBottomTabs', { staff: data.staff });
                } else if (role === 'manager') {
                    Alert.alert('Success', 'Login successful! Redirecting to Home...');
                    navigation.replace('staffReportScreen'); 
                }
            } else {
                Alert.alert('Failed', data.message || 'Invalid username or password.');
            }
        } catch (err) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
            console.error(err);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            {/* Back Arrow */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => navigation.navigate('Welcome')}
            >
                <Ionicons name="arrow-back" size={28} color={theme.colors.primary} />
            </TouchableOpacity>

            <View style={styles.card}>
                <Text style={styles.title}>Welcome Back</Text>
                {error ? <Text style={styles.error}>{error}</Text> : null}

                <Text style={styles.label}>Username</Text>
                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                    style={styles.input}
                    placeholderTextColor={theme.colors.textSecondary}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor={theme.colors.textSecondary}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Logo */}
            <Image
                source={require('../../assets/AppImages/SmartHealthLogo2.png')}
                style={styles.logo}
                resizeMode="contain"
            />
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        backgroundColor: 'transparent',
    },
    logo: {
        width: 120,
        height: 120,
        marginTop: 30,
        borderRadius: 50,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.xl,
        borderRadius: theme.radius.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        ...theme.typography.h2,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
        color: theme.colors.primary,
    },
    label: {
        ...theme.typography.body,
        marginBottom: theme.spacing.xs,
        marginTop: theme.spacing.sm,
        color: theme.colors.textPrimary,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.sm,
        fontSize: theme.typography.body.fontSize,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.md,
    },
    button: {
        marginTop: theme.spacing.lg,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.radius.md,
        alignItems: 'center',
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: theme.typography.body.fontSize,
    },
    error: {
        color: theme.colors.error,
        marginBottom: theme.spacing.sm,
        textAlign: 'center',
        ...theme.typography.body,
    },
});
