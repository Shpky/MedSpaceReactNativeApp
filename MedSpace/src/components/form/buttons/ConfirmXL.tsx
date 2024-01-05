import { StyleSheet, ImageBackground, Pressable, Text, View, StyleProp, ViewStyle } from 'react-native';

type ConfirmXLProps = {
    onPress: () => void,
    styleProp?: StyleProp<ViewStyle>,
    children?: React.ReactNode | string
}

export default function ConfirmXL({ onPress, styleProp, children }: ConfirmXLProps) {
    return <View style={[style.container, styleProp]} >
        <ImageBackground
            source={require('@backgrounds/green.png')}
            style={style.backgroundImage}
        >
            <Pressable
                style={style.button}
                onPress={onPress}>
                {typeof children === "string" ? <Text style={style.text}>{children}</Text> : children}
            </Pressable>
        </ImageBackground>
    </View >
}

const style = StyleSheet.create({
    container: {
        alignSelf: 'center',
        borderRadius: 30,
        width: '100%',
        overflow: 'hidden',
        resizeMode: 'cover',
        height: 50,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: "#76B36A",
        elevation: 10,
    },
    button: {
        textAlign: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    text: {
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
    }
}
);
