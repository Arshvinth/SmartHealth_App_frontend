// src/services/AppointmentDataService.js
class AppointmentDataService {
    extractAppointmentData(appointment) {
        if (!appointment) return {};

        return {
            number: appointment?.appointment?.appointmentNumber || appointment?.appointmentNumber,
            appointmentId: appointment?.appointment?._id || appointment?._id,
            hospital: appointment.hospital,
            doctor: appointment.doctor,
            date: appointment.date,
            time: appointment.time,
            charges: appointment.charges,
            rawData: appointment
        };
    }

    validateAppointmentData(appointmentData) {
        const requiredFields = ['number', 'hospital', 'doctor', 'date', 'time'];
        const missingFields = requiredFields.filter(field => !appointmentData[field]);

        if (missingFields.length > 0) {
            throw new Error(`Missing required appointment data: ${missingFields.join(', ')}`);
        }

        return true;
    }

    prepareCancellationData(appointmentData) {
        return {
            _id: appointmentData.appointmentId,
            appointmentNumber: appointmentData.number,
            hospital: appointmentData.hospital,
            doctor: appointmentData.doctor,
            date: appointmentData.date,
            time: appointmentData.time,
            charges: appointmentData.charges
        };
    }
}

export default new AppointmentDataService();