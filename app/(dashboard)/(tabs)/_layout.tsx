import React, { useEffect, useState } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import i18n from '~/hooks/useTranslation';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {

  const { t } = i18n;

  const { isSignedIn } = useAuth()

  const [language, setLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    const changeLanguage = (lng: string) => {
      setLanguage(lng);
    };

    i18n.on('languageChanged', changeLanguage);

    return () => {
      i18n.off('languageChanged', changeLanguage);
    };
  }, [i18n]);


  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true, // Hide tab labels
        headerShown: false, // Hide header
        tabBarInactiveTintColor: "#5A72A0",
        tabBarActiveTintColor: '#686D76', // Active tab color
        tabBarIconStyle: {
          marginBottom: -3, // Adjust icon alignment
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: t('Tabs.Home'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons size={26} name={focused ? "home" : "home-outline"} color={color} />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="discover"
        options={{
          headerShown: false,
          title: t('Tabs.Discover'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={26}
              color={color}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="history"
        options={{
          headerShown: false,
          title: t('Tabs.History'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "time" : "time-outline"}
              size={26}
              color={color}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t('Tabs.Settings'),
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={26}
              color={color}
            />
          ),
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
