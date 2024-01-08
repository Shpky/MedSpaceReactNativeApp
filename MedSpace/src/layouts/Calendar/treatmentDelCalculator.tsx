import { useState, useEffect } from 'react';
import dataManager from '@features/dataManager';



const DELTreamentCalculator = async (Treatment: PrescriptionInterface): Promise<Wcalendar> => {
    let patient: PatientInterface
    let wcalendar: Wcalendar = {};
    console.log("treatment calculator")
    await dataManager.getSaveData().then((data) => {
        patient = data.patients.find(patient => patient.actualUser) as PatientInterface;

        if (patient && patient?.calendar) {
            wcalendar = patient?.calendar
            CalendarUpdatedByMedecine(Treatment.title)
        }

    })

    return wcalendar;



    function CalendarUpdatedByMedecine(Treatment: string) {

        for (const key in wcalendar) {
            for (const dayKey in wcalendar[key]) {
                for (const prise of wcalendar[key][dayKey]) {
                    if (prise.releatedTreatment === Treatment) {
                        wcalendar[key][dayKey].slice(wcalendar[key][dayKey].indexOf(prise), 1)
                    }
                }
            }
        }



    }



}


export default DELTreamentCalculator
