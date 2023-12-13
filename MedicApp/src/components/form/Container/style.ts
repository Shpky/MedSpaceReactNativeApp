import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: "#538EFF",
        borderRadius: 10,
        width: "90%",
        marginBottom: 20,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10, // Ajustez la valeur selon vos besoins
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    viewPadding: {
        padding: 15,
    }
});
