import { useState, useEffect, createContext } from "react";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

type DoctorContextType = {
    doctors: DoctorInterface[],
    addDoctor: (doctor: DoctorInterface) => void,
    doctorContextIsLoad: boolean
}

export const DoctorContext = createContext<DoctorContextType | null>(null)

type DoctorState = {
    isLoad: false
} | {
    isLoad: true,
    doctors: DoctorInterface[]
}

type DoctorContextProviderProps = { children?: JSX.Element[] | JSX.Element }

export function DoctorContextProvider({ children }: DoctorContextProviderProps): JSX.Element {
    const [doctors, setDoctors] = useState<DoctorState>({ isLoad: false })

    useEffect(() => {
        RNSecureStorage.exists("doctors")
            .then((exist) => {
                if (exist) {
                    RNSecureStorage.get("doctors")
                        .then((doctors) => doctors &&
                            setDoctors({ isLoad: true, doctors: JSON.parse(doctors) }))
                } else setDoctors({ isLoad: true, doctors: [] })
            }).catch((error) => { console.error(error) });
    }, [])

    const addDoctor = (doctor: DoctorInterface) => {
        if (!doctors.isLoad) return
        if (!doctor.name) return
        setDoctors({ isLoad: false })
        RNSecureStorage.exists("doctors").then((exist) =>
            exist
                ? RNSecureStorage.get("doctors")
                    .then((datas) => {
                        datas && RNSecureStorage.set("doctors", JSON.stringify([...JSON.parse(datas), doctor]), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                            .then(() => setDoctors({ isLoad: true, doctors: [...JSON.parse(datas), doctor] }))
                    })
                : RNSecureStorage.set("doctors", JSON.stringify([doctor]), { accessible: ACCESSIBLE.WHEN_UNLOCKED })
                    .then(() => setDoctors({ isLoad: true, doctors: [doctor] }))
        ).catch((error) => console.error(error))
    }
    return <DoctorContext.Provider
        value={{
            doctors: "doctors" in doctors ? doctors.doctors : [],
            addDoctor,
            doctorContextIsLoad: doctors.isLoad
        }}>
        {children}
    </DoctorContext.Provider>

}
