import dataManager from "@features/dataManager";
import { NewUser } from "../NewUser";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/RootStackParamList";
import defaultIcon from '@data/defaultIcon.json';

/**
 * Handles the press event of the DEL button.
 * If there are more than one patient, it removes the current user and sets another patient as the current user.
 * If there is only one patient, it creates a new user with default values.
 * @param save - The save object containing the patient data.
 * @param navigation - The navigation object for navigating between screens.
 */
export const handlePressButtonDEL = (save: SaveInterface, navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>) => {


    save.patients.length > 1
        ? (dataManager.setSaveData((old) => ({
            ...old,
            patients: old?.patients.filter((patient) => !patient.actualUser).map((p, i) => !i ? ({ ...p, actualUser: true }) : p)
        }))).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        })
        : (dataManager.setSaveData((old) => ({
            ...old,
            patients: [{
                name: "User",
                icone: defaultIcon.icon,
                actualUser: true,
                prescriptions: [],
                earliesttime: 8,
                latesttime: 22,
            }]
        }))).then(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        })



};