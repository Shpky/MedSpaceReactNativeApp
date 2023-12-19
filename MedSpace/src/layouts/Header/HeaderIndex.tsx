import React from 'react';
import { Pressable, View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/routers';
import useActualPatient from '@hooks/useActualPatient';

type HeaderIndexProps = NativeStackNavigationProp<ParamListBase, string, undefined>;

const HeaderIndex = ({ navigation }: { navigation: HeaderIndexProps }) => {
    const [actualPatient] = useActualPatient();

    const navigateToHome = () => {
        navigation.navigate("Home");
    };
    const navigateToUserPage = () => {
        navigation.navigate("UserPage");
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={navigateToHome}>
                <Image style={styles.logo} source={require('./logo.png')} />
            </Pressable>
            <Pressable onPress={navigateToHome}>
                <Text style={styles.titleFont}>MEDSPACE</Text>
            </Pressable>
            <Pressable onPress={navigateToUserPage}>
                <Image style={styles.circle}
                source={{ uri: actualPatient?.icone }}
                />
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

export default HeaderIndex; 
