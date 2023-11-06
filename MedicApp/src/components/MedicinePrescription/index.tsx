import { Text, TextInput, View, TextProps, StyleProp, TextStyle, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import dStyle from './style';
import Picker from '@components/Picker';
import { useState, useEffect } from 'react';
import { CheckBox } from '@rneui/themed';

interface InputProps extends TextProps {
    color: string,
}
export default function index({ medicine, Container, style, modify = true, onChange }: {
    medicine: MedicineInterface, Container: ({ children }: {
        children: React.ReactNode;
    }) => React.JSX.Element,
    style: { textInput: TextProps, input: InputProps, }, modify?: boolean, onChange?: (newMedicine: MedicineInterface) => void
}) {
    const [frequencyMode, setFrequencyMode] = useState<"routine" | "daily" | "weekly">("routine")

    useEffect(() => {
        onChange && onChange(medicine)
    }, [medicine])

    const makeModify = (styles: StyleProp<TextStyle>,
        placeholder: string, value: string, onChangeHandler?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void) => {
        return modify ?
            <TextInput style={styles} placeholder={placeholder} placeholderTextColor={style.input.color}
                onChange={onChangeHandler}
            />
            : <Text style={styles}>{value}</Text>
    }

    return <Container>
        <Text style={style.textInput}>Nom du médicament</Text>
        {makeModify([style.input, dStyle.full], "Nom du médicament", medicine.name,
            (e) => medicine.name = e.nativeEvent.text
        )}
        <Text style={style.textInput}>Laboratoire</Text>
        {makeModify([style.input, dStyle.full], "Nom du laboratoire", medicine.company,
            (e) => medicine.company = e.nativeEvent.text
        )}
        <Text style={style.textInput}>Dose</Text>
        <View style={dStyle.halfContainer}>
            {modify ?
                <><TextInput style={[style.input, dStyle.half]} placeholder={"Dose"} placeholderTextColor={style.input.color}
                    onChange={(e) => medicine.dosage = parseInt(e.nativeEvent.text)} />
                    <TextInput style={[style.input, dStyle.half]} placeholder={"Unité"} placeholderTextColor={style.input.color}
                        onChange={(e) => medicine.dosageType = e.nativeEvent.text} />
                </> :
                <Text style={[style.input, dStyle.full]}>{medicine.dosage.toString() + medicine.dosageType}</Text>
            }
        </View>
        <View style={dStyle.textPickercontainer}>
            <Text style={style.textInput}>Fréquence</Text>
            {modify &&
                <Picker items={[{ label: "Repas", value: "routine" }, { label: "Quotidien", value: "daily" }, { label: "Hebdomadaire", value: "weekly" }]}
                    default_value='routine'
                    onChange={(e) => {
                        setFrequencyMode(e);
                        switch (e) {
                            case "routine":
                                medicine.frequency = { "morning": false, "noon": false, "evening": false }
                                break;
                            case "daily":
                                medicine.frequency = { "startTime": { "hour": 0, "minute": 0 }, "endTime": { "hour": 0, "minute": 0 }, "count": 0 }
                                break;
                            case "weekly":
                                medicine.frequency = { "startDay": new Date(), "days": 0 }
                                break;
                        }
                    }}
                />
            }
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
        }

    </Container>
}
