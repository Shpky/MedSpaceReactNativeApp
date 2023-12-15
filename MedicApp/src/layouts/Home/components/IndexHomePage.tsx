import { Text, View, StyleSheet, Pressable, ScrollView, ImageBackground } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faPills } from '@fortawesome/free-solid-svg-icons/faPills'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo'
import IndexReport from '@layouts/Report/testforCSV';
import { useNavigation } from '@react-navigation/native';
const HomePageBody = () => {
    const iconSize = 80;
    const navigation = useNavigation();
    const navigateToDetails = () => {
        //@ts-ignore
        navigation.navigate('Treatment');
    };
    const navigateToReport = () => {
        //@ts-ignore
        navigation.navigate('RepportPage');
    };
    const navigateToCalendar = () => {
        //@ts-ignore
        navigation.navigate('CalendarPage');
    }
    return (

        <ScrollView style={styles.body}>

            <Pressable style={styles.container} onPress={navigateToDetails} >
                <ImageBackground
                    source={require('./img/TraitementsIMG.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={styles.backgroundImage}
                >

                    <View style={styles.topLeft}>

                        <Text style={styles.fontJomhuria}>Traitements</Text>


                    </View>
                    <View style={styles.bottomRight}>
                        <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faPills} />
                    </View>
                </ImageBackground>
            </Pressable>
            <Pressable style={styles.container} onPress={navigateToReport}>
                <ImageBackground
                    source={require('./img/rapportIMG.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={styles.backgroundImage}
                >
                    <View style={styles.topLeft}>
                        <Text style={styles.fontJomhuria}>Rapport</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faFile} />
                    </View>
                </ImageBackground>
            </Pressable>
            <Pressable style={styles.container} onPress={navigateToCalendar}>
                <ImageBackground
                    source={require('./img/calendrierIMG.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={styles.backgroundImage}
                >
                    <View style={styles.topLeft}>
                        <Text style={styles.fontJomhuria}>Calendrier</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faCalendar} />
                    </View>
                </ImageBackground>
            </Pressable>
            <Pressable style={styles.container}>
                <ImageBackground
                    source={require('./img/effetsecondaireIMG.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                    style={styles.backgroundImage}
                >
                    <View style={styles.topLeft}>
                        <Text style={styles.fontJomhuria}>Effet secondaire</Text>
                    </View>
                    <View style={styles.bottomRight}>
                        <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faCircleInfo} />
                    </View>
                </ImageBackground>
            </Pressable>

        </ScrollView >

    )
}

const styles = StyleSheet.create({

    container: {

        backgroundColor: 'red',
        height: 200,


        borderRadius: 30,


        marginTop: 20,


    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30, // Ajustez la valeur selon vos besoins
        overflow: 'hidden',
    },
    body: {
        flex: 1,

        marginLeft: 20,
        marginRight: 20,


    },
    fontJomhuria: {
        marginTop: -10,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 50,
        color: 'white',
        paddingLeft: 20,
    },
    iconMenu: {
        color: 'white',
    },

    debug: {
        marginTop: -10,
        borderWidth: 0,
        borderColor: 'black',
    },
    topLeft: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',


    },
    bottomRight: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',

        paddingRight: 15,
        paddingBottom: 10,
    },


})
export default HomePageBody;