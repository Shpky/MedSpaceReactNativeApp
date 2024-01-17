import dataManager from "@features/dataManager";
import { RootStackParamList } from "@navigation/RootStackParamList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

/**
 * Handles the change of the user profile.
 * 
 * @param actualUser - The current user profile.
 * @param value - The new value for the user profile.
 * @param navigation - The navigation object for resetting the navigation stack.
 */
const handleChangeProfile = (actualUser: PatientInterface, value: string, navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>) => {
    if (value === actualUser?.name) return;
    dataManager.setSaveData((oldSave) => ({
        ...oldSave,
        patients: oldSave?.patients.map((p, _) =>
            ({ ...p, actualUser: p.name === value })
        ) || []
    })).then(() => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    });
};

/**
 * Retrieves the picker items for the given save object.
 * 
 * @param save - The save object containing the patients.
 * @returns An array of picker items.
 */
const getPickerItems = (save: SaveInterface) => {
    return save.patients
        .filter((patient) => !patient.actualUser)
        .map((patient) => ({
            label: patient.name,
            value: patient.name,
        }));
};
/**
 * Returns the picker placeholder object for the given actual user.
 * @param actualUser - The actual user object.
 * @returns The picker placeholder object with label and value properties.
 */
const getPickerPlaceholder = (actualUser: PatientInterface) => {
    return {
        label: actualUser?.name,
        value: actualUser?.name,
    };
};

type BuilderProps = {
    save: SaveInterface,
    actualUser: PatientInterface | undefined,
    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>,

}

/**
 * Renders a profile picker component.
 * @param save - The save function.
 * @param actualUser - The actual user object.
 * @param navigation - The navigation object.
 * @returns The rendered profile picker component.
 */
export const ProfilePicker = ({ save, actualUser, navigation }: BuilderProps) => {
    if (!actualUser) return null;
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
                onValueChange={(value) => handleChangeProfile(actualUser, value, navigation)}
                items={getPickerItems(save)}
                placeholder={getPickerPlaceholder(actualUser)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
})