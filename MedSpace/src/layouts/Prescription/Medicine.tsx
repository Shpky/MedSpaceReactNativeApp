import { ImageBackground, Text, View, StyleSheet } from "react-native";
import Toggle from "./Toggle";

export default function Medicine({ medicine, onToggle }: { medicine: MedicineInterface, onToggle: (isNotifOn: Boolean) => void }) {


    const dosageDescription = medicine.dosage
        ? medicine.dosage + " " + (medicine.dosageType || "médicament" + (medicine.dosage > 1 ? "s" : ""))
        : "Un médicament"

    const quantityDay = "morning" in medicine.frequency
        ? (+medicine.frequency.morning + +medicine.frequency.noon + +medicine.frequency.evening)
        : "count" in medicine.frequency
            ? medicine.frequency.count
            : medicine.frequency.delay

    const frequencyDescription = "delay" in medicine.frequency
        ? "tous les " + quantityDay + " jours"
        : quantityDay + " fois par jour"


    return (<View style={{ width: "95%", alignContent: "center", alignSelf: "center" }}>
        <ImageBackground
            source={require("./effetsecondaireIMG.png")}
            style={styles.container}
        >
            <Text style={styles.textWB}>{medicine.name}</Text>
            <View>
                <Text style={styles.textW}>•{[dosageDescription, frequencyDescription].join(" ")}</Text>
                {/* <Toggle onToggle={()=> {}}/> */}
            </View>
        </ImageBackground>
    </View>)
}

const styles = StyleSheet.create({

    container: {

        padding: 10,
        paddingLeft: 20,
        resizeMode: 'cover',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,

    },
    textWB: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    textW: {
        color: 'white',
        fontSize: 15,

    }
})
