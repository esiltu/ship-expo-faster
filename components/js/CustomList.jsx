import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';

const CustomList = ({ data, renderItem }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
});

export default CustomList;
