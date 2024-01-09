import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    flexbox: {
        display: "flex",
        flexDirection: "row",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        height: 30,
        width: "40%",
        justifyContent: "space-between",
        paddingLeft: 5
    },
    modal: {
        position: "absolute",
        backgroundColor: "rgba(128, 128, 128, 0.8)",
        top: 30,
        right: 0,
        width: "40%",
        flex: 1,
        flexDirection: "column",
        paddingTop: 10,
        zIndex: 1,
    },
    modalItems: {
        alignSelf: "center",
        width: "70%",
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
    },
    modalItemsText: {
        fontSize: 20,
        fontFamily: "Jomhuria-Regular",
        fontWeight: "200",
        color: "black",
        textAlign: "center",
    },
    modalItemsTextHover: {
        backgroundColor: "blue",
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        marginLeft: 5,
        marginTop: "auto",
        marginBottom: 4,
    },
    text: {
        fontWeight: "400",
        fontFamily: "Jomhuria-Regular",
        fontSize: 24,
        fontStyle: "normal",
        color: "#fff",
    },
});
