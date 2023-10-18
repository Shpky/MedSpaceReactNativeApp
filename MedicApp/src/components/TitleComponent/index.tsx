import { View, Text } from 'react-native';
import style from './style';

export default function index({ title }: { title: string }) {
    return (
        <View style={style.container}>
            <Text>{title}</Text>
        </View>
    )
}