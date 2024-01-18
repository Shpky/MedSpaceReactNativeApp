import { Text, Pressable } from 'react-native'
import style from '../../style';

type MedicineAutoComplete = {
    name: string,
    form: string,
    company: string
}

export default function Item({ medicine, onSelectMedicine }: { medicine: MedicineAutoComplete, onSelectMedicine: (medicine: MedicineInterface) => void }) {
    return <Pressable style={style.modalAutoCompleteItemContainer}
        onPress={() => {

            const newMedicine: MedicineInterface = {
                name: medicine.name,
                company: medicine.company,
                dosageType: medicine.form,
                dosage: 0,
                frequency: {
                    morning: false,
                    noon: false,
                    evening: false
                },
                duration: null,
                administration_route: "",
                warning: false,
                notes: "",
                substitutable: false,
                to_renew: 0,
                minimumHoursbetweenDoses: 0
            }
            onSelectMedicine(newMedicine)
        }}
    >
        <Text style={style.modalAutoCompleteItemText}>{medicine.name}</Text>
    </Pressable>
}
