import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomFooter = () => {
    return (
        <View style={styles.container}>
            <View style={styles.linksContainer}>
                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>Services</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                    <Text style={styles.linkText}>Contact</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.socialIconsContainer}>
                {/* Replace with your social media icons or links */}
                <TouchableOpacity style={styles.socialIcon}>
                    <Text style={styles.iconText}>Fb</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <Text style={styles.iconText}>Tw</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                    <Text style={styles.iconText}>In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linksContainer: {
        flexDirection: 'row',
    },
    link: {
        paddingHorizontal: 10,
    },
    linkText: {
        fontSize: 16,
        color: '#333',
    },
    socialIconsContainer: {
        flexDirection: 'row',
    },
    socialIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#DDD',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    iconText: {
        fontSize: 16,
        color: '#333',
    },
});

export default CustomFooter;
