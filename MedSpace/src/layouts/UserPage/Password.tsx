import PasswordInput from '@components/form/PasswordInput/PasswordInput';
import { useState } from 'react';
import { Pressable, Text, View, StyleSheet, Alert } from 'react-native';
import usePassword from '@hooks/usePassword';
import Toggle from '@layouts/Prescription/Toggle';
import Container from '@components/form/Container/ContainerIndex';
type PasswordInput = {
    oldPwd: string,
    newPwd: string,
    confirmNewPwd: string,
}

type PasswordProps = {
    onConfirm: () => void // fonction a appeler lorsque le mot de passe est confirmé
}
/** Permet de modifier et activer/desactiver le mot de passe de l'application */
export default function Password({ onConfirm }: PasswordProps) {
    const [passwordInput, setPasswordInput] = useState<PasswordInput>({
        oldPwd: "",
        newPwd: "",
        confirmNewPwd: "",
    })
    const { checkPassword, setPassword } = usePassword()
    const [pwdIsEnable, setPwdIsEnable] = useState<boolean>(!checkPassword(null))

    const validateButtonHandler = async () => {
        if (!checkPassword(passwordInput.oldPwd)) return;
        if (pwdIsEnable) {
            if (passwordInput.newPwd !== passwordInput.confirmNewPwd) {
                Alert.alert('Mauvais mot de passe', 'Le mot de passe de confirmation est différent du nouveau mot de passe');
                return;
            }
            setPassword(passwordInput.newPwd)
        } else {
            setPassword(null)
        }

        while (!checkPassword(passwordInput.newPwd)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        onConfirm()
    }

    return <Container>
        <Text style={styles.title}>Paramètres mot de passe</Text>
        {checkPassword(null) ||
            <>
                <Text>Ancien mot de passe</Text>
                <PasswordInput onChangeText={(text) => setPasswordInput((pw) => ({ ...pw, oldPwd: text }))} />
            </>}
        <View style={styles.enablePasswordContainer}>
            <Text style={styles.enablePasswordText}>Activer le mot de passe</Text>
            <Toggle is={pwdIsEnable} onToggle={(value) => setPwdIsEnable(!value)} />
        </View>

        {pwdIsEnable && <>
            <Text>Nouveau mot de passe</Text>
            <PasswordInput onChangeText={(text) => setPasswordInput((pw) => ({ ...pw, newPwd: text }))} />
            <Text>Confirmer le nouveau mot de passe</Text>
            <PasswordInput onChangeText={(text) => setPasswordInput((pw) => ({ ...pw, confirmNewPwd: text }))} />
        </>}
        {(checkPassword(null) && !pwdIsEnable) || <Pressable style={styles.confirmButton} onPress={validateButtonHandler} >
            <Text style={styles.confirmButtonText}>Confirmer</Text>
        </Pressable>}
    </Container>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    enablePasswordContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        color: 'white'

    },
    enablePasswordText: {
        fontSize: 15,
        color: 'white'
    },
    confirmButton: {
        marginTop: 20,
        backgroundColor: 'blue',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
    },
    confirmButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }

});
