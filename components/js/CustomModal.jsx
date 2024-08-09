import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ visible, onClose, children }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {children}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        maxWidth: 400,
    },
    closeButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CustomModal;
