import { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList } from 'react-native';
import style from '../../style';
import Item from './Item'
import { getDBConnection } from '@features/sqlDataManager';
import { enablePromise } from 'react-native-sqlite-storage';

type MedicineAutoComplete = {
    name: string,
    form: string,
    company: string
}

const cleanInput = (input: string) => input.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")

export default function AutoComplete({ onSelectMedicine }: { onSelectMedicine: (medicine: MedicineInterface) => void }) {
    const [input, setInput] = useState("");
    const [datas, setDatas] = useState<MedicineAutoComplete[]>([])

    useEffect(() => {
        if (input.length < 4) return;
        enablePromise(true)
        getDBConnection().then((db) =>
            db.executeSql(`SELECT name, form , (SELECT company FROM owner o WHERE o.cis = m.cis) as company FROM medicine m WHERE name LIKE "%${cleanInput(input)}%"`).then((results) => {
                const newData: MedicineAutoComplete[] = []
                for (let i = 0; i < results[0].rows.length; i++) {
                    const row = results[0].rows.item(i);
                    console.log("row", row)
                    newData.push({
                        name: row.name,
                        form: row.form,
                        company: row.company
                    })
                }
                setDatas(newData)
            })
        )

    }, [input])

    return <View style={style.modalAutoComplete}>
        <Text style={style.modalAutoCompleteText}>Sélectionnez un medicament:</Text>
        <TextInput style={style.input} onChangeText={setInput} />
        <FlatList data={datas}
            renderItem={({ item }) => <Item medicine={item} onSelectMedicine={onSelectMedicine} />} />
    </View>
}
