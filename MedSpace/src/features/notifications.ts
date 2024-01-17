import dataManager from "./dataManager";
const PushNotification = require('react-native-push-notification');

export default function setNotifications() {
    PushNotification.cancelAllLocalNotifications();
    dataManager.getSaveData().then((save) => {
        save.patients.forEach((patient) => {
            patient.calendar &&
                Object.keys(patient.calendar).forEach((week) =>
                    patient.calendar && Object.keys(patient.calendar[week]).forEach((day) =>
                        patient.calendar && patient.calendar[week][day].forEach((prise) => {
                            const date = new Date(day)
                            date.setHours(prise.hour, 0, 0, 0)
                            if (date.valueOf() < (new Date()).valueOf()) return;
                            PushNotification.localNotificationSchedule({
                                title: prise.releatedTreatment,
                                channelId: 'medspace-channel',
                                message: `Il est l'heure de prendre ${prise.dosage}${prise.dosageType} de ${prise.MedicineName}`,
                                date: date,
                                allowWhileIdle: true,
                            });
                        })
                    )
                )
        })
    })
}
