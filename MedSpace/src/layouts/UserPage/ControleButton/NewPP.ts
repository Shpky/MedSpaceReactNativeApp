import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { convertPngToBase64 } from "../PngToBase64";
import dataManager from "@features/dataManager";
import { RootStackParamList } from "@navigation/RootStackParamList";
/**
 * Changes the profile picture of the user.
 * 
 * @param uri - The URI of the image to be converted and set as the profile picture.
 * @param navigation - The navigation object used to navigate between screens.
 * @returns A Promise that resolves when the profile picture is successfully changed.
 */
export const Changepp = async (uri: string, navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>) => {
    const base64Icon = await convertPngToBase64(uri);

    dataManager.setSaveData((old) => ({
        ...old,
        patients: (old?.patients || []).map((patient) =>
            patient.actualUser
                ? { ...patient, icone: `data:image/png;base64,${base64Icon}` }
                : patient
        ),
        doctors: old?.doctors || []
    })).then(() => {
        navigation.goBack(),
            navigation.navigate("UserPage")
    })


};