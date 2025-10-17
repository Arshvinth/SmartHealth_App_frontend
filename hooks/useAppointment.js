// src/hooks/useAppointment.js
import { useState, useCallback } from 'react';

export const useAppointment = (service) => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadUserAppointments = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const data = await service.getUserAppointments(userId);
            setAppointments(data);
        } catch (err) {
            setError(err.message || 'Failed to load appointments');
        } finally {
            setLoading(false);
        }
    }, [service]);

    const scheduleAppointment = useCallback(async (appointmentData) => {
        setLoading(true);
        setError(null);
        try {
            const result = await service.scheduleAppointment(appointmentData);
            return result;
        } catch (err) {
            setError(err.message || 'Failed to schedule appointment');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [service]);

    const cancelAppointment = useCallback(async (appointmentId) => {
        setLoading(true);
        setError(null);
        try {
            const result = await service.cancelAppointment(appointmentId);
            setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
            return result;
        } catch (err) {
            setError(err.message || 'Failed to cancel appointment');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [service]);

    const loadDoctors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await service.getDoctors();
            setDoctors(data);
        } catch (err) {
            setError(err.message || 'Failed to load doctors');
        } finally {
            setLoading(false);
        }
    }, [service]);

    const loadSpecializations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await service.getDoctorSpecializations();
            setSpecializations(data);
        } catch (err) {
            setError(err.message || 'Failed to load specializations');
        } finally {
            setLoading(false);
        }
    }, [service]);


    return {
        appointments,
        doctors,
        specializations,
        loading,
        error,
        loadUserAppointments,
        scheduleAppointment,
        cancelAppointment,
        loadDoctors,
        loadSpecializations,
    };
};