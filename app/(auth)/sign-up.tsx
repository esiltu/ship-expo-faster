import React, { useState, useRef } from 'react';
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
import AuthFlowSchemaSignUp from '~/utils/validation/sign-up-schema';
import { useRouter } from 'expo-router';
import { useClerk, useSignUp } from '@clerk/clerk-expo';
import Toast from 'react-native-toast-message';
import i18n from '~/hooks/useTranslation';
import { Ionicons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import OTPTextView from 'react-native-otp-textinput';

interface AuthFlowState {
    fullName: string;
    lastName: string;
    email: string;
    password: string;
}

const AuthSignUp = () => {

    const { t } = i18n;

    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { isLoaded, signUp, setActive } = useSignUp();
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");

    const otpInputRef = useRef(null);

    const { client } = useClerk();
    const availableSessions = client.sessions;
    console.log(availableSessions);

    const router = useRouter();

    const handleSignUp = async (values: AuthFlowState) => {
        if (!isLoaded) {
            return;
        }

        setLoading(true);

        try {
            // Perform sign up operation
            await signUp?.create({
                firstName: values.fullName,
                lastName: values.lastName,
                emailAddress: values.email,
                password: values.password
            });
            // Prepare for email address verification
            await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });

            // Set state to show OTP verification section
            setPendingVerification(true);

            // Show success message
            Toast.show({
                type: 'success',
                text1: 'Registration Successful',
                text2: 'Please check your email to verify your account.',
                position: 'top',
            });
        } catch (err: any) {
            // Determine the specific error message
            let errorMessage = 'An unknown error occurred. Please try again.';
            if (err.errors) {
                const errorCode = err.errors[0]?.code;
                switch (errorCode) {
                    case 'form_identifier_exists':
                        errorMessage = 'That email address is taken. Please try another.';
                        break;
                    case 'form_password_length_too_short':
                        errorMessage = 'Passwords must be 8 characters or more.';
                        break;
                    case 'form_password_pwned':
                        errorMessage = 'Password found in data breach. Use a different password.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred. Please try again.';
                        break;
                }
            }

            // Show error message
            Toast.show({
                type: 'error',
                text1: 'Registration Failed',
                text2: errorMessage,
                position: 'top',
            });
            console.error('Sign-up error:', JSON.stringify(err, null, 2));
        } finally {
            // Reset loading state
            setLoading(false);
        }
    };

    const onPressVerify = async () => {
        if (!isLoaded) {
            console.warn('Verification skipped: component not loaded');
            return;
        }

        try {
            const completeVerification = await signUp?.attemptEmailAddressVerification({ code });

            // Type assertion to inform TypeScript about possible values of completeVerification.status
            const status = completeVerification.status as "complete" | "incorrect_code" | "failed" | number;

            // Handle success case
            if (status === 'complete') {
                await setActive({ session: completeVerification.createdSessionId });
                console.log('Verification successful:', completeVerification);
                router.replace('/sign-in');

                // Show success message
                Toast.show({
                    type: 'success',
                    text1: 'Verification Successful',
                    text2: 'You have successfully verified your email address.',
                    position: 'top',
                });

            } else {
                console.error('Verification not complete:', JSON.stringify(completeVerification, null, 2));

                // Determine the specific error message based on status
                let errorMessage = 'An unknown error occurred. Please try again.';
                switch (status) {
                    case 422:
                        errorMessage = 'Invalid verification code. Please check and try again.';
                        break;
                    case 429:
                        errorMessage = 'Too many requests. Please try again in a bit.';
                        break;
                    default:
                        errorMessage = 'An unknown error occurred. Please try again.';
                        break;
                }

                // Show error message
                Toast.show({
                    type: 'error',
                    text1: 'Verification Failed',
                    text2: errorMessage,
                    position: 'top',
                });
            }

        } catch (err: any) {
            console.error('Verification error:', JSON.stringify(err, null, 2));

            // Determine the specific error message based on err.status
            let errorMessage = 'An unknown error occurred. Please try again.';
            switch (err.status) {
                case 422:
                    errorMessage = 'Invalid verification code. Please check and try again.';
                    break;
                case 429:
                    errorMessage = 'Too many requests. Please try again in a bit.';
                    break;
                default:
                    errorMessage = 'An unknown error occurred. Please try again.';
                    break;
            }

            // Show error message
            Toast.show({
                type: 'error',
                text1: 'Verification Failed',
                text2: errorMessage,
                position: 'top',
            });
        }
    };

    function goToSignIn() {
        router.push('/sign-in');
    }

    const [checked, setChecked] = useState(false);

    const handleToggleCheckbox = () => {
        setChecked(!checked);
    };

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
                        <Text style={styles.header}>{t("Auth.RegisterNowTxt")}</Text>
                        <Formik
                            initialValues={{ fullName: "", lastName: '', email: '', password: '' }}
                            validationSchema={AuthFlowSchemaSignUp}
                            onSubmit={(values) => handleSignUp(values)}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View>
                                    {!pendingVerification && (
                                        <>
                                            {/* FullName */}
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>{t('Auth.FormFullNamePlaceHolder')}</Text>
                                                <View style={styles.inputWrapper}>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder={t("Auth.FormInputFullName")}
                                                        onChangeText={handleChange('fullName')}
                                                        onBlur={handleBlur('fullName')}
                                                        value={values.fullName}
                                                        keyboardType="default"
                                                        autoCapitalize="none"
                                                        placeholderTextColor="#aaa"
                                                    />
                                                    {values.fullName && !errors.fullName && (
                                                        <Ionicons
                                                            name="checkmark-circle"
                                                            size={24}
                                                            color="green"
                                                            style={styles.icon}
                                                        />
                                                    )}
                                                    {values.fullName && errors.fullName && (
                                                        <Ionicons
                                                            name="close-circle-outline"
                                                            size={24}
                                                            color="red"
                                                            style={styles.icon}
                                                        />
                                                    )}
                                                </View>
                                                {touched.fullName && errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
                                            </View>

                                            {/* LastName */}
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>{t('Auth.FormLastNamePlaceHolder')}</Text>
                                                <View style={styles.inputWrapper}>
                                                    <TextInput
                                                        style={styles.input}
                                                        placeholder={t("Auth.FormInputLastName")}
                                                        onChangeText={handleChange('lastName')}
                                                        onBlur={handleBlur('lastName')}
                                                        value={values.lastName}
                                                        keyboardType="default"
                                                        autoCapitalize="none"
                                                        placeholderTextColor="#aaa"
                                                    />
                                                    {values.lastName && !errors.lastName && (
                                                        <Ionicons
                                                            name="checkmark-circle"
                                                            size={24}
                                                            color="green"
                                                            style={styles.icon}
                                                        />
                                                    )}
                                                    {values.lastName && errors.lastName && (
                                                        <Ionicons
                                                            name="close-circle-outline"
                                                            size={24}
                                                            color="red"
                                                            style={styles.icon}
                                                        />
                                                    )}
                                                </View>
                                                {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
                                            </View>

                                            {/* Email */}
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

                                            {/* Password */}
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
                                                    colors={['#000000', '#555555', '#FFFFFF']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.buttonGradient}
                                                >
                                                    {loading ? (
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    ) : (
                                                        <Text style={styles.buttonText}>{t('Auth.RegisterNowTxt')}</Text>
                                                    )}
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                    {pendingVerification && (
                                        <>
                                            <View style={styles.inputContainer}>
                                                <Text style={styles.label}>{t('Auth.OtpText')}</Text>
                                                <OTPTextView
                                                    ref={otpInputRef}
                                                    defaultValue=""
                                                    handleTextChange={(text) => setCode(text)}
                                                    inputCount={6}
                                                    tintColor="#17202A"
                                                    offTintColor="#ABB2B9"
                                                    inputCellLength={1}
                                                    containerStyle={styles.otpContainer}
                                                    textInputStyle={styles.otpInput}
                                                    testIDPrefix="otpinput"
                                                    autoFocus={true}
                                                />
                                            </View>

                                            <TouchableOpacity onPress={onPressVerify} activeOpacity={0.6} disabled={loading}>
                                                <LinearGradient
                                                    colors={['#000000', '#555555', '#FFFFFF']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={styles.buttonGradient}
                                                >
                                                    {loading ? (
                                                        <ActivityIndicator size="small" color="#fff" />
                                                    ) : (
                                                        <Text style={styles.buttonText}>{t('Auth.OtpBtnTxt')}</Text>
                                                    )}
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>
                            )}
                        </Formik>

                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', bottom: 55, left: 5 }}
                            onPress={handleToggleCheckbox}
                            activeOpacity={0.6}>
                            <View style={{
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                borderWidth: 2,
                                borderColor: checked ? 'black' : '#ccc',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: 8,
                                backgroundColor: checked ? 'black' : 'transparent'
                            }}>
                                {checked && <Ionicons name="checkmark" size={20} color="white" />}
                            </View>
                            <Text style={{ color: 'black', width: 330, fontSize: 13 }}>{t("Auth.TOSTXT")}</Text>
                        </TouchableOpacity>

                        <View style={{ top: '7.5%' }}>
                            <TouchableOpacity
                                style={{ backgroundColor: "white", alignSelf: "center" }}
                                activeOpacity={0.6}
                                onPress={goToSignIn}
                            >
                                <Text style={{ fontSize: 17, color: "#000000", fontWeight: "300" }}>
                                    {t("Auth.AlreadyAcc")}{" "}
                                    <Text style={{ color: "#000000", fontWeight: "600" }}>{t("Auth.AlreadyAccSecond")}</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        bottom: 20,
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
    button: {
        backgroundColor: '#000',
        paddingVertical: 18,
        borderRadius: 12.5,
        alignItems: 'center',
        marginBottom: 10,
        top: 60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonGradient: {
        paddingVertical: 18,
        borderRadius: 12.5,
        alignItems: 'center',
        marginBottom: 10,
        top: 60,
    },
    otpContainer: {
        marginVertical: 20,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        height: 50,
        width: 40,
        textAlign: 'center',
        fontSize: 18,
    },
});

export default AuthSignUp;
