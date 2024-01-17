import { ImageBackground, Text, View, StyleSheet } from "react-native"

/**
 * Renders the title component.
 * @returns The rendered title component.
 */
export const Title = () => {
    return (
        <View style={{ marginVertical: 20 }}>
            <ImageBackground
                source={require("./img/title.png")}
                style={styles.bg}>
                <Text style={styles.SUPtitle}>Créez votre profile</Text>
            </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    bg: {
        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 40
    },
    SUPtitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: "white",
        padding: 10,
    },

})