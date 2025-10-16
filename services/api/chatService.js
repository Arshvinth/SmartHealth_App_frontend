export class ChatService {
    async sendMessage(message, patientName) {
        const response = await apiClient.post('/api/chatbot/chatbotHandle', {
            message,
            patientName,
        });
        return response.reply;
    }
}