import { useState, useEffect } from 'react';
import dataManager from '@features/dataManager';


export const delByRomain = (nomTraitement: string, callback: () => void) => {
    console.log("SI CA PRINT LE PROBLEME SErA CHIANT A DEBUG")
    dataManager.setSaveData((data) => {
        var calendar: Wcalendar = {};
        data.patients.forEach(patient => {
            if (patient.actualUser) {
                patient.calendar && Object.keys(patient.calendar).forEach((semaine) => {
                    patient.calendar && Object.keys(patient.calendar[semaine]).forEach((prise) => {
                        patient.calendar && patient.calendar[semaine][prise].forEach((p) => {
                            if (p.releatedTreatment !== nomTraitement) {
                                calendar[semaine][prise].push(p)
                            }
                        })
                    })
                })

            }
        })
        return ({
            ...data,
            patients: data.patients.map((patient) => patient.actualUser
                ? ({
                    ...patient,
                    calendar: calendar,
                    prescriptions: patient.prescriptions.filter((p) => p.title !== nomTraitement)
                })

                : patient)
        })
    }).then(callback)
}

// ? ...Object.keys(patient.calendar).map((semaine) => (
//     patient.calendar
//     ? ({[semaine]: Object.keys(patient.calendar[semaine]).map((prise) => patient.calendar
//             ? ({ [prise] patient.calendar[semaine][prise].filter((p) => p.releatedTreatment !== nomTraitement) }) as Prise
//             : []
//         )
//     } as WeekData) : undefined
// ) as Wcalendar)
// : undefined
// const DELTreamentCalculator = async (Treatment: PrescriptionInterface): Promise<Wcalendar> => {
//     let patient: PatientInterface
//     let wcalendar: Wcalendar = {};
//     console.log("treatment calculator")
//     await dataManager.getSaveData().then((data) => {
//         patient = data.patients.find(patient => patient.actualUser) as PatientInterface;
//         console.log("début suppression")
//         console.log("start or note", patient && patient?.calendar)
//         if (patient && patient?.calendar) {
//             wcalendar = patient?.calendar
//             delByMathys(Treatment.title)
//         }

//     })

//     return wcalendar;



//     function CalendarUpdatedByMedecine(TreatmentName: string) {

//         for (const key in wcalendar) {
//             for (const dayKey in wcalendar[key]) {
//                 for (const prise of wcalendar[key][dayKey]) {

//                     console.log("prise2", prise.releatedTreatment === TreatmentName)
//                     if (prise.releatedTreatment === TreatmentName) {


//                         let moc = wcalendar[key][dayKey]
//                         wcalendar[key][dayKey] = wcalendar[key][dayKey].slice(wcalendar[key][dayKey].indexOf(prise))



//                         console.log("moc", moc == wcalendar[key][dayKey])
//                         if (wcalendar[key][dayKey].length === 0) {
//                             delete wcalendar[key][dayKey]
//                         }
//                         console.log("wcalendar", wcalendar[key][dayKey])

//                     }
//                 }
//             }
//         }



//     }



// }


// export default DELTreamentCalculator
