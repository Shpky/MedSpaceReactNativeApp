import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { getISOWeekNumber } from "../getISOWeekNumber";
import { OnOffButtonTaken } from "../OnOffPriseButton";
import { MedicineConsumed } from "../MedicineConsumed";
/**
 * Renders a day in the calendar with medication information.
 * 
 * @param date - The date of the day to render in to isotring.
 * @param day - The medication information for the day.
 * @param startDate - The start date of the calendar.
 * @param calendar - The calendar data.
 * @param setSave - The state setter for saving the data.
 * @returns The rendered day component.
 */

export const dayrendering = (date: string, day: priseInterface, startDate: Date, calendar: Wcalendar, setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>) => {

    const key = getISOWeekNumber(new Date(date)) + "/" + new Date(date).getFullYear()
    return (
        <View key={startDate.getTime()} style={styles.dayContainerTOBD}>
            <ImageBackground style={[styles.medicineContainerBD, styles.backgroundImage]}
                source={date == new Date().toISOString().split('T')[0] ? require('../img/greenbg.png') : require('../img/greybg.png')}
            >
                <Text style={[styles.medicine, { fontWeight: 'bold' }]}>{day.heure === -1 && day.dosage === -1 && day.dosageType === "4267" ? "Pas de Médicament pour aujourd'hui" : day.heure + (day.heure > 1 ? " heures" : " heure")} </Text>
                <Text style={styles.medicine}>{day.heure == -1 && day.dosage == -1 && day.dosageType == "4267" == true ? null : day.nomMedoc}</Text>
                <View style={styles.rowContainer}>
                    <Text style={[styles.medicine, { marginRight: 5 }]}>{day.heure == -1 && day.dosage == -1 && day.dosageType == "4267" == true ? null : day.dosage}</Text>
                    <Text style={styles.medicine}>{day.heure == -1 && day.dosage == -1 && day.dosageType == "4267" == true ? null : day.dosageType}</Text>
                </View>
                {day.heure === -1 && day.dosage === -1 && day.dosageType === "4267" == true ? null : <OnOffButtonTaken is={day.consumed} onToggle={() => MedicineConsumed(calendar, key, date, day, setSave)} />}
            </ImageBackground>



        </View >)
}
const styles = StyleSheet.create({
    dayContainerTOBD: {
        marginBottom: 10,
        width: 300,
    },
    medicineContainerBD: {
        backgroundColor: 'gray',
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
})