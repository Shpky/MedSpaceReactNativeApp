import { StyleSheet, Text, TextInput, View } from "react-native";
import { handleChangeUserName } from "../UserPreference/ChangeUserName";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/RootStackParamList";
type BuilderProps = {

    setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>,
    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>,
    actualUser: PatientInterface,
}
/**
 * Renders the user information component.
 * 
 * @param setSave - Callback function to set the save state.
 * @param navigation - Navigation object for navigating between screens.
 * @param actualUser - The current user object.
 * @returns The rendered user information component.
 */
export const Userinfo = ({ setSave, navigation, actualUser }: BuilderProps) => {
    return (
        <View style={styles.nameContainer}>
            <Text style={styles.smallfontJomhuriaRegular}>
                Le nom de l'utilisateur actuel est:
            </Text>
            <TextInput
                style={[styles.textInput]}
                defaultValue={actualUser?.name}
                onEndEditing={(event) => handleChangeUserName(navigation, event.nativeEvent.text,)}
                textAlignVertical="center"
                textAlign="center"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    nameContainer: {
        width: '95%',

        justifyContent: 'center',

    },
    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginBottom: -20,
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
})