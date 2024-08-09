import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';

const CustomSwitch = ({ value, onValueChange }) => {
    return (
        <View style={styles.container}>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: "#767577", true: "#007BFF" }}
                thumbColor={value ? "#FFF" : "#FFF"}
                ios_backgroundColor="#3e3e3e"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});

export default CustomSwitch;
