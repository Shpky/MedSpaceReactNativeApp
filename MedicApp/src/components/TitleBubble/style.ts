import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: "#ff7f00",
        borderRadius: 30,
        width: "90%",
        marginVertical: 20
    },
    title: {
        fontWeight: "400",
        fontFamily: "Jomhuria-Regular",
        fontSize: 40,
        fontStyle: "normal",
        color: "#fff",
        textAlign: "center",

    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30, // Ajustez la valeur selon vos besoins
        overflow: 'hidden',
    },
});
