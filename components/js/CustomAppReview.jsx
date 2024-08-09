import React from 'react';
import { View, Button, StyleSheet, Linking, Alert, Platform } from 'react-native';
import * as StoreReview from 'expo-store-review';

const StorePage = () => {
    const androidPackageName = 'host.exp.exponent';
    const itunesItemId = 982107779;

    const handleReview = async () => {
        const isAvailable = await StoreReview.isAvailableAsync();

        if (isAvailable) {
            StoreReview.requestReview();
        } else {
            if (Platform.OS === 'android') {
                // Try opening Play Store directly
                Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`).catch(() => {
                    // If failed, fallback to opening in browser
                    Linking.openURL(`https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`);
                });
            } else if (Platform.OS === 'ios') {
                // Try opening App Store directly
                Linking.openURL(`itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`).catch(() => {
                    // If failed, fallback to opening in browser
                    Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);
                });
            } else {
                Alert.alert('Not supported on this platform');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Leave a Review" onPress={handleReview} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default StorePage;
