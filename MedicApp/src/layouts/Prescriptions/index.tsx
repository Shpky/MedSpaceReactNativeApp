import Title from '@components/TitleBubble';
import getSave from 'src/utils/getSave';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    NewPrescription: undefined;
    Prescriptions: undefined;
};

export default function index({ navigation }:
    { navigation: NativeStackNavigationProp<RootStackParamList, "Prescriptions"> }) {
    const save = getSave()
    if (save === null || save?.patients[0].prescriptions.length === 0) {
        navigation.navigate("NewPrescription")
    }
    return (
        <Title>Sélectionnez un traitement</Title>
    )
}
