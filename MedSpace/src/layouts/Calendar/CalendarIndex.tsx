import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ImageBackground, ScrollView } from "react-native";
import { TouchableOpacity, } from 'react-native';
import useSave from '@hooks/useSave';



const CalendarIndex = () => {
    const [save, setSave] = useSave();
    const [startDate, setStartDate] = useState(new Date());
    const getISOWeekNumber = (date: Date): number => Math.ceil(((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (24 * 60 * 60 * 1000) + 1) / 7);
    const [weekNumber, setWeekNumber] = useState(getISOWeekNumber(startDate));
    const [isOn, setIsOn] = useState(false);

    if (!save) return null;
    var calendar: Wcalendar = {};

    calendar = save?.patients.find(patient => patient.actualUser)?.calendar as Wcalendar;







    const jour = (24 * 60 * 60 * 1000)

    const OnOffButton = () => {


        const toggleSwitch = () => {

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
    const MedicineConsumed = (week: string, day: string, medicine: priseInterface) => {
        const tempo = calendar[week][day].findIndex((prise) => prise == medicine)
        if (tempo != -1) {
            calendar[week][day][tempo].consome = !calendar[week][day][tempo].consome
        }

        setSave((prevSave: SaveInterface | undefined) => {
            if (!prevSave) return prevSave;
            return {
                ...prevSave,
                patients: prevSave.patients.map((patient) => (patient.actualUser ? { ...patient, calendar: calendar } : patient)),
            };
        });


    }
    const OnOffButtonTaken = ({ is, onToggle }: { is: boolean, onToggle: () => void }) => {
        //const [isTake, setIsTake] = useState(false);

        const [isTake, setIsTake] = useState(is);
        const toggleSwitchtake = () => {

            setIsTake((isTake) => !isTake);

            onToggle()

        };

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={toggleSwitchtake}>

                    <View style={[styles.toggleSwitchMED, { backgroundColor: isTake ? 'green' : 'red' }, { borderColor: isTake ? 'white' : "", borderWidth: isTake ? 1 : 0 }]} ><Text style={[{ color: 'white' }]}>{isTake ? 'MEDICAMENT PRIS' : 'VALIDER LA PRISE'}</Text></View>
                </TouchableOpacity>
            </View>
        );
    };
    const RenderMedicine = (date: string, weekData: priseInterface[]) => {
        let week = weekData.sort((a, b) => a.heure - b.heure);
        const weekday = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
        const key = getISOWeekNumber(new Date(date)) + "/" + new Date(date).getFullYear()

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
                                <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{prise.heure === -1 && prise.dosage === -1 && prise.dosageType === "4267" ? "Pas de Médicament pour aujourd'hui" : prise.heure + (prise.heure > 1 ? " heures" : " heure")} </Text>
                                <Text style={styles.medicine}>{prise.heure == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.nomMedoc}</Text>
                                <View style={styles.rowContainer}>
                                    <Text style={[styles.medicine, { marginRight: 5 }]}>{prise.heure == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.dosage}</Text>
                                    <Text style={styles.medicine}>{prise.heure == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.dosageType}</Text>
                                </View>
                                <OnOffButtonTaken is={prise.consome} onToggle={() => MedicineConsumed(key, date, prise)} />
                            </ImageBackground>
                        ))}
                    </View>

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
                                <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{prise.heure === -1 && prise.dosage === -1 && prise.dosageType === "4267" ? "Pas de Médicament pour aujourd'hui" : prise.heure + (prise.heure > 1 ? " heures" : " heure")} </Text>
                                <Text style={styles.medicine}>{prise.heure == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.nomMedoc}</Text>
                                <View style={styles.rowContainer}>
                                    <Text style={[styles.medicine, { marginRight: 5 }]}>{prise.heure == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.dosage}</Text>
                                    <Text style={styles.medicine}>{prise.heure == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.dosageType}</Text>
                                </View>
                                {prise.heure === -1 && prise.dosage === -1 && prise.dosageType === "4267" == true ? null : <OnOffButtonTaken is={prise.consome} onToggle={() => MedicineConsumed(key, date, prise)} />}
                            </ImageBackground>
                        ))}
                    </View>

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
        const key = getISOWeekNumber(new Date(date)) + "/" + new Date(date).getFullYear()
        return (
            <View key={startDate.getTime()} style={styles.dayContainerTOBD}>
                <ImageBackground style={[styles.medicineContainerBD, styles.backgroundImage]}
                    source={bg}
                >
                    <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{day.heure === -1 && day.dosage === -1 && day.dosageType === "4267" ? "Pas de Médicament pour aujourd'hui" : day.heure + (day.heure > 1 ? " heures" : " heure")} </Text>
                    <Text style={styles.medicine}>{day.heure == -1 && day.dosage == -1 && day.dosageType == "4267" == true ? null : day.nomMedoc}</Text>
                    <View style={styles.rowContainer}>
                        <Text style={[styles.medicine, { marginRight: 5 }]}>{day.heure == -1 && day.dosage == -1 && day.dosageType == "4267" == true ? null : day.dosage}</Text>
                        <Text style={styles.medicine}>{day.heure == -1 && day.dosage == -1 && day.dosageType == "4267" == true ? null : day.dosageType}</Text>
                    </View>
                    {day.heure === -1 && day.dosage === -1 && day.dosageType === "4267" == true ? null : <OnOffButtonTaken is={day.consome} onToggle={() => MedicineConsumed(key, date, day)} />}
                </ImageBackground>



            </View >)

    }
    const CalendarComponent = () => {
        if (isOn) {

            let data: Wcalendar = {}
            let week: WeekData = {}
            //Si pas de calendar généré
            if (!calendar) {
                let firstday = new Date(startDate.getTime() - startDate.getDay() * jour)

                data[weekNumber + "/" + startDate.getFullYear()] = {};

                for (let i = 0; i < 7; i++) {

                    data[weekNumber + "/" + startDate.getFullYear()][new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ nomMedoc: "Pas de médicament aujourd'hui", heure: -1, dosage: -1, dosageType: "4267", consome: false, releatedTreatment: "" }]

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

                        data[weekNumber + "/" + startDate.getFullYear()][new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ nomMedoc: "Pas de médicament aujourd'hui", heure: -1, dosage: -1, dosageType: "4267", consome: false, releatedTreatment: "" }]


                    }
                    week = data[weekNumber + "/" + startDate.getFullYear()]
                }
                //Le calendrier existe mais la semaine oui mais elle n'est pas complètre
                if (Object.keys(week).length < 7) {
                    let firstday = new Date(startDate.getTime() - startDate.getDay() * jour)
                    for (let i = 0; i < 7; i++) {
                        if (!week[new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]]) {
                            week[new Date(firstday.getTime() + i * jour).toISOString().split('T')[0]] = [{ nomMedoc: "Pas de médicament aujourd'hui", heure: -1, dosage: -1, dosageType: "4267", consome: false, releatedTreatment: "" }]
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
                    renderItem={({ item }) => RenderMedicine(item[0], item[1])}

                />

            );
        } else {
            let data: priseInterface[] = []
            if (!calendar) {
                calendar = {}
            }
            let week = calendar[weekNumber + "/" + startDate.getFullYear()]

            if (!week) {
                data = [{ nomMedoc: "Pas de médicament aujourd'hui", heure: -1, dosage: -1, dosageType: "4267", consome: false, releatedTreatment: "" }]
            } else {
                data = week[startDate.toISOString().split('T')[0]]
                !data ? data = [{ nomMedoc: "Pas de médicament aujourd'hui", heure: -1, dosage: -1, dosageType: "4267", consome: false, releatedTreatment: "" }] : null
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
            <View><Title /></View>



            <Selector />
            <CalendarComponent />

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
        marginVertical: 15, // Ajustez la marge verticale selon vos besoins
        borderStyle: 'dashed',
        alignSelf: 'center',
    },
    MedecinedayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: 'black',

        justifyContent: 'center',
        alignItems: 'center',

        //justifyContent: 'space-between',

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

        justifyContent: 'center',
        alignItems: 'center',

    },
    dayContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',

        alignSelf: 'center',
    },
    dayText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',

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
    toggleSwitchMED: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center', // Add this line to center vertically

    },
    // ... (other styles)
});

export default CalendarIndex;