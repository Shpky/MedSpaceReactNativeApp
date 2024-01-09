import dataManager from '@features/dataManager';


const TreamentCalculator = async (Treatment: PrescriptionInterface): Promise<Wcalendar> => {
    let patient: PatientInterface
    let wcalendar: Wcalendar = {};
    console.log("treatment calculator")
    await dataManager.getSaveData().then((data) => {
        patient = data.patients.find(patient => patient.actualUser) as PatientInterface;

        if (patient) {
            if (patient?.calendar) {
                wcalendar = patient?.calendar
                console.log("calendar exist")
            }

            console.log(patient.prescriptions.length)

            Treatment.medicines.forEach(medicine => {
                /*
                console.log("treatment", Treatment)
                console.log("start", Treatment.date as Date)
                console.log(medicine.name)
                console.log("quoi?", medicine)*/
                CalendarByMedecine(Treatment.title, medicine, Treatment.date as Date);
            });
        }

    })
    //console.log(wcalendar)
    return wcalendar;
    function getISOWeekNumber(date: Date): number { return Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7) }

    //duration date de fin
    //prescription.date = date de debut = datestart
    function CalendarByMedecine(Treatment: string, medicine: MedicineInterface, datestart: Date) {

        let jour = 24 * 60 * 60 * 1000;
        //console.log("medecine", medicine)
        if (typeof medicine.frequency === "object" &&
            "morning" in medicine.frequency &&
            "noon" in medicine.frequency &&
            "evening" in medicine.frequency) {
            //console.log("daily", console.log(medicine as MedicineInterface), console.log(medicine.duration), (((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24)))
            for (let i = 0; i < (((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24)); i++) {
                let date = new Date(datestart.getTime() + i * jour)
                let day: priseInterface[] = [];
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
                    //console.log("morning")
                    let before = wcalendar[key][dayKey].length
                    wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment });
                    //console.log(before < wcalendar[key][dayKey].length)
                }
                if (medicine.frequency.noon) {
                    //Midi ou date de debut + 4h

                    (patient as PatientInterface).earliesttime > 11 ?
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: 12, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment })
                        : wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime as number + 4, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment });
                }
                if (medicine.frequency.evening) {
                    wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).latesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment });
                }


            }
        }
        //Gestion des prises pour la DailyInterface
        if (typeof medicine.frequency === "object" &&
            "count" in medicine.frequency) {
            //console.log("count")
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
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient?.earliesttime as number + (i as number * medicine.minimumHoursbetweenDoses as number)), dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment });
                    }
                } else {
                    let dispatchHour = Math.floor(((patient as PatientInterface).latesttime - (patient as PatientInterface).earliesttime) / medicine.frequency.count)

                    for (let i = 0; i < medicine.frequency.count; i++) {
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: ((patient as PatientInterface).earliesttime + ((i * dispatchHour) as number) as number), dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment });
                    }
                }






            }
        }

        //Gestion pour les WeeklyInterface
        if (typeof medicine.frequency === "object" &&
            "delay" in medicine.frequency) {
            //console.log("delay")
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
                wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (patient as PatientInterface).earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consome: false, releatedTreatment: Treatment });
                //date début + i*delay (i = c'est le combientième jour de la prise)

            }




        }




    }



}


export default TreamentCalculator
