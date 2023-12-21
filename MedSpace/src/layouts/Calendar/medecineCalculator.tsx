import { useState, useEffect } from 'react';
import dataManager from '@features/dataManager';



const Calculator = (): calendar => {
    const [patient, setPatient] = useState<PatientInterface | undefined>();
    let calendar: calendar = [];

    useEffect(() => {
        const fetchData = async () => {

            const save = await dataManager.getSaveData();
            const actualUserPatient = save.patients.find(patient => patient.actualUser === true);
            if (actualUserPatient) {
                setPatient(actualUserPatient);
            }

        };

        fetchData();
    }, []);

    //duration date de fin
    //prescription.date = date de debut = datestart
    function CalendarByMedecine(medicine: MedicineInterface, datestart: Date) {



        if (typeof medicine.frequency === "object" &&
            "morning" in medicine.frequency &&
            "noon" in medicine.frequency &&
            "evening" in medicine.frequency) {
            console.log(medicine.name)
            for (let i = 0; i < (((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24)); i++) {

                let day: priseInterface[] = [];
                if (medicine.frequency.morning) {
                    day.push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType });
                }
                if (medicine.frequency.noon) {
                    //Midi ou date de debut + 4h
                    (patient as PatientInterface).earliesttime > 11 ? day.push({ nomMedoc: medicine.name, heure: 12, dosage: medicine.dosage, dosageType: medicine.dosageType }) : day.push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime + 4, dosage: medicine.dosage, dosageType: medicine.dosageType });
                }
                if (medicine.frequency.evening) {
                    day.push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).latesttime, dosage: medicine.dosage, dosageType: medicine.dosageType });
                }
                if (calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0))) {

                    calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0))?.prise.push(...day);
                } else {
                    calendar.push({ date: new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000), prise: day });
                }



            }
        }
        //Gestion des prises pour la DailyInterface
        if (typeof medicine.frequency === "object" &&
            "count" in medicine.frequency) {

            for (let i = 0; i < (((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24)); i++) {

                let day: priseInterface[] = [];
                if (medicine.minimumHoursbetweenDoses != null) {
                    for (let i = 0; i < medicine.frequency.count; i++) {
                        day.push({ nomMedoc: medicine.name, heure: (patient?.earliesttime as number + (i as number * medicine.minimumHoursbetweenDoses as number)), dosage: medicine.dosage, dosageType: medicine.dosageType });
                    }
                } else {
                    let dispatchHour = Math.floor(((patient as PatientInterface).latesttime - (patient as PatientInterface).earliesttime) / medicine.frequency.count)

                    for (let i = 0; i < medicine.frequency.count; i++) {
                        day.push({ nomMedoc: medicine.name, heure: ((patient as PatientInterface).earliesttime + ((i * dispatchHour) as number) as number), dosage: medicine.dosage, dosageType: medicine.dosageType });
                    }
                }
                if (calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0))) {
                    calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0))?.prise.push(...day);
                } else {
                    calendar.push({ date: new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000), prise: day });
                }


            }
        }

        //Gestion pour les WeeklyInterface
        if (typeof medicine.frequency === "object" &&
            "delay" in medicine.frequency) {
            let delay = medicine.frequency.delay;
            for (let i = 0; i < Math.floor((((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24))); i = i + medicine.frequency.delay) {

                let day: priseInterface[] = [];
                day.push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType });
                //date début + i*delay (i = c'est le combientième jour de la prise)
                if (calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0))) {
                    calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0))?.prise.push(...day);
                } else {
                    calendar.push({ date: new Date(datestart.getTime() + (medicine.frequency.delay * i > 0 ? i : 1) * 24 * 60 * 60 * 1000), prise: day });
                }


            }




        }




    }

    if (patient) {
        console.log(patient.name)
        patient.prescriptions.forEach(prescription => {

            prescription.medicines.forEach(medicine => {


                //console.log(medicine.name)
                CalendarByMedecine(medicine, prescription.date as Date);
            });

        });
    }

    return calendar
}


export default Calculator