import Title from "@components/TitleBubble"
import { RootStackParamList } from "@navigation/RootStackParamList";
import { Text, ScrollView, View, Button, ImageBackground, Pressable, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Medicine from "./Medicine";
import dataManager from "@features/dataManager";
import Toggle from "./Toggle";
//import DELTreamentCalculator from "@layouts/Calendar/treatmentDelCalculator";
import usePrescription from "@hooks/usePrescription";
import { useMemo } from "react";
import { delByRomain } from "@layouts/Calendar/treatmentDelCalculator";
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
            ? <><ScrollView>
                {
                    data.medicines.map((medicine, index) =>
                        <Medicine key={index} medicine={medicine} onToggle={(isNotifOn) => {
                        }} />
                    )
                }
            </ScrollView>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                    <Pressable onPress={() => {
                        navigation.navigate('NewPrescription', { prescriptionUpdate: data })
                    }}>
                        <ImageBackground
                            style={styles.container}
                            source={require("./jaune.png")}
                        ><Text style={styles.textWB}>MODIFIER</Text>
                        </ImageBackground>
                    </Pressable>
                    <Pressable onPress={async () => {
                        if (data === undefined) {
                            return
                        }
                        delByRomain(data.title, () => navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Treatment" }] })
                        )
                    }}><ImageBackground
                        style={styles.container}
                        source={require("./rouge2.png")}
                    ><Text style={styles.textWB}>SUPPRIMER</Text></ImageBackground></Pressable>
                </View>
            </>
            : <Text>Chargement...</Text>}
    </ScrollView>
}
const styles = StyleSheet.create({

    container: {
        padding: 10,
        paddingLeft: 20,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
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
