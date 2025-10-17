import { apiClient } from "./apiClient";

export class AppointmentService {

    async scheduleAppointment(appointmentData) {
        try {
            console.log('🚀 Sending appointment request to /api/appointment/book:', appointmentData);
            const response = await apiClient.post('/api/appointment/book', appointmentData);
            console.log('✅ Appointment response:', response);
            return response; // Make sure to return response.data
        } catch (error) {
            console.error('❌ API Error:', error);

            // Enhanced error logging
            if (error.response) {
                console.error('Response error:', error.response.data);
                console.error('Response status:', error.response.status);
                throw new Error(error.response.data.message || 'Failed to schedule appointment');
            } else if (error.request) {
                console.error('No response received:', error.request);
                throw new Error('No response from server. Please check your connection.');
            } else {
                console.error('Request setup error:', error.message);
                throw new Error('Failed to schedule appointment: ' + error.message);
            }
        }
    }

    async cancelAppointment(appointmentId) {
        return apiClient.put(`/api/appointment/cancel/${appointmentId}`);
    }

    // In your AppointmentService - update getUserAppointments method
    async getUserAppointments(userId) {
        try {
            console.log('🔄 [Frontend] Fetching appointments for user:', userId);
            const response = await apiClient.get(`/api/appointment/getAppointment/${userId}`);
            console.log('✅ [Frontend] Full API response:', response);
            console.log('📊 [Frontend] Appointments count:', response.appointments?.length || 0);

            if (response.appointments && response.appointments.length > 0) {
                console.log('🔍 [Frontend] First appointment sample:', response.appointments[0]);
            }

            return response.appointments || [];
        } catch (error) {
            console.error('❌ [Frontend] Failed to fetch appointments:', error);
            return [];
        }
    }

    async getDoctors() {
        const response = await apiClient.get('/api/doctor/doctorsList');
        return response.doctors || [];
    }

    async getDoctorHospitals(doctorId) {
        const response = await apiClient.get(`/api/doctor/doctorHospitals/${doctorId}`);
        return response.details || [];
    }

    async getDoctorSpecializations() {
        const response = await apiClient.get('/api/doctor/doctorSpecialization');
        return response.details || [];
    }

    async getAvailability(scheduleId) {
        const response = await apiClient.get(`/api/schedule/availability/${scheduleId}`);
        return response.details || [];
    }

    async getshedules(doctorId, hospitalId) {
        console.log('🔍 getSchedules called with:', { doctorId, hospitalId });
        if (!doctorId || doctorId === 'undefined') {
            throw new Error('Doctor ID is required and cannot be undefined');
        }

        if (!hospitalId || hospitalId === 'undefined') {
            throw new Error('Hospital ID is required and cannot be undefined');
        }
        const response = await apiClient.get(`/api/schedule/doctorAvailability/${hospitalId}/${doctorId}`);
        console.log(response);
        return response.availability || [];
    }

}