import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import defaultSaveForTest from '@data/defaultSaveForTest.json';
import defaultPatient from '@data/defaultPatient.json';
import DataManager from '../../services/dataManager';
import { Text, View, StyleSheet, TextInput, Button, Image } from "react-native";

import { useNavigation } from '@react-navigation/native';

const UserPageIndex = () => {
    const dataManager = new DataManager();
    const [save, setSave] = useState<SaveInterface>(defaultSaveForTest);
    const [actualuser, setActualuser] = useState<PatientInterface>(save.patients[0]);

    const navigation = useNavigation();


    const fetchData = async () => {
        try {
            await dataManager.init();
            const tempo = await dataManager.getSaveData();
            setSave(tempo);

            const actualUserPatient = save.patients.filter((patient) => patient.actualuser == false)[0];

            if (actualUserPatient) {
                setActualuser(actualUserPatient);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };


    useEffect(() => {
        fetchData();
        console.log("useEffect UserPageIndex")
    }, []);


    const changeProfile = (value: string) => {

        if (value !== actualuser.name) {
            console.log(value, actualuser.name)
            save.patients.forEach(patient => {
                patient.name === value
                    ? (patient.actualuser = true)
                    : (actualuser.name === patient.name ? (patient.actualuser = false) : null);
            });
            setActualuser(save.patients.find(patient => patient.actualuser === true) as PatientInterface)
            dataManager.setSaveData(save);
            console.log("changement de profile", actualuser.name)

        }
    };





    const ProfilePicker = () => {


        return (
            <RNPickerSelect
                onValueChange={(value) => {
                    changeProfile(value);
                }}

                items={(save.patients.filter((patient) => patient.actualuser === false)).map((patient) => ({
                    label: patient.name,
                    value: patient.name,
                }))}
                placeholder={{
                    label: actualuser.name,
                    value: actualuser.name,

                }}

            />
        )

    }

    const ProfileImage = () => {
        return (
            <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: actualuser.icone }}
            />
        )

    }
    const handleChangeText = (inputText: string) => {

    };
    const handlePressButton = () => {

    };
    return (
        <View>


            <ProfilePicker />
            <ProfileImage />

            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
                defaultValue={actualuser.name}
                onChangeText={handleChangeText}
            />
            <Button
                title="Soumettre"
                onPress={handlePressButton}
            />
        </View>
    );

}

export default UserPageIndex;