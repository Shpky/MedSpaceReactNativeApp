import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Debug from '@components/Debug';
import dataManager from '@features/dataManager';
import Header from '@layouts/Header/HeaderIndex';
import TreatmentContainer from '@layouts/Treatment/TreatmentIndexPage';
import HomePageBody from '@layouts/Home/components/IndexHomePage';
import NewPrescription from '@layouts/NewPrescription/NewPrescriptionIndex';
import UserPageIndex from '@layouts/UserPage/IndexUserPage';
import IndexReport from '@layouts/Report/testforCSV';
import Prescription from '@layouts/Prescription/PrescriptionIndex';
import { RootStackParamList } from './RootStackParamList';
import CalendarIndex from '@layouts/Calendar/CalendarIndex';
import LoginIndex from '@layouts/Login/LoginIndex';
import ProfilIndex from '@layouts/Profil/ProfilIndex';
import usePassword from '@hooks/usePassword';
import LoadingIndex from '@layouts/Loading/LoadingIndex';

/** Permet de gérer la navigation entre les pages */
export default function StackNavigator() {
    const { checkPassword } = usePassword();
    const withLogin = !checkPassword(null);
    console.log('withLogin :>> ', withLogin);
    const Stack = createNativeStackNavigator<RootStackParamList>();

    const MedSpaceWhiteTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        },
    };

    return <NavigationContainer theme={MedSpaceWhiteTheme}>
        <Stack.Navigator
            screenOptions={{
                header: (props) => <>
                    <Debug>
                        <Button title="print datas" onPress={() => dataManager.getSaveData().then((e) => console.log(
                            {
                                //...e,
                                //patients: e?.patients.map((p) => ({ ...p, icone: undefined })),
                                prescriptions: e?.patients.find((p) => p.actualUser)?.prescriptions.map((p) => ({ ...p.medicines.map((p) => p.name) }))


                            }
                        ))} />
                        <Button title='reset' onPress={() => dataManager.resetSaveData()} />
                    </Debug>

                    <Header {...props} />
                </>,
                animation: 'slide_from_right',
            }}>
            <Stack.Screen name="Loading" component={LoadingIndex} />
            {withLogin && <Stack.Screen name="Login" component={LoginIndex} />}
            <Stack.Screen name="Home" component={HomePageBody} />
            <Stack.Screen name="Treatment" component={TreatmentContainer} />
            <Stack.Screen name="NewPrescription" component={NewPrescription} />
            <Stack.Screen name="UserPage" component={UserPageIndex} />
            <Stack.Screen name="RepportPage" component={IndexReport} />
            <Stack.Screen name="Prescription" component={Prescription} />
            <Stack.Screen name="Calendar" component={CalendarIndex} />
            <Stack.Screen name="Profil" component={ProfilIndex} />
        </Stack.Navigator >
    </NavigationContainer >;
};
