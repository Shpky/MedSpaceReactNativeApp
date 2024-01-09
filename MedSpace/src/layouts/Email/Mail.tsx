import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, Button, Linking } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PDFDocument, rgb } from 'react-native-pdf-lib';
import useSave from '@hooks/useSave';
type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Email'>
export default function PrescriptionIndex({ navigation, route }: PrescriptionIndexProps) {
    const { prescription } = route.params
    const calendar = useSave()
    if (!calendar) {
        return null
    }
    if (!prescription) {

        navigation.goBack()
        return null
    }

    const PrescriptionCalendarFounder = () => {
        prescription.medicines.map((medicine, index) => {
            for (let i = 0; i < calendar.length; i++) {
                const week = calendar[i];
                for (let j = 0; j < week.length; j++) {
                    const day = week[j];
                    for (let k = 0; k < day.length; k++) {
                        const prise = day[k];
                        if (prise.nomMedoc === medicine.name) {
                            console.log('prise :>> ', prise);
                        }
                    }
                }
            }
        })
    }
    const openMailApp = () => {
        Linking.openURL(`mailto:${prescription.doctor?.name}?subject=Rapport de prise de mon traitement ${prescription.title}&body=Bonjour%20!`);
    };
    const getStatusColor = (prises: priseInterface[]): string => {
        const allTaken = prises.every(prise => prise.consome);
        const someTaken = prises.some(prise => prise.consome);

        if (allTaken) {
            return 'green';
        } else if (someTaken) {
            return 'orange';
        } else {
            return 'red';
        }
    };
    const generatePDF = async (data: Wcalendar) => {
        const pdfDoc = await PDFDocument.create();

        Object.keys(data).forEach((Wnumber) => {
            const weekData = data[Wnumber];

            pdfDoc.addPage([612, 792]).drawText(`Semaine ${Wnumber}`, { x: 50, y: 700 });

            Object.keys(weekData).forEach((date, index) => {
                const prises = weekData[date];

                const statusColor = getStatusColor(prises);
                const xPosition = 50 + index * 60;

                // Ajoutez un carré coloré
                pdfDoc
                    .drawRectangle({
                        x: xPosition,
                        y: 50,
                        width: 30,
                        height: 30,
                        color: rgb(1, 0, 0),
                    })
                    .fillAndStroke(statusColor, rgb(0, 0, 0));

                pdfDoc.drawText(`Date: ${date}`, { x: xPosition, y: 30 });

                prises.forEach((prise, index) => {
                    const yPosition = pdfDoc.page.height - 80 - index * 20;

                    pdfDoc.drawText(`Médicament: ${prise.nomMedoc}, Heure: ${prise.heure}, Dosage: ${prise.dosage}`, {
                        x: xPosition,
                        y: yPosition,
                    });
                });
            });
        });

        const pdfBytes = await pdfDoc.save();

        // Sauvegardez le fichier PDF ou effectuez d'autres actions selon vos besoins.
        // Ici, nous pouvons simplement afficher la taille du fichier généré.
        console.log(`Taille du fichier PDF généré: ${pdfBytes.length} octets`);
    };
    const handleGeneratePDF = () => {

        generatePDF());
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>App React Native</Text>
            <Button title="Générer le PDF et envoyer l'e-mail" onPress={handleGeneratePDF} />
        </View>
    );
}

