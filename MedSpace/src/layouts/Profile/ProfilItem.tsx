import { Image, Pressable, Text } from 'react-native';

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
    return <Pressable onPress={onPress}>
        <Image style={{
            width: 75,
            height: 75,
            marginTop: 20,
            borderRadius: 100,
        }}
            source={{ uri: patientLite.icone }} />
        <Text>{patientLite.name}</Text>
    </Pressable>
}
