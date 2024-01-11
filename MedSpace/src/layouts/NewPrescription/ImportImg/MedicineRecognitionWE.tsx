import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';
import * as stringSimilarity from 'string-similarity';
const Tolerance = 0.8;
const Medicines = ["Doliprane", "Aspirine", "Ibuprofene", "Paracetamol", "Efferalgan", ""]
function isMedicinePresentWithTolerance(MedicineTocheck: string, OurDic: string[], Tolerance: number): boolean {
    for (const nomDansTableau of OurDic) {
        const similarity = stringSimilarity.compareTwoStrings(MedicineTocheck, nomDansTableau);

        if (similarity >= Tolerance) {
            return true;
        }
    }

    return false;
}



export default async function DetectMedicineInSentence(input: TextRecognitionResult) {
    for (let block of input.blocks) {
        for (let line of block.lines) {
            for (let word of line.text.split(" ")) {
                if (isMedicinePresentWithTolerance(word, Medicines, Tolerance)) {
                    console.log(word)
                }
            }
        }

    }


}


