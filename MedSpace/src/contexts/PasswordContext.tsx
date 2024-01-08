import { createContext, useState } from 'react';
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';
import { hashSync, compareSync, genSaltSync } from 'bcrypt-ts';

type PasswordContextType = {
    checkPassword: (p: string | null) => boolean,
    setPassword: (p: string | null) => void
}

export const PasswordContext = createContext<PasswordContextType | null>(null)

const hashPassword = (p: string) => {
    if (!p) return undefined
    const saltRounds = 10
    const salt = genSaltSync(saltRounds)
    return hashSync(p, salt)
}

export function PasswordContextProvider({ children }: { children?: JSX.Element }): JSX.Element {
    const [password, setPassword] = useState<string | null | undefined>(undefined);

    RNSecureStorage.exists("password")
        .then((exist) => {
            if (exist) {
                RNSecureStorage.get("password")
                    .then((pw) => setPassword(pw))
            } else setPassword(null)
        }).catch((error) => { console.error(error); setPassword(null) });

    console.log("password state", password)
    const checkPassword = (p: string | null) => {
        if (password === undefined) return false
        if (password === null) return true
        if (!p) return false
        return compareSync(p, password)
    }

    const setPasswordAndSave = (newPassword: string | null) => {
        setPassword(undefined)
        RNSecureStorage.exists("password").then((exist) =>
            exist && newPassword === null
                ? RNSecureStorage.remove("password")
                    .then(() => setPassword(null))
                : newPassword
                    ? RNSecureStorage.set("password",
                        JSON.stringify(hashPassword(newPassword)), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                        .then((pw) => setPassword(pw))
                    : null
        ).catch((error) => console.error(error))
    }

    return (
        <PasswordContext.Provider value={{
            checkPassword,
            setPassword: setPasswordAndSave
        }}>
            {children}
        </PasswordContext.Provider>)
}
