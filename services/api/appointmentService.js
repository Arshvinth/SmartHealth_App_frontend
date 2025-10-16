import { apiClient } from "./apiClient";

export class AppointmentService {

    async scheduleAppointment(appointmentData) {
        return apiClient.post('/api/appointment/book', appointmentData);
    }

    async cancelAppointment(appointmentId) {
        return apiClient.put(`/api/appointment/cancel/${appointmentId}`);
    }

    async getUserAppointments(userId) {
        const response = await apiClient.get(`/api/appointment/getAppointment/${userId}`);
        return response.appointment || [];
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
        const response = await apiClient.get(`/api/schedule/doctorAvailability/${hospitalId}/${doctorId}`);
        return response.details || [];
    }

}