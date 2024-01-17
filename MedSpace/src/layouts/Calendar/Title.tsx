import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
type BuilderProps = {
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>,
    isOn: boolean,

}

/**
 * Renders an on/off button component.
 * @param {Object} props - The component props.
 * @param {Function} props.setIsOn - The function to set the on/off state.
 * @param {boolean} props.isOn - The current on/off state.
 * @returns {JSX.Element} The rendered on/off button component.
 */

const OnOffButton = ({ setIsOn, isOn }: BuilderProps) => {


    const toggleSwitch = () => {

        setIsOn((prevIsOn) => !prevIsOn);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button} onPress={toggleSwitch}>

                <View style={[styles.toggleSwitch, { backgroundColor: isOn ? 'green' : 'red' }]} ><Text style={[{ color: 'white' }]}>{isOn ? 'ON' : 'OFF'}</Text></View>
            </TouchableOpacity>
        </View>
    );
};

/**
 * Renders the title component for the calendar layout with a button to activate or not a week visualisation.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.setIsOn - The function to set the value of isOn.
 * @param {boolean} props.isOn - The current value of isOn.
 * @returns {JSX.Element} The rendered title component.
 */
export const Title = ({ setIsOn, isOn }: BuilderProps) => {
    return (
        <View style={[{ width: '100%', justifyContent: 'center', alignContent: 'center', alignItems: "center", alignSelf: "center" }]}>
            <ImageBackground style={styles.Titlecontainer} source={require('./img/yellowbg.png')}  >
                <Text style={styles.titleW}>Calendrier</Text>
                <View style={styles.rowContainer}><Text style={[styles.titlesmallW, { marginHorizontal: 10 }]}>Mode d'affichage par semaine</Text><OnOffButton setIsOn={setIsOn} isOn={isOn} /></View>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    Titlecontainer: {
        alignContent: 'center',
        justifyContent: 'center',
        width: 350,
        resizeMode: 'cover',
        paddingLeft: 10,
        paddingVertical: 10,
        overflow: 'hidden',
        borderRadius: 30,

    },
    titleW: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    container: {

        justifyContent: 'center',
        alignItems: 'center',

    },
    button: {
        flexDirection: 'row',

    },
    titlesmallW: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 15,
        color: 'white',

        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        alignContent: 'center',
        alignItems: 'center',

    },
    toggleSwitch: {
        width: 50,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center', // Add this line to center vertically
    },
})