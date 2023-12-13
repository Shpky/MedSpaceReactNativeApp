import dataManager from "@features/dataManager"
import { useState, useEffect } from "react"

export default function useActualPatient(): [PatientInterface | undefined, React.Dispatch<React.SetStateAction<PatientInterface | undefined>>] {

    const [patient, setPatient] = useState<PatientInterface | undefined>()

    useEffect(() => {
        dataManager.getSaveData().then(s => {
            setPatient(s.patients.find(p => p.actualUser))
        })
    }, [])

    useEffect(() => {
        patient && dataManager.setSaveData((oldSave) => ({
            ...oldSave,
            patients: oldSave.patients.map(p => p.actualUser ?
                patient : p)
        }) as SaveInterface)
    }, [patient])

    return [patient, setPatient]
}
