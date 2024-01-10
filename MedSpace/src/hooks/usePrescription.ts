import { useState, useEffect } from 'react';
import dataManager from '@features/dataManager';

type PrescriptionState = {
    prescription: PrescriptionInterface | null;
    isLoad: true
} | {
    isLoad: false
}
/**
 * Custom hook qui permet de récupérer une prescription
 *
 * @param title le titre de la prescription
 * @return la prescription et l'état de chargement
 */
export default function usePrescription(title: String): PrescriptionState {
    const [prescription, setPrescription] = useState<PrescriptionState>({ isLoad: false });

    useEffect(() => {
        dataManager.getSaveData().then((save) => {
            const prescription = save.patients.find((patient) => patient.actualUser)?.prescriptions.find((prescription) => prescription.title === title) || null;
            setPrescription({ prescription, isLoad: true });
        });
    }, [title]);

    return prescription;
}
