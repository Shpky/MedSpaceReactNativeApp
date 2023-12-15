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

    let calendar = Calculator();
    console.log(calendar)
    const OnOffButton = () => {
        const [isOn, setIsOn] = useState(false);

        const toggleSwitch = () => {
            setIsOn((prevIsOn) => !prevIsOn);
        };

        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.button} onPress={toggleSwitch}>

                    <View style={[styles.toggleSwitch, { backgroundColor: isOn ? 'green' : 'red' }]} ><Text style={[{color:'white'}]}>{isOn ? 'ON' : 'OFF'}</Text></View>
                </TouchableOpacity>
            </View>
        );
    };


    return (
        <View>
            <OnOffButton></OnOffButton>
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



