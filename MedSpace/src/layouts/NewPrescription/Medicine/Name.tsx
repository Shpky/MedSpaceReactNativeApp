import style from '../style';
import { TextInputChangeEventData, TextInput, NativeSyntheticEvent, Text } from 'react-native';

export default function Name({ name, onChange }:
    {
        name?: string,
        onChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void,
    }) {
    return <>
        <Text style={style.textInput}>Nom du médicament</Text>
        <TextInput style={[style.input, style.full,]} placeholder="Nom du médicament"
            placeholderTextColor={style.input.color}
            onChange={onChange}>{name}</TextInput>
    </>
}
// !name?.length ? style.badInput : null
