import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawer = (props) => {
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Custom Drawer Header</Text>
                </View>
                <DrawerItemList {...props} />
                <TouchableOpacity
                    style={styles.drawerItem}
                    onPress={() => {
                        // Custom action
                    }}
                >
                    <Text style={styles.drawerItemText}>Custom Drawer Item</Text>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    drawerItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    drawerItemText: {
        fontSize: 16,
    },
});

export default CustomDrawer;
