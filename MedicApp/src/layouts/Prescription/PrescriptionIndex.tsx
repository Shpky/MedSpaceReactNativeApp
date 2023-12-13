import Title from "@components/TitleBubble"
import { useNavigation } from "@react-navigation/native"


export default function PrescriptionIndex({ prescription }: { prescription?: PrescriptionInterface }) {
    const navigation = useNavigation()
    !prescription && navigation.goBack()
    
    return <>
        <Title>Test</Title>
    </>
}
