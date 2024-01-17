import {
    NativeSyntheticEvent, TextInputChangeEventData,
    Text, TextInput
} from "react-native";
import style from "../style";


export default function Renew({ renew, onChange }:
    {
        renew?: number,
        onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
    }) {

    const renew_string = renew?.toString()
    return <>
        <Text style={style.textInput}>Renouvellement</Text>
        <TextInput style={[style.input, style.full]} placeholder="Nombre de renouvelement"
            placeholderTextColor={style.input.color}
            keyboardType='numeric' maxLength={2}
            onChange={onChange}>{renew_string === "NaN" ? "" : renew_string}</TextInput>
    </>
}
