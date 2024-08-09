import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, backgroundColor, textColor }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: backgroundColor || '#007BFF' }]}
            onPress={onPress}
        >
            <Text style={[styles.text, { color: textColor || '#FFF' }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomButton;
