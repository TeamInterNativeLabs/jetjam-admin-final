import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'))
let persistor = persistStore(store)

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../watcher/firebase-messaging-sw.js", { scope: "/watcher/" })
        .then(function (registration) {
            console.log("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
            console.log("Service worker registration failed, error:", err);
        });
}

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);