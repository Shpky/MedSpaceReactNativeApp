import { View } from 'react-native';
import style from './style';

export default function ContainerIndex({ children }: { children: React.ReactNode }) {
    return (
        <View style={style.container}>
            {children}
        </View>
    );
};
