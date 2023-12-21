import Calculator from "./medecineCalculator";
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ImageBackground } from "react-native";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import dataManager from '@features/dataManager';

import { TouchableOpacity, } from 'react-native';
const CalendarIndex = () => {
    const startDate = new Date();
    let calendar = Calculator();
    const jour = (24 * 60 * 60 * 1000)
    //console.log("calendar", calendar)
    const OnOffButton = () => {
        const [isOn, setIsOn] = useState(false);

        const toggleSwitch = () => {
            console.log("isOn", isOn)
            setIsOn((prevIsOn) => !prevIsOn);
        };

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={toggleSwitch}>

                    <View style={[styles.toggleSwitch, { backgroundColor: isOn ? 'green' : 'red' }]} ><Text style={[{ color: 'white' }]}>{isOn ? 'ON' : 'OFF'}</Text></View>
                </TouchableOpacity>
            </View>
        );
    };

    const weekcalculator = (date: Date): priseInterface[][] => {
        let calendarW: priseInterface[][] = [];
        let firstDay = date.getDay() - 1;
        let dateW = new Date(date.getTime() - (firstDay * jour))
        let week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        week.map((d, index) => {
            console.log((dateW.getTime() + (index * jour)))
            let day: priseInterface[] = []
            console.log(new Date(dateW.getTime() + (index * jour)).getDate() + "/" + new Date(dateW.getTime() + (index * jour)).getMonth() + "/" + new Date(dateW.getTime() + (index * jour)).getFullYear())
            calendar.find(element => element.date.setHours(0, 0, 0, 0) == new Date(dateW.getTime() + (index * jour)).setHours(0, 0, 0, 0))?.prise.map((prise) => {
                console.log("prise", prise)
                day.push(prise)
            })
            calendarW.push(day)
        })
        return calendarW
    }
    /**
     * 
     * const durationInDays = Math.floor(((medicine.duration as Date)?.getTime() - (datestart as Date)?.getTime()) / (1000 * 60 * 60 * 24));

        for (let i = 0; i <= durationInDays; i++) {
            const currentDate = new Date(datestart.getTime() + i * 24 * 60 * 60 * 1000);


            const existingEntry = calendar.find(element => element.date.getTime() === currentDate.getTime());

            if (!existingEntry) {

                calendar.push({ date: currentDate, prise: [] });
            }
        } 
     * 
     * 
     */
    const renderMedicine = (tabday: priseInterface[]) => {

        let week = tabday.sort((a, b) => a.heure - b.heure)
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text>{prise.nomMedoc}</Text>
                <Text>{prise.heure}</Text>
                <Text>{prise.dosage}</Text>
            </View>
        )
    }
    const calendarComponent = () => {
        return (
            <FlatList
                data={weekcalculator(startDate)}
                renderItem={({ item }) => renderMedicine(item)}

            />
        )
    }

    return (
        <View>
            <OnOffButton></OnOffButton>
            {calendarComponent()}
            <Text>Calendar</Text>
        </View>
    )


}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 50,
    },
    button: {
        flexDirection: 'row',
        marginTop: 10,
    },
    toggleSwitch: {
        width: 50,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center', // Add this line to center vertically
    },
});

export default CalendarIndex;



