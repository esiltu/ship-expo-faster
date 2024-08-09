import React from "react";

import { Stack } from "expo-router";

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, }}>
            <Stack.Screen name="index" options={{ gestureEnabled: false }} />
            <Stack.Screen name="sign-up" options={{ gestureEnabled: false }} />
            <Stack.Screen name="sign-in" options={{ gestureEnabled: false }} />
            <Stack.Screen name="forgot-password" options={{ gestureEnabled: false, presentation: 'modal' }} />
        </Stack>
    );
}

export default AuthLayout