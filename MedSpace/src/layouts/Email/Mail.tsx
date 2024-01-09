import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button, Linking } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import useSave from '@hooks/useSave';
import useActualPatient from '@hooks/useActualPatient';
import { PermissionsAndroid } from 'react-native';
type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Email'>
export default function PrescriptionIndex({ navigation, route }: PrescriptionIndexProps) {
    const { prescription } = route.params
    const [patient] = useActualPatient()

    if (!patient) return (console.log("MAIL:>>pas de patient"), null)
    if (!prescription) {
        console.log("MAIL:>>pas de de prescription")
        navigation.goBack()
        return null
    }
    if (!patient.calendar) return (console.log("MAIL:>>pas de calendar"), null)
    const wcalendar: Wcalendar = patient?.calendar

    const requestWritePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Permission d\'écriture',
                    message: 'L\'application a besoin de l\'autorisation pour écrire dans le dossier de téléchargement.',
                    buttonNeutral: 'Demander plus tard',
                    buttonNegative: 'Annuler',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Autorisation d\'écriture accordée');
                // Continuer avec la génération du PDF et le déplacement du fichier
                generatePDF(PrescriptionCalendarFounder());
            } else {
                console.log('Autorisation d\'écriture refusée');
            }
        } catch (error) {
            console.error('Erreur lors de la demande d\'autorisation d\'écriture :', error);
        }
    };
    const PrescriptionCalendarFounder = (): Wcalendar => {
        prescription.medicines.map((medicine, index) => {
            for (const key in wcalendar) {
                for (const dayKey in wcalendar[key]) {
                    for (const prise of wcalendar[key][dayKey]) {
                        if (prise.releatedTreatment != prescription.title) {
                            wcalendar[key][dayKey].slice(wcalendar[key][dayKey].indexOf(prise), 1)
                            if (wcalendar[key][dayKey].length == 0) {
                                delete wcalendar[key][dayKey]
                                if (Object.keys(wcalendar[key]).length == 0) {
                                    delete wcalendar[key]
                                }
                            }
                        }

                    }
                }
            }
        })
        return wcalendar
    }
    const openMailApp = () => {
        Linking.openURL(`mailto:${prescription.doctor?.name}?subject=Rapport de prise de mon traitement ${prescription.title}&body=Bonjour%20!`);
    };
    async function convertPngToBase64(): Promise<string | null> {
        const binaryString = await RNFS.readFile("./img/144.png", 'base64');
        return binaryString;
    }

    const generatePDF = async (calendar: Wcalendar) => {
        const htmlContent = `
        <img src="data:image/png;base64,${convertPngToBase64()}" />
        <h1>Rapport de prises médicamenteuses</h1>
        <h2>Ce rapport répertories les prises de médicaments pour le traitement nomé ${prescription.title} pour le patient M.${patient.name}</h2>
        <div><p>Numero de la semaine/anne</p><p>L</p><div style="width: 10px; height: 10px; background-color: #3498db;"></div><p>M</p><p>M</p><p>J</p><p>V</p><p>S</p><p>D</p></div>
        
    
  `;
        //await requestWritePermission();
        const options = {
            html: htmlContent,
            fileName: `${patient.name} + report`,
            directory: 'Download',
        };

        const pdf = await RNHTMLtoPDF.convert(options);
        const pdfFilePath = pdf.filePath;
        console.log("Mail:>path", pdfFilePath)
        const downloadDir = RNFS.DownloadDirectoryPath;
        const newFilePath = `${downloadDir}/${patient.name}_report.pdf`;

        // Déplacer le fichier PDF vers le dossier de téléchargement par défaut du téléphone
        try {
            await RNFS.moveFile(pdfFilePath || "", newFilePath);
            console.log("Mail:>path", newFilePath);

            // Ouvrir l'application de messagerie avec des paramètres préremplis
            const email = `${prescription.doctor?.mail || null} '`;
            const subject = 'Rapport de prise de mon traitement MonTraitement';
            const body = `Bonjour ! Vous trouverez ci-joint le rapport de prise de mon traitement MonTraitement. \nCordialement, ${patient.name}}`;

            // Utilisation de Linking.openURL
            Linking.openURL(`mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}&attachment=${newFilePath}`);
        } catch (error) {
            console.error('Erreur lors du déplacement du fichier PDF :', error);
        }
    };



    const handleGeneratePDF = async () => {
        await requestWritePermission();
        generatePDF(PrescriptionCalendarFounder());
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>App React Native</Text>
            <Button title="Générer le PDF et envoyer l'e-mail" onPress={handleGeneratePDF} />
        </View>
    );
}
