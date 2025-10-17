// src/services/AlertService.js
import { Alert } from 'react-native';

class AlertService {
    showSuccess(title, message) {
        Alert.alert(title, message);
    }

    showError(title, message) {
        Alert.alert(title, message);
    }

    showConfirmation(title, message, onConfirm, onCancel) {
        Alert.alert(
            title,
            message,
            [
                { text: 'No', style: 'cancel', onPress: onCancel },
                { text: 'Yes', onPress: onConfirm }
            ]
        );
    }
}

export default new AlertService();