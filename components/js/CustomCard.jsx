import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CustomCard = ({ title, imageUri, description }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: imageUri }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        elevation: 3,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: 200,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
});

export default CustomCard;
