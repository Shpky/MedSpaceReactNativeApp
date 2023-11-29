import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { useNavigation } from '@react-navigation/native';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
const HeaderContainer = () => {


    const navigation = useNavigation();
    const navigateToHome = () => {
        //@ts-ignore
        navigation.navigate("Home");
    };
    const navigateToUserPage = () => {
        //@ts-ignore
        navigation.navigate("UserPage");
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={navigateToHome}>
                <Image style={styles.logo} source={require('./img/logo.png')} />
            </Pressable>
            <Pressable onPress={navigateToHome}>
                <Text style={styles.titleFont}>MEDSPACE</Text>
            </Pressable>
            <Pressable onPress={navigateToUserPage}>
                <View style={styles.circle}>
                    <FontAwesomeIcon icon={faUser} color='white' />
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: 'white',
    },
    titleFont: {
        fontFamily: 'Jua-Regular',
        fontSize: 20,
        color: 'black',
        marginLeft: 8,
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default HeaderContainer;
