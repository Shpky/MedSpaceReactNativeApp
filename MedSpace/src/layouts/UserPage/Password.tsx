import PasswordInput from '@components/form/PasswordInput/PasswordInput';
import { useState } from 'react';
import { Button, ScrollView, Text } from 'react-native';
import usePassword from '@hooks/usePassword';
import Toggle from '@layouts/Prescription/Toggle';

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
    const [checkPassword, isPassword, setPassword] = usePassword()
    const [pwdIsEnable, setPwdIsEnable] = useState<boolean>(!!isPassword())

    const validateButtonHandler = async () => {
        if (!checkPassword(passwordInput.oldPwd)) return;
        if (pwdIsEnable) {
            if (passwordInput.newPwd !== passwordInput.confirmNewPwd) return;
            setPassword(passwordInput.newPwd)
        } else {
            setPassword(undefined)
        }

        while (!checkPassword(passwordInput.newPwd)) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        onConfirm()
    }

    return <ScrollView>
        <Text>Modifier le mot de passe</Text>
        {checkPassword(undefined) ||
            <>
                <Text>Ancien mot de passe</Text>
                <PasswordInput onChangeText={(text) => setPasswordInput({ ...passwordInput, oldPwd: text })} />
            </>}
        <Text>Activer le motsDePasse</Text>
        <Toggle is={pwdIsEnable} onToggle={(value) => setPwdIsEnable(!value)} />
        {pwdIsEnable && <>
            <Text>Nouveau mot de passe</Text>
            <PasswordInput onChangeText={(text) => setPasswordInput({ ...passwordInput, newPwd: text })} />
            <Text>Confirmer le nouveau mot de passe</Text>
            <PasswordInput onChangeText={(text) => setPasswordInput({ ...passwordInput, confirmNewPwd: text })} />
        </>}
        <Button title="Valider" onPress={validateButtonHandler} />
    </ScrollView>
}
