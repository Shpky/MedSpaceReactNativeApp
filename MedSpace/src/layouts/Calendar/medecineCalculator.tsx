import { useState, useEffect } from 'react';
import dataManager from '@features/dataManager';

type calendar = { date: Date, prise: priseInterface[] }[]
type priseInterface = { nomMedoc: string, heure: number, dosage: number }
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


    function CalendarByMedecine(medicine: MedicineInterface, datestart: Date) {
        let actualDate = new Date().setDate(datestart.getDate());

        if ("WeeklyInterface" in medicine.frequency) {
            console.log("weekly")
            for (let i = 0; i < (medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime() / (1000 * 60 * 60 * 24); i = i + (medicine.frequency as WeeklyInterface).delay) {
                if (calendar.map(date => date.date).includes(new Date(datestart.getFullYear(), datestart.getMonth(), actualDate + i))) {
                    calendar.map(date => {
                        if (date.date === new Date(datestart.getFullYear(), datestart.getMonth(), actualDate + i)) {
                            date.prise.push({ nomMedoc: medicine.name, heure: patient?.earliesttime as number, dosage: medicine.dosage });
                        }
                    })
                } else {
                    calendar.push({ date: new Date(datestart.getFullYear(), datestart.getMonth(), actualDate + i), prise: [{ nomMedoc: medicine.name, heure: patient?.earliesttime as number, dosage: medicine.dosage }] });
                }
            }

            for (let i = 0; i < (medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime() / (1000 * 60 * 60 * 24); i++) {
                let day: priseInterface[] = [];
                if ("morning" in medicine.frequency) {
                    if (medicine.frequency.morning) {
                        day.push({ nomMedoc: medicine.name, heure: patient?.earliesttime as number, dosage: medicine.dosage });
                    }

                    if (medicine.frequency.noon) {
                        day.push({ nomMedoc: medicine.name, heure: patient?.earliesttime as number < 11 ? 12 : ((patient?.earliesttime as number) - (patient?.latesttime as number)) / 2, dosage: medicine.dosage });
                    }

                    if (medicine.frequency.evening) {
                        day.push({ nomMedoc: medicine.name, heure: patient?.latesttime as number, dosage: medicine.dosage });
                    }
                }
                if ("count" in medicine.frequency) {
                    if (medicine.minimumHoursbetweenDoses != 0) {
                        for (let i = 0; i < medicine.frequency.count; i++) {
                            day.push({ nomMedoc: medicine.name, heure: (patient?.earliesttime as number) + (medicine.minimumHoursbetweenDoses as number) * i, dosage: medicine.dosage });
                        }
                    } else {
                        let range = ((patient?.latesttime as number) - (patient?.earliesttime as number)) / medicine.frequency.count;
                        for (let i = 0; i < medicine.frequency.count; i++) {
                            day.push({ nomMedoc: medicine.name, heure: (patient?.earliesttime as number) + range * i, dosage: medicine.dosage });
                        }
                    }
                }
                if (calendar.map(date => date.date).includes(new Date(datestart.getFullYear(), datestart.getMonth(), actualDate + i))) {
                    calendar.map(date => {
                        if (date.date === new Date(datestart.getFullYear(), datestart.getMonth(), actualDate + i)) {
                            date.prise.push(...day);
                        }
                    })
                } else {
                    calendar.push({ date: new Date(datestart.getFullYear(), datestart.getMonth(), actualDate + i), prise: day });
                }
            }
        }
    }

    if (patient) {
        patient.prescriptions.forEach(prescription => {
            prescription.medicines.forEach(medicine => {



                CalendarByMedecine(medicine, prescription.date as Date);
            });

        });
    }
    return calendar;

}


export default Calculator