import { Image, View } from 'react-native';


export default function LoadingIndex() {
    return <View style={{ backgroundColor: "red" }}>
        <Image source={{ uri: "../../assets/img/logo.png" }} />
    </View>
}
