import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ForgotPassword = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.iconWrapper}>
                <TouchableOpacity onPress={() => router.back()} activeOpacity={0.6}>
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 16,
    },
    iconWrapper: {
        width: 40,
        height: 40,
        borderRadius: 12.5,
        borderWidth: 1.5,
        borderColor: '#D8DADC',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        top: '5%',
        left: '7.5%',
    }
});
