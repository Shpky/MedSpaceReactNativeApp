import { GestureResponderEvent, Pressable, Text } from 'react-native';
import style from './style';
import StackedWaveOrange from '../../../assets/svg/StackedWaveOrange';

export default function index({ children, onPress }: { children: string, onPress?: ((event: GestureResponderEvent) => void) }) {
    return (
        <Pressable style={style.container} onPress={onPress}>
            <Text style={style.title}>{children}</Text>
        </Pressable>
    );
};