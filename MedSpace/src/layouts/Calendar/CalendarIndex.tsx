import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ImageBackground } from "react-native";
import { TouchableOpacity, } from 'react-native';
import useSave from '@hooks/useSave';
import { BackgroundImage } from '@rneui/themed/dist/config';

const CalendarIndex = () => {
    const [save, setSave] = useSave();
    if (!save) return null;
    const calendar = (save?.patients.find(patient => patient.actualUser)?.calendar as calendar)

    const [startDate, setStartDate] = useState(new Date());
    //const startDate = new Date();
    const jour = (24 * 60 * 60 * 1000)

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

    interface WeekData {
        [date: string]: priseInterface[];
    }

    const weekcalculator = (date: Date): WeekData => {
        let calendarW: WeekData = {};
        let firstDay = (date.getDay() + 6) % 7; // Décalage pour que le premier jour soit le lundi
        let dateW = new Date(date.getTime() - ((firstDay + 6) % 7) * jour);
        let week = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

        week.forEach((day, index) => {
            let dayData: priseInterface[] = [];
            const currentDate = new Date(dateW.getTime() + (index * jour));

            calendar.find((element) => element.date.setHours(0, 0, 0, 0) === currentDate.setHours(0, 0, 0, 0))?.prise.forEach((prise) => {
                dayData.push(prise);
            });


            const key = currentDate.toISOString().split('T')[0];
            calendarW[key] = dayData;
        });

        return calendarW;
    };
    const getDateFromKey = (key: string): Date => {
        const [year, month, day] = key.split('-').map(Number);
        return new Date(year, month - 1, day); // Soustrayez 1 du mois car les mois commencent à partir de zéro
    };

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
    const RenderMedicine = (weekData: priseInterface[], date: string) => {
        let week = weekData.sort((a, b) => a.heure - b.heure);
        let weekday = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

        if (getDateFromKey(date).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)) {
            return (
                <View key={date} style={styles.dayContainer}>
                    <View style={styles.DayName}>
                        <Text style={styles.dayText}>{weekday[(new Date(date).getDay() - 1) < 0 ? 6 : (new Date(date).getDay() - 1)] + " " + date.split('-')[2]}</Text>
                    </View>

                    <View

                        style={styles.MedecinedayContainer}>
                        {week.map((prise, innerIndex) => (
                            <ImageBackground key={innerIndex} style={[styles.medicineContainer, styles.backgroundImage]}
                                source={require('./img/greenbg.png')}
                            >
                                <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{prise.heure + (prise.heure > 1 ? " heures" : " heure")} </Text>
                                <Text style={styles.medicine}>{prise.nomMedoc}</Text>
                                <View style={styles.rowContainer}>
                                    <Text style={[styles.medicine, { marginRight: 5 }]}>{prise.dosage}</Text>
                                    <Text style={styles.medicine}>{prise.dosageType}</Text>
                                </View>
                            </ImageBackground>
                        ))}
                    </View>
                    <View style={styles.horizontalLine} />
                </View>
            );
        } else {
            return (
                <View key={date} style={styles.dayContainer}>
                    <View style={styles.DayName}>
                        <Text style={styles.dayText}>{weekday[(new Date(date).getDay() - 1) < 0 ? 6 : (new Date(date).getDay() - 1)] + " " + date.split('-')[2]}</Text>
                    </View>

                    <View style={styles.MedecinedayContainer}>
                        {week.map((prise, innerIndex) => (
                            <ImageBackground key={innerIndex} style={[styles.medicineContainer, styles.backgroundImage]}
                                source={require('./img/greybg.png')}
                            >
                                <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{prise.heure + (prise.heure > 1 ? " heures" : " heure")} </Text>
                                <Text style={styles.medicine}>{prise.nomMedoc}</Text>
                                <View style={styles.rowContainer}>
                                    <Text style={[styles.medicine, { marginRight: 5 }]}>{prise.dosage}</Text>
                                    <Text style={styles.medicine}>{prise.dosageType}</Text>
                                </View>
                            </ImageBackground>
                        ))}
                    </View>
                    <View style={styles.horizontalLine} />
                </View>
            );
        }

    };

    const Title = () => {
        return (
            <ImageBackground style={styles.Titlecontainer} source={require('./img/yellowbg.png')}  >
                <Text style={styles.titleW}>Calendrier</Text>
                <View style={styles.rowContainer}><Text style={styles.titlesmallW}>Mode d'affichage par semaine</Text><OnOffButton /></View>
            </ImageBackground>
        )
    }
    const calendarComponent = () => {
        const data = weekcalculator(startDate);

        return (
            <FlatList
                data={Object.entries(data)}
                renderItem={({ item }) => RenderMedicine(item[1], item[0])}
                keyExtractor={(item) => item[0]} // Utilise la date comme clé
            />
        );
    };

    const Selector = () => {
        let month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
        const getISOWeekNumber = (date: Date): number => Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7);

        const weekNumber = getISOWeekNumber(startDate);
        return (
            <View>
                <Text>{month[startDate.getMonth()]}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable /*onPress={() => setStartDate(new Date(startDate.getTime() - 7 * jour))}*/>
                        <Text>{'<'}</Text>
                    </Pressable>
                    <Text>Semaine {weekNumber}</Text>
                    <Pressable /*onPress={() => setStartDate(new Date(startDate.getTime() + 7 * jour))}*/>
                        <Text>{'>'}</Text>
                    </Pressable>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Title />
            <Selector />
            {calendarComponent()}
        </View>
    )
}

const styles = StyleSheet.create({
    Titlecontainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',

        borderRadius: 30,

    },
    DayName: {


    },
    titleW: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',

        fontWeight: 'bold',
    },
    titlesmallW: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 15,
        color: 'white',

        fontWeight: 'bold',
    },
    margin10R: {

    },
    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginVertical: 10, // Ajustez la marge verticale selon vos besoins
        borderStyle: 'dashed',
    },
    MedecinedayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: 'black',

        justifyContent: 'center',
        //justifyContent: 'space-between',
        margin: 5,
    },
    backgroundImage: {


        resizeMode: 'cover',
        borderRadius: 10,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    dayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dayText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',

    },
    medicineContainer: {
        backgroundColor: 'gray',
        margin: 5,
        flexDirection: 'column',
        padding: 5,
        borderRadius: 8,


    },
    medicine: {
        color: 'white',
    },
    button: {
        flexDirection: 'row',

    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        alignContent: 'center',
        alignItems: 'center',

    },
    toggleSwitch: {
        width: 50,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center', // Add this line to center vertically
    },
    // ... (other styles)
});

export default CalendarIndex;