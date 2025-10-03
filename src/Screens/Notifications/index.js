import React, { useState, useEffect } from "react";

import { DashboardLayout } from '../../Components/Layout/DashboardLayout';
import { notifications } from '../../Config/Data';

import NotificationCard from "../../Components/NotificationCard";

import './style.css'
import Loader from "../../Components/Loader";
import { useGetNotificationsQuery } from "../../Redux/Apis/Notification";

const Notifications = () => {

  const { data, isLoading } = useGetNotificationsQuery()

  const [notificationState, setNotificationState] = useState([])
  const [notificationType, setNotificationType] = useState('all')

  useEffect(() => {

    document.title = 'JetJams | Notifications';

    if (data) {
      setNotificationState(data)
    }

  }, [data])

  return (
    <div>
      <DashboardLayout>
        <div className="dashCard">
          <div className="container-fluid">
            <div className="row mb-3">
              <div className="col-12">
                <h2 className="mainTitle">Notifications</h2>
              </div>
            </div>
            <div className="row">
              {
                isLoading ? <Loader /> : (
                  notificationState?.length > 0 ? (
                    notificationState?.map((notification, index) => (
                      <>
                        <div className="col-12" key={index}>
                          <NotificationCard text={notification.text} date={notification.date} time={notification.time} read={notification.read} image={notification.userImage} />
                        </div>
                      </>
                    ))
                  ) : (
                    <p className="notificationText text-center">No New Notification</p>
                  )
                )
              }
            </div>
          </div>
        </div>


      </DashboardLayout>
    </div>
  )
}

export default Notifications;
