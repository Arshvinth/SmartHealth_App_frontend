// src/hooks/useAppointmentFlow.js
import { useState, useCallback } from 'react';

export const useAppointmentFlow = () => {
    const [currentStep, setCurrentStep] = useState(1); // 1: Doctor, 2: Hospital, 3: Schedule, 4: Patient Form
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState(null);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    const nextStep = useCallback(() => {
        setCurrentStep(prev => Math.min(prev + 1, 4));
    }, []);

    const prevStep = useCallback(() => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    }, []);

    const selectDoctor = useCallback((doctor) => {
        setSelectedDoctor(doctor);
        setSelectedHospital(null);
        setSelectedSchedule(null);

    }, []);

    const selectHospital = useCallback((hospital) => {
        setSelectedHospital(hospital);
        setSelectedSchedule(null);

    }, []);

    const selectSchedule = useCallback((schedule) => {
        setSelectedSchedule(schedule);

    }, []);

    const resetFlow = useCallback(() => {
        setCurrentStep(1);
        setSelectedDoctor(null);
        setSelectedHospital(null);
        setSelectedSchedule(null);
    }, []);

    const getStepTitle = useCallback(() => {
        const titles = {
            1: 'Select Doctor',
            2: 'Select Hospital',
            3: 'Select Time Slot',
            4: 'Patient Information'
        };
        return titles[currentStep] || '';
    }, [currentStep]);

    const canProceedToNext = useCallback(() => {
        switch (currentStep) {
            case 1:
                return !!selectedDoctor;
            case 2:
                return !!selectedHospital;
            case 3:
                return !!selectedSchedule;
            default:
                return false;
        }
    }, [currentStep, selectedDoctor, selectedHospital, selectedSchedule]);

    return {
        currentStep,
        selectedDoctor,
        selectedHospital,
        selectedSchedule,
        nextStep,
        prevStep,
        selectDoctor,
        selectHospital,
        selectSchedule,
        resetFlow,
        getStepTitle,
        canProceedToNext:
            (currentStep === 1 && selectedDoctor) ||
            (currentStep === 2 && selectedHospital) ||
            (currentStep === 3 && selectedSchedule)
    };
};