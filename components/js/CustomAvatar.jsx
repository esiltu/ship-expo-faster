import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

const CustomAvatar = ({ uri, size, name }) => {
    return (
        <View style={styles.container}>
            {uri ? (
                <Avatar
                    rounded
                    size={size}
                    source={{ uri }}
                    containerStyle={styles.avatar}
                />
            ) : (
                <Avatar
                    rounded
                    size={size}
                    title={name ? name.charAt(0) : '?'}
                    containerStyle={styles.avatar}
                />
            )}
            {name && <Text style={styles.name}>{name}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    avatar: {
        marginBottom: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomAvatar;
