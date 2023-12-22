import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: "15%",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: "white",
    },
    input: {
        color: "black",
        width: "80%",
    },
    toggle: {
        width: 50,
        height: 50,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    }
});
