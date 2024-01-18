import { Text, View, StyleSheet } from "react-native"
import { CheckBox } from "@rneui/themed"

type BuilderProps = {
    isSelected: boolean,
    setSelection: React.Dispatch<React.SetStateAction<boolean>>,
}

/**
 * Renders a button component with a checkbox to accept the conditions of use.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.setSelection - A function to set the selection state.
 * @param {boolean} props.isSelected - The current selection state.
 * @returns {JSX.Element} The rendered button component.
 */
export const ValidatedButton = ({ setSelection, isSelected }: BuilderProps): JSX.Element => {

    return (
        <View style={styles.rowContainer} ><Text style={{ color: "black" }}>Accepter les conditions d'utilisation</Text>
            <CheckBox
                checked={isSelected}
                onPressIn={() => { setSelection(!isSelected) }} />
        </View>
    )
}

const styles = StyleSheet.create({
    rowContainer: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },

})
