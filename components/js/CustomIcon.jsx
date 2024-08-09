import React from 'react';
import { Ionicons } from '@expo/vector-icons';

const CustomIcon = ({ name, size = 24, color = '#000' }) => {
    return (
        <Ionicons name={name} size={size} color={color} />
    );
};

export default CustomIcon;
