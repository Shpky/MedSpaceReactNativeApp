import { useEffect } from "react";
import dataManager from "@features/dataManager"

export default function useSave(): [SaveInterface | undefined, (data: SaveInterface) => void] {
    let save: SaveInterface | undefined
    useEffect(() => {
        dataManager.init()
        dataManager.getSaveData().then(s => save = s)
    }, [])
    return [save, dataManager.setSaveData]
}
