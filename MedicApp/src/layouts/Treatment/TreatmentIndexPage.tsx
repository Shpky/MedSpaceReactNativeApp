import { Text, View, StyleSheet, Pressable, FlatList } from "react-native";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { useNavigation } from '@react-navigation/native';
const TreatmentContainer = () => {
    const navigation = useNavigation();
    const navigateToNewPrescription = () => {
        //@ts-ignore
        navigation.navigate('NewPrescription');
    };

    type MedicationInfo = {
        medicalName: string;
        infosup: {
            dose: string;
            frequency: string;
            duration: string;
        };
    };

    type Treatment = {
        treatmentName: string;
        medecines: MedicationInfo[];
    };


    const monDictionnaire
        = [{
            treatmentName: "TraitmentName1",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },
        {
            treatmentName: "TraitmentName2",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },
        {
            treatmentName: "TraitmentName3",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },
        {
            treatmentName: "TraitmentName4",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },
        {
            treatmentName: "TraitmentName5",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },
        {
            treatmentName: "TraitmentName6",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },
        {
            treatmentName: "TraitmentName7",
            medecines: [
                { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
                { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            ]
        },

        ];





    //Pour chaque éllements on le transforme en un élément JSX
    const RenderItem = ({ item }: { item: Treatment }) => {
        return (
            <View style={styles.Treatment}>
                <View>
                    <Text style={styles.fontJomhuriaRegular}>{item.treatmentName}</Text>
                </View>
                <View>
                    {item.medecines.length <= 3 ? (
                        item.medecines.map((medicine, index) => (
                            <Text style={styles.smallfontJomhuriaRegular} key={index}>{medicine.medicalName}</Text>
                        ))
                    ) : (
                        <View >
                            {item.medecines.slice(0, 2).map((medicine, index) => (
                                <Text style={styles.smallfontJomhuriaRegular} key={index}>{medicine.medicalName}</Text>
                            ))}
                            <Text style={styles.smallfontJomhuriaRegular} >Et {item.medecines.length - 2} autre médicament(s)</Text>
                        </View>
                    )}
                </View>
            </View>
        );
    };




    return (

        <View style={styles.Body}>
            <View>

                <FlatList
                    ListHeaderComponent={() => <View style={styles.HeaderInfoTraitment}><Text style={styles.fontJomhuriaRegular}>Sélectionez un traitement</Text></View>}
                    data={monDictionnaire}
                    renderItem={({ item }) => <RenderItem item={item} />}


                />
                <View style={styles.container}>
                    <View style={styles.NewTreatment}>

                        <Pressable style={styles.buttonNewtreatment} onPress={navigateToNewPrescription}>
                            <FontAwesomeIcon icon={faPlus} color="white" size={50} />
                        </Pressable>
                    </View>
                </View>
            </View>

        </View >
    )

}

let styles = StyleSheet.create({
    Body: {
        flex: 1,

        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        position: 'relative',
    },

    NewTreatment: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#2aa32a',
        height: 80,
        width: 80,
        borderRadius: 40,
    },

    buttonNewtreatment: {

        backgroundColor: '#2aa32a',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        borderRadius: 40,

    },
    HeaderInfoTraitment: {
        height: 62,

        backgroundColor: 'orange',
        color: 'white',
        borderRadius: 30,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fontJomhuriaRegular: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginLeft: 20,
    },
    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',
        marginTop: -10,

    },
    Treatment: {
        height: 200,
        borderRadius: 30,
        paddingBottom: 30,
        backgroundColor: 'red',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },




})

export default TreatmentContainer;