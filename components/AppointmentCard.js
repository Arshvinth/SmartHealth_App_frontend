import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const AppointmentOptionCard = ({ option, onPress }) => {
    const renderIcon = () => {
        const props = { size: 30, color: option.iconColor };

        if (option.iconLibrary === 'Ionicons') {
            return <Ionicons name={option.icon} {...props} />;
        }
        if (option.iconLibrary === 'MaterialIcons') {
            return <MaterialIcons name={option.icon} {...props} />;
        }
        return null;
    };

    return (
        <TouchableOpacity style={styles.optionCard} onPress={onPress}>
            <View style={styles.iconStyle}>
                {renderIcon()}
            </View>
            <View style={styles.option}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    optionCard: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        flexDirection: "row",
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        alignItems: "center",
        gap: 4
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    optionDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        maxWidth: 260
    }
})