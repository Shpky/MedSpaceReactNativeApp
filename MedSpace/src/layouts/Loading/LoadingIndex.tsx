import { Image, View, StyleSheet } from 'react-native';
import { useMemo, useEffect } from 'react';
import usePassword from '@hooks/usePassword';
import { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import dataManager from '@features/dataManager';
import useDoctors from '@hooks/useDoctors';

type LoadingScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingIndex({ navigation }: LoadingScreenNavigationProp) {
    const { checkPassword, passwordContextIsLoad } = usePassword();
    const { doctorContextIsLoad } = useDoctors();

    const isLoading = useMemo(() => !(passwordContextIsLoad && doctorContextIsLoad),
        [passwordContextIsLoad, doctorContextIsLoad]);

    useEffect(() => {
        if (isLoading) return;
        dataManager.isExisting().then((isExisting) => {
            isExisting
                ? navigation.reset({
                    index: 0,
                    routes: [{ name: checkPassword(null) ? 'Profil' : 'Login' }],
                })
                : navigation.reset({
                    index: 0,
                    routes: [{ name: 'CreateAccount' }],
                });
        });

    }, [isLoading]);

    return <View style={styles.background}>
        <Image style={styles.logo} source={require("./logo.png")} />
    </View>
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "red",
        width: "100%",
        height: "100%",
        justifyContent: "center",

    },
    logo: {
        width: 75,
        height: 75,
        borderRadius: 100,
        alignSelf: "center",
    },
});
