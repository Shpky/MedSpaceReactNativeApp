import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dataManager from "@features/dataManager"

/**
 * Custom hook qui permet de récupérer la sauvegarde
 * 
 * @returns la sauvegarde et une fonction pour la modifier
 */
export default function useSave(refresh: any[] = []): [SaveInterface | undefined, React.Dispatch<React.SetStateAction<SaveInterface | undefined>>] {
    const [save, setSaveState] = useState<SaveInterface | undefined>(undefined)

    useEffect(() => {
        console.log("refresh")
        dataManager.getSaveData().then(s => setSaveState(s))
        console.log("end refresh")
    }, refresh)

    useEffect(() => {
        console.log("savee =>", ({ ...save, patients: save?.patients.map(p => ({ ...p, icone: null })) }))
        save && dataManager.setSaveData(save)
    }, [save])

    return [save, setSaveState]
}
