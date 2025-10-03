import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCTKmJnKx9vnR5ZfA8ixK3XsdIwPF_Yifg",
  authDomain: "rod-fin-37279.firebaseapp.com",
  projectId: "rod-fin-37279",
  storageBucket: "rod-fin-37279.appspot.com",
  messagingSenderId: "234815199205",
  appId: "1:234815199205:web:5d9b4a825009dfba16c10c",
  measurementId: "G-7ECRTMM78Q"
};

let app = firebase.initializeApp(firebaseConfig);

export default app;