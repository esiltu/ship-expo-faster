import React from 'react';
import { View, Slider, StyleSheet, Text } from 'react-native';

const CustomSlider = ({ value, onValueChange, minimumValue, maximumValue }) => {
    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                value={value}
                onValueChange={onValueChange}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                minimumTrackTintColor="#007BFF"
                maximumTrackTintColor="#CCC"
                thumbTintColor="#007BFF"
            />
            <Text style={styles.valueText}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    slider: {
        width: '100%',
    },
    valueText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default CustomSlider;
