import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text } from 'react-native';
import style from '../style';

type SelectDateProps = {
    date: Date | null | undefined,
    setDate: (newDate: Date) => void,
    customText?: String | undefined
}
/**
 * Permet de sélectionner la date de l'ordonnance
 * 
 
 * @param date date par défaut
 * @param setDate callback appelé lorsqu'une date est sélectionnée
 * @param customText texte à afficher (par défaut "Date de l'ordonnance")
 */
export default function SelectDate({ date, setDate, customText }: SelectDateProps) {

    date = date || new Date();
    const [show, setShow] = useState(false);

    const onChangeDateHandler = (event: DateTimePickerEvent) => {
        const newDate = event.nativeEvent.timestamp;
        if (newDate) setDate(new Date(newDate));
    }
    const text = customText || "Date de l'ordonnance";
    return <>
        <Text style={style.textInput}>{text}</Text>
        <Text style={[style.input, style.full]} onPress={
            () => {
                setShow(!show);
            }
        }>{date.toLocaleDateString()}</Text >
        {
            show &&
            <DateTimePicker value={date} mode="date" onChange={onChangeDateHandler} />
        }
    </>
}
