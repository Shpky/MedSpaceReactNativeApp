import { Image, Pressable, Text } from 'react-native';
import style from './style';

type ProfilItemProps = {
    onPress: () => void
    patientLite: {
        name: string,
        icone: string,
    }
}

/** Permet de créer un item pour le profil
 * 
 * @param onPress {function} fonction à appeler lors d'un appui sur l'item
 * @param patientLite {object} objet contenant le nom et l'icone du patient
 */
export default function ProfilItem({ onPress, patientLite }: ProfilItemProps) {
    return <Pressable style={style.item} onPress={onPress}>
        <Image style={style.itemImage}
            source={{ uri: patientLite.icone }} />
        <Text style={style.itemText}>{patientLite.name}</Text>
    </Pressable>
}
