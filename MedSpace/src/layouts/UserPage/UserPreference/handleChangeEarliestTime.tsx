import { StyleSheet, TextInput } from "react-native";
import dataManager from '@features/dataManager';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/RootStackParamList";
/**
 * Handles the change of the earliest time for a user's preference.
 * 
 * @param inputText - The input text representing the earliest time.
 * @param navigation - The navigation object for navigating between screens.
 */
const handleChangeearliesttime = (inputText: string, navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>) => {
    if (isNaN(+inputText)) return;
    let time = inputText.length ? +inputText : 8;
    if (+time < 0) { time = 0 }
    if (+time > 24) { time = 24 }
    console.log(time, time > 24, time < 0)
    dataManager.setSaveData((old) => ({
        ...old,
        patients: (old?.patients || []).map((patient) =>
            patient.actualUser
                ? { ...patient, earliesttime: +inputText }
                : patient
        ),
        doctors: old?.doctors || []
    })).then(() => {
        navigation.goBack(),
            navigation.navigate("UserPage")
    })
};
type BuilderProps = {



    actualUser: PatientInterface,
    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>,
}
/**
 * Renders a TextInput component for changing the earliest time value.
 * 
 * @param actualUser - The actual user object.
 * @param navigation - The navigation object.
 * @returns The rendered TextInput component.
 */
export const ChangeEarliesttime = ({ actualUser, navigation }: BuilderProps) => {
    return (
        <TextInput
            style={[styles.textInput]}
            defaultValue={actualUser.earliesttime.toString()}
            onEndEditing={(event) => handleChangeearliesttime(event.nativeEvent.text, navigation)}
            textAlignVertical="center"
            textAlign="center" >

        </TextInput>
    )
}

const styles = StyleSheet.create({
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

})