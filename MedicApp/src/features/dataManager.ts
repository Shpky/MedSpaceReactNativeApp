
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import defaultSave from "@data/defaultSave.json";
import defaultSaveForTest from "@data/defaultSaveForTest.json";

export default {
    async setSaveData(newSave: SaveInterface | ((oldSave: SaveInterface) => SaveInterface)) {
        try {
            if (newSave instanceof Function) {
                const oldSave = await this.getSaveData();
                newSave = newSave(oldSave);
                RNSecureStorage.set('save', JSON.stringify(newSave),
                    { accessible: ACCESSIBLE.WHEN_UNLOCKED })
            } else {
                RNSecureStorage.set('save', JSON.stringify(newSave),
                    { accessible: ACCESSIBLE.WHEN_UNLOCKED })
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error);
        }
    },

    async resetSaveData() {
        RNSecureStorage
            .set('save', JSON.stringify(__DEV__ ? defaultSaveForTest : defaultSave),
                { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    },

    async getSaveData(): Promise<SaveInterface> {

        const exists = await RNSecureStorage.exists('save');
        if (!exists) await this.resetSaveData()

        const data = await RNSecureStorage.get('save');

        const parsedData = JSON.parse(data as string);
        return parsedData as SaveInterface;
    }
}
