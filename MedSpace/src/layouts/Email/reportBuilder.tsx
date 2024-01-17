import React from 'react';
import {  StyleSheet, Text,  View, FlatList } from 'react-native';
import { generateCalendar } from './IntakeCalculator'

/**
 * Renders a week with corresponding colors for each day.
 * @param week - An array of colors representing each day of the week.
 * @param num - The week number.
 * @returns The rendered week component.
 */
const RenderWeek = (week: string[], num: string) => {

    return (
        <View style={styles.centreurRow}>
            <Text style={styles.fontblack}>{num}</Text>
            {
                ["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
                    <View style={styles.centreurRow} key={index}>
                        <Text style={styles.fontblack}>{day}</Text>
                        <View
                            style={{
                                height: 10,
                                width: 10,
                                backgroundColor: week[index],
                                borderRadius: 5,
                            }}
                        ></View>
                    </View>
                ))
            }
        </View>
    )
}

type ReportBuilderProps = {
    Prescription: PrescriptionInterface,
    Rowcalendar?: Wcalendar
}
/**
 * Renders the ReportBuilder component.
 * 
 * @param {ReportBuilderProps} props - The props for the ReportBuilder component.
 * @returns {JSX.Element} The rendered ReportBuilder component.
 */
export const ReportBuilder = ({ Prescription, Rowcalendar }: ReportBuilderProps) => {
    let calendar = generateCalendar(Prescription, Rowcalendar || {});
    console.log(calendar)
    return (
        <View>
            <View style={[styles.centreurRow, { marginHorizontal: 20 }]}><Text style={[styles.fontblack]}>Nº de semaine/année</Text><Text style={styles.fontblack}>Jour de la semaine/status</Text></View>

            <FlatList
                data={Object.keys(calendar)}
                renderItem={({ item }) => RenderWeek(calendar[item], item)}
            ></FlatList>

        </View>
    )
}


const styles = StyleSheet.create({
    centreurRow: {
        flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center',
    },
    fontblack: {
        color: "black"
    },



})