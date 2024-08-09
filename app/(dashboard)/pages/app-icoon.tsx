import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { getAppIcon, setAppIcon } from 'expo-dynamic-app-icon';
import { Ionicons } from '@expo/vector-icons';

const ICONS = [
    { name: 'default', icon: require('assets/app-icons/icon-1.png') },
    { name: 'optional', icon: require('assets/app-icons/icon-2.png') },
    { name: 'fancy', icon: require('assets/app-icons/icon-3.png') },
    { name: 'firefly', icon: require('assets/app-icons/random-icon-1.png') },
    { name: 'stardust', icon: require('assets/app-icons/random-icon-2.png') },
    { name: 'moonbeam', icon: require('assets/app-icons/random-icon-3.png') },
    { name: 'cascade', icon: require('assets/app-icons/random-icon-4.png') },
    { name: 'thunderbolt', icon: require('assets/app-icons/random-icon-5.png') },
];

const { width } = Dimensions.get('window');
const iconSize = width * 0.08;

const ChooseAppIcon: React.FC = () => {
    const [activeIcon, setActiveIcon] = useState('default');
    const [loading, setLoading] = useState(false);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const loadCurrentIcon = async () => {
            const icon = await getAppIcon();
            setActiveIcon(icon);
        };
        loadCurrentIcon();
    }, []);

    async function onChangeAppIcon(iconName: string) {
        await setAppIcon(iconName);
        setActiveIcon(iconName);
    }

    const handleContinue = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a 2-second loading time
        setLoading(false);
        setCompleted(true);
        setTimeout(() => setCompleted(false), 2000); // Show the checkmark for 2 seconds
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Choose Icon</Text>
                    <Ionicons name="star" size={24} color="black" style={styles.starIcon} />
                </View>
                {loading ? (
                    <ActivityIndicator size="large" color="#5669FF" />
                ) : completed ? (
                    <View style={styles.checkmarkContainer}>
                        <Ionicons name="checkmark-circle" size={64} color="#5669FF" />
                        <TouchableOpacity style={styles.continueButton} onPress={() => setCompleted(false)}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            {ICONS.map((icon) => (
                                <TouchableOpacity
                                    key={icon.name}
                                    style={[styles.btn, activeIcon === icon.name ? styles.activeBtn : null]}
                                    onPress={() => onChangeAppIcon(icon.name)}
                                >
                                    <Image
                                        source={icon.icon}
                                        style={[styles.iconImage, { width: iconSize, height: iconSize }]}
                                    />
                                    <Text style={styles.iconText}>{icon.name}</Text>
                                    {activeIcon === icon.name && (
                                        <Ionicons name="checkmark-circle" size={24} style={styles.checkmark} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

export default ChooseAppIcon;

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        width: '100%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginRight: 10,
    },
    starIcon: {
        marginTop: 5,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#E6E6E6',
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
    },
    activeBtn: {
        borderColor: '#5669FF',
    },
    iconImage: {
        resizeMode: 'contain',
    },
    iconText: {
        flex: 1,
        marginLeft: 10,
        color: 'black',
        fontSize: 18,
    },
    checkmark: {
        marginRight: 15,
        color: '#5669FF',
    },
    continueButton: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#5669FF',
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkmarkContainer: {
        alignItems: 'center',
    },
});
