import {
    NativeSyntheticEvent, TextInputChangeEventData,
    Text, TextInput
} from "react-native";
import style from "../style";


export default function Notes({ notes, onChange }:
    {
        notes?: string,
        onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
    }) {

    return <>
        <Text style={style.textInput}>Notes</Text>
        <TextInput style={[style.input, style.full]} placeholder="Notes"
            placeholderTextColor={style.input.color}
            onChange={onChange} value={notes} />
    </>
}
