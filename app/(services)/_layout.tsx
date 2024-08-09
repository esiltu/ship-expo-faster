import React from "react";

import { Stack } from 'expo-router'

export default function ServiceLayout() {
    return (
        <Stack>
            {/* Index means = Forgot Password */}
            <Stack.Screen name="index" options={{ headerShown: false, }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: false, }} />
        </Stack>
    )
}