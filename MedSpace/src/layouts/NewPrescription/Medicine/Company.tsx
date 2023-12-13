import style from '../style';
import { TextInputChangeEventData, TextInput, NativeSyntheticEvent, Text } from 'react-native';

export default function Name({ company, onChange }:
    {
        company?: string,
        onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
    }) {
    return <>
        <Text style={style.textInput}>Laboratoire</Text>
        <TextInput style={[style.input, style.full]} placeholder="Nom du laboratoire"
            placeholderTextColor={style.input.color}
            onChange={onChange} >{company}</TextInput>
    </>
}
