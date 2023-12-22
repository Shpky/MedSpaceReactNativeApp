import { useEffect, useState } from 'react'
import useSave from './useSave'
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'

type PasswordType = string | undefined | null

export default function usePassword(): [(p: PasswordType) => boolean, () => boolean | null, (p: PasswordType) => void] {
    const [save, setSave] = useSave()
    const [password, setPasswordState] = useState<PasswordType>(undefined)

    useEffect(() => {
        setPasswordState(save?.password)
    }, [save])

    const setPassword = (newPassword: PasswordType) => {
        console.log('newPassword :>> ', newPassword);
        save && setSave((old) => ({ ...old, password: hashPassword(newPassword) } as SaveInterface))
    }

    const checkPassword = (p: PasswordType) => {
        if (!password) return true
        return compareSync(p?.toString() || "", password.toString())
    }

    const hashPassword = (p: PasswordType) => {
        if (!p) return undefined
        const saltRounds = 10
        const salt = genSaltSync(saltRounds)
        return hashSync(p.toString(), salt)
    }

    const isPassword = () => {
        console.log('password :>> ', password);
        return save ? password === undefined : null
    }
    return [checkPassword, isPassword, setPassword]
}
