import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, Animated, ScrollView, ActivityIndicator, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { setItem } from '~/store/storage';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth, useUser } from '@clerk/clerk-expo';

// Define the Language type
type Language = 'en' | 'nl' | 'fr' | 'de' | 'zh' | 'ar' | 'es' | 'tr';

// Flag images
const englishFlag = require('assets/flags/locale-english-flag.png');
const dutchFlag = require('assets/flags/locale-dutch-flag.png');
const frenchFlag = require('assets/flags/locale-french.png');
const germanFlag = require('assets/flags/locale-germany.png');
const chineseFlag = require('assets/flags/locale-china.png');
const arabicFlag = require('assets/flags/locale-saudi.png');
const spanishFlag = require('assets/flags/locale-spain.png');
const turkishFlag = require('assets/flags/locale-turkiye.png');

// Superman14@@@

const languages = [
    { id: 'en', name: 'English', flag: englishFlag },
    { id: 'nl', name: 'Dutch', flag: dutchFlag },
    { id: 'fr', name: 'French', flag: frenchFlag },
    { id: 'de', name: 'German', flag: germanFlag },
    { id: 'zh', name: 'Chinese', flag: chineseFlag },
    { id: 'ar', name: 'Arabic', flag: arabicFlag },
    { id: 'es', name: 'Spanish', flag: spanishFlag },
    { id: 'tr', name: 'Turkish', flag: turkishFlag },
];

type SettingsOption = {
    id: string;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
    navigateTo: string;
};


const SettingsOptions: SettingsOption[] = [
    {
        id: 'language',
        title: 'Choose Language',
        icon: 'language-outline',
        navigateTo: '',
    },
    {
        id: 'profile',
        title: 'Profile Settings',
        icon: 'person-circle-outline',
        navigateTo: 'ProfileSettings',
    },
];

const SettingsScreen = () => {
    const router = useRouter();

    const { t, language } = i18n;
    const [modalVisible, setModalVisible] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(0.9)).current;
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(language as Language);
    const [loading, setLoading] = useState(false);

    // signOut from Clerk instance
    const { signOut, } = useAuth();

    const { user } = useUser();


    useEffect(() => {
        console.log(language);
    }, [language]);

    const handlePress = (navigateTo: string) => {
        if (navigateTo) {
            router.navigate(navigateTo);
        } else {
            openModal();
        }
    };

    // Handle sign out
    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut();
            router.replace("(auth)/sign-in");
            Toast.show({
                type: 'success',
                text1: `${t("Auth.LogOutTxt")}`
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    // Upload avatar user specific
    // const uploadImage = () => {
    //     try {
    //         user?.setProfileImage()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const openModal = () => {
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const closeModal = () => {
        Animated.parallel([
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 0.9,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => setModalVisible(false));
    };

    const selectLanguage = async (language: Language) => {
        setSelectedLanguage(language);
        await setItem('app_language', language); // Ensure the storage is updated
        i18n.changeLanguage(language); // Update the language in i18n
        Toast.show({
            type: 'success',
            text1: i18n.t('LanguageMessage.LanguageChanged'),
            text2: i18n.t('LanguageMessage.LanguageChangedDescription'),
            position: 'top',
        });
        closeModal();
    };

    useEffect(() => {
        if (selectedLanguage !== language) {
            i18n.changeLanguage(selectedLanguage);
        }
    }, [selectedLanguage, language]);


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Settings</Text>
            {SettingsOptions.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={styles.itemContainer}
                    onPress={() => handlePress(item.navigateTo)}
                    activeOpacity={0.8}
                >
                    <Ionicons name={item.icon} size={24} color="#4F4F4F" style={styles.icon} />
                    <Text style={styles.itemText}>{item.title}</Text>
                </TouchableOpacity>
            ))}

            <LinearGradient
                colors={['#FF6347', '#FF4500']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.itemContainer, styles.logoutContainer]}
            >
                <TouchableOpacity
                    onPress={handleLogout}
                    activeOpacity={0.8}
                    style={styles.logOutBtn}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" style={{ left: '290%', }} />
                    ) : (
                        <>
                            <Ionicons name="log-out-outline" size={24} color="#FFF" style={styles.logOutBtnIcon} />
                            <Text style={[styles.itemText, { color: '#FFF', top: '2%', }]}>Log Out</Text>
                        </>
                    )}
                </TouchableOpacity>
            </LinearGradient>

            <Modal transparent={true} visible={modalVisible} onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <Animated.View style={[
                        styles.modalContainer,
                        {
                            opacity: animatedValue,
                            transform: [{ scale: scaleValue }],
                        },
                    ]}>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Ionicons name="close-outline" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.modalHeader}>{t("ChooseLanguage.ChangeLanguage")}</Text>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            {languages.map((lang) => (
                                <TouchableOpacity
                                    key={lang.id}
                                    style={[
                                        styles.modalItem,
                                        selectedLanguage === lang.id && styles.selectedItem,
                                    ]}
                                    onPress={() => selectLanguage(lang.id as Language)}
                                >
                                    <Image source={lang.flag} style={styles.modalFlag} />
                                    <Text style={styles.modalText}>{lang.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal>

        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'left',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 10,
        width: '80%', // Use percentage for width
        alignSelf: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    icon: {
        marginRight: 12,
    },
    logOutBtnIcon: {
        alignSelf: 'flex-start',
        marginRight: 12, // Changed to marginRight for consistency
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    logoutContainer: {
        marginTop: 10, // Use marginTop for spacing
        width: '45%', // Use percentage for width
        alignSelf: 'flex-start', // Center horizontally
    },
    logOutBtn: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start', // Center content horizontally
        width: '100%',
        padding: 0,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContainer: {
        width: '90%',  // Wide width for better content display
        height: 'auto',  // Adjust height to fit content
        maxHeight: '60%',  // Reduced max height to appear more like a card
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        marginTop: '65%',  // Positioned further down for a card-like appearance
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    modalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    modalContent: {
        paddingVertical: 10,
        width: '100%',
    },
    modalItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,  // Reduced padding for compact look
        width: '100%',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#F9F9F9',
    },
    selectedItem: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        width: '100%',
        paddingHorizontal: 15,
    },
    modalFlag: {
        width: 30,  // Slightly smaller flag images for compact look
        height: 30,
        marginRight: 10,
    },
    modalText: {
        fontSize: 18,
        color: '#000',
    },


});
