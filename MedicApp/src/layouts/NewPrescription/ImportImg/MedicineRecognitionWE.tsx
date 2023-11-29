import { TextRecognitionResult } from '@react-native-ml-kit/text-recognition';
import * as stringSimilarity from 'string-similarity';
const Tolerance = 0.8;
const Medicines = ["Doliprane", "Aspirine", "Ibuprofene", "Paracetamol", "Efferalgan", ""]
function isMedicinePresentWTolerance(MedicineTocheck: string, OurDic: string[], Tolerance: number): boolean {
    for (const nomDansTableau of OurDic) {
        const similarity = stringSimilarity.compareTwoStrings(MedicineTocheck, nomDansTableau);

        if (similarity >= Tolerance) {
            return true;
        }
    }

    return false;
}



export default async function DetectMedicineinsentence(input: TextRecognitionResult) {
    for (let block of input.blocks) {
        for (let line of block.lines) {
            for (let word of line.text.split(" ")) {
                if (isMedicinePresentWTolerance(word, Medicines, Tolerance)) {
                    console.log(word)
                }
            }
        }

    }


}

/* Exemple d'utilisation
const tableauNoms: string[] = ["Jean", "Pierre", "Marie", "Claire"];
const nomAVerifier: string = "John";
const seuilSimilarite: number = 0.8;

if (isMedicinePresentWTolerance(nomAVerifier, tableauNoms, seuilSimilarite)) {
    console.log(`Le nom ${nomAVerifier} est dans le tableau avec une tolérance d'erreur.`);
} else {
    console.log(`Le nom ${nomAVerifier} n'est pas dans le tableau avec la tolérance d'erreur spécifiée.`);
}*/


