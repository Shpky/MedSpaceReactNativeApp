import { useState } from "react";
import { View, Text, StyleProp, TextStyle, TextInput } from "react-native";
import style from "../style";
import Picker from "@components/Picker";
import { CheckBox } from '@rneui/themed';



export default function Frequency({ frequency, setFrequency }:
    { frequency: MedicineInterface["frequency"], setFrequency: (newFrequency: MedicineInterface["frequency"]) => void }
) {
    const [frequencyMode, setFrequencyMode] = useState<"routine" | "daily" | "weekly">(
        "morning" in frequency ? "routine" : "count" in frequency ? "daily" : "weekly");

    return <><View style={style.textPickercontainer}>
        <Text style={style.textInput}>Fréquence</Text>
        <Picker items={[{ label: "Repas", value: "routine" }, { label: "Quotidien", value: "daily" }, { label: "Hebdomadaire", value: "weekly" }]}
            default_value='routine'
            onChange={(e) => {
                setFrequencyMode(e);
                switch (e) {
                    case "routine":
                        setFrequency({ "morning": false, "noon": false, "evening": false })
                        break;
                    case "daily":
                        setFrequency({ "count": 0 })
                        break;
                    case "weekly":
                        setFrequency({ "delay": 0 })
                        break;
                }
            }}
        />

    </View>
        {
            frequencyMode === "routine" &&
            <>
                <CheckBox
                    checked={"morning" in frequency && frequency.morning}
                    onPressIn={() => {
                        if ("morning" in frequency)
                            setFrequency({ ...frequency, morning: !frequency.morning })
                    }
                    }
                    containerStyle={[style.input as StyleProp<TextStyle>,
                        "morning" in frequency && frequency.morning
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
                    checked={"noon" in frequency && frequency.noon}
                    onPressIn={() => {
                        if ("noon" in frequency)
                            setFrequency({ ...frequency, noon: !frequency.noon })
                    }
                    }
                    containerStyle={style.input as StyleProp<TextStyle>}

                    title={"Midi"}
                />
                <CheckBox
                    checked={"evening" in frequency && frequency.evening}
                    onPressIn={() => {
                        if ("evening" in frequency)
                            setFrequency({ ...frequency, evening: !frequency.evening })
                    }
                    }
                    containerStyle={style.input as StyleProp<TextStyle>}

                    title={"Soir"}
                />
            </>
        } {
            frequencyMode === "daily" &&
            <View style={[{ flex: 1, flexDirection: "row" }, style.input, style.full]}>
                <TextInput keyboardType='numeric' maxLength={1} onChange={(e) =>
                    setFrequency({ ...frequency, count: parseInt(e.nativeEvent.text) })
                }>0</TextInput>
                <Text style={[style.textInputComment, { marginLeft: -12, }]}>/ jour</Text>
            </View>
        }
        {
            frequencyMode === "weekly" &&
            <View style={[{ flex: 1, flexDirection: "row" }, style.input, style.full]}>
                <Text style={style.textInputComment}>1 fois tous les </Text>
                <TextInput keyboardType='numeric' maxLength={1} onChange={(e) =>
                    setFrequency({ ...frequency, delay: parseInt(e.nativeEvent.text) })
                }>0</TextInput>
                <Text style={[style.textInputComment, { marginLeft: -12, }]}>jours</Text>
            </View>
        }
    </>
}
