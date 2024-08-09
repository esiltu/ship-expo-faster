import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomButtonLinear = ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomButtonLinear;
