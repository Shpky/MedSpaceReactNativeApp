import defaultSave from "./defaultSave.json";
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage'


export default function resetDataBase() {
    RNSecureStorage
        .set('save', JSON.stringify(defaultSave),
            { accessible: ACCESSIBLE.WHEN_UNLOCKED })
}
