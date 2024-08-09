import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { Formik } from 'formik';
import AuthFlowSchemaSignIn from '~/utils/validation/sign-in-schema';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { useClerk, useSignIn } from '@clerk/clerk-expo';

interface AuthFlowState {
    email: string;
    password: string;
}


const AuthSignIn = () => {

    const { session, client } = useClerk();
    const availableSessions = client.sessions;
    console.log(availableSessions)

    useEffect(() => {
        const removeSession = async () => {
            if (session) {
                try {
                    await session.remove();
                    console.log("Successfully removed session.");
                } catch (error) {
                    console.error("Failed to remove session:", error);
                }
            }
        };

        removeSession();
    }, [session]);

    const { t } = i18n;

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [postSignUp, setPostSignUp] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);

    const { signIn, setActive, isLoaded } = useSignIn();

    const onSignInPress = useCallback(async (values: AuthFlowState, resetForm: any) => {
        if (!isLoaded) {
            return;
        }

        setLoading(true);
        try {
            const signInAttempt = await signIn.create({
                identifier: values.email,
                password: values.password
            });



            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.navigate('(dashboard)');
                Toast.show({
                    type: 'success',
                    text1: `${t("Auth.LoginSuccess")}`,
                    text2: `${t("Auth.LoginSuccessSecond")}`,
                })
            } else {
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            // Determine the specific error message
            let errorMessage = 'An unknown error occurred. Please try again.';
            if (err.errors) {
                const errorCode = err.errors[0]?.code;
                switch (errorCode) {
                    case 'form_identifier_not_found':
                        errorMessage = "Couldn't find your account. Please check your email.";
                        break;
                    case 'form_password_incorrect':
                        errorMessage = 'Password is incorrect. Try again or use another method.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred. Please try again.';
                        break;
                }
            }

            // Show error message
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: errorMessage,
                position: 'top',
            });
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setLoading(false);
        }
    }, [isLoaded, signIn, setActive, router]);


    // Go to sign up page
    function goToSignUp() {
        router.navigate('/sign-up')
    }


    // Social Auth * Optional * Btns and Funcs
    function facebookBtnSignIn() {
        console.log("Pressed on Facebook BTN")
    }

    function googleBtnSignIn() {
        console.log("Pressed on Google BTN")
    }

    function appleBtnSignIn() {
        console.log("Pressed on Apple BTN")
    }


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps='handled'>
                    <View style={styles.innerContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={require('assets/illustrations/star.png')} style={styles.logo} />
                        </View>
                        <Text style={styles.header}>{t('Auth.FormTitle')}</Text>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            validationSchema={AuthFlowSchemaSignIn}
                            onSubmit={(values, { resetForm }) => onSignInPress(values, resetForm)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>{t('Auth.FormEmailPlaceHolder')}</Text>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={t("Auth.FormInputEmail")}
                                                onChangeText={handleChange('email')}
                                                onBlur={handleBlur('email')}
                                                value={values.email}
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                placeholderTextColor="#aaa"
                                            />
                                            {values.email && !errors.email && (
                                                <Ionicons
                                                    name="checkmark-circle"
                                                    size={24}
                                                    color="green"
                                                    style={styles.icon}
                                                />
                                            )}
                                            {values.email && errors.email && (
                                                <Ionicons
                                                    name="close-circle-outline"
                                                    size={24}
                                                    color="red"
                                                    style={styles.icon}
                                                />
                                            )}
                                        </View>
                                        {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                    </View>

                                    <View style={styles.inputContainer}>
                                        <Text style={styles.label}>{t("Auth.FormPasswordPlaceHolder")}</Text>
                                        <View style={styles.inputWrapper}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={t('Auth.FormInputPassword')}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                secureTextEntry={!isPasswordVisible}
                                                autoCapitalize="none"
                                                placeholderTextColor="#aaa"
                                            />
                                            <TouchableOpacity
                                                activeOpacity={0.6}
                                                onPress={() => setPasswordVisible(!isPasswordVisible)}
                                            >
                                                <Feather
                                                    name={isPasswordVisible ? 'eye' : 'eye-off'}
                                                    size={24}
                                                    color="grey"
                                                    style={styles.icon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                    </View>

                                    <TouchableOpacity onPress={() => handleSubmit()} activeOpacity={0.6} disabled={loading}>
                                        <LinearGradient
                                            colors={['#000000', '#555555', '#aaaaaa']}
                                            style={styles.buttonGradient}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 1 }}
                                        >
                                            {loading ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ) : (
                                                <Text style={styles.buttonText}>{t('Auth.FormButtonTitle')}</Text>
                                            )}
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                            )}
                        </Formik>

                        {/* Section with text and buttons */}
                        <View style={styles.loginWithOptions}>
                            <Image source={require('assets/illustrations/line.png')} style={{ alignSelf: 'flex-start', width: 80 }} />
                            <Image source={require('assets/illustrations/line.png')} style={{ alignSelf: 'flex-end', width: 80 }} />
                            <Text style={styles.loginOptionText}>{t('Auth.OrTxt')}</Text>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.6} onPress={facebookBtnSignIn}>
                                    <Image source={require('assets/illustrations/icons8-facebook-48.png')} style={{ width: 30, height: 30, }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.6} onPress={googleBtnSignIn}>
                                    <Image source={require('assets/illustrations/icons8-google-48.png')} style={{ width: 30, height: 30, }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.socialButton} activeOpacity={0.6} onPress={appleBtnSignIn}>
                                    <Image source={require('assets/illustrations/icons8-apple-48.png')} style={{ width: 30, height: 30, }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Don't have an account, go register then... */}
                        <View style={{ top: 30, }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "white", alignSelf: "center" }}
                                activeOpacity={0.6}
                                onPress={goToSignUp}
                            >
                                <Text style={{ fontSize: 17, color: "#000000", fontWeight: "300" }}>
                                    {t("Auth.NoAccountTxt")} {""}
                                    <Text style={{ color: "#000000", fontWeight: 600, }}>{t("Auth.RegisterNowTxt")}</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AuthSignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        padding: 16,
        backgroundColor: '#fff',
    },
    logoContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'left',
        color: '#000000',
    },
    inputContainer: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
        color: '#000',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    icon: {
        marginLeft: 8,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 4,
        marginLeft: 5,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
        width: 200,
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#000000',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 18,
        borderRadius: 12.5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonGradient: {
        paddingVertical: 18,
        borderRadius: 12.5,
        alignItems: 'center',
        marginBottom: 10,
    },
    loginWithOptions: {
        alignItems: 'center',
        marginTop: 20,
    },
    loginOptionText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#000',
        bottom: 12,
    },
    buttonContainer: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    socialButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D8DADC',
        paddingVertical: '3.5%',
        paddingHorizontal: 30,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    socialButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
