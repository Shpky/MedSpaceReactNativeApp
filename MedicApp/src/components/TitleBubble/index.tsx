import { View, Text } from 'react-native';
import style from './style';
import StackedWaveOrange from '../../assets/svg/StackedWaveOrange';

export default function index({ children }: { children: string }) {
    return (
        <View style={style.container}>
            {/* <StackedWaveOrange style={style.container}> */}
                <Text style={style.title}>{children}</Text>
                {/* </StackedWaveOrange> */}
        </View>
    );
};