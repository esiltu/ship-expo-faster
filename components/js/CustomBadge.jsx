import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomBadge = ({ text, backgroundColor, textColor }) => {
    return (
        <View style={[styles.badge, { backgroundColor: backgroundColor || '#FF6347' }]}>
            <Text style={[styles.text, { color: textColor || '#FFF' }]}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default CustomBadge;
