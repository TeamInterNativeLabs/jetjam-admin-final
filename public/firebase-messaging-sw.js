self.importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyCTKmJnKx9vnR5ZfA8ixK3XsdIwPF_Yifg",
    authDomain: "rod-fin-37279.firebaseapp.com",
    projectId: "rod-fin-37279",
    storageBucket: "rod-fin-37279.appspot.com",
    messagingSenderId: "234815199205",
    appId: "1:234815199205:web:5d9b4a825009dfba16c10c",
    measurementId: "G-7ECRTMM78Q"
};

firebase.default.initializeApp(firebaseConfig);

const messaging = firebase.default.messaging()

messaging.onBackgroundMessage(messaging, (payload) => {
    // Handle the incoming message
    console.log('Background message received:', payload);
    // Perform custom handling of the background message
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        // Customize other options like icon, badge, etc.
    };

    return self.registration.showNotification(
        notificationTitle,
        notificationOptions
    );
});