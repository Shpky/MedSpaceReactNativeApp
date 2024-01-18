import React from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, Pressable } from 'react-native';
import useActualPatient from '@hooks/useActualPatient';
import Title from '@components/TitleBubble'
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/RootStackParamList';
const IndexReport = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [actualPatient] = useActualPatient();
    if (!actualPatient) return null;

    const navigateHandler = (prescription: PrescriptionInterface) => {

        navigation.navigate('Email', { prescription: prescription })
    }


    const RenderMedicine = ({ item }: { item: MedicineInterface }) => {
        return (
            <Text style={styles.textCW}>{item.name}</Text>
        )
    }

    const RenderPrescription = ({ item }: { item: PrescriptionInterface }) => {
        return (<Pressable onPress={() => navigateHandler(item)}>
            <ImageBackground
                source={require('./img/traitement.png')}
                style={styles.treatmentcontainer}
            >
                <Text style={styles.title}>{item.title}</Text>
                <FlatList
                    data={item.medicines}
                    renderItem={({ item }) => <RenderMedicine item={item} />}
                >

                </FlatList>
                {/* <Text style={styles.textCW}>{item.medicines.map((m) => m.name).join(', ')}</Text> */}
            </ImageBackground></Pressable>
        )
    }

    const Treatment = () => {
        if (actualPatient.prescriptions.length === 0) {
            return (
                <View>
                    <Text>Aucun traitement en cours</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    ListHeaderComponent={() =>
                        <Title>
                            Sélectionnez un traitement
                        </Title>}
                    data={actualPatient?.prescriptions}
                    renderItem={({ item }) => <RenderPrescription item={item} />}
                />)
        }


    }


    return (

        <View style={styles.container}>
            <Treatment></Treatment>
        </View >

    );
};

const styles = StyleSheet.create({
    treatmentcontainer: {
        padding: 10,

        marginVertical: 10,
        flex: 1,
        flexDirection: 'column',

        //Gestion bg
        borderRadius: 15,
        resizeMode: 'cover',
        overflow: 'hidden',
        justifyContent: "center",
        alignContent: "center",
        alignItem: "center",

        //shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        //Alignement contenue


    },
    fixtitle: {
        padding: 5
    },
    title: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginTop: -10,
        marginBottom: -10,


    },
    textCW: {
        marginRight: 10,
        color: 'white',
        alignSelf: "flex-start",
        textDecorationLine: 'underline',

    },
    container: {
        flex: 1,

        margin: "5%"
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})

export default IndexReport;
