import { useState } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { Button, TextInput, Text, View, TextProps } from 'react-native';
import MedicineComponent from '@layouts/NewPrescriptions/Medicine';
import RNSecureStorage from 'rn-secure-storage';
import ScanButton from '@buttons/Scan';
import Title from '@components/TitleBubble';
import Container from '@containers/FormBubble';
import style from './style';
import defaultMedicine from '@data/defaultMedicine.json';
import defaultPrescription from '@data/defaultPrescription.json';
import ModalImgPicker from '@components/containers/ImgPicker/Modale';
export default function index() {
    const [image, setImage] = useState<string | null>(null);
    let save: SaveInterface;
    const [prescription, setPrescription] = useState<PrescriptionInterface>(defaultPrescription)

    RNSecureStorage.exists('save')
        .then((exists) => {
            if (exists)
                RNSecureStorage.get('save')
                    .then((data) => {
                        if (typeof data === "string")
                            save = JSON.parse(data);
                    })
        })
    const setMedicines = (newMedicines: MedicineInterface[]) => {
        setPrescription((oldP) => ({ ...oldP, medicines: newMedicines }))
    }

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
        setPrescription((oldP) => ({ ...oldP, doctor: save?.doctors.find((d) => d.name === itemValue) || null }))
    }

    const addMedicineHandler = () => {
        setPrescription((oldP) => ({ ...oldP, medicines: [...oldP.medicines, defaultMedicine] }))
    }

    return <>
        {
            __DEV__ && <Button title={"Print"} onPress={() => console.log("prescription\n", prescription, "\nmedicines\n", prescription.medicines)} />
        }

        <Title>Veuillez renseigner les informations de l'ordonnance</Title>
        <ScanButton>Ou scannez votre ordonnance</ScanButton>
        <ModalImgPicker />
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
            prescription.medicines.map((p, i) => {

                const modifyMedicine = (newMedicine: MedicineInterface) => {
                    const newMedicines = [...prescription.medicines];
                    newMedicines[i] = newMedicine;
                    setMedicines(newMedicines)
                }
                return <MedicineComponent key={i} medicine={p} onChange={modifyMedicine} />
            }
            )
        }

        <Button title="Ajouter médicament" onPress={addMedicineHandler} />
    </>

} 
