import * as React from 'react';
import { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import defaultSaveForTest from '@data/defaultSaveForTest.json';
import dataManager from '@features/dataManager';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
    ImageBackground
} from 'react-native';
import defaultIcon from '@data/defaultIcon.json';
import {
    launchImageLibrary,
    ImageLibraryOptions,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import useSave from '@hooks/useSave';

const UserPageIndex = () => {
    const [save, setSave] = useSave();
    if (!save) return null;

    const [reload, setReload] = useState<boolean>(false);
    const actualUser = save.patients.find((patient) => patient.actualUser == true);

    const fetchData = async () => {
        try {
            setSave(await dataManager.getSaveData());
        } catch (error) {
            console.error('Erreur lors de la récupération des données :', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeProfile = (value: string) => {
        if (value !== actualUser?.name) {
            save.patients.forEach((patient) => {
                patient.name == value
                    ? (patient.actualUser = true)
                    : actualUser?.name === patient.name
                        ? (patient.actualUser = false)
                        : null;
            });
            dataManager.setSaveData(save);
        }
        setReload(!reload);
    };

    const ProfilePicker = () => {
        return (
            <View style={[styles.container]}>
                <Text style={styles.smallfontJomhuriaRegular}>
                    Sélectionnez un profil
                </Text>
                <RNPickerSelect
                    style={{
                        placeholder: {
                            color: 'white',
                            marginLeft: 5,
                        },

                    }}
                    onValueChange={handleChangeProfile}
                    items={getPickerItems()}
                    placeholder={getPickerPlaceholder()}
                />
            </View>
        );
    };

    const getPickerItems = () => {
        return save.patients
            .filter((patient) => !patient.actualUser)
            .map((patient) => ({
                label: patient.name,
                value: patient.name,
            }));
    };

    const getPickerPlaceholder = () => {
        return {
            label: actualUser?.name,
            value: actualUser?.name,
        };
    };

    const ProfileImage = () => {
        return (
            <Image
                style={{
                    width: 150,
                    height: 150,
                    marginTop: 20,
                    borderRadius: 100,
                }}
                source={{ uri: actualUser?.icone }}
            />
        );
    };

    async function convertPngToBase64(pngImage: string): Promise<string | null> {
        const binaryString = await RNFS.readFile(pngImage, 'base64');
        return binaryString;
    }

    const handleChangeText = (inputText: string) => {
        inputText.length == 0 ? (inputText = 'Nouveau patient') : null;

        if (actualUser?.name !== inputText) {
            save.patients = save.patients.map((patient) =>
                patient === actualUser
                    ? { ...patient, name: inputText }
                    : patient
            );
            dataManager.setSaveData(save);
            setReload(!reload);
        }
    };
    const handleChangeearliesttime = (inputText: string) => {
        const time = inputText.length == 0 ? 8 : null;
        
        save.patients = save.patients.map((patient) =>
            patient === actualUser
                ? { ...patient, earliesttime: Number(inputText) }
                : patient
        );
        dataManager.setSaveData(save);
        setReload(!reload);
    };
    const handleChangelatesttime = (inputText: string) => {
        inputText.length == 0 ? (inputText = '22') : null;
        save.patients = save.patients.map((patient) =>
            patient === actualUser
                ? { ...patient, latesttime: Number(inputText) }
                : patient
        );
        dataManager.setSaveData(save);
        setReload(!reload);

    };
    const NewUser = (name: string, icon: string = '', actualUser: boolean = false) => {
        let nb = 0;
        while (save.patients.filter((patient) => patient.name == name).length) {
            name = name + nb;
            nb++;
        }

        setSave((oldSave) => ({
            ...oldSave,
            patients: [
                ...oldSave?.patients || [],
                {
                    name: name,
                    icone: icon,
                    actualUser: actualUser,
                    prescriptions: [],
                    earliesttime: 8,
                    latesttime: 22,
                }
            ]
        } as SaveInterface))
    };

    const handlePressButtonDEL = () => {
        if (save.patients.length > 1) {
            save.patients = save.patients.filter((patient) => patient !== actualUser);
            save.patients[0].actualUser = true;
            dataManager.setSaveData(save);
        } else {
            save.patients = [];
            NewUser('Nouveau patient', defaultIcon.icon, true);
            dataManager.setSaveData(save);
        }
        setReload(!reload);
    };

    const Changepp = async (uri: string) => {
        const base64Icon = await convertPngToBase64(uri);
        save.patients = save.patients.map((patient) =>
            patient === actualUser
                ? { ...patient, icone: `data:image/png;base64,${base64Icon}` }
                : patient
        );
        dataManager.setSaveData(save);
        setReload(!reload);
    };

    const libraryHandler = async () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
        };
        launchImageLibrary(options, async (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === 'string') {
                Changepp(response.assets[0].uri);
            }
        });
    };

    const ControleButton = () => {
        return (
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Pressable style={[styles.buttonGREEN, { backgroundColor: "green", alignItems: "center", justifyContent: "center" }]} onPress={libraryHandler}>
                    <Text style={styles.smallfontJomhuriaRegularnopading}>
                        CHANGER DE PHOTO
                    </Text>
                </Pressable>
                <Pressable style={styles.buttonRED} onPress={handlePressButtonDEL}>
                    <Text style={styles.smallfontJomhuriaRegularnopading}>SUPPRIMER</Text>
                </Pressable>
            </View>
        );
    };

    const Userinfo = () => {
        return (
            <View style={styles.nameContainer}>
                <Text style={styles.smallfontJomhuriaRegular}>
                    Le nom de l'utilisateur actuelle est:
                </Text>
                <TextInput
                    style={[styles.textInput]}
                    defaultValue={actualUser?.name}
                    onEndEditing={(event) => handleChangeText(event.nativeEvent.text)}
                    textAlignVertical="center"
                    textAlign="center"
                />
            </View>
        );
    };

    const Statistique = () => {
        return (
            <View>
                <Text style={[styles.smallfontJomhuriaRegular, { marginLeft: 5 }]}>
                    Statistique de l'utilisateur
                </Text>
                <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15 }]}>
                    Nombre de traitement : {actualUser?.prescriptions.length}
                </Text>
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
                <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15, marginTop: -15 }]}>Heure de prise minimal d'un médicament </Text>
                <TextInput
                    style={[styles.textInput]}
                    defaultValue={String(actualUser?.earliesttime)}
                    onEndEditing={(event) => handleChangeearliesttime(event.nativeEvent.text)}
                    textAlignVertical="center"
                    textAlign="center"
                    keyboardType="numeric">

                </TextInput>
                <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15, marginTop: -15 }]}>Heure de prise maximal d'un médicament </Text>
                <TextInput
                    style={[styles.textInput]}
                    defaultValue={String(actualUser!!.latesttime)}
                    onEndEditing={(event) => handleChangelatesttime(event.nativeEvent.text)}
                    textAlignVertical="center"
                    textAlign="center">

                </TextInput>
            </View>
        );
    };

    const CreateNewUser = () => {
        return (
            <View style={[{ marginTop: 10, padding: 10 }]} >
                <Pressable
                    style={[styles.buttonGREEN, { borderRadius: 30, },]}
                    onPress={() => {
                        NewUser('Nouvel utilisateur', defaultIcon.icon, false);
                    }}>
                    <Text style={[styles.smallfontJomhuriaRegularnopading]}>AJOUTER UN NOUVEL UTILISATEUR</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <ScrollView style={styles.body}>
            <View style={{ width: '100%' }}>
                <ImageBackground
                    source={require('./img/picker.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={[styles.backgroundImage, { marginTop: 20, }, styles.shadow]}
                >
                    <ProfilePicker />
                </ImageBackground>
                <ImageBackground
                    source={require('./img/newuser.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={[styles.backgroundImage, { marginTop: 20, marginBottom: 20 }]}
                >
                    <CreateNewUser />
                </ImageBackground>
                <View style={styles.userInfoContainer}>
                    <ImageBackground
                        source={require('./img/userinfo.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                        style={styles.backgroundImage}
                    ><View style={styles.userInfoContainer}>
                            <ProfileImage />
                            {Userinfo()}
                            {Statistique()}
                            {ControleButton()}

                        </View>

                    </ImageBackground>
                </View>

            </View>
        </ScrollView>
    );
};




const styles = StyleSheet.create({
    nameContainer: {
        width: '95%',

        justifyContent: 'center',

    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30, // Ajustez la valeur selon vos besoins
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',

        borderRadius: 30,

    },

    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginBottom: -20,
    },
    buttonGREEN: {


        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        marginRight: 10,
        textAlign: 'center',
        alignItems: 'center',

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


        borderRadius: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,


    },

})
export default UserPageIndex;
