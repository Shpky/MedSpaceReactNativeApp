import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, FlatList,  } from "react-native";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import dataManager from '@features/dataManager';
const TreatmentContainer = () => {
    const [patient, setPatient] = useState<PatientInterface | undefined>();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            await dataManager.init();

            const save = await dataManager.getSaveData();
            const actualUserPatient = save.patients.find(patient => patient.actualuser === true);

            if (actualUserPatient) {
                setPatient(actualUserPatient);
            }

        };

        fetchData();
    }, []);

    const navigateToNewPrescription = () => {
        //@ts-ignore
        navigation.navigate('NewPrescription');
    };

    const RenderItem = ({ item }: { item: PrescriptionInterface }) => {
        return (
            <View style={styles.Treatment}>
                <View>
                    <Text style={styles.fontJomhuriaRegular}>{item.title}</Text>
                </View>
                <View>
                    {item.medicines.length <= 3 ? (
                        item.medicines.map((medicine, index) => (
                            <Text style={styles.smallfontJomhuriaRegular} key={index}>{medicine.name}</Text>
                        ))
                    ) : (
                        <View >
                            {item.medicines.slice(0, 2).map((medicine, index) => (
                                <Text style={styles.smallfontJomhuriaRegular} key={index}>{medicine.name}</Text>
                            ))}
                            <Text style={styles.smallfontJomhuriaRegular} >Et {item.medicines.length - 2} autre médicament(s)</Text>
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
                    data={patient?.prescriptions}
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
