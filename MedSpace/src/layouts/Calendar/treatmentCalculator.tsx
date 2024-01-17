import dataManager from '@features/dataManager';
import { getISOWeekNumber } from './getISOWeekNumber';
import { jour } from './Jour';
/**
 * Calculates the calendar based on the medicine treatment.
 * @param Treatment - The treatment name.
 * @returns A promise that resolves to the calculated calendar.
 */

const TreamentCalculator = async (Treatment: PrescriptionInterface): Promise<Wcalendar> => {
    let patient: PatientInterface
    let wcalendar: Wcalendar = {};
    console.log("debut treatment calculator")
    await dataManager.getSaveData().then((data) => {
        patient = data.patients.find(patient => patient.actualUser) as PatientInterface;

        if (patient) {
            if (patient?.calendar) {
                wcalendar = patient?.calendar
                console.log("calendar exist")
            }

            console.log(patient.prescriptions.length)

            Treatment.medicines.forEach(medicine => {

                CalendarByMedecine(Treatment.title, medicine, Treatment.date as Date);
            });
        }

    })
    console.log("calendar dans la fonction :>>", wcalendar)
    return wcalendar;



    /**
     * Calculates the calendar based on the medicine treatment.
     * @param Treatment - The treatment name.
     * @param medicine - The medicine information.
     * @param datestart - The start date of the treatment.
     */



    //duration date de fin
    //prescription.date = date de debut = datestart
    function CalendarByMedecine(Treatment: string, medicine: MedicineInterface, datestart: Date) {


        //console.log("medecine", medicine)
        /**
         * Calculates the treatment schedule based on the medicine's frequency and duration.
         * @param medicine - The medicine object containing frequency, duration, name, dosage, dosageType.
         * @param datestart - The start date of the treatment.
         * @param wcalendar - The calendar object to store the treatment schedule.
         * @param patient - The patient object containing earliesttime and latesttime.
         * @param Treatment - The related treatment object.
         */
        if (typeof medicine.frequency === "object" &&
            "morning" in medicine.frequency &&
            "noon" in medicine.frequency &&
            "evening" in medicine.frequency) {

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

                    let before = wcalendar[key][dayKey].length
                    wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: patient.earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment });

                }
                if (medicine.frequency.noon) {
                    //Midi ou date de debut + 4h

                    patient.earliesttime < 11 ?
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: 12, dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment })
                        : wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: +patient.earliesttime + 4, dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment });
                }
                if (medicine.frequency.evening) {
                    wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: patient.latesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment });
                }


            }
        }
        //Gestion des prises pour la DailyInterface
        /**
         * Calculates the treatment schedule based on the medicine details.
         * 
         * @param medicine - The medicine object containing the frequency and other details.
         * @param datestart - The start date of the treatment.
         * @param wcalendar - The calendar object to store the treatment schedule.
         * @param patient - The patient object containing the earliest and latest time for medication.
         * @param Treatment - The treatment object associated with the medicine.
         */
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
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (+patient.earliesttime + (+i * +medicine.minimumHoursbetweenDoses)), dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment });
                    }
                } else {
                    let dispatchHour = Math.floor((patient.latesttime - patient.earliesttime) / medicine.frequency.count)

                    for (let i = 0; i < medicine.frequency.count; i++) {
                        wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: (+patient.earliesttime + ((+i * +dispatchHour))), dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment });
                    }
                }

            }
        }

        /**
         * Calculates the treatment schedule for the WeeklyInterface frequency.
         * 
         * @param medicine - The medicine object.
         * @param datestart - The start date of the treatment.
         * @param wcalendar - The calendar object to store the treatment schedule.
         * @param patient - The patient object.
         * @param jour - The number of milliseconds in a day.
         * @param getISOWeekNumber - The function to get the ISO week number.
         * @param Treatment - The treatment object.
         */
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
                wcalendar[key][dayKey].push({ nomMedoc: medicine.name, heure: patient.earliesttime, dosage: medicine.dosage, dosageType: medicine.dosageType, consumed: false, releatedTreatment: Treatment });
                //date début + i*delay (i = c'est le combientième jour de la prise)

            }
        }




    }



}


export default TreamentCalculator
