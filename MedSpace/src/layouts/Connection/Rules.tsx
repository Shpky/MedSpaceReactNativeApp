import { Text, ScrollView, StyleSheet, } from "react-native";
/**
 * Component that renders the rules and conditions of using the application.
 * 
 * @returns JSX.Element
 */

export const Rules = () => {
    return (
        <ScrollView style={styles.scrollview} >
            <Text style={styles.title}>
                Acceptation des conditions d'utilisation :
            </Text>
            <Text style={styles.content}>
                En utilisant l'application Medspace, vous acceptez de vous conformer aux présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser l'application.
            </Text>
            <Text style={styles.title}>
                Données utilisateur :
            </Text>
            <Text style={styles.content}>
                Les données que vous fournissez à l'application, telles que les informations de profil, les préférences et les paramètres, seront stockées localement sur votre appareil uniquement. Aucune donnée utilisateur ne sera transmise à des serveurs distants.
            </Text>
            <Text style={styles.title}>
                Confidentialité :
            </Text>
            <Text style={styles.content}>
                Nous respectons votre vie privée. Les données utilisateur ne seront pas collectées, partagées, ou vendues à des tiers. Nous nous engageons à maintenir la confidentialité de vos informations.
            </Text>
            <Text style={styles.title}>
                Sécurité des données :
            </Text>
            <Text style={styles.content}>
                Les données stockées localement sur votre appareil seront protégées par des mesures de sécurité appropriées pour éviter tout accès non autorisé. Cependant, veuillez noter que la sécurité de votre appareil relève de votre responsabilité.
            </Text>
            <Text style={styles.title}>
                Mises à jour :
            </Text>
            <Text style={styles.content}>
                L'application peut nécessiter des mises à jour occasionnelles. Il est de votre responsabilité de mettre à jour l'application pour bénéficier des dernières fonctionnalités et des améliorations de sécurité.
            </Text>
            <Text style={styles.title}>
                Utilisation appropriée :
            </Text>
            <Text style={styles.content}>
                Vous vous engagez à utiliser l'application de manière appropriée et légale. Tout comportement abusif, frauduleux ou contraire aux lois en vigueur peut entraîner la résiliation de votre accès à l'application.
            </Text>
            <Text style={styles.title}>
                Responsabilité :
            </Text>
            <Text style={styles.content}>
                L'utilisation de l'application est à vos propres risques. Nous ne pouvons être tenus responsables des dommages directs, indirects, spéciaux, consécutifs ou de toute perte de données résultant de l'utilisation de l'application.
            </Text>
            <Text style={styles.title}>
                Résiliation :
            </Text>
            <Text style={styles.content}>
                Nous nous réservons le droit de résilier votre accès à l'application à tout moment, sans préavis, en cas de non-respect des présentes conditions d'utilisation.
            </Text>
            <Text style={styles.title}>
                Modifications des conditions :
            </Text>
            <Text style={styles.content}>Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les utilisateurs seront informés des modifications via une notification dans l'application. Il est de votre responsabilité de consulter régulièrement les conditions d'utilisation mises à jour.</Text>

        </ScrollView>)
}

const styles = StyleSheet.create({
    content: {
        padding: 10,
        fontSize: 10,
        textAlign: "justify",

    },
    title: {
        fontWeight: "bold",
        fontSize: 15,

    },
    scrollview: {
        borderColor: "black",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 30,
        height: 400,
        marginHorizontal: 30,
        padding: 10,
        marginTop: 10,
        paddingTop: 10
    },

})