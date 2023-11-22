import style from '../style';
import { TextInputChangeEventData, TextInput, NativeSyntheticEvent, Text } from 'react-native';

export default function Name({ onChange, name }:
    {
        onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
        name?: string
    }) {
    return <>
        <Text style={style.textInput}>Nom du médicament</Text>
        <TextInput style={[style.input, style.full]} placeholder="Nom du médicament"
            placeholderTextColor={style.input.color}
            onChange={onChange} >{name}</TextInput>
    </>
}
