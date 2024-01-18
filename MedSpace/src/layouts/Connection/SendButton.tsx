import dataManager from "@features/dataManager"
import { NavigationProp } from '@react-navigation/native';
import React from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import XLButton from "@components/form/buttons/ConfirmXL"
import { RootStackParamList } from '@navigation/RootStackParamList';

type BuilderProps = {
    navigation: NavigationProp<RootStackParamList>,
    isSelected: boolean,
    name: string,
}

/**
 * Renders a send button component, that check is the user has fill a username.
 * 
 * @param navigation - The navigation object.
 * @param isSelected - A boolean indicating whether the app condition of utilisation are accepted.
 * @param name - The name of the futur user.
 * @returns The send button component.
 */
export const SendButton = ({navigation, isSelected, name}: BuilderProps) => {

    return (
        <View style={styles.fixing}><XLButton onPress={() => {
            if (isSelected && name.length > 0) {
                dataManager.resetSaveData().then(() => {
                    dataManager.setSaveData((data) =>
                    ({
                        ...data, patients: [{
                            name: name, prescriptions: [], earliesttime: 8, latesttime: 22,
                            actualUser: true, icone: require("@data/defaultIcon.json").icon
                        }]
                    })
                    )
                        .then(() =>
                            //dataManager.saveData(data);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Home" }]
                            })
                        )
                })
            } else {
                if (!(name.length > 0)) {
                    Alert.alert("ATTENTION", "Merci de rentrer un nom valide")
                } else if (!isSelected) {
                    Alert.alert("ATTENTION", "Merci d'accepter les conditions d'utilisation.")
                }


            }
        }}><Text style={styles.SUPtitle}>Valider</Text></XLButton></View>

    )
}

const styles = StyleSheet.create({

    SUPtitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: "white",
        padding: 10,
    },
    fixing: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    }

})
