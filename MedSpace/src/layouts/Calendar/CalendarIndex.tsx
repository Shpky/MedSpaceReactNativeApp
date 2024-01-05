import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ImageBackground } from "react-native";
import { TouchableOpacity, } from 'react-native';
import useSave from '@hooks/useSave';
import { BackgroundImage } from '@rneui/themed/dist/config';

const CalendarIndex = () => {
    const [save, setSave] = useSave();
    const [startDate, setStartDate] = useState(new Date());
    const getISOWeekNumber = (date: Date): number => Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7);
    const [weekNumber, setWeekNumber] = useState(getISOWeekNumber(startDate));
    const [isOn, setIsOn] = useState(false);
    if (!save) return null;

    const calendar = save?.patients.find(patient => patient.actualUser)?.calendar as Wcalendar;

    type day = { date: Date, prise: priseInterface[] }
    
    //const startDate = new Date();
    const jour = (24 * 60 * 60 * 1000)

    const OnOffButton = () => {


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

    const getDateFromKey = (key: string): Date => {
        const [year, month, day] = key.split('-').map(Number);
        return new Date(year, month - 1, day); // Soustrayez 1 du mois car les mois commencent à partir de zéro
    };

    const RenderMedicine = (date: string, weekData: priseInterface[]) => {
        let week = weekData.sort((a, b) => a.heure - b.heure);
        let weekday = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']


        if (date == new Date().toISOString().split('T')[0]) {
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
            <View style={[{ width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: "center", alignSelf: "center" }]}>
                <ImageBackground style={styles.Titlecontainer} source={require('./img/yellowbg.png')}  >
                    <Text style={styles.titleW}>Calendrier</Text>
                    <View style={styles.rowContainer}><Text style={styles.titlesmallW}>Mode d'affichage par semaine</Text><OnOffButton /></View>
                </ImageBackground>
            </View>
        )
    }
    const dayrendering = (date: string, day: priseInterface) => {

        let bg = date == new Date().toISOString().split('T')[0] ? require('./img/greenbg.png') : require('./img/greybg.png')




        return (
            <View key={startDate.getTime()} style={styles.dayContainerTOBD}>




                <ImageBackground style={[styles.medicineContainerBD, styles.backgroundImage]}
                    source={bg}
                >
                    <Text style={[styles.medicine, { fontWeight: 'bold' }]} >{day.heure + (day.heure > 1 ? " heures" : " heure")} </Text>
                    <Text style={styles.medicine} >{day.nomMedoc}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.medicine, { marginRight: 5 }]}>{day.dosage}</Text>
                        <Text style={styles.medicine}>{day.dosageType}</Text>
                    </View>
                </ImageBackground>



            </View >)

    }
    const calendarComponent = () => {
        if (isOn) {

            let tempo = calendar[weekNumber + "/" + startDate.getFullYear()]
            let data: Wcalendar = {}
            if (!tempo) {
                let firstday = new Date(startDate.getTime() - startDate.getDay() * jour)

                data[getISOWeekNumber(firstday) + "/" + firstday.getFullYear()] = {};

                for (let i = 0; i < 7; i++) {
                    data[getISOWeekNumber(firstday) + "/" + firstday.getFullYear()][new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ nomMedoc: "Pas de médicament aujourd'huit", heure: 0, dosage: 0, dosageType: "", consome: false }]


                }
                tempo = data[weekNumber + "/" + startDate.getFullYear()]
            }


            return (

                <FlatList
                    data={Object.entries(tempo)}
                    renderItem={({ item }) => RenderMedicine(item[0], item[1])}

                />
            );
        } else {
            
            let week = calendar[weekNumber + "/" + startDate.getFullYear()]
            let data: priseInterface[] = []
            if (!week) {
                data = [{ nomMedoc: "Pas de médicament aujourd'huit", heure: 0, dosage: 0, dosageType: "", consome: false }]
            } else {
                data = week[startDate.toISOString().split('T')[0]]
                !data ? data = [{ nomMedoc: "Pas de médicament aujourd'huit", heure: 0, dosage: 0, dosageType: "", consome: false }] : null
            }

            


            data = data.sort((a, b) => a.heure - b.heure);

            return (

                <FlatList
                    data={Object.entries(data)}
                    renderItem={({ item }) => dayrendering(startDate.toISOString().split('T')[0], item[1] as priseInterface)}

                />
            );

        }
    };

    const Selector = () => {
        let month = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

        const weekday = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
        const weekNumber = getISOWeekNumber(startDate);
        return (
            <View>

                <Text style={styles.Month}>{month[startDate.getMonth()] + " " + startDate.getFullYear()}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                    <Pressable onPress={() => (setStartDate(new Date(startDate.getTime() - 7 * jour)), setWeekNumber(getISOWeekNumber(new Date(startDate.getTime() - 7 * jour))))}>
                        <Text style={styles.bold}>{'   <   '}</Text>
                    </Pressable>
                    <Text>Semaine {weekNumber}</Text>

                    <Pressable onPress={() => (setStartDate(new Date(startDate.getTime() + 7 * jour)), setWeekNumber(getISOWeekNumber(new Date(startDate.getTime() + 7 * jour))))} >
                        <Text style={styles.bold}>{'   >   '}</Text>
                    </Pressable>

                </View>
                {!isOn ?

                    <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
                        <Pressable onPress={() => (setStartDate(new Date(startDate.getTime() - 1 * jour)), setWeekNumber(getISOWeekNumber(new Date(startDate.getTime() - 1 * jour))))}>
                            <Text style={styles.bold}>{'   <   '}</Text>
                        </Pressable>
                        <Text style={styles.Month}>  {weekday[startDate.getDay()]} </Text>

                        <Pressable onPress={() => (setStartDate(new Date(startDate.getTime() + 1 * jour)), setWeekNumber(getISOWeekNumber(new Date(startDate.getTime() + 1 * jour))))} >
                            <Text style={styles.bold}>{'   >   '}</Text>
                        </Pressable>

                    </View>

                    : null}
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
    Month: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        alignSelf: 'center',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
    },
    Titlecontainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 350,
        resizeMode: 'cover',
        paddingLeft: 10,
        paddingVertical: 10,
        overflow: 'hidden',
        borderRadius: 30,

    },
    DayName: {


    },
    dayContainerTOBD: {
        marginBottom: 10,
        width: 300,
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
    medicineContainerBD: {
        backgroundColor: 'gray',
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