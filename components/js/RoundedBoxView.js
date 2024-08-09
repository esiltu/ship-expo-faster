import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const initialData = [
    {
        id: '1',
        colors: ['#ff9a9e', '#fad0c4'], // pink to peach
        icon: 'bulb',
        description: 'Use clear and concise text to enhance readability.'
    },
    {
        id: '2',
        colors: ['#a1c4fd', '#c2e9fb'], // light blue to sky blue
        icon: 'information-circle',
        description: 'Provide helpful information to guide users.'
    },
    {
        id: '3',
        colors: ['#667eea', '#764ba2'], // blue to purple
        icon: 'cog',
        description: 'Offer customization options for user preferences.'
    },
    {
        id: '4',
        colors: ['#ffb347', '#ffcc33'], // orange to yellow
        icon: 'star',
        description: 'Highlight key features to attract user attention.'
    }
];

const DraggableBox = ({ item, positions, onDrop, index }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const zIndex = useSharedValue(1); // Manage zIndex to ensure it’s on top when dragging

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            translateX.value = e.translationX;
            translateY.value = e.translationY;
        })
        .onStart(() => {
            zIndex.value = 100; // Bring to front when dragging
        })
        .onEnd(() => {
            // Calculate new position
            const rowSize = Math.floor(width / (width * 0.42 + 15));
            const row = Math.floor(index / rowSize);
            const column = index % rowSize;
            const deltaX = Math.round(translateX.value / (width * 0.42 + 15));
            const deltaY = Math.round(translateY.value / (width * 0.3 + 15));
            const newRow = Math.max(0, Math.min(row + deltaY, Math.floor(positions.value.length / rowSize)));
            const newColumn = Math.max(0, Math.min(column + deltaX, rowSize - 1));
            const newIndex = Math.min(newRow * rowSize + newColumn, positions.value.length - 1);

            if (newIndex !== index) {
                runOnJS(onDrop)(index, newIndex);
            }

            // Smooth transition with lower velocity for a softer effect
            translateX.value = withSpring(0, { damping: 10, stiffness: 80 });
            translateY.value = withSpring(0, { damping: 10, stiffness: 80 });
            zIndex.value = 1; // Reset zIndex after dragging
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
        zIndex: zIndex.value,
    }));

    return (
        <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.box, animatedStyle]}>
                <LinearGradient colors={item.colors} style={styles.gradient}>
                    <Ionicons name={item.icon} size={48} color="white" />
                    <Text style={styles.text}>{item.description}</Text>
                </LinearGradient>
            </Animated.View>
        </GestureDetector>
    );
};

const RoundedBoxesView = () => {
    const [data, setData] = useState(initialData);
    const positions = useSharedValue(
        initialData.map((item, index) => ({ id: item.id, index }))
    );

    const onDrop = (oldIndex, newIndex) => {
        const updatedData = [...data];
        const [movedItem] = updatedData.splice(oldIndex, 1);
        updatedData.splice(newIndex, 0, movedItem);
        setData(updatedData);

        positions.value = updatedData.map((item, index) => ({ id: item.id, index }));
    };

    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <DraggableBox key={item.id} item={item} positions={positions} onDrop={onDrop} index={index} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        bottom: '60%',
    },
    box: {
        width: width * 0.42,
        height: width * 0.3,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 7.5,
    },
    gradient: {
        flex: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 5,
    },
});

export default RoundedBoxesView;
