import { useState } from 'react';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions } from 'react-native-image-picker';
import { Button, Image, View } from 'react-native';

export default function PrescriptionsView() {
    const [image, setImage] = useState<string | null>(null);

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
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            selectionLimit: 1,
        }
        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets[0] && typeof response.assets[0].uri === "string")
                setImage(response.assets[0].uri);
        })
    }

    <View>
        <Button title="Camera" onPress={cameraHandler} />
        <Button title="Library" onPress={libraryHandler} />
        {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
} 