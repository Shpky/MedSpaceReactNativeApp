import { useEffect, useState } from "react";
import dataManager from "@features/dataManager"

/**
 * Custom hook qui permet de récupérer la sauvegarde
 * 
 * @returns la sauvegarde et une fonction pour la modifier
 */
export default function useSave(): [SaveInterface | undefined, (data: SaveInterface) => void] {
    const [save, setSave] = useState<SaveInterface | undefined>(undefined)
    useEffect(() => {
        dataManager.getSaveData().then(s => setSave(s))
    }, [])

    useEffect(() => {
        save && dataManager.setSaveData(save)
    }, [save])

    return [save, setSave]
}
