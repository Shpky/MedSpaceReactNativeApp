import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeLowVision } from '@fortawesome/free-solid-svg-icons';
export default function Toggle({ is = true, onToggle }: { is?: boolean, onToggle: (isNotifOn: Boolean) => void }) {
    const [toggleState, setToggleState] = useState(is);

    const toggleSwitch = () => {
        setToggleState((old) => !old);
        onToggle(toggleState);
    }
    return <TouchableOpacity style={styles.toggle} onPress={toggleSwitch}>
        {
            toggleState ?
                <FontAwesomeIcon icon={faEyeLowVision} size={24} color="black" />
                :
                <FontAwesomeIcon icon={faEye} size={24} color="black" />
        }
    </TouchableOpacity>

}
