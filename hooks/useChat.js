// src/hooks/useChat.js
import { useState, useCallback } from 'react';

export const useChat = (chatService, patientName) => {
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback(async (text) => {
        const userMessage = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date(),
            type: 'text',
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            const botReply = await chatService.sendMessage(text, patientName);

            const botMessage = {
                id: (Date.now() + 1).toString(),
                text: botReply,
                sender: 'bot',
                timestamp: new Date(),
                type: 'text',
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble responding. Please try again.",
                sender: 'bot',
                timestamp: new Date(),
                type: 'text',
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [chatService, patientName]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return {
        messages,
        isTyping,
        sendMessage,
        clearMessages,
    };
};