import { View, Text } from 'react-native';
import style from './style';

export default function index({ children }: { children: React.ReactNode }) {
    return (
        <View style={style.container}>
            {children}
        </View>
    );
};