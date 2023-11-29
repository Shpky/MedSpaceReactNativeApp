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
        minHeight: 50,
        textAlignVertical: "center",
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
    },
    inputInline: {
        textDecorationLine: "underline",
        color: "#000",

    },
    addMedicineButtonContainer: {
        alignSelf: 'center',
        backgroundColor: "#BFD0BC",
        borderRadius: 10,
        width: "90%",
        marginBottom: 20,
    },
    addMedicineButtonText: {
        fontWeight: "400",
        fontFamily: "Jomhuria-Regular",
        fontSize: 40,
        fontStyle: "normal",
        color: "#fff",
        textAlign: "center",

    },
    deleteMedicineButtonContainer: {
        marginTop: 10,
        alignSelf: 'center',
        backgroundColor: "#B7C9B4",
        borderRadius: 10,
        width: "90%",
    },
    deleteMedicineButtonText: {
        fontWeight: "300",
        fontFamily: "Jomhuria-Regular",
        fontSize: 30,
        fontStyle: "normal",
        color: "#fff",
        textAlign: "center",
    },
});
