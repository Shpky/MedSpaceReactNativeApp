/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from 'react-native-push-notification'

PushNotification.configure({
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },
    popInitialNotification: true,
    requestPermissions: false,
})
PushNotification.channelExists("medspace-channel", (exists) => {
    if (!exists) {
        PushNotification.createChannel(
            {
                channelId: "medspace-channel",
                channelName: "MedSpace Channel",
                channelDescription: "A channel to categorise your notifications",
                playSound: true,
                soundName: "default",
                importance: 4,
                vibrate: true,
            }
        )
    }

})

AppRegistry.registerComponent(appName, () => App);
