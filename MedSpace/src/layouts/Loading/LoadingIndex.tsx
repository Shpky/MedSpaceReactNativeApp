import { Image, View, StyleSheet } from 'react-native';
import { useMemo, useEffect } from 'react';
import usePassword from '@hooks/usePassword';
import { RootStackParamList } from '@navigation/RootStackParamList';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type LoadingScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingIndex({ navigation }: LoadingScreenNavigationProp) {
    const { checkPassword, passwordContextIsLoad } = usePassword();

    const isLoading = useMemo(() => !passwordContextIsLoad, [passwordContextIsLoad]);

    useEffect(() => {
        if (isLoading) return;

        checkPassword(null)
            ? navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
            : navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
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
