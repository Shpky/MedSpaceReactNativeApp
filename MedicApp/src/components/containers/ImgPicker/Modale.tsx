import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';

const ModalImgPicker = () => {
    const [image, setImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);




    const cameraHandler = () => {
        const options: CameraOptions = {
            mediaType: 'photo',
        }
        launchCamera(options, (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string")
                setImage(response.assets[0].uri);
        })
    };

    const libraryHandler = () => {
        setModalVisible(!modalVisible)
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
        }
        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string")
                setImage(response.assets[0].uri);

        })

        //console.log(result(i))


    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}> Que voulez vous faire ?</Text>
                        <View style={{ flexDirection: 'row', }}>
                            <Pressable
                                style={[styles.button, styles.buttonGallery]}
                                onPress={() => libraryHandler()}>
                                <Text >Gallery</Text></Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonAppPhoto]}
                                onPress={() => cameraHandler()}>
                                <Text >Appareil Photo</Text></Pressable>

                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Fermez</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Voulez vous scannez votre ordonnace ?</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonGallery: {
        marginRight: 10,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#F194FF',
        justifyContent: 'center'
    },
    buttonAppPhoto: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#F194FF',
        justifyContent: 'center'
    }
    ,
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#FF0000',
        marginTop: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default ModalImgPicker;