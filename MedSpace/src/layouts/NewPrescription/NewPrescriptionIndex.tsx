import { Button, TextInput, Text, ScrollView } from 'react-native';
import MedicineComponent from '@layouts/NewPrescription/Medicine/MedicineIndex';
import Title from '@components/TitleBubble';
import Id from './IdNewPrescription/IdNewPrescriptionsIndex';
import type { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Footer from './Footer';
import { NewPrescriptionContextProvider } from '../../contexts/NewPrescriptionContext';
import Medicines from './Medicines';
type NewPrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'NewPrescription'>

/** Affiche le formulaire de création d'une ordonnance
 * 
 * @param prescriptionUpdate { PrescriptionInterface | undefined } Si défini, NewPrescriptionIndex affiche le formulaire de modification d'une ordonnance
 */
export default function NewPrescriptionIndex({ navigation, route }: NewPrescriptionIndexProps) {
    const { prescriptionUpdate } = route.params || { undefined };

    return <ScrollView>
        <NewPrescriptionContextProvider prescription={prescriptionUpdate}>
            <Title>Veuillez renseigner les informations de l'ordonnance</Title>

            {/* <ModalImgPicker /> */}
            <Id />
            <Medicines />
            <Footer navigation={navigation} />

        </NewPrescriptionContextProvider>
    </ScrollView>

} 
