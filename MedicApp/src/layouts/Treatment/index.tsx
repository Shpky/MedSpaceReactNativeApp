import HeaderContainer from "@layouts/Home/components/headerContainer";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPills } from '@fortawesome/free-solid-svg-icons/faPills'

const TreatmentContainer = () => {

    const monDictionnaire = {
        TraitmentName1: [{ medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } }, { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } }],
        TraitmentName2: [{ medicalName: "Airomir", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } }, { medicalName: "Airomir", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } }],
        TraitmentName3: [{ medicalName: "Qvar", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } }, { medicalName: "Qvar", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } }]
    };

    const monDictionnaire = {
        TraitmentName1: [
            { medicalName: "Dolipranne", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            { medicalName: "Panadol", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            { medicalName: "Aspirin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            // ... Ajoutez plus de médicaments au besoin
        ],
        TraitmentName2: [
            { medicalName: "Airomir", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            { medicalName: "Ventolin", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            { medicalName: "Symbicort", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            // ... Ajoutez plus de médicaments au besoin
        ],
        TraitmentName3: [
            { medicalName: "Qvar", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            { medicalName: "Flixotide", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            { medicalName: "Pulmicort", infosup: { dose: 'valeur1', frequency: 'valeur1', duration: 'valeur1' } },
            // ... Ajoutez plus de médicaments au besoin
        ],
    };

    return (
        <View>
            {Object.keys(monDictionnaire).map((medicament) => (
                <View key={nameTreatment} style={styles.TreatmentContainer}>
                    <Text style={styles.TreatmentTitle}>{nameTreatment}</Text>
                    <View style={styles.MedicamentsContainer}>
                        {monDictionnaire[nameTreatment].slice(0, 3).map((medicament, index) => (
                            <Text key={`${nameTreatment}-${index}`} style={styles.MedicamentName}>{medicament.medicalName}</Text>
                        ))}
                    </View>
                </View>
            ))}
        </View>
    );
    );


return (
    <View style={styles.center} >
        <HeaderContainer></HeaderContainer>
        <View style={styles.body}>
            <View style={styles.textNewTraitment}>
                <Text style={styles.fontJomhuriaRegular}>Ajouter traitement</Text>

            </View>
            <Traitement></Traitement>

        </View>
    </View>

)

}

let styles = StyleSheet.create({
    debug: {
        borderWidth: 3,
        borderColor: 'black',
    },
    center: {
        marginTop: 25,
        alignItems: 'center',
        justifyContent: 'center',

    }
    ,
    body: {

        height: '100%',
        width: '95%',
        borderWidth: 3,
        borderColor: 'black',

    },
    textNewTraitment: {
        height: 62,
        backgroundColor: 'orange',
        borderRadius: 30,
    },
    fontJomhuriaRegular: {

        fontFamily: 'Jomhuria-Regular',
        fontSize: 30,
        color: 'white',
    },
    Treatment: {
        height: 200,

        borderRadius: 30,
        borderBlockColor: 'black',
        borderWidth: 0,
        marginBottom: 10,
        backgroundColor: 'red',
    }
})

export default TreatmentContainer;