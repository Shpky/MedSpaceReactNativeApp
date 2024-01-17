
import React from 'react';
import {  View, StyleSheet,  } from "react-native";
import { NavigationProp } from '@react-navigation/native';
import { Rules } from "./Rules";
import { RootStackParamList } from '@navigation/RootStackParamList';
import { ValidatedButton } from "./ValidateButton";
import { Title } from "./Title";
import { SendButton } from './SendButton';
import { FormName } from './FormName';
/**
 * Renders the first connection index screen.
 * 
 * @param navigation - The navigation prop for navigating between screens.
 */
const FirstConnectionIndex = ({ navigation }: { navigation: NavigationProp<RootStackParamList> }) => {
    const [name, onChangeName] = React.useState('');
    const [isSelected, setSelection] = React.useState(false);
    return (<View style={{ width: "95%", alignContent: "center", alignSelf: "center" }} >
        <Title />


        <FormName onChangeName={onChangeName} />

        <Rules />

        <ValidatedButton isSelected={isSelected} setSelection={setSelection} />




        <SendButton name={name} isSelected={isSelected} navigation={navigation} />

    </View >)
}
export default FirstConnectionIndex;
const styles = StyleSheet.create({
    SUPtitle: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: "white",
        padding: 10,
    },





    bg: {
        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
        padding: 10,
        paddingHorizontal: 40
    },
    scrollview: {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        height: 400,
        marginHorizontal: 30,
        padding: 10,
        marginTop: 10,
        paddingTop: 10
    },
    fixing: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    }

})
