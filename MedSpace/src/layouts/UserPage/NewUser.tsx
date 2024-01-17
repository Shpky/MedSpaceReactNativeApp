import { Pressable, StyleSheet, Text, View } from "react-native";
import defaultIcon from '@data/defaultIcon.json';
/**
 * Creates a new user and updates the save state.
 * 
 * @param setSave - The state setter function for the save state.
 * @param save - The current save state.
 * @param name - The name of the new user.
 * @param icon - The icon of the new user (optional).
 * @param actualUser - Indicates if the new user is the actual user (optional).
 */
export const NewUser = (setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>, save: SaveInterface, name: string, icon: string = '', actualUser: boolean = false) => {
    let nb = 0;
    while (save.patients.filter((patient) => patient.name == name).length) {
        name = name + nb;
        nb++;
    }

    setSave((oldSave) => ({
        ...oldSave,
        patients: [
            ...oldSave?.patients || [],
            {
                name: name,
                icone: icon,
                actualUser: actualUser,
                prescriptions: [],
                earliesttime: 8,
                latesttime: 22,
            }
        ],
        doctors: oldSave?.doctors || [],
    }))
};

type BuilderProps = {

    setSave: React.Dispatch<React.SetStateAction<SaveInterface | undefined>>,
    save: SaveInterface,

}
/**
 * Renders a component for creating a new user.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.setSave - The function to set the save state.
 * @param {boolean} props.save - The save state.
 * @returns {JSX.Element} The JSX element representing the component.
 */
export const CreateNewUser = ({ setSave, save }: BuilderProps) => {
    return (
        <View style={[{ marginTop: 10, padding: 10 }]} >
            <Pressable
                style={[styles.buttonGREEN, { borderRadius: 30, },]}
                onPress={() => {
                    NewUser(setSave, save, 'Nouvel utilisateur', defaultIcon.icon, false);
                }}>
                <Text style={[styles.smallfontJomhuriaRegularnopading]}>AJOUTER UN NOUVEL UTILISATEUR</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    smallfontJomhuriaRegularnopading: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 20,
        color: 'white',

        marginTop: -10,
        marginBottom: -10,
    },
    buttonGREEN: {
        paddingRight: 25,
        paddingLeft: 25,
        marginBottom: 15,
        marginRight: 10,
        textAlign: 'center',
        alignItems: 'center',

    },
})