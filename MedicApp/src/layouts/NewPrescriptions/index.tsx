import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { Button, TextInput, Text, View, TextProps } from 'react-native';
import MedicineComponent from '../../components/MedicinePrescription';
import RNSecureStorage from 'rn-secure-storage';
import Save from "@models/Save";
import ScanButton from '@buttons/Scan';
import Title from '@components/TitleBubble';
import Container from '@containers/FormBubble';
import style from './style';
import defaultMedicine from '@data/defaultMedicine.json';

export default function index() {
    const [image, setImage] = useState<string | null>(null);
    let [save, setSave] = useState<Save | null>(null);
    const [prescription, setPrescription] = useState<PrescriptionInterface>(Object())
    const [medicines, setMedicines] = useState<MedicineInterface[]>([Object(defaultMedicine)])

    RNSecureStorage.exists('save')
        .then((exists) => {
            if (exists)
                RNSecureStorage.get('save')
                    .then((data) => {
                        if (typeof data === "string")
                            setSave(Save.fromJson(JSON.parse(data)));
                    })
        })

    const cameraHandler = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
        }
        launchCamera(options, (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string")
                setImage(response.assets[0].uri);
        })
    };

    const libraryHandler = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
        }
        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string")
                setImage(response.assets[0].uri);
        })
    };

    const doctorPickerHandler = (itemValue: string, itemIndex: number) => {
        setPrescription((oldP) => Object({ ...oldP, doctor: save?.doctors.find((d) => d.name === itemValue) || null }))
    }
    const addMedicineHandler = () => {
        setMedicines((oldM) => [...oldM, Object(defaultMedicine)])
    }

    return save ?
        (<>
            {
                __DEV__ && <Button title={"Print"} onPress={() => console.log("prescription\n", prescription, "\nmedicines\n", medicines)} />
            }
            <Title>Veuillez renseigner les informations de l'ordonnance</Title>
            <ScanButton>Ou scannez votre ordonnance</ScanButton>
            <Container>
                <Text style={style.textInput}>Nom du traitement</Text>
                <TextInput style={[style.input, style.full]} placeholder="Nom du traitement" placeholderTextColor={style.input.color} />
                <Text style={style.textInput}>Nom et coordonnées du médecin</Text>
                <View style={style.halfContainer}>
                    <TextInput style={[style.input, style.half]} placeholder="Nom" placeholderTextColor={style.input.color} />
                    <TextInput style={[style.input, style.half]} placeholder="Mail" placeholderTextColor={style.input.color} />
                </View>
            </Container>
            {
                medicines.map((p, i) => {

                    const modifyMedicine = (newMedicine: MedicineInterface) => {
                        setMedicines((oldM) => {
                            const newMedicines = [...oldM];
                            newMedicines[i] = newMedicine;
                            return newMedicines;
                        })
                    }
                    return <MedicineComponent key={i} medicine={p} Container={Container} style={{
                        textInput: style.textInput as TextProps,
                        input: style.input,
                    }} modify={true} onChange={modifyMedicine} />
                }
                )
            }

            <Button title="Ajouter médicament" onPress={addMedicineHandler} />
        </>) : <Text>Chargement...</Text>

} 
