import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    item: {
        backgroundColor: "grey",
        width: "25%",
        height: 120,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
    },
    itemImage: {
        width: 75,
        height: 75,
        borderRadius: 20,
        alignSelf: "center",
    },
    itemText: {
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
});
