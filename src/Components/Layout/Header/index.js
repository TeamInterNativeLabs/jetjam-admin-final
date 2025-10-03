import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faBars,
  faEllipsisV,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";

import "./style.css";

import { logo, placeholderImage } from './../../../Assets/images/'
import CustomModal from "../../CustomModal";
import { notifications } from "../../../Config/Data";
import { logout } from "../../../Redux/Slices/Auth";
import { useGetNotificationsQuery } from "../../../Redux/Apis/Notification";
import Loader from "../../Loader";

export const Header = (props) => {

  const { data, isLoading } = useGetNotificationsQuery()

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authSlice)
  if (user) {
    var { picture } = user
  }

  const [notificationState, setNotificationState] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);


  const Continue = () => {
    setShowModal(false)
    setShowModal2(true)
  }

  const handleClickPopup = () => {
    setShowModal(true)
  }

  const handleRedirect = () => {
    navigate('/');
    dispatch(logout())
  }


  useEffect(() => {
    if (data) {
      setNotificationState(data.data)
    }
  }, [data])

  return (
    <header>
      <Navbar className="customHeader" expand="md">
        <Container fluid className="fluid-con">
          <Link to={"/dashboard"} className="siteLogo order-2 order-lg-1">
            <img src={logo} alt="Logo" />
          </Link>
          <Navbar.Toggle className="order-4 order-lg-2 notButton">
            <FontAwesomeIcon className="bell-icon" icon={faEllipsisV} />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="customCollapse order-3"
          >
            <Nav className="ms-auto">
              <Dropdown className="notiDropdown me-2">
                <Dropdown.Toggle variant="transparent" className="notButton">
                  <FontAwesomeIcon className="bellIcon" icon={faBell} />
                </Dropdown.Toggle>
                <Dropdown.Menu className="notiMenu" align="end">
                  <div className="notiHead p-3 pb-0">
                    <h4 className="mainTitle">Notifications</h4>
                  </div>
                  <div className="notificationsBody">
                    {
                      isLoading ? <Loader /> : (
                        notificationState.length > 0 ? (
                          notificationState?.slice(0, 5).map((notification) => (
                            <Link className="singleNoti" key={notification.id}>
                              <div className="singleNotiIcon">
                                <FontAwesomeIcon
                                  className="notiIcon"
                                  icon={faBell}
                                />
                              </div>
                              <div className="singleNotiContent">
                                <p className="notiText">{notification.text}</p>
                                <p className="notiDateTime">
                                  {notification.date} | {notification.time}
                                </p>
                              </div>
                            </Link>
                          ))
                        ) : (
                          <p className="notiText text-center">No New Notification</p>
                        )
                      )
                    }
                  </div>
                  <div className="notiFooter">
                    <Link to={"/notifications"}>View All</Link>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="userDropdown">
                <Dropdown.Toggle
                  variant="transparent"
                  className="notButton toggleButton"
                >
                  <div className="userImage">
                    <img
                      src={picture ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${picture}` : placeholderImage}
                      alt=""
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  {/* <img src={images.profilePic} alt="" className="img-fluid" /> */}
                </Dropdown.Toggle>
                <Dropdown.Menu className="userMenu" align="end">
                  <Link className="userMenuItem" to={'/profile'}>
                    <FontAwesomeIcon
                      className="me-2 yellow-text"
                      icon={faUser}
                    />{" "}
                    Profile
                  </Link>
                  <Link to="#" className="userMenuItem" onClick={handleClickPopup}>
                    <FontAwesomeIcon
                      className="me-1 yellow-text"
                      icon={faSignOut}

                    />{" "}
                    Logout
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
          <button className="notButton ms-md-2 order-lg-4 order-md-4 order-1">
            <FontAwesomeIcon
              className="bell-icon"
              onClick={props.sidebarToggle}
              icon={faBars}
            />
          </button>
        </Container>
      </Navbar>

      <CustomModal show={showModal} close={() => { setShowModal(false) }} action={Continue} heading='Are you sure you want to logout?' />
      <CustomModal show={showModal2} close={handleRedirect} success heading='Successfully Logged Out' />
    </header>
  );
};
