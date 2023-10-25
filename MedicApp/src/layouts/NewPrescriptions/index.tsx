import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { Button, TextInput, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNSecureStorage from 'rn-secure-storage';
import Save from '../../models/Save';
import ScanButton from '../../components/buttons/Scan';
import Title from '../../components/TitleBubble';
import Container from '../../components/containers/FormBubble';
import style from './style';
import defaultMedicine from '../../data/defaultMedicine.json';

export default function index() {
    const [image, setImage] = useState<string | null>(null);
    let [save, setSave] = useState<Save | null>(null);
    const [prescription, setPrescription] = useState<PrescriptionInterface[]>(Object())
    const [medicines, setMedicines] = useState<MedicineInterface[]>([Object(defaultMedicine)])
    RNSecureStorage.exists('save')
        .then((exists) => {
            if (exists) {
                RNSecureStorage.get('save')
                    .then((data) => {
                        if (typeof data === "string")
                            setSave(Save.fromJson(JSON.parse(data)));

                    })
            }
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
                    return <Container key={i}>
                        <Text style={style.textInput}>Nom du médicament</Text>
                        <TextInput style={[style.input, style.full]} placeholder="Nom du médicament" placeholderTextColor={style.input.color} />
                        <Text style={style.textInput}>Laboratoire</Text>
                        <TextInput style={[style.input, style.full]} placeholder="Nom du laboratoire" placeholderTextColor={style.input.color} />
                        <Text style={style.textInput}>Dose</Text>
                        <View style={style.halfContainer}>
                            <TextInput style={[style.input, style.half]} placeholder="Dose" placeholderTextColor={style.input.color} />
                            <TextInput style={[style.input, style.half]} placeholder="Unité" placeholderTextColor={style.input.color} />
                        </View>
                        <View style={style.textPickercontainer}>
                            <Text style={style.textInput}>Fréquence</Text>
                            <Picker style={style.picker}  mode='dropdown' selectedValue={
                                "morning" in p.frequency ? "routine" :
                                    "days" in p.frequency ? "weekly" : "daily"
                            }>
                                <Picker.Item label="Repas" value="routine" />
                                <Picker.Item label="Quotidien" value="daily" />
                                <Picker.Item label="Hedbomadaire" value="weekly" />

                            </Picker>
                        </View>
                    </Container>
                }
                )
            }
            
            <Button title="Ajouter médicament" onPress={addMedicineHandler} />
        </>) : <Text>Chargement...</Text>

} 