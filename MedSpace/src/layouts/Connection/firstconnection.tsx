
import React from 'react';
import { Text, ScrollView, View, Button, ImageBackground, Pressable, TextInput, StyleSheet, Alert } from "react-native";
import { CheckBox } from "@rneui/themed"
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationProp } from '@react-navigation/native';
import dataManager from "@features/dataManager";

//import DELTreamentCalculator from "@layouts/Calendar/treatmentDelCalculator";
import usePrescription from "@hooks/usePrescription";
import { useMemo } from "react";
import { delByRomain } from "@layouts/Calendar/treatmentDelCalculator";
import { RootStackParamList } from '@navigation/RootStackParamList';
import XLButton from '@components/form/buttons/ConfirmXL';
const FirstCo = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [name, onChangeName] = React.useState('');
    const [isSelected, setSelection] = React.useState(false);
    return (<View style={{ width: "95%", alignContent: "center", alignSelf: "center" }} >
        <View style={{ marginVertical: 20 }}>
            <ImageBackground
                source={require("./title.png")}
                style={styles.bg}>
                <Text style={styles.SUPtitle}>Créez votre profile</Text>
            </ImageBackground>
        </View>
        <View style={{ alignSelf: 'center' }}>
            <ImageBackground
                source={require("./picker.png")}
                style={styles.bg}>
                <Text style={styles.Stitle}>Rentrez vos informations</Text>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Votre nom prénom"
                    placeholderTextColor={"white"}

                    onChangeText={onChangeName}
                ></TextInput>
            </ImageBackground>
        </View>


        <ScrollView style={styles.scrollview} >
            <Text style={styles.title}>
                Acceptation des conditions d'utilisation :
            </Text>
            <Text style={styles.content}>
                En utilisant l'application Medspace, vous acceptez de vous conformer aux présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
            </Text>
            <Text style={styles.title}>
                Données utilisateur :
            </Text>
            <Text style={styles.content}>
                Les données que vous fournissez à l'application, telles que les informations de profil, les préférences et les paramètres, seront stockées localement sur votre appareil uniquement. Aucune donnée utilisateur ne sera transmise à des serveurs distants.
            </Text>
            <Text style={styles.title}>
                Confidentialité :
            </Text>
            <Text style={styles.content}>
                Nous respectons votre vie privée. Les données utilisateur ne seront pas collectées, partagées, ou vendues à des tiers. Nous nous engageons à maintenir la confidentialité de vos informations.
            </Text>
            <Text style={styles.title}>
                Sécurité des données :
            </Text>
            <Text style={styles.content}>
                Les données stockées localement sur votre appareil seront protégées par des mesures de sécurité appropriées pour éviter tout accès non autorisé. Cependant, veuillez noter que la sécurité de votre appareil relève de votre responsabilité.
            </Text>
            <Text style={styles.title}>
                Mises à jour :
            </Text>
            <Text style={styles.content}>
                L'application peut nécessiter des mises à jour occasionnelles. Il est de votre responsabilité de mettre à jour l'application pour bénéficier des dernières fonctionnalités et des améliorations de sécurité.
            </Text>
            <Text style={styles.title}>
                Utilisation appropriée :
            </Text>
            <Text style={styles.content}>
                Vous vous engagez à utiliser l'application de manière appropriée et légale. Tout comportement abusif, frauduleux ou contraire aux lois en vigueur peut entraîner la résiliation de votre accès à l'application.
            </Text>
            <Text style={styles.title}>
                Responsabilité :
            </Text>
            <Text style={styles.content}>
                L'utilisation de l'application est à vos propres risques. Nous ne pouvons être tenus responsables des dommages directs, indirects, spéciaux, consécutifs ou de toute perte de données résultant de l'utilisation de l'application.
            </Text>
            <Text style={styles.title}>
                Résiliation :
            </Text>
            <Text style={styles.content}>
                Nous nous réservons le droit de résilier votre accès à l'application à tout moment, sans préavis, en cas de non-respect des présentes conditions d'utilisation.
            </Text>
            <Text style={styles.title}>
                Modifications des conditions :
            </Text>
            <Text style={styles.content}>Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les utilisateurs seront informés des modifications via une notification dans l'application. Il est de votre responsabilité de consulter régulièrement les conditions d'utilisation mises à jour.</Text>

        </ScrollView>
        <View style={styles.rowContainer} ><Text style={{ color: "black" }}>Accepter les conditions d'utilisation</Text><CheckBox
            checked={isSelected}
            onPressIn={() => { setSelection(!isSelected) }}

        /></View>
        <View style={styles.fixing}><XLButton onPress={() => {
            if (isSelected && name.length > 0) {
                dataManager.resetSaveData().then(() => {
                    dataManager.setSaveData((data) =>
                    ({
                        ...data, patients: [{
                            name: name, prescriptions: [], earliesttime: 8, latesttime: 22,
                            actualUser: true, icone: require("@data/defaultIcon.json").icon
                        }]
                    })
                    )
                        .then(() =>
                            //dataManager.saveData(data);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Home" }]
                            })
                        )
                })
            } else {
                if (!(name.length > 0)) {
                    Alert.alert("ATTENTION", "Merci de rentrer un nom valide")
                } else if (!isSelected) {
                    Alert.alert("ATTENTION", "Merci d'accepter les conditions d'utilisation.")
                }


            }
        }}><Text style={styles.SUPtitle}>Valider</Text></XLButton></View>

    </View >)
}
export default FirstCo;
const styles = StyleSheet.create({
    SUPtitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: "white",
        padding: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 15,

    },
    Stitle: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    content: {
        padding: 10,
        fontSize: 10,
        textAlign: "justify",

    },
    rowContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    TextInput: {
        borderColor: "white",
        borderWidth: 1,
        borderStyle: "solid",
        color: "white",
        paddingLeft: 10,

    },
    bg: {
        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 40
    },
    scrollview: {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        height: 400,
        marginHorizontal: 30,
        padding: 10,
        marginTop: 10,
        paddingTop: 10
    },
    fixing: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    }

})
