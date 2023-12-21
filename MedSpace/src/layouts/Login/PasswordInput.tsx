import { TextInput, View } from "react-native";
import Toggle from "@layouts/Prescription/Toggle";
import { useState } from "react";

type PasswordInputProps = {
    onChangeText: (newPassword: string) => void
}
/** Permet de créer un champ de texte pour un mot de passe
 * 
 * @param onChangeText {function} fonction à appeler lors d'un changement de texte 
 */
export default function PasswordInput({ onChangeText }: PasswordInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const toggleHandler = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    return <View>
        <TextInput
            placeholder="Mot de passe"
            onChangeText={onChangeText}
            keyboardType="default"
            secureTextEntry={!isPasswordVisible}
        />
        <Toggle onToggle={toggleHandler} />
    </View>
}
