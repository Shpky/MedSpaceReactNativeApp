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
        
        dataManager.getSaveData().then(s => setSaveState(s))
        
    }, refresh)

    useEffect(() => {
        
        save && dataManager.setSaveData(save)
    }, [save])

    return [save, setSaveState]
}
