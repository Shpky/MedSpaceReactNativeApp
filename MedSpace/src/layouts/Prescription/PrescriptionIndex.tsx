import Title from "@components/TitleBubble"
import { RootStackParamList } from "@navigation/RootStackParamList";
import { Text, ScrollView, View, Button } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Medicine from "./Medicine";
import dataManager from "@features/dataManager";
import Toggle from "./Toggle";
import DELTreamentCalculator from "@layouts/Calendar/treatmentDelCalculator";
import usePrescription from "@hooks/usePrescription";
import { useMemo } from "react";
type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Prescription'>

export default function PrescriptionIndex({ navigation, route }: PrescriptionIndexProps) {
    const { prescriptionName } = route.params
    const prescription = usePrescription(prescriptionName)

    const data = useMemo(() => {
        if (prescription.isLoad) {
            if (prescription.prescription === null) {
                navigation.goBack()
                return undefined
            }
            return prescription.prescription
        }
        return undefined
    }, [prescription.isLoad])


    return <ScrollView>
        <Title>
            {"Information " + prescriptionName}
        </Title>
        {!(data === undefined)
            ? <><View>
                <Text>
                    Médicament{data.medicines.length > 1 && "s"} :
                </Text>
                <View>
                    <Text>
                        Activer toutes les notifications:
                    </Text>
                    <Toggle onToggle={() => { }}></Toggle>
                </View>
                {
                    data.medicines.map((medicine, index) =>
                        <Medicine key={index} medicine={medicine} onToggle={(isNotifOn) => {
                            // todo
                        }} />
                    )
                }
            </View>
                <Button title="Modifier" onPress={() => {
                    navigation.navigate('NewPrescription', { prescriptionUpdate: data })
                }} />
                <Button title="Supprimer" onPress={async () => {
                    if (data === undefined) {
                        return
                    }
                    let calendar: Wcalendar = await DELTreamentCalculator(data)
                    await dataManager.setSaveData((oldData) => ({
                        ...oldData,
                        patients: oldData.patients.map((patient) => patient.actualUser ?

                            {
                                ...patient,
                                prescriptions: patient.prescriptions.filter((p) => p.title !== data?.title),
                                calendar: calendar

                            }
                            : patient)
                    }))
                    navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Treatment" }] })
                }} /> </>
            : <Text>Chargement...</Text>}
    </ScrollView>
}
