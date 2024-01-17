
import { View, Pressable, Text, StyleSheet } from "react-native";
import { handlePressButtonDEL } from "./DellUser";
import {
    launchImageLibrary,
    ImageLibraryOptions,
} from 'react-native-image-picker';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/RootStackParamList";
import { Changepp } from "./NewPP";
/**
 * Handles the library action for selecting an image from the device's library.
 * 
 * @param navigation - The navigation prop for the UserPage component.
 */
const libraryHandler = async (navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>) => {
    const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
    };
    launchImageLibrary(options, async (response) => {
        if (response.assets && response.assets[0] && typeof response.assets[0].uri === 'string') {
            Changepp(response.assets[0].uri, navigation);
        }
    });
};
type BuilderProps = {

    setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>,
    save: SaveInterface,
    actualUser: PatientInterface,
    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>
}
/**
 * Renders the control button component.
 * @param save - The save function.
 * @param navigation - The navigation object.
 * @returns The rendered control button component.
 */
export const ControleButton = ({ save, navigation }: BuilderProps) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Pressable style={[styles.buttonGREEN, { backgroundColor: "green", alignItems: "center", justifyContent: "center" }]} onPress={() => libraryHandler(navigation)}>
                <Text style={styles.smallfontJomhuriaRegularnopading}>
                    CHANGER DE PHOTO
                </Text>
            </Pressable>
            <Pressable style={styles.buttonRED} onPress={() => handlePressButtonDEL(save, navigation)}>
                <Text style={styles.smallfontJomhuriaRegularnopading}>SUPPRIMER LE PROFIL</Text>
            </Pressable>
        </View>
    );
};
const styles = StyleSheet.create({
    buttonGREEN: {
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        marginRight: 10,
        textAlign: 'center',
        alignItems: 'center',

    },
    smallfontJomhuriaRegularnopading: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',

        marginTop: -10,
        marginBottom: -10,
    },
    buttonRED: {
        backgroundColor: 'red',
        padding: 15,
        marginBottom: 15,
    },
})