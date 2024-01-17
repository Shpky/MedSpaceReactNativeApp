import dataManager from '@features/dataManager';
import { RootStackParamList } from '@navigation/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

/**
 * Handles the change of user name.
 * 
 * @param navigation - The navigation object for navigating between screens.
 * @param inputText - The new user name.
 */
export const handleChangeUserName = (

    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>,
    inputText: string,

) => {
    inputText.length || (inputText = 'Nouveau patient');
    dataManager.setSaveData((old) => ({
        ...old,
        patients: (old?.patients || []).map((patient) =>
            patient.actualUser
                ? { ...patient, name: inputText }
                : patient
        ),
        doctors: old?.doctors || []
    })).then(() => {
        navigation.goBack(),
            navigation.navigate("UserPage")
    }

    )


};