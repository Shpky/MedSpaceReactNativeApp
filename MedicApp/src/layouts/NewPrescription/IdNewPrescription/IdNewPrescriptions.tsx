import Container from "@components/containers/FormBubble";
import { Text, TextInput, View } from "react-native";
import style from "../style";
import DatePicker from "../DateForm";
import { useState, useEffect } from "react";

type IdNewPrescriptionProps = {
    prescription: PrescriptionInterface, onChange?: (newPrescription: PrescriptionInterface) => void
}
export default function IdNewPrescriptions({ prescription, onChange }: IdNewPrescriptionProps) {
    const [prescriptionState, setPrescription] = useState(prescription);


    return <Container>
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
        <DatePicker date={prescription.date} text={"Date de l'ordonnance"}
            setDate={(newDate) => setPrescription(oldP => ({ ...oldP, date: newDate }))} />
    </Container>
}
