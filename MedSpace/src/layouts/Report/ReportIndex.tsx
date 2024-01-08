import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, FlatList } from 'react-native';
import useActualPatient from '@hooks/useActualPatient';
import Title from '@components/TitleBubble'

const IndexReport = () => {
    const [actualPatient] = useActualPatient();
    if (!actualPatient) return null;

    const RenderItem = ({ item }: { item: PrescriptionInterface }) => {
        return (
            <ImageBackground
                source={require('./img/traitement.png')}>
                <Text>{item.title}</Text>
                <Text>{item.medicines.map((m) => m.name).join(', ')}</Text>
            </ImageBackground>
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
                            Sélectionez un traitement
                        </Title>}
                    data={actualPatient?.prescriptions}
                    renderItem={({ item }) => <RenderItem item={item} />}
                />)
        }


    }


    return (
        <View style={styles.container}>

            <Text>Contenu de la vue</Text>
            <Treatment></Treatment>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})

export default IndexReport;
