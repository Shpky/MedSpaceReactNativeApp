import { useEffect, useState } from "react";
import dataManager from "@features/dataManager"

/**
 * Custom hook qui permet de récupérer les docteurs
 * 
 * @returns les docteurs et une fonction pour les modifier
 */
export default function useDoctor(): [DoctorInterface[] | undefined, (data: DoctorInterface[]) => void] {
    const [doctors, setDoctors] = useState<DoctorInterface[] | undefined>(undefined)

    useEffect(() => {
        dataManager.getSaveData().then(s => setDoctors(s.doctors))
    }, [])

    useEffect(() => {
        doctors && dataManager.setSaveData((oldSave) => ({
            ...oldSave,
            doctors: doctors
        }));
    }, [doctors])

    return [doctors, setDoctors]
}
