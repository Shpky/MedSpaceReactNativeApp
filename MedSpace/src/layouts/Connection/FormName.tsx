
import { View, ImageBackground, Text, TextInput, StyleSheet } from "react-native"

type BuilderProps = {
    onChangeName: React.Dispatch<React.SetStateAction<string>>,
}

/**
 * Renders a form component for entering a name.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onChangeName - The callback function to handle name changes.
 * @returns {JSX.Element} The rendered form component.
 */
export const FormName = ({ onChangeName }: BuilderProps): JSX.Element => {
    return (<View style={{ alignSelf: 'center' }}>
        <ImageBackground
            source={require("./img/picker.png")}
            style={styles.bg}>
            <Text style={styles.Stitle}>Rentrez vos informations</Text>
            <TextInput
                style={styles.TextInput}
                placeholder="Votre nom prénom"
                placeholderTextColor={"white"}

                onChangeText={onChangeName}
            ></TextInput>
        </ImageBackground>
    </View>)
}

const styles = StyleSheet.create({
    TextInput: {
        borderColor: "white",
        borderWidth: 1,
        borderStyle: "solid",
        color: "white",
        paddingLeft: 10,

    },
    Stitle: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },
    bg: {
        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 40
    },
})
