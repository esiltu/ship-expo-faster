import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, StyleSheet } from 'react-native';

const CustomDatePicker = ({ date, onDateChange }) => {
    return (
        <View style={styles.container}>
            <DatePicker
                style={styles.datePicker}
                date={date}
                mode="date"
                placeholder="Select date"
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2100-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateInput: {
                        borderWidth: 0,
                    },
                    placeholderText: {
                        fontSize: 16,
                        color: '#999',
                    },
                    dateText: {
                        fontSize: 16,
                    },
                }}
                onDateChange={onDateChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        paddingHorizontal: 15,
    },
    datePicker: {
        width: '100%',
    },
});

export default CustomDatePicker;
