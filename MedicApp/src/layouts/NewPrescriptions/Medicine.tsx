import { Text, TextInput, View, StyleProp, TextStyle } from 'react-native';
import style from './style';
import Picker from '@components/Picker';
import { useState, useEffect } from 'react';
import { CheckBox } from '@rneui/themed';
import Container from '@containers/FormBubble';
export default function index({ medicine, onChange }: {
    medicine: MedicineInterface, onChange?: (newMedicine: MedicineInterface) => void
}) {
    const [frequencyMode, setFrequencyMode] = useState<"routine" | "daily" | "weekly">("routine")

    useEffect(() => {
        onChange && onChange(medicine)
    }, [medicine])


    return <Container>
        <Text style={style.textInput}>Nom du médicament</Text>
        <TextInput style={[style.input, style.full]} placeholder="Nom du médicament" placeholderTextColor={style.input.color}
            onChange={(e) => medicine.name = e.nativeEvent.text} />
        <Text style={style.textInput}>Laboratoire</Text>
        <TextInput style={[style.input, style.full]} placeholder="Nom du laboratoire" placeholderTextColor={style.input.color}
            onChange={(e) => medicine.company = e.nativeEvent.text} />
        <Text style={style.textInput}>Dose</Text>
        <View style={style.halfContainer}>
            <TextInput style={[style.input, style.half]} placeholder={"Dose"} placeholderTextColor={style.input.color}
                onChange={(e) => medicine.dosage = parseInt(e.nativeEvent.text)} />
            <TextInput style={[style.input, style.half]} placeholder={"Unité"} placeholderTextColor={style.input.color}
                onChange={(e) => medicine.dosageType = e.nativeEvent.text} />


        </View>
        <View style={style.textPickercontainer}>
            <Text style={style.textInput}>Fréquence</Text>
            <Picker items={[{ label: "Repas", value: "routine" }, { label: "Quotidien", value: "daily" }, { label: "Hebdomadaire", value: "weekly" }]}
                default_value='routine'
                onChange={(e) => {
                    setFrequencyMode(e);
                    switch (e) {
                        case "routine":
                            medicine.frequency = { "morning": false, "noon": false, "evening": false }
                            break;
                        case "daily":
                            medicine.frequency = { "count": 0 }
                            break;
                        case "weekly":
                            medicine.frequency = { "delay": 0 }
                            break;
                    }
                }}
            />

        </View>
        {"morning" in medicine.frequency &&
            <>
                <CheckBox
                    checked={medicine.frequency.morning}
                    onPressIn={() => {
                        if ("morning" in medicine.frequency)
                            medicine.frequency.morning = !medicine.frequency.morning
                    }
                    }
                    containerStyle={[style.input as StyleProp<TextStyle>, medicine.frequency.morning
                        && {
                        shadowColor: 'red',
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 1,
                        shadowRadius: 10,
                    }
                    ]}

                    title={"Matin"}
                />
                <CheckBox
                    checked={medicine.frequency.noon}
                    onPressIn={() => {
                        if ("noon" in medicine.frequency)
                            medicine.frequency.noon = !medicine.frequency.noon
                    }
                    }
                    containerStyle={style.input as StyleProp<TextStyle>}

                    title={"Midi"}
                />
                <CheckBox
                    checked={medicine.frequency.evening}
                    onPressIn={() => {
                        if ("evening" in medicine.frequency)
                            medicine.frequency.evening = !medicine.frequency.evening
                    }
                    }
                    containerStyle={style.input as StyleProp<TextStyle>}

                    title={"Soir"}
                />
            </>
        }{
            "count" in medicine.frequency &&
            <View style={[{ flex: 1, flexDirection: "row" }, style.input, style.full]}>
                <TextInput keyboardType='numeric' maxLength={1}>0</TextInput>
                <Text style={[style.textInputComment, { marginLeft: -12, }]}>/ jour</Text>
            </View>
        }
        {
            "delay" in medicine.frequency &&
            <View style={[{ flex: 1, flexDirection: "row" }, style.input, style.full]}>
                <Text style={style.textInputComment}>1 fois tous les </Text>
                <TextInput keyboardType='numeric' maxLength={1}>0</TextInput>
                <Text style={[style.textInputComment, { marginLeft: -12, }]}>jours</Text>
            </View>
        }

    </Container >
}
