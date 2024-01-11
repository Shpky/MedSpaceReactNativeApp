import defaultPrescription from '../data/defaultPrescription.json';
import { useState, createContext } from "react";
import dataManager from "@features/dataManager"
import setNotifications from '@features/notifications';
import TreamentCalculator from '@layouts/Calendar/treatmentCalculator';

type NewPrescriptionContextType = {
    prescription: PrescriptionInterface,
    setPrescription: React.Dispatch<React.SetStateAction<PrescriptionInterface>>,
    apply: () => Promise<void>
}

export const NewPrescriptionContext = createContext<NewPrescriptionContextType | null>(null)

type NewPrescriptionContextProviderProps = { prescription?: PrescriptionInterface, children: JSX.Element[] }

export function NewPrescriptionContextProvider({ prescription, children }: NewPrescriptionContextProviderProps): JSX.Element {
    const [newPrescription, setPrescription] = useState<PrescriptionInterface>(prescription || defaultPrescription)
    if (newPrescription.date === null) newPrescription.date = new Date()

    const apply = async () => {  // Ajoute la prescription à la liste des prescriptions du patient
        await TreamentCalculator(newPrescription).then(async (calendar) => {
            // console.log("newPrescription", newPrescription)
            // console.log("calendarCONTEXTS", calendar)
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

    return <NewPrescriptionContext.Provider value={{ prescription: newPrescription, setPrescription, apply }}>
        {children}
    </NewPrescriptionContext.Provider>
}
