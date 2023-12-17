import { View, Text, ImageBackground } from 'react-native';
import style from './style';


export default function index({ children }: { children?: string | JSX.Element }) {
    console.log('children :>> ', children);
    return (
        <View style={style.container}>
            <ImageBackground
                source={require('./title.png')}  // Remplacez 'Test.jpg' par le chemin de votre image
                style={style.background}
            >
                {typeof children === 'string'
                    ? <Text style={style.title}>{children}</Text>
                    : children}
            </ImageBackground>
        </View>
    );
};
