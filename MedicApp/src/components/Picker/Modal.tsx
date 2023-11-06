import style from './style';
import { View, Text, Pressable } from 'react-native';

export default function Modal({ items, onSelect }: {
    items: { label: string, value: string }[],
    onSelect: {
        select: React.Dispatch<React.SetStateAction<{
            label: string;
            value: string;
        } | null>>, close: () => void
    }
}) {
    const onPressHandler = (item: { label: string, value: string }) => {
        onSelect.select(item);
        onSelect.close();
    }
    return <View style={style.modal}>
        {items.map((i, index) =>
            <Pressable key={index} style={style.modalItems} onPress={() => { onPressHandler(i) }}>
                <Text style={style.modalItemsText}>{i.label}</Text>
            </Pressable>
        )}
    </View>
}
