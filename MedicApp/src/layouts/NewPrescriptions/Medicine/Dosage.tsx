import style from '../style';
import { TextInputChangeEventData, TextInput, NativeSyntheticEvent, Text, View } from 'react-native';

export default function Dosage({ dosage, onChangeDosage, onChangeUnit }:
    {
        dosage?: { quantity: number, unit: string }
        onChangeDosage: (e: NativeSyntheticEvent<TextInputChangeEventData>) => number,
        onChangeUnit: (e: any) => any
    }) {
    return <>
        <Text style={style.textInput}>Dose</Text>
        <View style={style.halfContainer}>
            <TextInput style={[style.input, style.half]} placeholder={"Dose"} placeholderTextColor={style.input.color} value={dosage?.quantity?.toString()}
                onChange={onChangeDosage} />
            <TextInput style={[style.input, style.half]} placeholder={"Unité"} placeholderTextColor={style.input.color} value={dosage?.unit}
                onChange={onChangeUnit} />
        </View>
    </>
}
