import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default CustomHeader;
