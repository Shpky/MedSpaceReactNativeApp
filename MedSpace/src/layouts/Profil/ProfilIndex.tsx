import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "@navigation/RootStackParamList";
import useSave from "@hooks/useSave"
import Title from "@components/TitleBubble"
import ProfilItem from './ProfilItem';
import { ScrollView, View } from 'react-native';
import dataManager from '@features/dataManager';
import style from './style';

type ProfilIndexProps = NativeStackScreenProps<RootStackParamList, 'Profil'>

/** Permet de sélectionner un profil pour accéder à l'application
 */
export default function ProfilIndex({ navigation }: ProfilIndexProps) {
    const [save] = useSave()
    if (!save) return null
    return <ScrollView>
        <Title>Sélectionnez un profil</Title>
        <View style={style.container}>
            {
                save.patients.map((patient, index) => {
                    const onClickHandler = () => {
                        dataManager.setSaveData((oldSave) => ({
                            ...oldSave,
                            patients: oldSave?.patients.map((p, _) =>
                                ({ ...p, actualUser: p.name === patient.name })
                            ) || []
                        } as SaveInterface)).then(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        })
                    }
                    return <ProfilItem
                        key={index}
                        patientLite={{ name: patient.name, icone: patient.icone }}
                        onPress={onClickHandler}
                    />
                })
            }
        </View>
    </ScrollView>
}
