import dataManager from '@features/dataManager';


/**
 * Deletes all occurrences of a treatment from the calendar and prescriptions of the current user.
 * @param nomTraitement - The name of the treatment to delete.
 * @param callback - A callback function to be called after the data is updated.
 */
export const delByRomain = (nomTraitement: string, callback: () => void) => {
    
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