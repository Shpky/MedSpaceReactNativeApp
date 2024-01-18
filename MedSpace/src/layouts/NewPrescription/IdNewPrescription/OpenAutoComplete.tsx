import { Pressable, Modal, View } from "react-native"
import { useState } from "react"
import AutoComplete from "./AutoComplete/AutoComplete";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function OpenAutoComplete({ onChange }: { onChange: (n: string, m: string) => void }) {
    const [modalVisible, setModalVisible] = useState(false);
    return <>

        <Pressable style={{
            height: 30,
            width: 30,
            position: "absolute",
            right: 0,
            justifyContent: "center",
            zIndex: 10
        }} onPress={() => setModalVisible(true)} >
            <FontAwesomeIcon icon={faSearch} style={{ alignSelf: "center" }} size={20} color="white" />
        </Pressable>
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <AutoComplete onSelectDoctor={(n, m) => { setModalVisible(false); onChange(n, m) }} />
        </Modal>
    </>
}
