import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const CustomProgressBar = ({ visible }) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.text}>Loading...</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default CustomProgressBar;
