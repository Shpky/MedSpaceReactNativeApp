import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import defaultSaveForTest from "@data/defaultSaveForTest.json";

export default {
    async setSaveData(newSave: SaveInterface | ((oldSave: SaveInterface) => SaveInterface)) {
        typeof newSave !== "function"

        try {
            if (newSave instanceof Function) {
                const oldSave = await this.getSaveData();
                newSave = newSave(oldSave);
                newSave && console.log("newSave", newSave.patients.map((patient) => ({ ...patient, icone: null })))
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
            .set('save', JSON.stringify(__DEV__ ? defaultSaveForTest : defaultSaveForTest),
                { accessible: ACCESSIBLE.WHEN_UNLOCKED })
    },

    async getSaveData(): Promise<SaveInterface> {

        const exists = await RNSecureStorage.exists('save');
        if (!exists) await this.resetSaveData()

        const data = await RNSecureStorage.get('save');

        const parsedData = JSON.parse(data as string);
        parsedData.patients.forEach((patient: PatientInterface) => {
            patient.prescriptions.forEach((prescription: PrescriptionInterface) => {
                prescription.date != null ? prescription.date = new Date(prescription.date) : null
                prescription.medicines.forEach((medicine: MedicineInterface) => {

                    medicine.duration != null ? medicine.duration = new Date(medicine.duration) : null
                })

            })

        })

        return parsedData as SaveInterface;
    }
}
