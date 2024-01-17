import * as React from 'react';

import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
    ImageBackground
} from 'react-native';
import defaultIcon from '@data/defaultIcon.json';
import {
    launchImageLibrary,
    ImageLibraryOptions,
} from 'react-native-image-picker';

import useSave from '@hooks/useSave';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "@navigation/RootStackParamList";
import Password from './Password';
import dataManager from '@features/dataManager';
import { ProfilePicker } from './HandleChangeProfile';
import { convertPngToBase64 } from './PngToBase64';
import { ProfileImage } from './Component/ProfileImage';
import { handleChangeUserName } from './UserPreference/ChangeUserName';
import useActualPatient from '@hooks/useActualPatient';
import { ChangeEarliesttime } from "./UserPreference/handleChangeEarliestTime"
import { ChangeLastestTime } from "./UserPreference/handleChangeLatestTime"
import { CreateNewUser, NewUser } from './NewUser';
import { handlePressButtonDEL } from './ControleButton/DellUser';
import { Changepp } from './ControleButton/NewPP';
import { ControleButton } from './ControleButton/ControleButton';
import { Userinfo } from './Component/UserInfo';
import { Statistique } from './Component/Statistics';
type UserIndexProps = NativeStackScreenProps<RootStackParamList, 'UserPage'>

/**
 * Renders the user page index.
 * @param {UserIndexProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */

const UserPageIndex = ({ navigation }: UserIndexProps) => {
    const [save, setSave] = useSave();


    const [actualUser] = useActualPatient();
    if (!save) return null;
    if (!actualUser) return null;


    const reloadPage = () => {
        navigation.goBack();
        navigation.navigate("UserPage");
    }
    return (
        <ScrollView style={styles.body}>
            <View style={{ width: '100%' }}>
                <ImageBackground
                    source={require('./img/picker.png')}
                    style={[styles.backgroundImage, { marginTop: 20, }, styles.shadow]}
                >
                    <ProfilePicker save={save} actualUser={actualUser} navigation={navigation} />
                </ImageBackground>
                <ImageBackground
                    source={require('./img/newuser.png')}  
                    style={[styles.backgroundImage, { marginTop: 20, marginBottom: 20 }]}
                >
                    <CreateNewUser save={save} setSave={setSave} />
                </ImageBackground>

                <View style={styles.userInfoContainer}>
                    <ImageBackground
                        source={require('./img/userinfo.png')}  
                        style={styles.backgroundImage}
                    ><View style={styles.userInfoContainer}>
                            <ProfileImage actualUser={actualUser} />
                            <Userinfo actualUser={actualUser} navigation={navigation} setSave={setSave} />
                            <Statistique actualUser={actualUser} navigation={navigation} />
                            <ControleButton actualUser={actualUser} navigation={navigation} save={save} setSave={setSave} />

                        </View>

                    </ImageBackground>
                </View>

            </View>
            <Password onConfirm={reloadPage} />
        </ScrollView>
    );
};




const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 30,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    container: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',

        borderRadius: 30,

    },


    buttonGREEN: {
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        marginRight: 10,
        textAlign: 'center',
        alignItems: 'center',

    },

    containter: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'red',
        borderRadius: 30,
    },
    body: {

        flex: 1,
        marginLeft: 15,
        marginRight: 15,
    },

    realysmallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',



    },
    smallfontJomhuriaRegularnopading: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',

        marginTop: -10,
        marginBottom: -10,
    },
    textInput: {
        color: 'white',
        borderBottomWidth: 1,
        borderColor: 'white',
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderRadius: 8,
        marginLeft: 20,
        width: '80%',
        marginBottom: 15,

    },
    userInfoContainer: {
        width: '100%',


        borderRadius: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,


    },
    smallfontJomhuriaRegular: {
        marginLeft: 20,
        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
        marginBottom: -20,
    },

})
export default UserPageIndex;
