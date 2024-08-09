import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Formik } from 'formik';
import CustomTextInput from './CustomTextInput';

const CustomForm = () => {
    const handleSubmit = (values) => {
        // Handle form submission logic here
        console.log(values);
    };

    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <CustomTextInput
                            placeholder="First Name"
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                        />
                        <CustomTextInput
                            placeholder="Last Name"
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                        />
                        <CustomTextInput
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        <CustomTextInput
                            placeholder="Password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        <Button onPress={handleSubmit} title="Submit" />
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});

export default CustomForm;
