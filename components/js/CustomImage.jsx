import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const CustomImage = ({ source, style }) => {
    return (
        <View style={styles.container}>
            <Image source={source} style={[styles.image, style]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
});

export default CustomImage;
