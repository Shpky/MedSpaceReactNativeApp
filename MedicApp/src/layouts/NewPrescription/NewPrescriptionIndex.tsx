import { useEffect, useState } from 'react';
import { Button, TextInput, Text, View, ScrollView } from 'react-native';
import MedicineComponent from '@layouts/NewPrescription/Medicine/MedicineIndex';
import Title from '@components/TitleBubble';
import Container from '@components/form/Container/ContainerIndex';
import style from './style';
import defaultMedicine from '@data/defaultMedicine.json';
import defaultPrescription from '@data/defaultPrescription.json';
import ModalImgPicker from './ImportImg/ModalImportImg';
import AddMedicine from './buttons/AddMedicine';
import Debug from '@components/Debug';
import useSave from "@hooks/useSave";
import Id from './IdNewPrescription/IdNewPrescriptionsIndex';
import useNewPrescription from '@hooks/useNewPrescription';
import { useNavigation } from '@react-navigation/native';

export default function NewPrescription() {

    const [prescription, setPrescription, applyNewPrescription] = useNewPrescription();
    const navigation = useNavigation();

    const setMedicines = (newMedicines: MedicineInterface[]) =>
        setPrescription((oldP) => ({ ...oldP, medicines: newMedicines }))

    const addMedicineHandler = () => {
        setPrescription((oldP) => ({ ...oldP, medicines: [...oldP.medicines, defaultMedicine] }))
    };

    const backToTreatment = () => {
        //@ts-ignore

        navigation.reset({ index: 1, routes: [{ name: "Home" }, { name: "Treatment" }] })
        //@ts-ignore
        navigation.navigate("Treatment");
    }

    const handleResetStack = () => {
        navigation.reset({ index: 1, routes: [{ name: "Home" as never }, { name: "Treatment" as never }] })
    }
    return <ScrollView>
        <Debug>
            <Button title={"Print"} onPress={() =>
                console.log("presc\n", prescription, "\nmedicines\n", prescription.medicines)} />
            <Button title={"navigation stack"} onPress={() => console.log(navigation.getState())} />
        </Debug>

        <Title>Veuillez renseigner les informations de l'ordonnance</Title>

        <ModalImgPicker setprescription={setPrescription} />
        <Id prescription={prescription} onChange={setPrescription} />

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
                return <MedicineComponent key={i} medicine={p}
                    onChange={modifyMedicine} drop={dropMedicine} />
            }
            )
        }
        <AddMedicine onClick={addMedicineHandler} />
        <Container>
            <Text style={style.textInput}>Notes de l'ordonnance</Text>
            <TextInput style={[style.input, style.full]} placeholder="Notes" placeholderTextColor={style.input.color} />
        </Container>
        <Button title="Sauvegarder" onPress={() => {
            applyNewPrescription().then(handleResetStack)
        }} />
    </ScrollView>

} 
