import { useEffect, useState } from 'react'
import useSave from './useSave'
import { genSaltSync, hashSync, compareSync } from 'bcrypt-ts'

type PasswordType = string | undefined

export default function usePassword(): [(p: PasswordType) => boolean, (p: PasswordType) => void] {
    const [save, setSave] = useSave()
    const [password, setPasswordState] = useState<PasswordType>(undefined)

    useEffect(() => {
        setPasswordState(save?.password)
    }, [save])

    const setPassword = (newPassword: PasswordType) => {
        save && setSave({ ...save, password: hashPassword(newPassword) })
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

    return [checkPassword, setPassword]
}
