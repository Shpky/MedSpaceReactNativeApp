import { StyleSheet, TextInput } from "react-native";
import dataManager from "@features/dataManager";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/RootStackParamList";
/**
 * Handles the change of the latest time for a user's preference.
 * 
 * @param inputText - The input text representing the latest time.
 * @param navigation - The navigation object for navigating between screens.
 */
const handleChangelatesttime = (inputText: string, navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>) => {
    if (isNaN(+inputText)) return;
    let time = inputText.length ? +inputText : 22;
    if (time < 0) time = 0
    if (time > 24) time = 24
    dataManager.setSaveData((old) => ({
        ...old,
        patients: (old?.patients || []).map((patient) =>
            patient.actualUser
                ? { ...patient, latesttime: +inputText }
                : patient
        ),
        doctors: old?.doctors || []
    })).then(() => {
        navigation.goBack(),
            navigation.navigate("UserPage")
    })
};
type BuilderProps = {

    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>

    actualUser: PatientInterface
}
/**
 * Renders a TextInput component for changing the latest time value.
 * 
 * @param actualUser - The actual user object.
 * @param navigation - The navigation object.
 * @returns The rendered TextInput component.
 */
export const ChangeLastestTime = ({ actualUser, navigation }: BuilderProps) => {
    return (<TextInput
        style={[styles.textInput]}
        defaultValue={actualUser?.latesttime.toString()}
        onEndEditing={(event) => handleChangelatesttime(event.nativeEvent.text, navigation)}
        textAlignVertical="center"
        textAlign="center">

    </TextInput>)
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