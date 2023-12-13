import { Pressable, Text } from "react-native";
import style from "../style";

export default function DeleteMedicine({ onClick }: { onClick: () => void }) {
    return <Pressable style={style.deleteMedicineButtonContainer} onPress={onClick}>
        <Text style={style.deleteMedicineButtonText}>Supprimer le médicament</Text>
    </Pressable>;
}
