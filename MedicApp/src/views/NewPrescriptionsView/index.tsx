import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { Button, TextInput, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNSecureStorage from 'rn-secure-storage';
import Save from '../../models/Save';

export default function index() {
    const [image, setImage] = useState<string | null>(null);
    let [save, setSave] = useState<Save | null>(null);
    const [prescription, setPrescription] = useState<PrescriptionInterface>(Object())
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

    const patientPickerHandler = (itemValue: string, itemIndex: number) => {
        setPrescription((oldP) => Object({ ...oldP, patient: save?.patients.find((p => p.name === itemValue)) }))
    }

    return save ?
        (<>
            <View>
                <Button title="Camera" onPress={cameraHandler} />
                <Button title="Library" onPress={libraryHandler} />
            </View>

            <View>
                <Text>Nom du patient:</Text>
                <Picker
                    selectedValue={save.patients[0].name}
                    onValueChange={patientPickerHandler}>

                    {save?.patients.map((patient) => {
                        return <Picker.Item key={patient.name} label={patient.name} value={patient.name} />
                    })}
                </Picker>

                <Text>Nom du médecin:</Text>
                <Picker
                    selectedValue={prescription.doctor?.name || "Aucun"}
                    onValueChange={doctorPickerHandler}>
                    <Picker.Item label="Aucun" value="null" />
                    {save?.doctors.map((doctor) => {
                        return <Picker.Item key={doctor.name} label={doctor.name} value={doctor.name} />
                    })}
                </Picker>
                <Text>

                </Text>

            </View>
        </>) : <Text>Chargement...</Text>

} 