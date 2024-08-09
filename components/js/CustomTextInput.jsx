import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ value, onChangeText, placeholder }) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#999"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    input: {
        height: 40,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
});

export default CustomTextInput;
