import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomListItem = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        backgroundColor: '#FFF',
    },
    title: {
        fontSize: 16,
    },
});

export default CustomListItem;
