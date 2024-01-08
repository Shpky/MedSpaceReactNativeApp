import Title from "@components/TitleBubble"
import { RootStackParamList } from "@navigation/RootStackParamList";
import { Text, ScrollView, View, Button } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Medicine from "./Medicine";
import dataManager from "@features/dataManager";
import Toggle from "./Toggle";
import DELTreamentCalculator from "@layouts/Calendar/treatmentDelCalculator";
type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Prescription'>

export default function PrescriptionIndex({ navigation, route }: PrescriptionIndexProps) {
    //console.log('route :>> ', route);
    const { prescription } = route.params

    if (!prescription) {
        //console.log('prescription :>> ', prescription);
        navigation.goBack()
        return null
    }

    return <ScrollView>
        <Title>
            {"Information " + prescription.title}
        </Title>
        <View>
            <Text>
                Médicament{prescription.medicines.length > 1 && "s"} :
            </Text>
            <View>
                <Text>
                    Activer toutes les notifications:
                </Text>
                <Toggle onToggle={() => { }}></Toggle>
            </View>
            {
                prescription.medicines.map((medicine, index) =>
                    <Medicine key={index} medicine={medicine} onToggle={(isNotifOn) => {
                        // todo
                    }} />
                )
            }
        </View>
        <Button title="Modifier" onPress={() => {
            navigation.navigate('NewPrescription', { prescriptionUpdate: prescription })
        }} />
        <Button title="Supprimer" onPress={async () => {
            let calendar: Wcalendar = await DELTreamentCalculator(prescription)
            await dataManager.setSaveData((oldData) => ({
                ...oldData,
                patients: oldData.patients.map((patient) => patient.actualUser ?

                    {
                        ...patient,
                        prescriptions: patient.prescriptions.filter((p) => p.title !== prescription.title),
                        calendar: calendar

                    }
                    : patient)
            }))
            navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Treatment" }] })
        }} />
    </ScrollView>
}
