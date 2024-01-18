import { Text, View, ImageBackground, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { getISOWeekNumber } from "./getISOWeekNumber";
import { jour } from "./Jour";
type BuilderProps = {
    isOn: boolean,
    setStartDate: React.Dispatch<React.SetStateAction<Date>>,
    startDate: Date,
    setWeekNumber: React.Dispatch<React.SetStateAction<number>>,
}
/**
 * Renders a date selector component.
 * @param {Object} props - The component props.
 * @param {boolean} props.isOn - Indicates whether the calendar week view is active or not.
 * @param {Function} props.setStartDate - A function to set the start date.
 * @param {Date} props.startDate - The start date.
 * @param {Function} props.setWeekNumber - A function to set the week number.
 * @returns {JSX.Element} The date selector component.
 */
export const DateSelector = ({ isOn, setStartDate, startDate, setWeekNumber }: BuilderProps): JSX.Element => {
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

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={() => (setStartDate(new Date(startDate.getTime() - 1 * jour)), setWeekNumber(getISOWeekNumber(new Date(startDate.getTime() - 1 * jour))))}>
                        <Text style={styles.bold}>{'   <   '}</Text>
                    </Pressable>

                    <Text style={styles.Month}>  {weekday[startDate.getDay()]} </Text>

                    <Pressable onPress={() => (setStartDate(new Date(startDate.getTime() + 1 * jour)), setWeekNumber(getISOWeekNumber(new Date(startDate.getTime() + 1 * jour))))}>
                        <Text style={styles.bold}>{'   >   '}</Text>
                    </Pressable>
                </View>


                : null}
        </View>
    )
}
const styles = StyleSheet.create({
    Month: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',

    },


})
