import Title from "@components/TitleBubble"
import Debug from "@components/Debug"
import { Button, Text, ScrollView, StyleSheet } from "react-native"
import usePassword from "@hooks/usePassword"
import useSave from "@hooks/useSave"
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
    const [isLoading, checkPassword] = usePassword()
    const [save] = useSave()



    const validateButtonHandler = () => {
        if (!(isLoading == "success") || !checkPassword(passwordInput)) return null
        navigation.reset({
            index: 0,
            routes: [{ name: 'Profil' }],
        });
    }

    if (isLoading !== "success") return <ScrollView>
        <Text>Chargement...</Text>
    </ScrollView>

    if (checkPassword(null)) {
        navigation.reset({ // ya un bug ici   Warning: Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`LoginIndex`). To locate the bad setState() call inside `LoginIndex`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
            index: 0,
            routes: [{ name: 'Profil' }],
        });
    } else return <ScrollView>
        <Debug>
            <Button title={"Print"} onPress={() => {
                console.log("password", save?.password)
            }}
            />
            <Button title={"checkPassword"} onPress={() => console.log(checkPassword(passwordInput))} />
        </Debug>
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
