import style from "@components/TitleBubble/style";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

/**
 * Render an on/off button that can be activated. It is used in the rest of the code to validate whether a medication is taken or not..
 * @param {Object} props - The component props.
 * @param {boolean} props.is - The initial state of the button.
 * @param {Function} props.onToggle - The function to be called when the button is toggled.
 * @returns {JSX.Element} The rendered on/off button component.
 */

export const OnOffButtonTaken = ({ is, onToggle }: { is: boolean, onToggle: () => void }) => {
    //const [isTake, setIsTake] = useState(false);

    const [isTake, setIsTake] = useState(is);
    const toggleSwitchtake = () => {

        setIsTake((isTake) => !isTake);

        onToggle()

    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.button} onPress={toggleSwitchtake}>

                <View style={[styles.toggleSwitchMED, { backgroundColor: isTake ? 'green' : 'red' }, { borderColor: isTake ? 'white' : "", borderWidth: isTake ? 1 : 0 }]} ><Text style={[{ color: 'white' }]}>{isTake ? 'MEDICAMENT PRIS' : 'VALIDER LA PRISE'}</Text></View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    toggleSwitchMED: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center', // Add this line to center vertically

    },
    button: {
        flexDirection: 'row',

    },
    container: {

        justifyContent: 'center',
        alignItems: 'center',

    },

})