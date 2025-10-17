// src/hooks/useQuickAppointment.js
import { useState, useCallback } from 'react';

export const useQuickAppointment = (appointmentService) => {
    const [conversationStep, setConversationStep] = useState('ask_doctor');
    const [quickAppointmentData, setQuickAppointmentData] = useState({
        doctorName: '',
        doctor: null,
        hospital: null,
        schedule: null
    });
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);

    const findDoctorByName = useCallback(async (name) => {
        setLoading(true);
        try {
            const allDoctors = await appointmentService.getDoctors();
            const filtered = allDoctors.filter(doctor =>
                doctor.name.toLowerCase().includes(name.toLowerCase())
            );
            setFilteredDoctors(filtered);
            return filtered;
        } catch (error) {
            console.error('Error finding doctors:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }, [appointmentService]);

    const loadDoctorHospitals = useCallback(async (doctorId) => {
        setLoading(true);
        try {
            const data = await appointmentService.getDoctorHospitals(doctorId);
            setHospitals(data);
            return data;
        } catch (error) {
            console.error('Error loading hospitals:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }, [appointmentService]);

    const loadSchedules = useCallback(async (doctorId, hospitalId) => {
        setLoading(true);
        try {
            const data = await appointmentService.getshedules(doctorId, hospitalId);
            setSchedules(data);
            return data;
        } catch (error) {
            console.error('Error loading schedules:', error);
            return [];
        } finally {
            setLoading(false);
        }
    }, [appointmentService]);

    const setDoctor = useCallback(async (doctorName) => {
        const doctors = await findDoctorByName(doctorName);
        if (doctors.length === 0) {
            return { success: false, message: 'No doctor found with that name' };
        }

        if (doctors.length === 1) {
            const doctor = doctors[0];
            setQuickAppointmentData(prev => ({ ...prev, doctorName, doctor }));
            const hospitals = await loadDoctorHospitals(doctor.id);
            setConversationStep('select_hospital');
            return { success: true, doctor, hospitals };
        }

        setFilteredDoctors(doctors);
        setConversationStep('select_doctor_from_list');
        return { success: true, doctors };
    }, [findDoctorByName, loadDoctorHospitals]);

    const selectDoctorFromList = useCallback(async (doctor) => {
        setQuickAppointmentData(prev => ({ ...prev, doctor }));
        const hospitals = await loadDoctorHospitals(doctor.id);
        setConversationStep('select_hospital');
        return hospitals;
    }, [loadDoctorHospitals]);

    const setHospital = useCallback(async (hospital) => {
        setQuickAppointmentData(prev => ({ ...prev, hospital }));
        const schedules = await loadSchedules(prev.doctor.id, hospital.id);
        setConversationStep('select_schedule');
        return schedules;
    }, [loadSchedules]);

    const setSchedule = useCallback((schedule) => {
        setQuickAppointmentData(prev => ({ ...prev, schedule }));
        setConversationStep('complete');
    }, []);

    const resetQuickAppointment = useCallback(() => {
        setConversationStep('ask_doctor');
        setQuickAppointmentData({
            doctorName: '',
            doctor: null,
            hospital: null,
            schedule: null
        });
        setFilteredDoctors([]);
        setHospitals([]);
        setSchedules([]);
    }, []);

    return {
        conversationStep,
        quickAppointmentData,
        filteredDoctors,
        hospitals,
        schedules,
        loading,
        setDoctor,
        selectDoctorFromList,
        setHospital,
        setSchedule,
        resetQuickAppointment
    };
};