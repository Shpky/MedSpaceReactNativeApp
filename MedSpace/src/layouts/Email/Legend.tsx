import { StyleSheet, Text, View } from "react-native"

/**
 * Component that displays legends for medication status.
 * 
 * @returns JSX.Element
 */

const EncadreLegend = () => {
    return (
        <View style={styles.encadreLegende}>

            <Text style={styles.fontblack}>Légendes</Text>
            <View style={styles.coleur}>
                <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "green", borderRadius: 5, }}></View>
                <Text style={styles.smallfont}>Tous les médicaments ont bien été pris par le patient.</Text>
            </View>
            <View style={styles.coleur}>
                <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "orange", borderRadius: 5, }}></View>
                <Text style={styles.smallfont}>Tous les médicaments n'ont pas été pris.</Text>
            </View>
            <View style={styles.coleur}>
                <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "red", borderRadius: 5, }}></View>
                <Text style={styles.smallfont}>Aucun des médicaments n'a été pris par le patient.</Text>
            </View>
            <View style={styles.coleur}>
                <View style={{ marginHorizontal: 5, height: 10, width: 10, backgroundColor: "grey", borderRadius: 5, }}></View>
                <Text style={styles.smallfont}>Non concerné par la durée du traitement</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    coleur: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    fontblack: {
        color: "black"
    },
    smallfont: {
        fontSize: 10,
        color: "black",

    },
    encadreLegende: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,
        margin: 5,
        borderStyle: 'dashed',
    },



})

export default EncadreLegend