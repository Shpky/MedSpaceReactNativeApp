import { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList } from 'react-native';
import style from '../../style';
import Item from './Item'
import useDoctors from '@hooks/useDoctors';


type DoctorAutoComplete = {
    name: string,
    mail: string | null,
}

export default function AutoComplete({ onSelectDoctor }: { onSelectDoctor: (n: string, m: string) => void }) {
    const [input, setInput] = useState("");
    const [datas, setDatas] = useState<DoctorAutoComplete[]>([])
    const { doctors } = useDoctors()

    useEffect(() => {
        setDatas(doctors.filter((doctor) => doctor.name.toLowerCase().includes(input.toLowerCase())))
    }, [input])

    return <View style={style.modalAutoComplete}>
        <Text style={style.modalAutoCompleteText}>Sélectionnez un médicament:</Text>
        <TextInput style={style.input} onChangeText={setInput} />
        <FlatList data={datas}
            renderItem={({ item }) => <Item doctor={item} onSelectDoctor={onSelectDoctor} />} />
    </View>
}
