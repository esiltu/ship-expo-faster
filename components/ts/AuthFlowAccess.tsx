import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import React from 'react'
import { useRouter } from "expo-router"
import { LinearGradient } from 'expo-linear-gradient'
import { setItem } from "~/store/storage"
import i18n from "~/hooks/useTranslation"

const AuthFlowAccess = () => {

    const router = useRouter();

    // -> SignIn btn func
    async function goToSignIn() {
        router.navigate("/sign-in")
        await setItem("seenInitialPage", "true")

    }

    // -> SignUp btn func
    async function goToSignUp() {
        router.navigate("/sign-up")
        await setItem("seenInitialPage", "true")
    }

    const { t } = i18n;

    return (
        <View style={styles.content}>

            <View>
                <Image source={require("assets/onboarding/Illustration.png")} style={styles.contentImage} />
            </View>

            <View>
                <Text style={styles.title}>{t("Onboarding.Text1")}</Text>
                <Text style={styles.subtitle}>{t("Onboarding.Text2")}</Text>
            </View>

            <View style={styles.contentBtnView}>
                <TouchableOpacity activeOpacity={0.6} onPress={goToSignIn}>
                    <LinearGradient
                        colors={['#000000', '#434343']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.contentBtnSignIn}
                    >
                        <Text style={styles.contentBtnSignInTxt}>{t("Onboarding.Text3")}</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={goToSignUp}>
                    <LinearGradient
                        colors={["#FFFFFF", "#DDDDDD", "#FFFFFF"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0.9, y: 1 }}
                        style={styles.contentBtnSignUp}
                    >
                        <Text style={styles.contentBtnSignUpTxt}>{t("Onboarding.Text4")}</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthFlowAccess;

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    contentImage: {
        width: 270,
        height: 250,
        marginBottom: 20,
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        color: '#000000',
        fontWeight: '700',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 16,
        color: '#000000',
        fontWeight: '300',
        width: 260,
        marginTop: 5,
    },
    contentBtnView: {
        marginTop: 40,
        width: '100%',
        alignItems: 'center',
    },
    contentBtnSignIn: {
        width: 350,
        height: 53,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    contentBtnSignInTxt: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
    },
    contentBtnSignUp: {
        width: 350,
        height: 53,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000000',
        borderWidth: 1,
    },
    contentBtnSignUpTxt: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
    },
});
