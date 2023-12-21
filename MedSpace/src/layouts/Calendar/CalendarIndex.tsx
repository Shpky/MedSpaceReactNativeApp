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
    const renderMedicine = (tabday: priseInterface[], index: number) => {

        let week = tabday.sort((a, b) => a.heure - b.heure)
        let dayweek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
        return (
            <View >
                <Text>{dayweek[index]}</Text>
                {week.map((prise) => {
                    return (

                        <View style={styles.debug}>
                            <Text style={styles.medicine}>{prise.nomMedoc}</Text>
                            <Text style={styles.medicine}>{prise.heure}</Text>
                            <Text style={styles.medicine}>{prise.dosage}</Text>
                            <Text style={styles.medicine}>{prise.dosageType}</Text>
                        </View>

                    )
                })}
            </View>
        )



    }
    const calendarComponent = () => {
        return (
            <FlatList
                data={weekcalculator(startDate)}
                renderItem={({ item, index }) => renderMedicine(item, index)}

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
    medicine: {
        color: 'white',

    },
    debug: {
        borderBlockColor: 'black',
        borderSize: 4,

    },
    bgimage: {
        flex: 1,

        resizeMode: 'cover',
        borderRadius: 30, // Ajustez la valeur selon vos besoins
        overflow: 'hidden',
    }
});

export default CalendarIndex;



