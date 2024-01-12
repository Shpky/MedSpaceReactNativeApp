import Container from "@components/form/Container/ContainerIndex";
import { Text, TextInput, View } from "react-native";
import style from "../style";
import DatePicker from "./SelectDate";
import { useState, useEffect } from "react";
import SelectDoctor from "./SelectDoctor";
import { useNewPrescription } from "@hooks/useNewPrescription";


/**
 * Permet de modifier les informations d'identité de l'ordonnance
 * (nom du traitement, médecin, date)
 * 
 * @param prescription prescription à modifier 
 * @param onChange callback appelé lorsqu'un champ est modifié
 */
export default function IdNewPrescriptions() {
    const { prescription, setPrescription } = useNewPrescription();
    

    return <Container>
        <Text style={style.textInput}>Nom du traitement</Text>
        <TextInput style={[style.input, style.full, prescription.title.length <= 0 ? style.badInput : null]}
            placeholder="Nom du traitement" placeholderTextColor={style.input.color}
            onChangeText={(t) => setPrescription((oldP) => ({ ...oldP, title: t }))}
        >{prescription.title}</TextInput>
        <View>
            <Text style={style.textInput}>Nom et coordonnées du médecin</Text>
            <SelectDoctor
                onSelect={((doctor: DoctorInterface) => setPrescription((oldP) => ({ ...oldP, doctor: doctor })))} />
        </View>
        <View style={style.halfContainer}>
            <TextInput style={[style.input, style.half]}
                placeholder="Nom" placeholderTextColor={style.input.color} />
            <TextInput style={[style.input, style.half]}
                placeholder="Mail" placeholderTextColor={style.input.color} />
        </View>
        <DatePicker date={prescription.date}
            setDate={(newDate) => setPrescription(oldP => ({ ...oldP, date: newDate }))} />
    </Container>
}
