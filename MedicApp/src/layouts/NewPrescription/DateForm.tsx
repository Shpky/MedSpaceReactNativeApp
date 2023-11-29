import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Text } from 'react-native';
import style from './style';

export default function DateForm({ date, setDate, text }:
    { date: Date | null, setDate: (newDate: Date) => void, text: string }) {

    date = date || new Date();
    const [show, setShow] = useState(false);

    const onChangeDateHandler = (event: DateTimePickerEvent) => {
        const newDate = event.nativeEvent.timestamp;
        if (newDate) setDate(new Date(newDate));
    }

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
