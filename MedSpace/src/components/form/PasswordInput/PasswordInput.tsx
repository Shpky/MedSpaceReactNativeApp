import { TextInput, View } from "react-native";
import Toggle from "./Toggle"
import { useState } from "react";
import styles from "./styles";


type PasswordInputProps = {
    onChangeText: (newPassword: string) => void
    isForConfirm?: boolean
}

/** Permet de créer un champ de texte pour un mot de passe
 * 
 * @param onChangeText {function} fonction à appeler lors d'un changement de texte 
 */
export default function PasswordInput({ onChangeText, isForConfirm }: PasswordInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const toggleHandler = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    return <View style={styles.container}>
        <TextInput
            placeholder={isForConfirm ? "Confirmer le mot de passe" : "Mot de passe"}
            onChangeText={onChangeText}
            keyboardType="default"
            secureTextEntry={!isPasswordVisible}
            style={styles.input}
            placeholderTextColor={"black"}
        />
        <Toggle onToggle={toggleHandler} />
    </View>
}
