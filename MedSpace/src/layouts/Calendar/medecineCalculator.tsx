import { useState, useEffect } from 'react';
import dataManager from '@features/dataManager';



const Calculator = async (): Promise<Wcalendar> => {
    let patient: PatientInterface
    let wcalendar: Wcalendar = {};

    await dataManager.getSaveData().then((data) => {
        patient = data.patients.find(patient => patient.actualUser) as PatientInterface;
        if (patient) {

            patient.prescriptions.forEach(prescription => {

                prescription.medicines.forEach(medicine => {


                    //console.log(medicine.name)
                    CalendarByMedecine(medicine, prescription.date as Date);
                });

            });
        }

    })

    return wcalendar;
    function getISOWeekNumber(date: Date): number { return Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7) }
    function getFirstDayOfWeek(date: Date): Date {
        const dayOfWeek = date.getDay();
        const daysToSubtract = (dayOfWeek + 6) % 7; // Ajustement pour que le premier jour soit un lundi
        return new Date(date.getTime() - daysToSubtract * (24 * 60 * 60 * 1000));
    }
    //duration date de fin
    //prescription.date = date de debut = datestart
    function CalendarByMedecine(medicine: MedicineInterface, datestart: Date) {

        let jour = 24 * 60 * 60 * 1000;

        if (typeof medicine.frequency === "object" &&
            "morning" in medicine.frequency &&
            "noon" in medicine.frequency &&
            "evening" in medicine.frequency) {

            for (let i = 0; i < (((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24)); i++) {
                let date = new Date(datestart.getTime() + i * jour)
                let day: priseInterface[] = [];
                date.setHours(0, 0, 0, 0);
                const isoWeekNumber = getISOWeekNumber(date);
                const key = `${isoWeekNumber}/${date.getFullYear()}`;
                const dayKey = date.toISOString().split('T')[0];

                if (!wcalendar[key]) {
                    wcalendar[key] = {};
                }

                if (!wcalendar[key][dayKey]) {
                    wcalendar[key][dayKey] = [];
                }




                if (medicine.frequency.morning) {
                    wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false });

                }
                if (medicine.frequency.noon) {
                    //Midi ou date de debut + 4h

                    (patient as PatientInterface).earliesttime > 11 ?
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: 12, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false })
                        : wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime + 4, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false });
                }
                if (medicine.frequency.evening) {
                    wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).latesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false });
                }


            }
        }
        //Gestion des prises pour la DailyInterface
        if (typeof medicine.frequency === "object" &&
            "count" in medicine.frequency) {

            for (let i = 0; i < (((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24)); i++) {



                let date = new Date(datestart.getTime() + i * jour)
                date.setHours(0, 0, 0, 0);
                const isoWeekNumber = getISOWeekNumber(date);

                const key = `${isoWeekNumber}/${date.getFullYear()}`;
                const dayKey = date.toISOString().split('T')[0];
                if (!wcalendar[key]) {
                    wcalendar[key] = {};
                }
                if (!wcalendar[key][dayKey]) {
                    wcalendar[key][dayKey] = [];
                }
                i
                if (medicine.minimumHoursbetweenDoses != null) {
                    for (let i = 0; i < medicine.frequency.count; i++) {
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient?.earliesttime as number + (i as number * medicine.minimumHoursbetweenDoses as number)), dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false });
                    }
                } else {
                    let dispatchHour = Math.floor(((patient as PatientInterface).latesttime - (patient as PatientInterface).earliesttime) / medicine.frequency.count)

                    for (let i = 0; i < medicine.frequency.count; i++) {
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: ((patient as PatientInterface).earliesttime + ((i * dispatchHour) as number) as number), dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false });
                    }
                }






            }
        }

        //Gestion pour les WeeklyInterface
        if (typeof medicine.frequency === "object" &&
            "delay" in medicine.frequency) {

            for (let i = 0; i < Math.floor((((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24))); i = i + medicine.frequency.delay) {

                let date = new Date(datestart.getTime() + i * jour)
                const isoWeekNumber = getISOWeekNumber(date);
                const key = `${isoWeekNumber}/${date.getFullYear()}`;
                const dayKey = date.toISOString().split('T')[0];
                if (!wcalendar[key]) {
                    wcalendar[key] = {};
                }
                if (!wcalendar[key][dayKey]) {
                    wcalendar[key][dayKey] = [];
                }
                wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false });
                //date début + i*delay (i = c'est le combientième jour de la prise)

            }




        }




    }



}


export default Calculator
