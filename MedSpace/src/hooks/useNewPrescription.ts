import defaultPrescription from '../data/defaultPrescription.json';
import { useState } from "react";
import dataManager from "@features/dataManager"
import setNotifications from '@features/notifications';
import TreamentCalculator from '@layouts/Calendar/treatmentCalculator';
/**
 * Custom hook qui permet de créer une nouvelle prescription
 *
 * @return une nouvelle prescription, une fonction pour la modifier et une fonction pour l'appliquer au patient
 */
export default function useNewPrescription(prescription?: PrescriptionInterface):
    [PrescriptionInterface, React.Dispatch<React.SetStateAction<PrescriptionInterface>>, () => Promise<void>] {
    const [newPrescription, setPrescription] = useState<PrescriptionInterface>(prescription || defaultPrescription)
    if (newPrescription.date === null) newPrescription.date = new Date()

    const apply = async () => {  // Ajoute la prescription à la liste des prescriptions du patient
        await TreamentCalculator(newPrescription).then(async (calendar) => {



            prescription ?
                await dataManager.setSaveData((oldSave) => ({
                    ...oldSave,
                    patients: oldSave.patients.map(p => p.actualUser ? {
                        ...p,
                        prescriptions: p.prescriptions.map(pr => pr.title === prescription.title ? newPrescription : pr),
                        calendar: calendar
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
                        ],
                        calendar: calendar

                    } : p
                    )
                })
                )
            setNotifications()
        })

    }

    return [newPrescription, setPrescription, apply]
}
