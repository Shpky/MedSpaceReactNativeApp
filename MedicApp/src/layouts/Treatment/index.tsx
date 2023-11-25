
import { Text, View, StyleSheet, Pressable, FlatList, ScrollView, SafeAreaView, Image } from "react-native";

const TreatmentContainer = () => {


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


        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={styles.NewTraitment}>
                <Text style={styles.fontJomhuriaRegular}>Nouveau Traitement</Text>
            </View>
            <FlatList
                data={monDictionnaire}
                renderItem={({ item }) => <RenderItem item={item} />}


            />

        </ScrollView>


    )

}

let styles = StyleSheet.create({
    NewTraitment: {
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
        paddingBottom: 30,  // Correction ici
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