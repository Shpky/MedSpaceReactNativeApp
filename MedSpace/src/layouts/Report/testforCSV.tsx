import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const IndexReport = () => {
    return (
        <View style={styles.container}>

            <Text>Contenu de la vue</Text>

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
        resizeMode: 'cover',  // Vous pouvez ajuster le mode de redimensionnement selon vos besoins
    },
});

export default IndexReport;
