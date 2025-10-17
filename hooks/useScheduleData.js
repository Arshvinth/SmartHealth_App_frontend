// src/hooks/useScheduleData.js
import { useState, useCallback } from 'react';

export const useScheduleData = (appointmentService) => {
    const [doctors, setDoctors] = useState([]);
    const [hospitals, setHospitals] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadDoctors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getDoctors();
            setDoctors(data);
        } catch (err) {
            setError(err.message || 'Failed to load doctors');
        } finally {
            setLoading(false);
        }
    }, [appointmentService]);

    const loadDoctorHospitals = useCallback(async (doctorId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getDoctorHospitals(doctorId);
            setHospitals(data);
        } catch (err) {
            setError(err.message || 'Failed to load hospitals');
        } finally {
            setLoading(false);
        }
    }, [appointmentService]);

    const loadSchedules = useCallback(async (doctorId, hospitalId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getshedules(doctorId, hospitalId);
            console.log("📦 Raw schedule response:", data);


            setSchedules(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Failed to load schedules');
        } finally {
            setLoading(false);
        }
    }, [appointmentService]);


    const clearHospitals = useCallback(() => {
        setHospitals([]);
    }, []);

    const clearSchedules = useCallback(() => {
        setSchedules([]);
    }, []);

    return {
        doctors,
        hospitals,
        schedules,
        loading,
        error,
        loadDoctors,
        loadDoctorHospitals,
        loadSchedules,
        clearHospitals,
        clearSchedules,
    };
};