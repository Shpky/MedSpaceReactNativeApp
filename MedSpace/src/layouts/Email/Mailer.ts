import { logo } from './Logo';
import superHtmlReportBuiler from './HtmlReportBuilder';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import Mailer from 'react-native-mail';

/**
 * Generates an HTML email template for sending a medication report to a doctor.
 * @param prescription - The prescription object containing medication details.
 * @param patient - The patient object containing patient details.
 */
export const htmlmailtemplate = async (prescription: PrescriptionInterface, patient: PatientInterface) => {


    try {
        let htmlContent = `
                    
                    <body style="font-family: Arial, Helvetica, sans-serif">
                    <div style="text-align: center; margin-bottom: 20px; margin-top: 20px;">
                    <div style="display: flex; justify-content: space-evenly;align-items: center;margin-top:80px">
                        <img src="${logo}" />
                        <h1 style="font-size: 30px; font-weight: bold;">MEDSPACE</h1>
                    </div>
                    <div style="display: flex; justify-content: space-evenly;align-items: center;margin-top: 50px;">
                        <h2 style="font-size: 30px; font-weight: bold;">Ce document constitue le rapport de prise
                            médicamenteuse pour le patient M./Mme.${patient.name} dans le contexte de son traitement
                            ${prescription.title}.</h2>
                    </div>
                    <div style="display: flex; justify-content: flex-start;align-items: flex-start;margin-left: 20px;">
                        <h3 style="font-size: 20px; font-weight: bold;">Ce document a été généré le ${new Date().toISOString().split("T")[0]}.</h3>
                    </div>
                    <h2 style="dashed;page-break-before: always;">Rapport de prise des médicaments par le patient par semaine</h2>
                    <div style="border-color: black;border-width: 1px;border-style: dashed;margin-left:20px;margin-right:20px">
                        <p style=""><b>Légendes</b></p>
                        <div style=" display: grid;grid-template-rows: repeat(4, 30px);row-gap: 5px;">
                            <div style="display: flex;align-items: center;">
                                <div style="background-color: green;width: 10px;height: 10px;margin: 10px;;border-radius: 50%;">
                                </div>
                                <p style="">Tous les médicaments ont bien été pris par le patient.</p>
                            </div>
                            <div style=" display: flex;align-items: center;">
                                <div style="background-color: orange;width: 10px;height: 10px;margin: 10px;border-radius: 50%;"></div>
                                <p style="">Tous les médicaments n'ont pas été pris</p>
                            </div>
                            <div style="display: flex;align-items: center">
                                <div style="background-color: red;width: 10px;height: 10px;margin-left: 10px;margin-right: 10px;border-radius: 50%;">
                                </div>
                                <p>Aucun des médicaments n'a été pris par le patient.</p>
                            </div>
                            <div style="display: flex;align-items: center;">
                                <div style="background-color: grey;width: 10px;height: 10px;margin: 10px;border-radius: 50%;"></div>
                                <p style="">Jour(s) non concernés par la durée du traitement</p>
                            </div>
                        </div>
                    </div>
    <div style="margin-top:20px">
    <p>Médicament(s) dans ce traitement ${prescription.medicines.map(e => e.name).join(", ")}</p>
    <div style="display: flex;align-items: center;justify-content:space-evenly"><p>Semaine/Année</p><p>Jours/Statut de la prise de médicament.</p></div>
    ${superHtmlReportBuiler(patient.calendar || {}, prescription)}
    </div>
    <h2 style="page-break-before: always;margin-top:15px">Confidentialité du document</h2>
    <p style="color:black; font-size: 18px;margin-left:20;margin-right:20;text-align: justify;margin-top:20px ">
        La préservation de la confidentialité des informations médicales est
        une préoccupation primordiale dans la rédaction du présent rapport sur la prise de médicaments du patient. Ce document est considéré comme
        hautement confidentiel et son accès est strictement réservé aux professionnels de la santé impliqués directement
        dans les soins du patient. Toute divulgation non autorisée de ces informations est expressément interdite,
        conformément aux lois et réglementations en vigueur relatives à la protection des données médicales.
        <br><br>Les membres de l'équipe médicale sont tenus de respecter scrupuleusement la confidentialité des
        détails
        contenus dans ce rapport, et des mesures de sécurité appropriées ont été mises en place pour garantir la
        protection des données sensibles. Ces mesures comprennent l'utilisation de systèmes informatiques
        sécurisés,
        l'accès restreint aux informations médicales et la formation continue du personnel sur l'importance de
        maintenir
        la confidentialité des données.
        <br><br>La confidentialité de ce rapport vise à instaurer une relation de confiance entre le patient et
        les
        professionnels de la santé, favorisant ainsi un environnement propice à des soins de qualité. Tout
        professionnel
        de la santé ayant accès à ce document est tenu de respecter les principes éthiques liés à la
        confidentialité
        médicale et de prendre les mesures nécessaires pour prévenir tout risque potentiel de divulgation non
        autorisée.
    </p>
</div>

</body>`;

        const options = {
            html: htmlContent,
            fileName: `${patient.name} + report`,

        };

        const pdf = await RNHTMLtoPDF.convert(options);

        const pdfFilePath = pdf.filePath;



        let email = prescription.doctor?.mail || "";
        let subject = 'Rapport de prise médicamenteuse pour la patient M./Mme.' + patient.name + ' dans le contexte de son traitement ' + prescription.title + '.';
        let body = 'Bonjour Docteur, \n\nVeuillez trouver ci-joint le rapport de prise médicamenteuse pour le patient M./Mme.' + patient.name + ' dans le contexte de son traitement ' + prescription.title + '.\n\nCordialement,\n\nL\'équipe MedSpace';

        const attachments = [
            {
                path: pdfFilePath,
                type: 'pdf',
                name: 'rapport.pdf',
            },
        ];

        Mailer.mail(
            {
                subject,
                recipients: [email],
                body,
                isHTML: true,
                attachments,
            },
            (error, event) => {
                if (error) {
                    console.error('Could not send mail:', error);
                }
            }
        );
    } catch (error) {
        console.error('Error capturing image:', error);
    }

};