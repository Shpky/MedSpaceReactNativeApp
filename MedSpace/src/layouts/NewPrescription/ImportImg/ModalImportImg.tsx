import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import * as stringSimilarity from "string-similarity"
import {getDBConnection} from "@features/sqlDataManager";
import {enablePromise} from "react-native-sqlite-storage";
import {useNewPrescription} from "@hooks/useNewPrescription";
const ModalImgPicker = () => {
    const {setPrescription} = useNewPrescription()

    const [image, setImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const TextRecognitionContainer = async (input: string) => {
        enablePromise(true)
        const db = await getDBConnection()

        const result = await TextRecognition.recognize(input);
        console.log(result.text)

        let medNames = new Set<string>
        let medLine = new Set<string>

        for (const block of result.blocks) {

            for (const line of block.lines) {
                let isMedicine = false

                for (let word of line.text.split(" ")) {
                    if (word.length < 6) {continue}
                    word = word.toUpperCase()
                    word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                    try {
                        const sql = `SELECT name FROM medicine WHERE name LIKE "%${word}%";`;
                        const results = await db.executeSql(sql)
                        if (results[0].rows.length > 0) {
                            isMedicine = true
                            results.forEach(res => {
                                for (let index = 0; index < res.rows.length; index++) {
                                    medNames.add(res.rows.item(index).name)
                                }
                            });
                        }
                    } catch {}
                }

                if (isMedicine) {
                    medLine.add(line.text)
                    isMedicine = false
                }
            }
        }

        const listMedicine = new Set<string>
        medLine.forEach(med => {
            listMedicine.add(stringSimilarity.findBestMatch(med, Array.from(medNames)).bestMatch.target)
        })

        console.log(listMedicine)

        let prescriptionMedicines: MedicineInterface[] = []
        for (const med of listMedicine) {
            try {
                const results = await db.executeSql(`SELECT name, company, form FROM medicine INNER JOIN owner o on medicine.cis = o.cis WHERE name = "${med}";`)
                results.forEach(res => {
                    for (let index = 0; index < res.rows.length; index++) {
                        const medicines: MedicineInterface = {
                            name: res.rows.item(index).name,
                            company: res.rows.item(index).company,
                            administration_route: "",
                            dosage : 0,
                            dosageType : res.rows.item(index).form,
                            frequency: {
                                morning: false,
                                noon: false,
                                evening: false,
                            },
                            duration: null,
                            warning: false,
                        }
                        prescriptionMedicines.push(medicines)
                    }
                });
            } catch (e) {
                console.log(e)
            }
        }

        prescriptionMedicines = prescriptionMedicines.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.name === value.name
                ))
        )

        const newPrescription : PrescriptionInterface = {
            medicines: prescriptionMedicines,
            doctor: {
                name: "",
                mail: ""
            },
            date: null,
            notes: "",
            title: ""
        }

        setPrescription(newPrescription)
    }

    /*
    const DetectMedicineContainer = async (input: TextRecognitionResult) => {
        let Medecines = DetectMedicineInSentence(input)
    }

     */



    const cameraHandler = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
        }
        launchCamera(options, async (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string") {
                setImage(response.assets[0].uri);
                if (response.assets[0].uri) { TextRecognitionContainer(response.assets[0].uri); setModalVisible(!modalVisible); }

            }
        })
    };



    const libraryHandler = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
        };
        launchImageLibrary(options, async (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string") {
                setImage(response.assets[0].uri);
                if (response.assets[0].uri) { TextRecognitionContainer(response.assets[0].uri); setModalVisible(!modalVisible); }

            }
        });
    }





    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Que voulez vous faire ?</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Pressable
                                style={[styles.button, styles.buttonGallery]}
                                onPress={() => libraryHandler()}>
                                <Text >Gallery</Text></Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonAppPhoto]}
                                onPress={() => cameraHandler()}>
                                <Text >Appareil Photo</Text></Pressable>

                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Fermez</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Ou scanner une ordonnance physique</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonGallery: {
        marginRight: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#F194FF',
        justifyContent: 'center'
    },
    buttonAppPhoto: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#F194FF',
        justifyContent: 'center'
    }
    ,
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
        marginBottom: 30,
    },
    buttonClose: {
        backgroundColor: '#FF0000',
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalImgPicker;
