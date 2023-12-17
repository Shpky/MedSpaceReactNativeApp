import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Debug from '@components/Debug';
import dataManager from '@features/dataManager';
import HeaderContainer from '@layouts/Home/components/headerContainer';
import TreatmentContainer from '@layouts/Treatment/TreatmentIndexPage';
import HomePageBody from '@layouts/Home/components/IndexHomePage';
import NewPrescription from '@layouts/NewPrescription/NewPrescriptionIndex';
import UserPageIndex from '@layouts/UserPage/IndexUserPage';
import IndexReport from '@layouts/Report/testforCSV';
import Prescription from '@layouts/Prescription/PrescriptionIndex';
import { RootStackParamList } from './RootStackParamList';
import CalendarIndex from '@layouts/Calendar/CalendarIndex';
export default function StackNavigator() {

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
                header: () => <>
                    <Debug>
                        <Button title="print datas" onPress={() => dataManager.getSaveData().then((e) => console.log(
                            e.patients.map(e => ({ ...e, icone: null }))
                        ))} />
                        <Button title='reset' onPress={() => dataManager.resetSaveData()} />
                    </Debug>
                    <HeaderContainer /></>,
                animation: 'slide_from_right',
            }}>

            <Stack.Screen name="Home" component={HomePageBody} />
            <Stack.Screen name="Treatment" component={TreatmentContainer} />
            <Stack.Screen name="NewPrescription" component={NewPrescription} />
            <Stack.Screen name="UserPage" component={UserPageIndex} />
            <Stack.Screen name="RepportPage" component={IndexReport} />
            <Stack.Screen name="Prescription" component={Prescription} />
            <Stack.Screen name="Calendar" component={CalendarIndex} />
        </Stack.Navigator >
    </NavigationContainer >;
};
