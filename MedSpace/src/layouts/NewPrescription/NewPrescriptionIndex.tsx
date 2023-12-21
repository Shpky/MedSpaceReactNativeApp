import { Button, TextInput, Text, View, ScrollView } from 'react-native';
import MedicineComponent from '@layouts/NewPrescription/Medicine/MedicineIndex';
import Title from '@components/TitleBubble';
import Container from '@components/form/Container/ContainerIndex';
import style from './style';
import defaultMedicine from '@data/defaultMedicine.json';
import ModalImgPicker from './ImportImg/ModalImportImg';
import AddMedicine from './buttons/AddMedicine';
import Debug from '@components/Debug';
import Id from './IdNewPrescription/IdNewPrescriptionsIndex';
import useNewPrescription from '@hooks/useNewPrescription';
import type { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type NewPrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'NewPrescription'>

/** Affiche le formulaire de création d'une ordonnance
 * 
 * @param prescriptionUpdate { PrescriptionInterface | undefined } Si défini, NewPrescriptionIndex affiche le formulaire de modification d'une ordonnance
 */
export default function NewPrescriptionIndex({ navigation, route }: NewPrescriptionIndexProps) {

    const { prescriptionUpdate } = route.params || { undefined };

    const [prescription, setPrescription, applyNewPrescription] = useNewPrescription(prescriptionUpdate);

    const setMedicines = (newMedicines: MedicineInterface[]) =>
        setPrescription((oldP) => ({ ...oldP, medicines: newMedicines })) // Un raccourci pour modifier les médicaments de l'ordonnance

    const addMedicineHandler = () => {
        setPrescription((oldP) => ({ ...oldP, medicines: [...oldP.medicines, defaultMedicine] }))
    }; // Methode du bouton addMedicine pour ajouter un médicament à l'ordonnance

    const handleResetStack = () => {
        prescriptionUpdate // Si on est en modification, on retourne à la page de l'ordonnance
            ? navigation.reset({
                index: 2,
                routes: [
                    { name: "Home" },
                    { name: "Treatment" },
                    { name: "Prescription", params: { prescription: prescription } }]
            })
            : navigation.reset({
                index: 1,
                routes: [
                    { name: "Home" },
                    { name: "Treatment" }]
            })
    }

    return <ScrollView>
        <Debug>
            <Button title={"Print"} onPress={() =>
                console.log("presc\n", prescription, "\nmedicines\n", prescription.medicines)} />
            <Button title={"navigation stack"} onPress={() => console.log(navigation.getState())} />
        </Debug>

        <Title>Veuillez renseigner les informations de l'ordonnance</Title>

        <ModalImgPicker setprescription={setPrescription} />
        <Id prescription={prescription} onChange={setPrescription} />

        {
            prescription.medicines.map((p, i) => {

                const modifyMedicine = (newMedicine: MedicineInterface) => {
                    const newMedicines = [...prescription.medicines];
                    newMedicines[i] = newMedicine;
                    setMedicines(newMedicines)
                }
                const dropMedicine = () => {
                    if (prescription.medicines.length === 1) {
                        setMedicines([defaultMedicine])
                        return
                    }
                    const newMedicines = [...prescription.medicines].splice(i, 1);
                    setMedicines(newMedicines)
                }
                return <MedicineComponent key={i} medicine={p}
                    onChange={modifyMedicine} drop={dropMedicine} />
            }
            )
        }
        <AddMedicine onClick={addMedicineHandler} />
        <Container>
            <Text style={style.textInput}>Notes de l'ordonnance</Text>
            <TextInput style={[style.input, style.full]} placeholder="Notes" placeholderTextColor={style.input.color} />
        </Container>
        <Button title="Sauvegarder" onPress={() => {
            applyNewPrescription().then(handleResetStack)
        }} />
    </ScrollView>

} 
