import style from "../style"
import { Pressable, Modal, View } from "react-native"
import { useState } from "react"
import AutoComplete from "./AutoComplete/AutoComplete";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function OpenAutoComplete({ onChange }: { onChange: (m: MedicineInterface) => void }) {
    const [modalVisible, setModalVisible] = useState(false);
    return <>

        <Pressable style={{
            height: 50,
            width: 70,
            position: "absolute",
            right: 0,
            justifyContent: "center",
            zIndex: 10
        }} onPress={() => setModalVisible(true)} >
            <FontAwesomeIcon icon={faSearch} style={{ alignSelf: "center" }} size={30} color="white" />
        </Pressable>
        <Modal
            animationType="slide"
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
        >
            <AutoComplete onSelectMedicine={(m: MedicineInterface) => { setModalVisible(false); onChange(m) }} />
        </Modal>
    </>
}
