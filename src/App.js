import "bootstrap/dist/css/bootstrap.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import "./Assets/css/style.css";

import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import { useGetGeneralQuery } from './Redux/Apis/General';
import AdminRouter from './Routers';
import { handleForegroundMessage, requestNotificationPermission } from './Utils/notification';

function App() {

  const { } = useGetGeneralQuery({}, { refetchOnFocus: true })

  useEffect(() => {
    requestNotificationPermission();
    handleForegroundMessage();
  }, [])

  return (
    <>
      <ToastContainer pauseOnHover={false} />
      <AdminRouter />
    </>
  );
}

export default App;
