// src/components/chat/ChatButton.js
import React from 'react';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../assets/theme';

const ChatButton = ({ onPress, animation }) => {
    return (
        <Animated.View style={[styles.container, animation]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        zIndex: 1000,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
});

export default ChatButton;