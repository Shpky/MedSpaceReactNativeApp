import defaultPrescription from '../data/defaultPrescription.json';
import { useState } from "react";
import dataManager from "@features/dataManager"

/**
 * Custom hook qui permet de créer une nouvelle prescription
 *
 * @return une nouvelle prescription, une fonction pour la modifier et une fonction pour l'appliquer au patient
 */
export default function useNewPrescription(prescription?: PrescriptionInterface):
    [PrescriptionInterface, React.Dispatch<React.SetStateAction<PrescriptionInterface>>, () => Promise<void>] {
    const [newPrescription, setPrescription] = useState<PrescriptionInterface>(prescription || defaultPrescription)

    const apply = async () => {  // Ajoute la prescription à la liste des prescriptions du patient
        prescription ?
            await dataManager.setSaveData((oldSave) => ({
                ...oldSave,
                patients: oldSave.patients.map(p => p.actualUser ? {
                    ...p,
                    prescriptions: p.prescriptions.map(pr => pr.title === prescription.title ? newPrescription : pr)
                } : p
                )
            })
            )
            : await dataManager.setSaveData((oldSave) => ({
                ...oldSave,
                patients: oldSave.patients.map(p => p.actualUser ? {
                    ...p,
                    prescriptions: [
                        ...p.prescriptions,
                        newPrescription
                    ]
                } : p
                )
            })
            )
    }

    return [newPrescription, setPrescription, apply]
}
