import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { MedicineConsumed } from "../MedicineConsumed"
import { OnOffButtonTaken } from "../OnOffPriseButton"
import { getISOWeekNumber } from "../getISOWeekNumber"
/**
 * Renders a week of medication data.
 * 
 * @param date - The date of one day in the week (startdate).
 * @param weekData - The medication data for the week.
 * @param calendar - The calendar object.
 * @param setSave - The state setter for saving data.
 * @returns The rendered week component.
 */

export const WeekRendering = (date: string, weekData: priseInterface[], calendar: Wcalendar, setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>) => {
    let week = weekData.sort((a, b) => a.hour - b.hour);
    const weekday = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
    const key = getISOWeekNumber(new Date(date)) + "/" + new Date(date).getFullYear()


    return (
        <View key={date} style={styles.dayContainer}>
            <View >
                <Text style={styles.dayText}>{weekday[(new Date(date).getDay() - 1) < 0 ? 6 : (new Date(date).getDay() - 1)] + " " + date.split('-')[2]}</Text>
            </View>

            <View

                style={styles.MedecinedayContainer}>
                {week.map((prise, innerIndex) => (
                    <ImageBackground key={innerIndex} style={[styles.medicineContainer, styles.backgroundImage]}
                        source={date == new Date().toISOString().split('T')[0] ? require('../img/greenbg.png') : require('../img/greybg.png')}
                    >
                        <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{prise.hour === -1 && prise.dosage === -1 && prise.dosageType === "4267" ? "Pas de Médicament pour aujourd'hui" : prise.hour + (prise.hour > 1 ? " heures" : " heure")} </Text>
                        <Text style={styles.medicine}>{prise.hour == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.MedicineName}</Text>
                        <View style={styles.rowContainer}>
                            <Text style={[styles.medicine, { marginRight: 5 }]}>{prise.hour == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.dosage}</Text>
                            <Text style={styles.medicine}>{prise.hour == -1 && prise.dosage == -1 && prise.dosageType == "4267" == true ? null : prise.dosageType}</Text>
                        </View>
                        {prise.hour === -1 && prise.dosage === -1 && prise.dosageType === "4267" == true ? null : <OnOffButtonTaken is={prise.consumed} onToggle={() => MedicineConsumed(calendar, key, date, prise, setSave)} />}
                    </ImageBackground>
                ))}
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    medicine: {
        color: 'white',
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
    MedecinedayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderColor: 'black',

        justifyContent: 'center',
        alignItems: 'center',

        //justifyContent: 'space-between',

    },
    medicineContainer: {
        backgroundColor: 'gray',
        margin: 5,
        flexDirection: 'column',
        padding: 5,
        borderRadius: 8,


    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        alignContent: 'center',
        alignItems: 'center',

    },



})