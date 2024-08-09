import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { CardInput } from 'react-native-stripe-sdk';
import { Button, Input } from 'react-native-elements';

const CustomStripePricing = () => {
    const [cardDetails, setCardDetails] = useState({
        number: '',
        expMonth: '',
        expYear: '',
        cvc: '',
    });

    const handlePayPress = async () => {
        try {
            // Call your backend API to create a payment intent and get client secret
            const response = await fetch('https://your-backend.com/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: 1000, currency: 'usd' }), // Example payload
            });

            const { clientSecret } = await response.json();

            // Confirm payment with the card details
            await CardInput.confirmPayment(clientSecret, {
                billingDetails: {
                    email: 'customer@example.com',
                },
                paymentMethod: {
                    card: cardDetails,
                },
            });

            // Payment successful
            Alert.alert('Payment successful!');
        } catch (error) {
            // Handle payment error
            console.error('Error processing payment:', error);
            Alert.alert('Payment failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <CardInput
                cardNumberInputProps={{
                    value: cardDetails.number,
                    onChangeText: (text) => setCardDetails({ ...cardDetails, number: text }),
                    placeholder: 'Card Number',
                }}
                expiryInputProps={{
                    value: cardDetails.expMonth,
                    onChangeText: (text) => setCardDetails({ ...cardDetails, expMonth: text }),
                    placeholder: 'MM',
                }}
                cvcInputProps={{
                    value: cardDetails.cvc,
                    onChangeText: (text) => setCardDetails({ ...cardDetails, cvc: text }),
                    placeholder: 'CVC',
                }}
            />
            <Button
                title="Pay $10.00"
                onPress={handlePayPress}
                buttonStyle={styles.payButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    payButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
    },
});

export default CustomStripePricing;
