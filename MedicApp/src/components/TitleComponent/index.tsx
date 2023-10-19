import { View, Text } from 'react-native';
import style from './style';
import StackedWaveOrange from '../../assets/svg/StackedWaveOrange';
export default function index({ title }: { title: string }) {

    return (
        <View style={style.container}>
            {/* <StackedWaveOrange /> */}
            <Text style={style.title}>{title}</Text>
        </View>
    );
};