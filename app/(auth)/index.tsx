import React from "react";
import { SafeAreaView, StyleSheet, } from "react-native";
import AuthFlowAccess from "~/components/AuthFlowAccess";

import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function AuthIndex() {

    const { isSignedIn } = useAuth();

    if (isSignedIn) {
        return <Redirect href={"(dashboard)"} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <AuthFlowAccess />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
