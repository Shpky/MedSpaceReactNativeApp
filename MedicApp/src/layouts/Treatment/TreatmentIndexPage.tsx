import * as React from 'react';
import { Text, View, StyleSheet, Pressable, FlatList, ImageBackground, Button } from "react-native";
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { NavigationProp } from '@react-navigation/native';
import useActualPatient from '@hooks/useActualPatient';
import Debug from '@components/Debug';
import Title from '@components/TitleBubble'
import { RootStackParamList } from '@navigation/RootStackParamList';

const TreatmentContainer = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [patient] = useActualPatient()

    const navigateToNewPrescription = () => {
        navigation.navigate('NewPrescription');
    };

    const RenderItem = ({ item }: { item: PrescriptionInterface }) => {
        const navigateHandler = () => {
            console.log('item :>> ', item);
            navigation.navigate('Prescription', { prescription: item })
        }
        return (

            <Pressable style={styles.Treatment} onPress={navigateHandler}>
                <ImageBackground
                    source={require('./img/traitement.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={styles.backgroundImage}
                >
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
                                <Text style={styles.smallfontJomhuriaRegular} >Et {item.medicines.length - 2} autre médicament{item.medicines.length > 1 && '(s)'}</Text>
                            </View>
                        )}
                    </View>
                </ImageBackground>
            </Pressable>
        );
    }
    return (

        <View style={styles.Body}>
            <Debug>
                <Button title={"navigation stack"} onPress={() => console.log(navigation.getState())} />
            </Debug>
            <View>

                <FlatList
                    ListHeaderComponent={() =>
                        <Title>
                            Sélectionez un traitement
                        </Title>}
                    data={patient?.prescriptions}
                    renderItem={({ item }) => <RenderItem item={item} />}
                />

                <View style={styles.container}>

                </View>
            </View>
            <View style={styles.NewTreatment}>

                <Pressable style={styles.buttonNewtreatment} onPress={navigateToNewPrescription}>
                    <FontAwesomeIcon icon={faPlus} color="white" size={50} />
                </Pressable>
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
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30, // Ajustez la valeur selon vos besoins
        overflow: 'hidden',
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
        width: '90%',
        height: 200,
        borderRadius: 30,
        paddingBottom: 0,
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
