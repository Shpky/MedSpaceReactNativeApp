import { useEffect, useState } from "react";
import dataManager from "@features/dataManager"

/**
 * Custom hook qui permet de récupérer la sauvegarde
 * 
 * @returns la sauvegarde et une fonction pour la modifier
 */
export default function useSave(): [SaveInterface | undefined, React.Dispatch<React.SetStateAction<SaveInterface | undefined>>] {
    const [save, setSaveState] = useState<SaveInterface | undefined>(undefined)

    useEffect(() => {
        dataManager.getSaveData().then(s => setSaveState(s))
    }, [])

    useEffect(() => {
        save && dataManager.setSaveData(save)
    }, [save])

    // const setSave = (oldSave: SaveInterface) => {
    //     setSaveState(oldSave)
    // }

    return [save, setSaveState]
}
