import { useState } from 'react';
import { Text, View, TextInput, FlatList } from 'react-native';
import style from '../../style';
import Item from './Item'
export default function AutoComplete({ onSelectMedicine }: { onSelectMedicine: (medicine: MedicineInterface) => void }) {
    const [input, setInput] = useState("");


    return <View>
        <Text style={style.textInput}>Selectionner un medicament</Text>
        <TextInput onChangeText={setInput} />
        <FlatList data={[]}
            renderItem={({ item }) => <Item medicine={item} onSelectMedicine={onSelectMedicine} />} />
    </View>
}
