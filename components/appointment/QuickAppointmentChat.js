// src/components/chat/QuickAppointmentChat.js
import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useQuickAppointment } from '../../hooks/useQuickAppointment';
import { theme } from '../../assets/theme';

const QuickAppointmentChat = ({ visible, onClose, appointmentService, onQuickAppointmentComplete }) => {
    const {
        conversationStep,
        quickAppointmentData,
        filteredDoctors,
        hospitals,
        schedules,
        setDoctor,
        selectDoctorFromList,
        setHospital,
        setSchedule,
        resetQuickAppointment
    } = useQuickAppointment(appointmentService);

    const [inputText, setInputText] = useState('');
    const [conversation, setConversation] = useState([]);
    const slideAnim = useRef(new Animated.Value(400)).current;
    const flatListRef = useRef(null);

    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: visible ? 0 : 400,
            useNativeDriver: true,
            tension: 50,
            friction: 7,
        }).start();

        if (visible) {
            resetQuickAppointment();
            setConversation([
                {
                    id: '1',
                    type: 'bot',
                    content: 'Hello! I can help you book an appointment quickly. Which doctor would you like to see?',
                    timestamp: new Date(),
                }
            ]);
        }
    }, [visible]);

    useEffect(() => {
        if (conversation.length > 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [conversation]);

    const addMessage = (type, content) => {
        const newMessage = {
            id: Date.now().toString(),
            type,
            content,
            timestamp: new Date(),
        };
        setConversation(prev => [...prev, newMessage]);
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage = inputText.trim();
        setInputText('');
        addMessage('user', userMessage);

        try {
            switch (conversationStep) {
                case 'ask_doctor':
                    const doctorResult = await setDoctor(userMessage);
                    if (doctorResult.success) {
                        if (doctorResult.doctors && doctorResult.doctors.length > 1) {
                            addMessage('bot', `I found ${doctorResult.doctors.length} doctors. Please select one:`);
                        } else if (doctorResult.doctor) {
                            addMessage('bot', `Great! Dr. ${doctorResult.doctor.name} is available. Now please select a hospital:`);
                            if (doctorResult.hospitals && doctorResult.hospitals.length > 0) {
                                addMessage('bot', 'Available hospitals:');
                            }
                        } else {
                            addMessage('bot', 'No doctor found with that name. Please try another name.');
                        }
                    }
                    break;

                case 'select_hospital':
                    const selectedHospital = hospitals.find(h =>
                        h.name.toLowerCase().includes(userMessage.toLowerCase())
                    );
                    if (selectedHospital) {
                        const scheduleResult = await setHospital(selectedHospital);
                        addMessage('bot', `Selected ${selectedHospital.name}. Now choose a time slot:`);
                        if (scheduleResult && scheduleResult.length > 0) {
                            addMessage('bot', 'Available time slots:');
                        }
                    } else {
                        addMessage('bot', 'Hospital not found. Please select from the available hospitals.');
                    }
                    break;

                case 'select_schedule':
                    const selectedSchedule = schedules.find(s =>
                        s.time.toLowerCase().includes(userMessage.toLowerCase()) ||
                        s.date.toLowerCase().includes(userMessage.toLowerCase())
                    );
                    if (selectedSchedule) {
                        setSchedule(selectedSchedule);
                        addMessage('bot', `Perfect! Appointment scheduled for ${selectedSchedule.date} at ${selectedSchedule.time}.`);
                        addMessage('bot', 'Your quick appointment is ready! Click "Complete Booking" to proceed.');
                    } else {
                        addMessage('bot', 'Time slot not found. Please select from available slots.');
                    }
                    break;

                default:
                    addMessage('bot', "I'm not sure what you mean. Let's start over.");
                    resetQuickAppointment();
                    break;
            }
        } catch (error) {
            addMessage('bot', 'Sorry, I encountered an error. Please try again.');
            console.error('Chat error:', error);
        }
    };

    const handleCompleteBooking = () => {
        if (quickAppointmentData.doctor && quickAppointmentData.hospital && quickAppointmentData.schedule) {
            onQuickAppointmentComplete(quickAppointmentData);
            onClose();
        } else {
            addMessage('bot', 'Please complete all appointment details first.');
        }
    };

    const renderMessage = ({ item }) => {
        const isBot = item.type === 'bot';

        return (
            <View style={[styles.messageContainer, isBot ? styles.botMessage : styles.userMessage]}>
                <Text style={[styles.messageText, isBot ? styles.botMessageText : styles.userMessageText]}>
                    {item.content}
                </Text>
                <Text style={styles.timestamp}>
                    {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
            </View>
        );
    };

    const renderQuickOptions = () => {
        switch (conversationStep) {
            case 'select_doctor_from_list':
                return (
                    <View style={styles.quickOptionsContainer}>
                        <Text style={styles.quickOptionsTitle}>Select Doctor:</Text>
                        {filteredDoctors.map(doctor => (
                            <TouchableOpacity
                                key={doctor.id}
                                style={styles.quickOption}
                                onPress={async () => {
                                    const hospitals = await selectDoctorFromList(doctor);
                                    addMessage('user', `Select ${doctor.name}`);
                                    addMessage('bot', `Great! Dr. ${doctor.name} is available. Now please select a hospital:`);
                                    if (hospitals && hospitals.length > 0) {
                                        addMessage('bot', 'Available hospitals:');
                                    }
                                }}
                            >
                                <Text style={styles.quickOptionText}>Dr. {doctor.name} - {doctor.specialization}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );

            case 'select_hospital':
                return (
                    <View style={styles.quickOptionsContainer}>
                        <Text style={styles.quickOptionsTitle}>Available Hospitals:</Text>
                        {hospitals.map(hospital => (
                            <TouchableOpacity
                                key={hospital.id}
                                style={styles.quickOption}
                                onPress={async () => {
                                    const schedules = await setHospital(hospital);
                                    addMessage('user', `Select ${hospital.name}`);
                                    addMessage('bot', `Selected ${hospital.name}. Now choose a time slot:`);
                                    if (schedules && schedules.length > 0) {
                                        addMessage('bot', 'Available time slots:');
                                    }
                                }}
                            >
                                <Text style={styles.quickOptionText}>{hospital.name}</Text>
                                <Text style={styles.quickOptionSubtext}>{hospital.location}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );

            case 'select_schedule':
                return (
                    <View style={styles.quickOptionsContainer}>
                        <Text style={styles.quickOptionsTitle}>Available Time Slots:</Text>
                        {schedules.map(schedule => (
                            <TouchableOpacity
                                key={schedule.id}
                                style={styles.quickOption}
                                onPress={() => {
                                    setSchedule(schedule);
                                    addMessage('user', `Select ${schedule.date} ${schedule.time}`);
                                    addMessage('bot', `Perfect! Appointment scheduled for ${schedule.date} at ${schedule.time}.`);
                                    addMessage('bot', 'Your quick appointment is ready! Click "Complete Booking" to proceed.');
                                }}
                            >
                                <Text style={styles.quickOptionText}>{schedule.date} at {schedule.time}</Text>
                                <Text style={styles.quickOptionSubtext}>{schedule.duration} minutes</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                );

            case 'complete':
                return (
                    <View style={styles.quickOptionsContainer}>
                        <TouchableOpacity style={styles.completeButton} onPress={handleCompleteBooking}>
                            <Text style={styles.completeButtonText}>Complete Booking</Text>
                        </TouchableOpacity>
                    </View>
                );

            default:
                return null;
        }
    };

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerTitle}>Quick Appointment</Text>
                        <Text style={styles.headerSubtitle}>AI Assistant</Text>
                    </View>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Conversation */}
                <FlatList
                    ref={flatListRef}
                    data={conversation}
                    renderItem={renderMessage}
                    keyExtractor={(item) => item.id}
                    style={styles.conversationList}
                    contentContainerStyle={styles.conversationContent}
                    ListFooterComponent={renderQuickOptions}
                />

                {/* Input Area */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="Type your message..."
                        placeholderTextColor="#999"
                        multiline
                        maxLength={500}
                        onSubmitEditing={handleSendMessage}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                        onPress={handleSendMessage}
                        disabled={!inputText.trim()}
                    >
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        right: 20,
        width: 350,
        height: 500,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radius.lg,
        shadowColor: theme.colors.shadow,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        zIndex: 999,
        overflow: 'hidden',
    },
    keyboardAvoid: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        backgroundColor: theme.colors.background,
    },
    headerInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: theme.typography.h2.fontSize,
        fontWeight: theme.typography.h2.fontWeight,
        color: theme.colors.textPrimary,
    },
    headerSubtitle: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.primary,
        marginTop: theme.spacing.xs,
    },
    closeButton: {
        padding: theme.spacing.xs,
    },
    conversationList: {
        flex: 1,
    },
    conversationContent: {
        padding: 16,
    },
    messageContainer: {
        maxWidth: '80%',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.lg,
        marginVertical: theme.spacing.xs,
    },
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.background,
        borderBottomLeftRadius: theme.radius.sm,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: theme.colors.primary,
        borderBottomRightRadius: theme.radius.sm,
    },
    messageText: {
        fontSize: theme.typography.body.fontSize,
        lineHeight: 20,
    },
    botMessageText: {
        color: theme.colors.textPrimary,
    },
    userMessageText: {
        color: theme.colors.surface,
    },
    timestamp: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
        alignSelf: 'flex-end',
    },
    quickOptionsContainer: {
        marginTop: theme.spacing.md,
        padding: theme.spacing.sm,
        backgroundColor: theme.colors.background,
        borderRadius: theme.radius.md,
    },
    quickOptionsTitle: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
        marginBottom: theme.spacing.sm,
        color: theme.colors.textPrimary,
    },
    quickOption: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        marginBottom: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    quickOptionText: {
        fontSize: theme.typography.body.fontSize,
        fontWeight: '500',
        color: theme.colors.textPrimary,
    },
    quickOptionSubtext: {
        fontSize: theme.typography.small.fontSize,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
    },
    completeButton: {
        backgroundColor: theme.colors.success,
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        alignItems: 'center',
    },
    completeButtonText: {
        color: theme.colors.surface,
        fontSize: theme.typography.body.fontSize,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 20,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        maxHeight: 100,
        marginRight: theme.spacing.sm,
        fontSize: theme.typography.body.fontSize,
        backgroundColor: theme.colors.background,
        color: theme.colors.textPrimary,
    },
    sendButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: theme.colors.textSecondary,
    },
});

export default QuickAppointmentChat;