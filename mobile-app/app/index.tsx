import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert
} from 'react-native';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Simple validation - accept any non-empty email/password
        if (email.trim() && password.trim()) {
            setIsLoggedIn(true);
        } else {
            Alert.alert('Error', 'Please enter both email and password');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
    };

    if (isLoggedIn) {
        return (
            <View style={styles.container} testID="dashboard-screen">
                <View style={styles.dashboardContent}>
                    <Text style={styles.title} testID="dashboard-title">Dashboard</Text>
                    <Text style={styles.welcomeText} testID="welcome-text">
                        Welcome back! 👋
                    </Text>
                    <View style={styles.dashboardCard}>
                        <Text style={styles.cardText}>You are now logged in</Text>
                        <Text style={styles.cardSubtext}>Email: {email}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={handleLogout}
                        testID="logout-button"
                    >
                        <Text style={styles.buttonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            testID="login-screen"
        >
            <View style={styles.loginContent}>
                <Text style={styles.title} testID="login-title">Login</Text>
                <Text style={styles.subtitle}>Welcome back! Please login to continue</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        testID="email-input"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        testID="password-input"
                    />
                </View>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    testID="login-button"
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    loginContent: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    dashboardContent: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    loginButton: {
        backgroundColor: '#007AFF',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    welcomeText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
    dashboardCard: {
        backgroundColor: '#f0f7ff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    cardSubtext: {
        fontSize: 14,
        color: '#666',
    },
});