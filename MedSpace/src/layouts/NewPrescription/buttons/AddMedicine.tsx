import { Pressable, Text } from "react-native";
import style from "../style";

export default function AddMedicine({ onClick }: { onClick: () => void }) {
    return <Pressable style={style.addMedicineButtonContainer} onPress={onClick}>
        <Text style={style.addMedicineButtonText}>Ajouter un médicament</Text>
    </Pressable>;
}
