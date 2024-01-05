import { useEffect, useState } from 'react'
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'
import RNSecureStorage, { ACCESSIBLE } from 'rn-secure-storage';

type PasswordState = {
    state: "loading"
} | {
    state: "success",
    data: Password,
} | {
    state: "error",
    error: string
}
type Password = string | null

type usePasswordOut = [
    "loading" | "success" | "error",
    (p: Password) => boolean,
    (p: Password) => void]
/** Permet la gestion de mot de passe
 * @return [state, checkPassword, setPassword]
 * @state {"loading" | "success" | "error"} pour connaitre l'état du hook
 * @checkPassword(pw: Password) => boolean
 * @setPassword(newPw: Password) => void
 */
export default function usePassword(): usePasswordOut {
    const [passwordState, setPasswordState] = useState<PasswordState>({ state: "loading" })

    useEffect(() => {
        RNSecureStorage.exists("password").then((exist) =>
            exist
                ? RNSecureStorage.get("password").then((pw) => setPasswordState({ state: "success", data: pw }))
                : setPasswordState({ state: 'success', data: null })
        ).catch((error) => setPasswordState({ state: "error", error: error }))
    }, [])
    const setPassword = (newPassword: Password) => {
        if (passwordState.state === "loading") return;
        setPasswordState({ state: "loading" })
        RNSecureStorage.exists("password").then((exist) =>
            exist && newPassword === null
                ? RNSecureStorage.remove("password")
                    .then(() => setPasswordState({ state: "success", data: null }))
                : RNSecureStorage.set("password",
                    JSON.stringify(hashPassword(newPassword)), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                    .then((pw) => setPasswordState({ state: "success", data: pw }))
        ).catch((error) => setPasswordState({ state: "error", error: error }))
    }

    const checkPassword = (p: Password) => {
        if (passwordState.state !== "success") return false
        if (passwordState.data === null) return true
        return compareSync(p?.toString() || "", passwordState.data.toString())
    }

    const hashPassword = (p: Password) => {
        if (!p) return undefined
        const saltRounds = 10
        const salt = genSaltSync(saltRounds)
        return hashSync(p.toString(), salt)
    }

    return [passwordState.state, checkPassword, setPassword]
}
