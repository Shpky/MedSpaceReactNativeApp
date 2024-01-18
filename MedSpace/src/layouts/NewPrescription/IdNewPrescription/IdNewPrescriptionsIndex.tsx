import Container from "@components/form/Container/ContainerIndex";
import { Text, TextInput, View } from "react-native";
import style from "../style";
import DatePicker from "./SelectDate";
import { useNewPrescription } from "@hooks/useNewPrescription";
import OpenAutoComplete from "./OpenAutoComplete";
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
            <OpenAutoComplete onChange={(n: string, m: string) => {
                console.log("onChange", n, m)
                setPrescription((oldP) => ({ ...oldP, doctor: { mail: m, name: n } }))
            }} />
            <Text style={style.textInput}>Nom et coordonnées du médecin</Text>
        </View>
        <View style={style.halfContainer}>
            <TextInput style={[style.input, style.half]}
                value={prescription.doctor?.name}
                placeholder="Nom" placeholderTextColor={style.input.color}
                onChangeText={(t) => setPrescription((oldP) => ({ ...oldP, doctor: { mail: oldP.doctor?.mail || "", name: t } }))}
            />
            <TextInput style={[style.input, style.half]}
                value={prescription.doctor?.mail || ""}
                placeholder="Mail" placeholderTextColor={style.input.color}
                onChangeText={(t) => setPrescription((oldP) => ({ ...oldP, doctor: { name: oldP.doctor ? oldP.doctor.name : "", mail: t } }))}

            />
        </View>
        <DatePicker date={prescription.date}
            setDate={(newDate) => setPrescription(oldP => ({ ...oldP, date: newDate }))} />
    </Container>
}
