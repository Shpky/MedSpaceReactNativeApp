import React from 'react';
import {  StyleSheet, Text, Pressable, View, ImageBackground } from 'react-native';
import { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import useActualPatient from '@hooks/useActualPatient';
import { htmlmailtemplate } from './Mailer'
import EncadreLegend from './Legend'
import { ReportBuilder } from './ReportBuilder'

type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Email'>

/**
 * Renders the MailIndex component.
 * 
 * @param navigation - The navigation object.
 * @param route - The route object.
 * @returns The rendered component.
 */
export default function MailIndex({ navigation, route }: PrescriptionIndexProps) {
    const { prescription } = route.params
    const [patient] = useActualPatient()

    if (!patient) {
        return null;
    }

    if (!prescription) {
        navigation.goBack();
        return null;
    }

    if (!patient.calendar) {
        return null;
    }

    return (
        <>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                <Pressable onPress={() => htmlmailtemplate(prescription, patient)} style={{ width: "95%", justifyContent: "center", alignItems: "center" }}>
                    <ImageBackground
                        source={(require('./title.png'))}
                        style={styles.background}
                    ><Text style={[{ justifyContent: "center", textAlign: "center", color: "black" }, styles.title]}>Pressez pour envoyer le rapport à votre médecin</Text></ImageBackground>
                </Pressable>
            </View>

            <View style={{ width: "95%", alignSelf: 'center', marginTop: 20 }}>
                <View
                    style={[styles.background, { padding: 10, borderBlockColor: "black", borderWidth: 1, }]}
                >
                    <Text style={{ alignSelf: "center", textAlign: "justify", marginVertical: 10, color: "black", marginHorizontal: 10, fontWeight: 'bold', }}>Vous trouverez ci-dessous le résumé de votre rapport de prise de vos médicaments en fonction des semaines:</Text>
                    <EncadreLegend />
                    <Text style={[styles.fontblack, { fontSize: 12 }]}>Médicament(s) dans ce traitement: {prescription.medicines.map(e => e.name).join(", ")}</Text>
                    <ReportBuilder Prescription={prescription} Rowcalendar={patient.calendar} />
                </View>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    reportContainter: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        padding: 10,
        width: '100%',
        height: '100%',
        borderColor: 'black',
        borderWidth: 1,
    },

    centreur: {
        justifyContent: 'space-evenly', alignItems: 'center'
    },

    fontblack: {
        color: "black"
    },

    smallfont: {
        fontSize: 10,
        color: "black",

    },
    title: {
        fontWeight: "400",
        fontFamily: "Jomhuria-Regular",
        fontSize: 30,
        fontStyle: "normal",
        color: "#fff",
        textAlign: "center",
        padding: 10,

    },
    background: {


        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
    },
})
