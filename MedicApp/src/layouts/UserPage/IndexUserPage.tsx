import * as React from 'react';
import { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import defaultSaveForTest from '@data/defaultSaveForTest.json';
import dataManager from '@features/dataManager';
import {
    View,
    Text,
    TextInput,
    Button,
    Image,
    StyleSheet,
    Pressable,
} from 'react-native';
import defaultIcon from '@data/defaultIcon.json';
import {
    launchCamera,
    launchImageLibrary,
    CameraOptions,
    ImageLibraryOptions,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

const UserPageIndex = () => {
    const [save, setSave] = useState<SaveInterface>(defaultSaveForTest);
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
            <View style={[styles.container, styles.shadow]}>
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

    const NewUser = (name: string, icon: string = '', actualUser: boolean = false) => {
        let nb = 0;
        while (save.patients.map((patient) => patient.name == name).includes(true)) {
            name = name + nb;
            nb++;

        }



        save.patients.push({
            name: name,
            icone: icon,
            actualUser: actualUser,
            prescriptions: [],
        } as PatientInterface);

        dataManager.setSaveData(save);
        setReload(!reload);
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
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <Pressable style={styles.buttonGREEN} onPress={libraryHandler}>
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
            </View>
        );
    };

    const CreateNewUser = () => {
        return (
            <View style={[styles.shadow]} >
                <Pressable
                    style={[styles.buttonGREEN, { borderRadius: 30, }, styles.shadow]}
                    onPress={() => {
                        NewUser('Nouvel utilisateur', defaultIcon.icon, false);
                    }}>
                    <Text style={[styles.smallfontJomhuriaRegularnopading]}>AJOUTER UN NOUVEL UTILISATEUR</Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={styles.body}>
            <View style={{ width: '100%' }}>
                <ProfilePicker  />
                <View style={styles.userInfoContainer}>
                    <ProfileImage />
                    {Userinfo()}
                    {Statistique()}
                    {ControleButton()}
                </View>
                <CreateNewUser />
            </View>
        </View>
    );
};




const styles = StyleSheet.create({
    nameContainer: {
        width: '95%',

        justifyContent: 'center',

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
        backgroundColor: 'red',
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginBottom: -20,
    },
    buttonGREEN: {
        backgroundColor: '#36b436',
        padding: 15,
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
        marginTop: 20,
        backgroundColor: 'orange',
        borderRadius: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },

})
export default UserPageIndex;
