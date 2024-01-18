import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '@layouts/Header/HeaderIndex';
import TreatmentContainer from '@layouts/Treatment/TreatmentIndexPage';
import HomePageBody from '@layouts/Home/components/IndexHomePage';
import NewPrescription from '@layouts/NewPrescription/NewPrescriptionIndex';
import UserPageIndex from '@layouts/UserPage/IndexUserPage';
import Prescription from '@layouts/Prescription/PrescriptionIndex';
import { RootStackParamList } from './RootStackParamList';
import CalendarIndex from '@layouts/Calendar/CalendarIndex';
import LoginIndex from '@layouts/Login/LoginIndex';
import ProfilIndex from '@layouts/Profil/ProfilIndex';
import LoadingIndex from '@layouts/Loading/LoadingIndex';
import RepportPage from '@layouts/Report/ReportIndex';
import Email from '@layouts/Email/MailIndex';
import FirstConnectionIndex from '@layouts/Connection/FirstConnectionIndex';
/** Permet de gérer la navigation entre les pages */
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
                header: (props) => <>
                    <Header {...props} />
                </>,
                animation: 'slide_from_right',
            }}>
            <Stack.Screen name="Loading" component={LoadingIndex} options={{ header: () => null }} />
            <Stack.Screen name="CreateAccount" component={FirstConnectionIndex} options={{ header: () => null }} />
            <Stack.Screen name="Login" component={LoginIndex} />
            <Stack.Screen name="Home" component={HomePageBody} />
            <Stack.Screen name="Treatment" component={TreatmentContainer} />
            <Stack.Screen name="NewPrescription" component={NewPrescription} />
            <Stack.Screen name="UserPage" component={UserPageIndex} />
            <Stack.Screen name="Prescription" component={Prescription} />
            <Stack.Screen name="Rapport" component={RepportPage} />
            <Stack.Screen name="Calendar" component={CalendarIndex} />
            <Stack.Screen name="Profil" component={ProfilIndex} />
            <Stack.Screen name="Email" component={Email} />
        </Stack.Navigator >
    </NavigationContainer >;
};
