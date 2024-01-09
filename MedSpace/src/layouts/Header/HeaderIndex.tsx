import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import useActualPatient from '@hooks/useActualPatient';


const HeaderIndex = ({ navigation, route }: NativeStackHeaderProps) => {

    const [actualPatient] = useActualPatient([route]);
    const isLogin = !["Login", "Profil", "Loading"].includes(route.name);
    const navigateToHome = () => {
        isLogin && navigation.navigate("Home");
    };

    const navigateToUserPage = () => {
        navigation.navigate("UserPage");
    };

    return (
        <View style={styles.container} key={actualPatient?.name}>
            <Pressable onPress={navigateToHome}>
                <Image style={styles.logo} source={require('./logo.png')} />
            </Pressable>
            <Pressable onPress={navigateToHome}>
                <Text style={styles.titleFont}>MEDSPACE</Text>
            </Pressable>
            {isLogin ? <Pressable onPress={navigateToUserPage}>
                {actualPatient?.icone && <Image style={styles.image} key={actualPatient?.name}
                    source={{ uri: actualPatient.icone }}
                />}
            </Pressable> : <View style={styles.noImage} />}
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
    },
    image: {
        width: 35,
        height: 35,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'black'
    },
    logo: {
        width: 35,
        height: 35,
        borderRadius: 100,
        resizeMode: 'contain',
    },
    noImage: {
        width: 35,
        height: 35,
    }
});

export default HeaderIndex; 
