import { useState, useEffect } from "react"
import useSave from "./useSave"
/** Hook qui permet de récupérer le patient actuel et de le modifier
 * 
 * @param refresh {any[]} Liste des dépendances pour rafraichir le patient
 */
export default function useActualPatient(refresh: any[] = []): [PatientInterface | undefined, React.Dispatch<React.SetStateAction<PatientInterface | undefined>>] {

    const [patient, setPatient] = useState<PatientInterface | undefined>()
    const [save, setSave] = useSave(refresh)

    useEffect(() => {
        save && setPatient(save.patients.find(p => p.actualUser))
    }, [save])

    useEffect(() => {
        save && setSave(old => ({
            ...old,
            patients: old?.patients.map(p => p.actualUser ? patient : p) || [patient]
        } as SaveInterface))
    }, [patient])

    return [patient, setPatient]
}
