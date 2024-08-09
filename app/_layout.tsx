import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { Slot } from 'expo-router';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';
import { I18nextProvider } from 'react-i18next';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '~/store/tokenCache';


const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error('Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
}

// Note: Head over to your Stripe dashboard and just copy & paste your Public Key in here!

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <GluestackUIProvider config={config}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <I18nextProvider i18n={i18n}>
              <Slot />
              <Toast />
            </I18nextProvider>
          </GestureHandlerRootView>
        </GluestackUIProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}