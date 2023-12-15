import { View, ImageBackground } from 'react-native';
import style from './style';

export default function ContainerIndex({ children }: { children: React.ReactNode }) {
    return (
        <View style={style.container}>
            <ImageBackground source={require('./img/background.png')} style={style.backgroundImage}>
                <View style={style.viewPadding}>
                    {children}
                </View>
            </ImageBackground>
        </View>
    );
};
