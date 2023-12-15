import { useEffect, useState } from "react";
import dataManager from "@features/dataManager"
// import { useIsFocused } from '@react-navigation/native'

/**
 * Custom hook qui permet de récupérer la sauvegarde
 * 
 * @returns la sauvegarde et une fonction pour la modifier
 */
export default function useSave(): [SaveInterface | undefined, React.Dispatch<React.SetStateAction<SaveInterface | undefined>>] {
    const [save, setSave] = useState<SaveInterface | undefined>(undefined)
    // const isFocused = useIsFocused()

    useEffect(() => {
        dataManager.getSaveData().then(s => setSave(s))
    },)

    useEffect(() => {
        save && dataManager.setSaveData(save)
    }, [save])

    return [save, setSave]
}
