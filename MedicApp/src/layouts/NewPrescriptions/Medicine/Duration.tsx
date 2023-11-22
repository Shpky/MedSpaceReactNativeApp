import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import style from '../style';

export default function Duration({ duration, setDuration }: { duration: Date | null, setDuration: (newDuration: Date) => void }) {

    duration = duration || new Date();
    const [show, setShow] = useState(false);

    const onChangeDateHandler = (event: DateTimePickerEvent) => {
        const newDate = event.nativeEvent.timestamp;
        if (newDate) {
            setDuration(new Date(newDate));
        }
    }
    return <>
        <Text style={style.textInput}>Fin du traitement</Text>
        <Text style={style.textInput} onPress={
            () => {
                setShow(!show);
            }
        }>{duration.toLocaleDateString()}</Text >
        {
            show &&
            <DateTimePicker value={duration} mode="date" onChange={onChangeDateHandler} />
        }
    </>
}
