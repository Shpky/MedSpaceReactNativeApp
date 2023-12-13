import Title from "@components/TitleBubble"
import { RootStackParamList } from "@navigation/RootStackParamList";
import { NavigationProp } from "@react-navigation/native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type PrescriptionIndexProps = NativeStackScreenProps<RootStackParamList, 'Prescription'>

export default function PrescriptionIndex({ navigation, route }: PrescriptionIndexProps) {
    const { prescription } = route.params
    if (!prescription) {
        console.log('prescription :>> ', prescription);
        navigation.goBack()
        return null
    }
    
    return <>
        <Title>Test</Title>
    </>
}
// { prescription }: { prescription ?: PrescriptionInterface }
