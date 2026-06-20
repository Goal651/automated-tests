import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={{ padding: 20, marginTop: 60 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Mobile Workspace</Text>
            <TextInput
                testID="username-input"
                placeholder="Username"
                style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15 }}
            />
            <Button
                testID="login-button"
                title="Submit"
                onPress={() => { }}
            />
        </View>
    );
}
