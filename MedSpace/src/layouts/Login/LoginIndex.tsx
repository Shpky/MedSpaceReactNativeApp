import Title from "@components/TitleBubble"
import Debug from "@components/Debug"
import { Button, Text, ScrollView, StyleSheet } from "react-native"
import usePassword from "@hooks/usePassword"
import { useState } from "react"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "@navigation/RootStackParamList";
import PasswordInput from "@components/form/PasswordInput/PasswordInput"
import Container from "@components/form/Container/ContainerIndex"
import ConfirmXL from "@components/form/buttons/ConfirmXL"


type LoginIndexProps = NativeStackScreenProps<RootStackParamList, 'Login'>

/** Permet de se connecter à l'application et d'accéder à la sélection de profil
 */
export default function LoginIndex({ navigation }: LoginIndexProps) {
    const [passwordInput, setPasswordInput] = useState("")
    const { checkPassword } = usePassword()


    const validateButtonHandler = () => {
        if (!checkPassword(passwordInput)) return null
        navigation.reset({
            index: 0,
            routes: [{ name: 'Profil' }],
        });
    }

    return <ScrollView>
        <Title>Déverrouillez l'application</Title>
        <Container>
            <Text style={style.instructions}>Entrez votre mot de passe</Text>
            <PasswordInput onChangeText={setPasswordInput} />
        </Container>
        <ConfirmXL styleProp={style.confirm} onPress={validateButtonHandler}>Valider</ConfirmXL>
    </ScrollView>
}

const style = StyleSheet.create({
    instructions: {
        fontFamily: "Jomhuria-Regular",
        fontSize: 30,
        fontStyle: "normal",
        color: "#fff",
        textAlign: "center",
        marginTop: "-3%",
        marginBottom: "5%",
    },
    confirm: {
        width: "60%"
    },
});
