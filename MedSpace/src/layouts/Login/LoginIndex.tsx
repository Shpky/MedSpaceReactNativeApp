import Title from "@components/TitleBubble"
import Debug from "@components/Debug"
import { Button, ScrollView } from "react-native"
import usePassword from "@hooks/usePassword"
import useSave from "@hooks/useSave"
import { useState } from "react"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "@navigation/RootStackParamList";
import PasswordInput from "./PasswordInput"

type LoginIndexProps = NativeStackScreenProps<RootStackParamList, 'Login'>

/** Permet de se connecter à l'application et d'accéder à la sélection de profil
 */
export default function LoginIndex({ navigation }: LoginIndexProps) {
    const [passwordInput, setPasswordInput] = useState("")
    const [checkPassword] = usePassword()
    const [save] = useSave()

    const validateButtonHandler = () => {
        if (!checkPassword(passwordInput)) return null
        navigation.reset({
            index: 0,
            routes: [{ name: 'Profil' }],
        });
    }

    return <ScrollView>
        <Debug>
            <Button title={"Print"} onPress={() => {
                console.log("password", save?.password)
            }}
            />
        </Debug>
        <Title>Veuillez déverouillez l'application</Title>
        <Button title={"checkPassword"} onPress={() => console.log(checkPassword("1234"))} />
        <PasswordInput onChangeText={setPasswordInput} />
        <Button title="Valider" onPress={validateButtonHandler} />
    </ScrollView>
}
