import style from '../style';
import { TextInputChangeEventData, TextInput, NativeSyntheticEvent, Text, View } from 'react-native';

export default function Dosage({ dosage, onChangeDosage, onChangeUnit }:
    {
        dosage?: { quantity: number | null, unit: string }
        onChangeDosage: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
        onChangeUnit: (e: any) => any
    }) {

    const dosage_string = dosage?.quantity?.toString()
    return <>
        <Text style={style.textInput}>Dose</Text>
        <View style={style.halfContainer}>
            <TextInput keyboardType='numeric' maxLength={1} style={[style.input, style.half]} placeholder={"Dose"} placeholderTextColor={style.input.color} onChange={onChangeDosage} >{dosage_string === "NaN" ? "" : dosage_string}</TextInput>
            <TextInput style={[style.input, style.half]} placeholder={"Unité"} placeholderTextColor={style.input.color}
                onChange={onChangeUnit} >{dosage?.unit}</TextInput>
        </View>
    </>
}
