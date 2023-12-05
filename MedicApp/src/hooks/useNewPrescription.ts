import defaultPrescription from '../data/defaultPrescription.json';
import { useState } from "react";
import dataManager from "@features/dataManager"

/**
 * Custom hook qui permet de créer une nouvelle prescription
 *
 * @return une nouvelle prescription, une fonction pour la modifier et une fonction pour l'appliquer au patient
 */
export default function useNewPrescription(): [PrescriptionInterface, (data: PrescriptionInterface) => void, () => void] {
    const [prescription, setPrescription] = useState<PrescriptionInterface>(defaultPrescription)

    const apply = () => {  // Ajoute la prescription à la liste des prescriptions du patient
        dataManager.setSaveData((oldSave) => ({
            ...oldSave,
            patients: oldSave.patients.map(p => p.actualUser ? {
                ...p,
                prescriptions: [
                    ...p.prescriptions,
                    prescription
                ]
            } : p
            )
        })
        )
    }

    return [prescription, setPrescription, apply]
}
