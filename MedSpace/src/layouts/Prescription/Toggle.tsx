import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';

export default function Toggle({ is=true, onToggle }: { is?: boolean, onToggle: (isNotifOn: Boolean) => void }) {
    const [toggleState, setToggleState] = useState(is);

    const toggleSwitch = () => {
        setToggleState((old) => !old);
        onToggle(toggleState);
    };

    return <TouchableOpacity style={styles.button} onPress={toggleSwitch}>
        <View style={[styles.toggleSwitch, { backgroundColor: toggleState ? 'green' : 'red' }]} >
            <Text style={[{ color: 'white' }]}>{toggleState ? 'OUI' : 'NON'}</Text>
        </View>
    </TouchableOpacity>

}
