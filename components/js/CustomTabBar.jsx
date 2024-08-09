import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        onPress={onPress}
                        style={[styles.tabButton, isFocused ? styles.tabButtonFocused : null]}
                    >
                        <Text style={styles.tabButtonText}>{label}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#007BFF',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonFocused: {
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
    },
    tabButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomTabBar;
