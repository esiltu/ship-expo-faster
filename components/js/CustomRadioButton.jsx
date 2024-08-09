import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons if not already installed

const CustomRadioButton = ({ selected, label, onSelect }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onSelect}>
            <View style={styles.radioButton}>
                {selected && <Ionicons name="radio-button-on" size={24} color="#007BFF" />}
                {!selected && <Ionicons name="radio-button-off" size={24} color="#007BFF" />}
            </View>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    radioButton: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
});

export default CustomRadioButton;
