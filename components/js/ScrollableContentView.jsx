import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ScrollableHorizontalView = () => {
    return (
        <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
        >
            <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={styles.page}>
                <Text style={styles.text}>Your content here</Text>
            </LinearGradient>
            <LinearGradient colors={['#a1c4fd', '#c2e9fb']} style={styles.page}>
                <Text style={styles.text}>Your content here</Text>
            </LinearGradient>
            <LinearGradient colors={['#667eea', '#764ba2']} style={styles.page}>
                <Text style={styles.text}>Your content here</Text>
            </LinearGradient>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        bottom: '40%',
    },
    page: {
        width: width * 0.9,
        top: '4%',
        height: 100, // 35% of height can be adjusted based on requirement
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.05, // to center the pages horizontally
        borderRadius: 10,
        overflow: 'hidden',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ScrollableHorizontalView;
