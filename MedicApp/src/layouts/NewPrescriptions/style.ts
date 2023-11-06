import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    textInput: {
        fontWeight: "400",
        fontFamily: "Jomhuria-Regular",
        fontSize: 24,
        fontStyle: "normal",
        color: "#fff",
    },
    input: {
        borderRadius: 4,
        backgroundColor: "#fff",
        paddingLeft: 9,
        color: "#000",
    },
    full: {
        width: "100%",
    },
    half: {
        width: "48%",
    },
    halfContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textPickercontainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    textInputComment: {
        textAlignVertical: "center",
        color: "#000",
        fontSize: 16,
    }
});
