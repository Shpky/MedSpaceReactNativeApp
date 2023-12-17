import { Text, View } from "react-native";

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


    return <>
        <Text>{medicine.name}</Text>
        <View>
            <Text>{[dosageDescription, frequencyDescription].join(" ")}</Text>
        </View>
    </>
}
