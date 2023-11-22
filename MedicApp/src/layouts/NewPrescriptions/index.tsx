import { useState } from 'react';
import { Button, TextInput, Text, View, Pressable } from 'react-native';
import MedicineComponent from '@layouts/NewPrescriptions/Medicine/Medicine';
import RNSecureStorage from 'rn-secure-storage';
import Title from '@components/TitleBubble';
import Container from '@containers/FormBubble';
import style from './style';
import defaultMedicine from '@data/defaultMedicine.json';
import defaultPrescription from '@data/defaultPrescription.json';
import ModalImgPicker from '@layouts/NewPrescriptions/ModalImportImg';
import DatePicker from './DateForm';
import AddMedicine from './buttons/AddMedicine';

export default function index() {
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
        <ModalImgPicker setprescription={setPrescription} />

        <Container>
            <Text style={style.textInput}>Nom du traitement</Text>
            <TextInput style={[style.input, style.full]}
                placeholder="Nom du traitement" placeholderTextColor={style.input.color}
                onChange={(e) => setPrescription((oldP) => ({ ...oldP, name: e.nativeEvent.text }))}
            >{prescription.title}</TextInput>
            <Text style={style.textInput}>Nom et coordonnées du médecin</Text>
            <View style={style.halfContainer}>
                <TextInput style={[style.input, style.half]}
                    placeholder="Nom" placeholderTextColor={style.input.color} />
                <TextInput style={[style.input, style.half]}
                    placeholder="Mail" placeholderTextColor={style.input.color} />
            </View>
        </Container>
        {
            prescription.medicines.map((p, i) => {

                const modifyMedicine = (newMedicine: MedicineInterface) => {
                    const newMedicines = [...prescription.medicines];
                    newMedicines[i] = newMedicine;
                    setMedicines(newMedicines)
                }
                const dropMedicine = () => {
                    if (prescription.medicines.length === 1) {
                        setMedicines([defaultMedicine])
                        return
                    }
                    const newMedicines = [...prescription.medicines];
                    newMedicines.splice(i, 1);
                    setMedicines(newMedicines)
                }
                return <MedicineComponent key={i} medicineProp={p}
                    onChange={modifyMedicine} drop={dropMedicine} />
            }
            )
        }
        <Container>
            <Text style={style.textInput}>Notes de l'ordonnance</Text>
            <TextInput style={[style.input, style.full]} placeholder="Notes" placeholderTextColor={style.input.color} />
            <DatePicker date={prescription.date} text={"Date de l'ordonnance"}
                setDate={(newDate) => setPrescription(oldP => ({ ...oldP, date: newDate }))} />
        </Container>
        <AddMedicine onClick={addMedicineHandler} />
    </>

} 
