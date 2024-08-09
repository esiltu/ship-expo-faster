import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons if not already installed

const CustomCheckbox = ({ checked, onChange }) => {
    return (
        <TouchableOpacity
            style={[styles.checkbox, checked ? styles.checked : styles.unchecked]}
            onPress={onChange}
        >
            {checked && <Ionicons name="checkmark-sharp" size={24} color="#FFF" />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checked: {
        backgroundColor: '#007BFF',
    },
    unchecked: {
        backgroundColor: '#FFF',
    },
});

export default CustomCheckbox;
