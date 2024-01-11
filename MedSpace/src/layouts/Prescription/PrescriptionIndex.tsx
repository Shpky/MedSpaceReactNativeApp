import Title from "@components/TitleBubble"
import { RootStackParamList } from "@navigation/RootStackParamList";
import { Text, ScrollView, View, Button, ImageBackground, Pressable, StyleSheet } from "react-native";
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
            {"Médicament du traitement " + prescriptionName}
        </Title>
        {!(data === undefined)
            ? <><View>

                {/* <View>
                    <Text>
                        Activer toutes les notifications:
                    </Text>
                    <Toggle onToggle={() => { }}></Toggle>
                </View> */}
                {
                    data.medicines.map((medicine, index) =>
                        <Medicine key={index} medicine={medicine} onToggle={(isNotifOn) => {
                            // todo
                        }} />
                    )
                }
            </View>

                <Pressable onPress={() => {
                    navigation.navigate('NewPrescription', { prescriptionUpdate: data })
                }}>
                    <ImageBackground
                        style={styles.container}
                        source={require("./orange.png")}
                    ><Text style={styles.textWB}>MODIFIER</Text>
                    </ImageBackground>
                </Pressable>


                <Pressable onPress={async () => {
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
                }}><ImageBackground
                    style={styles.container}
                    source={require("./red.png")}
                ><Text style={styles.textWB}>SUPPRIMER</Text></ImageBackground></Pressable>



            </>
            : <Text>Chargement...</Text>}
    </ScrollView>
}
const styles = StyleSheet.create({

    container: {

        padding: 10,
        paddingLeft: 20,
        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
        marginBottom: 15,

    },
    textWB: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    textW: {
        color: 'white',
        fontSize: 15,

    }

})