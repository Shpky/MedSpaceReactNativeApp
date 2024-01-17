import { StyleSheet, Text, View } from "react-native";
import { ChangeEarliesttime } from "../UserPreference/handleChangeEarliestTime";
import { ChangeLastestTime } from "../UserPreference/handleChangeLatestTime";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation/RootStackParamList";

type BuilderProps = {


    actualUser: PatientInterface,

    navigation: NativeStackNavigationProp<RootStackParamList, "UserPage", undefined>,



}
/**
 * Renders the statistics of the user.
 * @param {BuilderProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export const Statistique = ({ actualUser, navigation }: BuilderProps) => {
    return (
        <View>
            <Text style={[styles.smallfontJomhuriaRegular, { marginLeft: 5 }]}>
                Statistiques de l'utilisateur
            </Text>
            <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15 }]}>
                Nombre de traitement : {actualUser.prescriptions.length}
            </Text>
            {actualUser && actualUser.prescriptions ? (
                <Text style={styles.realysmallfontJomhuriaRegular}>
                    Nombre moyen de médicaments par traitement :{' '}
                    {actualUser.prescriptions.reduce(
                        (totalMedicines, prescription) =>
                            totalMedicines + prescription.medicines.length,
                        0
                    ) / actualUser.prescriptions.length}
                </Text>
            ) : (
                <Text>Chargement...</Text>
            )}
            <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15, marginTop: -15 }]}>Heure de prise minimale d'un médicament </Text>
            <ChangeEarliesttime actualUser={actualUser}   navigation={navigation} />
            <Text style={[styles.realysmallfontJomhuriaRegular, { marginBottom: -15, marginTop: -15 }]}>Heure de prise maximale d'un médicament </Text>
            <ChangeLastestTime navigation={navigation} actualUser={actualUser}  />
        </View>
    );
};

const styles = StyleSheet.create({


    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginBottom: -20,
    },
    realysmallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',



    },

})