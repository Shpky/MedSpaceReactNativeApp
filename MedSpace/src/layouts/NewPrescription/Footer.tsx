import Container from "@components/form/Container/ContainerIndex";
import { Text, TextInput } from "react-native";
import { Alert } from "react-native";
import { useNewPrescription } from "@hooks/useNewPrescription";
import style from "./style";
import ConfirmXL from "@components/form/buttons/ConfirmXL";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@navigation/RootStackParamList";
import useSave from "@hooks/useSave";

const alert = (text: string) => Alert.alert("Erreur d'entrée", text);

export default function Footer({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, "NewPrescription", undefined> }) {
    const { prescription, apply } = useNewPrescription();
    const [save] = useSave();
    const handleResetStack = () => {
        // Si on est en modification, on retourne à la page de l'ordonnance
        navigation.reset({
            index: 2,
            routes: [
                { name: "Home" },
                { name: "Treatment" },
                { name: "Prescription", params: { prescriptionName: prescription.title } }]
        })
    }


    const checkInputs = () => {
        if (prescription.title.length <= 0) {
            alert("Veuillez renseigner le nom du traitement");
            return false;
        }
        save?.patients.forEach((patient) => {
            if (patient.prescriptions.find((p) => p.title === prescription.title)) {
                alert("Un traitement avec ce nom existe déjà");
                return false;
            }
        })
        if (prescription.date === undefined || prescription.date === null) {
            alert("Veuillez renseigner la date de l'ordonnance");
            return false;
        }
        prescription.medicines.forEach((medicine) => {
            if (medicine.name.length <= 0) {
                alert("Veuillez renseigner le nom d'un médicament");
                return false;
            }
            if (medicine.duration === undefined || medicine.duration === null) {
                alert("Veuillez renseigner la durée d'un médicament");
                return false;
            }
            if (medicine.duration.valueOf() <= prescription.date!.valueOf()) {
                alert("Veuillez renseigner une durée de traitement " + medicine.name + " supérieure à la date de l'ordonnance");
                return false;
            }
            if (medicine.frequency === undefined || medicine.frequency === null) {
                alert("Veuillez renseigner la fréquence d'un médicament");
                return false;
            }
        })
        return true;
    }

    return <>
        <Container>
            <Text style={style.textInput}>Notes de l'ordonnance</Text>
            <TextInput style={[style.input, style.full]} placeholder="Notes" placeholderTextColor={style.input.color} />
        </Container>
        <ConfirmXL styleProp={style.confirmButton} onPress={() => checkInputs() && apply().then(handleResetStack)}>Sauvegarder</ConfirmXL>
    </>
}
