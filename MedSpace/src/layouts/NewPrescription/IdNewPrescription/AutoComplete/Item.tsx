import { Text, Pressable } from 'react-native'
import style from '../../style';

type DoctorAutoComplete = {
    name: string,
    mail: string | null,
}

type ItemProp = { doctor: DoctorAutoComplete, onSelectDoctor: (n: string, m: string) => void }

export default function Item({ doctor, onSelectDoctor }: ItemProp) {
    return <Pressable style={style.modalAutoCompleteItemContainer}
        onPress={() => {
            onSelectDoctor(doctor.name, doctor.mail || "")
        }}
    >
        <Text style={style.modalAutoCompleteItemText}>{doctor.name}</Text>
    </Pressable>
}
