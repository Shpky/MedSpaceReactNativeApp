import { createContext, useState, useEffect } from 'react';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { hashSync, compareSync, genSaltSync } from 'bcrypt-ts';
import { Alert } from 'react-native';

type PasswordContextType = {
    checkPassword: (p: string | null) => boolean,
    setPassword: (p: string | null) => void,
    passwordContextIsLoad: boolean
}

export const PasswordContext = createContext<PasswordContextType | null>(null)

const hashPassword = (p: string) => {
    return p
    const saltRounds = 10 // La bibliothèque de hashage marche pas
    const salt = genSaltSync(saltRounds)
    return hashSync(p, salt)
}

type passwordState = {
    isLoad: false
} | {
    isLoad: true,
    password: string | null
}

type PasswordContextProviderProps = { children?: JSX.Element[] | JSX.Element }
export function PasswordContextProvider({ children }: PasswordContextProviderProps): JSX.Element {
    const [password, setPassword] = useState<passwordState>({ isLoad: false });

    useEffect(() => {
        RNSecureStorage.exists("password")
            .then((exist) => {
                if (exist) {
                    RNSecureStorage.get("password")
                        .then((pw) => setPassword({ isLoad: true, password: pw }))
                } else password !== null && setPassword({ isLoad: true, password: null })
            }).catch((error) => { console.error(error) });
    }, [])

    const checkPassword = (p: string | null) => {
        if (!password.isLoad) return false
        if (password.password === null) return true
        if (p === null) return false
        // const r = compareSync(p, password.password)
        const r = p === password.password
        if (!r) {
            console.log("password", p)
            Alert.alert('Mauvais mot de passe', 'Le mot de passe entré est incorrect');
        }
        return r
    }

    const setPasswordAndSave = (newPassword: string | null) => {
        console.log("np", newPassword)
        setPassword({ isLoad: false })
        RNSecureStorage.exists("password").then((exist) =>
            exist && newPassword === null
                ? RNSecureStorage.remove("password")
                    .then(() => setPassword({ isLoad: true, password: null }))
                : newPassword
                    ? RNSecureStorage.set("password",
                        hashPassword(newPassword),
                        { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                        .then(() => setPassword({ isLoad: true, password: newPassword }))
                    : null
        ).catch((error) => console.error(error))
    }

    return (
        <PasswordContext.Provider value={{
            checkPassword,
            setPassword: setPasswordAndSave,
            passwordContextIsLoad: password.isLoad
        }}>
            {children}
        </PasswordContext.Provider>)
}
