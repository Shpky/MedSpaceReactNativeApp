import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faPills } from '@fortawesome/free-solid-svg-icons/faPills'
import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo'
import { useNavigation } from '@react-navigation/native';
const HomePageBody = () => {
    const iconSize = 80;
    const navigation = useNavigation();
    const navigateToDetails = () => {
        //@ts-ignore
        navigation.navigate('Treatment');
    };
    return (

        <ScrollView style={[styles.body, { backgroundColor: 'white' }]}>

            <Pressable style={styles.container} onPress={navigateToDetails} >
                <View style={styles.topLeft}>
                    <Text style={styles.fontJomhuria}>Traitements</Text>
                </View>
                <View style={styles.bottomRight}>
                    <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faPills} />
                </View>
            </Pressable>
            <Pressable style={styles.container}>
                <View style={styles.topLeft}>
                    <Text style={styles.fontJomhuria}>Rapport</Text>
                </View>
                <View style={styles.bottomRight}>
                    <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faFile} />
                </View>
            </Pressable>
            <Pressable style={styles.container}>
                <View style={styles.topLeft}>
                    <Text style={styles.fontJomhuria}>Calendrier</Text>
                </View>
                <View style={styles.bottomRight}>
                    <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faCalendar} />
                </View>
            </Pressable>
            <Pressable style={styles.container}>
                <View style={styles.topLeft}>
                    <Text style={styles.fontJomhuria}>Effet secondaire</Text>
                </View>
                <View style={styles.bottomRight}>
                    <FontAwesomeIcon style={styles.iconMenu} size={iconSize} icon={faCircleInfo} />
                </View>
            </Pressable>

        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'red',
        height: 200,

        borderRadius: 30,
        borderBlockColor: 'black',
        borderWidth: 0,
        marginBottom: 10,


    },
    body: {
        flex: 1,

        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',

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
        justifyContent: 'flex-start', // Align at the top
        alignItems: 'flex-start', // Align on the left


    },
    bottomRight: {
        flex: 1,
        justifyContent: 'flex-end', // Align at the bottom
        alignItems: 'flex-end', // Align on the right

        paddingRight: 15,
        paddingBottom: 10,
    },


})
export default HomePageBody;