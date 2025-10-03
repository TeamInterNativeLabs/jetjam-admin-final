
import { toast } from 'react-toastify';
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import app from '../Config/firebase';

const requestNotificationPermission = async () => {
    const messaging = getMessaging(app)
    try {
        await Notification.requestPermission()
        console.log('Notification permission granted.');
        // Token for sending notifications to this user
        const token = await getToken(messaging, { vapidKey: "BA-5eeB17dUEPOqxUtXTvfSSdPeKllDM9WnyGH4LTQD8uaQ0VWdttccixVKW6jcFwu45vMtik0AKNk_pp9AatSM" })
        localStorage.setItem("device_token", token)
    } catch (error) {
        console.log('Unable to get permission to notify.', error);
    }
};

const handleForegroundMessage = () => {
    const messaging = getMessaging(app)
    onMessage(messaging, (payload) => {
        toast(payload?.notification?.body)
    });
};

export { handleForegroundMessage, requestNotificationPermission }