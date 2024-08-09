import React from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const CustomRefererAFriend = ({ referralLink }) => {
    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Hey! Check out this cool app: ${referralLink}`,
            });

            if (result.action === Share.sharedAction) {
                console.log('Share was successful');
            } else if (result.action === Share.dismissedAction) {
                console.log('Share was dismissed');
            }
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Refer a Friend</Text>
            <TouchableOpacity style={styles.button} onPress={handleShare}>
                <FontAwesome name="share" size={20} color="#FFF" style={styles.icon} />
                <Text style={styles.buttonText}>Share Link</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#007BFF',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        color: '#FFF',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0056b3',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default CustomRefererAFriend;
