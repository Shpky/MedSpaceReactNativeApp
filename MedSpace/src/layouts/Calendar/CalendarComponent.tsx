import { jour } from './Jour'
import { Text, View, StyleSheet, Pressable, FlatList, ImageBackground, ScrollView } from "react-native";
import { WeekRendering } from './Rendering/WeekRendering'
import { dayrendering } from './Rendering/Dayrendering'
type BuilderProps = {
    isOn: boolean,
    setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>,
    startDate: Date,
    calendar: Wcalendar,
    weekNumber: number
}

/**
 * Renders the calendar component.
 * 
 * @param isOn - Indicates whether the calendar week view is active or not.
 * @param startDate - The start date of the calendar.
 * @param calendar - The calendar data.
 * @param weekNumber - The week number.
 * @param setSave - The function to save the data.
 * @returns The rendered calendar component.
 */

export const CalendarComponent = ({ isOn, startDate, calendar, weekNumber, setSave }: BuilderProps) => {
    if (isOn) {

        let data: Wcalendar = {}
        let week: WeekData = {}
        //Si pas de calendar généré
        if (!calendar) {
            let firstday = new Date(startDate.getTime() - startDate.getDay() * jour)

            data[weekNumber + "/" + startDate.getFullYear()] = {};

            for (let i = 0; i < 7; i++) {

                data[weekNumber + "/" + startDate.getFullYear()][new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ MedicineName: "Pas de médicament aujourd'hui", hour: -1, dosage: -1, dosageType: "4267", consumed: false, releatedTreatment: "" }]

            }
            week = data[weekNumber + "/" + startDate.getFullYear()]

        } else {
            week = calendar[weekNumber + "/" + startDate.getFullYear()]
            //Le calendrier existe mais la semaine non
            if (!week) {
                let firstday = new Date(startDate.getTime() - startDate.getDay() * jour)

                week = {};
                data[weekNumber + "/" + startDate.getFullYear()] = {};
                for (let i = 0; i < 7; i++) {

                    data[weekNumber + "/" + startDate.getFullYear()][new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ MedicineName: "Pas de médicament aujourd'hui", hour: -1, dosage: -1, dosageType: "4267", consumed: false, releatedTreatment: "" }]


                }
                week = data[weekNumber + "/" + startDate.getFullYear()]
            }
            //Le calendrier existe mais la semaine oui mais elle n'est pas complètre
            if (Object.keys(week).length < 7) {
                let firstday = new Date(startDate.getTime() - startDate.getDay() * jour)
                for (let i = 0; i < 7; i++) {
                    if (!week[new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]]) {
                        week[new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ MedicineName: "Pas de médicament aujourd'hui", hour: -1, dosage: -1, dosageType: "4267", consumed: false, releatedTreatment: "" }]
                    }
                }
            }

            //remise dans l'ordre des jours de la semaine
            let tempo: WeekData = {}
            let a = Object.keys(week).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
            a.forEach((key) => {
                tempo[key] = week[key];
            });
            week = tempo
        }




        return (

            <FlatList
                style={{ width: '100%', marginBottom: 100, alignSelf: 'center' }}
                data={Object.entries(week)}
                renderItem={({ item }) => WeekRendering(item[0], item[1], calendar, setSave)}

            />

        );
    } else {
        let data: priseInterface[] = []
        if (!calendar) {
            calendar = {}
        }
        let week = calendar[weekNumber + "/" + startDate.getFullYear()]

        if (!week) {
            data = [{ MedicineName: "Pas de médicament aujourd'hui", hour: -1, dosage: -1, dosageType: "4267", consumed: false, releatedTreatment: "" }]
        } else {
            data = week[startDate.toISOString().split('T')[0]]
            !data ? data = [{ MedicineName: "Pas de médicament aujourd'hui", hour: -1, dosage: -1, dosageType: "4267", consumed: false, releatedTreatment: "" }] : null
        }
        data = data.sort((a, b) => a.hour - b.hour);
        return (

            <FlatList
                data={Object.entries(data)}
                renderItem={({ item }) => dayrendering(startDate.toISOString().split('T')[0], item[1], startDate, calendar, setSave)}

            />
        );

    }
};