import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, } from "react-native";
import useSave from '@hooks/useSave';

import { Title } from './Title'
import { DateSelector } from './DateSelector'
import { CalendarComponent } from './CalendarComponent'
/**
 * Renders the CalendarIndex component.
 * 
 * @returns The rendered CalendarIndex component.
 */

const CalendarIndex = () => {
    const [save, setSave] = useSave();
    const [startDate, setStartDate] = useState(new Date());
    const getISOWeekNumber = (date: Date): number => Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7);
    const [weekNumber, setWeekNumber] = useState(getISOWeekNumber(startDate));
    const [isOn, setIsOn] = useState(false);

    if (!save) return null;
    var calendar: Wcalendar = {};

    calendar = save?.patients.find(patient => patient.actualUser)?.calendar as Wcalendar;

    return (
        <View style={styles.container}>
            <View><Title setIsOn={setIsOn} isOn={isOn} /></View>
            <DateSelector isOn={isOn} setStartDate={setStartDate} startDate={startDate} setWeekNumber={setWeekNumber} />
            <CalendarComponent isOn={isOn} startDate={startDate} calendar={calendar} setSave={setSave} weekNumber={weekNumber} />

        </View>
    )
}

const styles = StyleSheet.create({

    container: {

        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default CalendarIndex;