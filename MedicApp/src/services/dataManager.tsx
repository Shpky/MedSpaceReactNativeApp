
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import defaultSave from "@data/defaultSave.json";

class DataManager {
    async init() {
        RNSecureStorage.exists('save')
            .then((exists) => {
                if (!exists) {
                    this.deleteSaveData()
                }
            }
            )

    }
    async setSaveData(data: SaveInterface): Promise<void> {
        try {
            RNSecureStorage
                .set('save', JSON.stringify(data),
                    { accessible: ACCESSIBLE.WHEN_UNLOCKED })
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error);
        }
    }
    async deleteSaveData(): Promise<void> {

        RNSecureStorage
            .set('save', JSON.stringify(defaultSave),
                { accessible: ACCESSIBLE.WHEN_UNLOCKED })


    }
    async getSaveData(): Promise<SaveInterface> {
        try {
            const exists = await RNSecureStorage.exists('save');

            if (exists) {
                const data = await RNSecureStorage.get('save');

                if (typeof data === "string") {
                    const parsedData = JSON.parse(data);


                    return parsedData as SaveInterface;

                }
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données sauvegardées :", error);
        }

        // Retourne undefined s'il y a une erreur, si les données n'existent pas ou ne sont pas valide
        //@ts-ignore
        return defaultSave as SaveInterface;
    }
}


export default DataManager;
