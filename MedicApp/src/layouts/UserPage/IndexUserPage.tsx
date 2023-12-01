import * as React from 'react';
import { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import defaultSaveForTest from '@data/defaultSaveForTest.json';
import dataManager from '@features/dataManager';
import { View, Text, TextInput, Button, Image, StyleSheet, Pressable } from "react-native";
import defaultIcon from '@data/defaultIcon.json';



const UserPageIndex = () => {

    const [save, setSave] = useState<SaveInterface>(defaultSaveForTest);
    const [reload, setReload] = useState<boolean>(false);
    let actualUser = save.patients.find(patient => patient.actualuser == true)



    const fetchData = async () => {
        try {
            await dataManager.init();

            setSave(await dataManager.getSaveData());
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    useEffect(() => {
        fetchData();

    }, []);

    const changeProfile = (value: string) => {
        let actualUser = save.patients.find(patient => patient.actualuser == true)

        if (value !== actualUser?.name) {
            save.patients.forEach(patient => {
                patient.name == value
                    ? (patient.actualuser = true)
                    : (actualUser?.name === patient.name ? (patient.actualuser = false) : null);
            });
            dataManager.setSaveData(save);
        }

        setReload(!reload);
    };

    const ProfilePicker = () => {

        let actualUser = save.patients.find(patient => patient.actualuser == true)
        return (

            <View style={styles.containter}>
                <Text style={styles.smallfontJomhuriaRegular}>Sélectionnez un profile</Text>
                <RNPickerSelect
                    style={{
                        placeholder: {
                            color: 'white',
                        },
                        inputIOS: {
                            color: 'white',
                            marginLeft: 5,
                        },
                        inputAndroid: {
                            marginLeft: 5,
                            color: 'white',
                        },


                    }}
                    onValueChange={(value) => {
                        changeProfile(value);
                    }}

                    items={(save.patients.filter((patient) => patient.actualuser == false)).map((patient) => ({
                        label: patient.name,
                        value: patient.name,
                    }))}
                    placeholder={{
                        label: actualUser?.name,
                        value: actualUser?.name,


                    }}

                />
            </View>
        )

    }

    const ProfileImage = () => {
        let actualUser = save.patients.find(patient => patient.actualuser == true)
        return (
            <Image
                style={{ width: 150, height: 150, marginTop: 20, borderRadius: 100 }}
                source={{ uri: actualUser?.icone }}
            />
        )

    }

    function convertPngToBase64(pngImage: string): string {

        const base64String = pngImage.replace(/^data:image\/png;base64,/, '');


        const encodedBase64 = btoa(base64String);

        return encodedBase64;
    }

    const handleChangeText = (inputText: string) => {
        let actualUser = save.patients.find(patient => patient.actualuser == true) as PatientInterface;
        console.log("test", inputText.length == 0)
        inputText.length == 0 ? inputText = "Nouveau patient" : null;
        console.log("test", inputText.length == 0)
        actualUser.name != inputText ?
            (save.patients.splice(save.patients.indexOf(actualUser as PatientInterface), 1), actualUser.name = inputText, save.patients.push(actualUser), dataManager.setSaveData(save), setReload(!reload))
            : inputText.length == 0 ?
                (console.log("username", inputText), save.patients.splice(save.patients.indexOf(actualUser as PatientInterface), 1), actualUser.name = "Nouveau patient", save.patients.push(actualUser), dataManager.setSaveData(save), setReload(!reload)) : null
        setReload(!reload)

    };

    const NewUser = (name: string, icon: string, actualUser: boolean = false) => {


        save.patients.push({ name: name, icone: icon, actualuser: actualUser, prescriptions: [] })
        dataManager.setSaveData(save);
        setReload(!reload);

    }
    const handlePressButtonDEL = () => {
        let actualUser = save.patients.find(patient => patient.actualuser == true);
        save.patients.length > 1 ?
            (save.patients.forEach(patient => {
                patient.actualuser == false && actualUser?.name != patient.name ? (patient.actualuser = true) : patient.actualuser = false;
            }), save.patients.splice(save.patients.indexOf(actualUser as PatientInterface), 1), dataManager.setSaveData(save))
            : (save.patients = save.patients.filter((patient) => patient.actualuser == false),
                NewUser("Nouveau patient", defaultIcon.icon, true))



        setReload(!reload);


    }

    const ControleButton = () => {

        return (<View style={{ flexDirection: 'row', marginTop: 20 }}>

            <Pressable style={styles.buttonRED} onPress={handlePressButtonDEL}><Text style={styles.smallfontJomhuriaRegularnopading}>SUPPRIMER</Text></Pressable>
        </View>)

    }

    const Userinfo = () => {
        let actualUser = save.patients.find(patient => patient.actualuser == true)
        return (<View style={styles.nameContainer}>
            <Text style={styles.smallfontJomhuriaRegular}>Le nom de l'utilisateur actuelle est:</Text>
            <TextInput
                style={[{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }, styles.textInput]}
                defaultValue={actualUser?.name}
                onEndEditing={(event) => handleChangeText(event.nativeEvent.text)}
                textAlignVertical="center"
                textAlign="center"
            />
        </View>)

    }
    const Statistique = () => {
        return (
            <View>
                <Text style={[styles.smallfontJomhuriaRegular, { marginLeft: 5 }]}>Statistique de l'utilisateur</Text>
                <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15 }]}>Nombre de traitement : {actualUser?.prescriptions.length}</Text>
                {actualUser && actualUser.prescriptions ? (
                    <Text style={styles.realysmallfontJomhuriaRegular}>
                        Nombre moyen de médicaments par traitement :{' '}
                        {actualUser.prescriptions.reduce(
                            (totalMedicines, prescription) =>
                                totalMedicines + prescription.medicines.length,
                            0
                        ) / actualUser.prescriptions.length}
                    </Text>
                ) : (
                    <Text>Chargement...</Text>
                )}

            </View>

        )
    }
    return (

        <View style={styles.body}>
            <View style={{ width: '100%' }}>

                <ProfilePicker />
                <View style={styles.userInfoContainer}>
                    <ProfileImage />

                    <Userinfo />
                    <Statistique />
                    <ControleButton />

                </View>
            </View>
        </View >
    );

}

const styles = StyleSheet.create({
    nameContainer: {
        width: '95%',

        justifyContent: 'center',

    },
    buttonGREEN: {
        backgroundColor: '#36b436',
        padding: 15,
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        marginRight: 10,
    },
    buttonRED: {
        backgroundColor: 'red',
        padding: 15,
        marginBottom: 15,
    },
    containter: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 30,
    },
    body: {

        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },
    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginBottom: -20,


    },
    realysmallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',



    },
    smallfontJomhuriaRegularnopading: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',

        marginTop: -10,
        marginBottom: -10,
    },
    textInput: {
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 8,
        marginLeft: 20,
        width: '80%',
        marginBottom: 15,

    },
    userInfoContainer: {
        width: '100%',
        marginTop: 20,
        backgroundColor: 'orange',
        borderRadius: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,

    },

})
export default UserPageIndex;