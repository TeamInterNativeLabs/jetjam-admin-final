import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

import { authImage, logo } from "../../../Assets/images";

export const AuthLayout = (props) => {
    return (
        <>
            <section className="authBg">
                <div className='container'>
                    <div className="row g-0 authBox">
                        <div className="col-lg-3" />
                        <div className="col-lg-6">
                            <div className="authFormWrapper">
                                <div className="authForm">
                                    <div className="authLogo">
                                        <img src={logo} alt="authLogo" />
                                    </div>
                                    <div className="authFormHeader">
                                        <h2 className="authTitle">{props?.authTitle}</h2>
                                        <p className={props.subauthPara != '' ? 'authPara mb-0' : 'authPara'}>{props?.authPara}</p>
                                        <p className="authPara">{props?.subauthPara}</p>
                                    </div>
                                    {props?.children}
                                    {props?.backOption &&
                                        <div className="text-center mt-4">
                                            <Link to={'/login'} className='grayColor text-decoration-none fw-bold'><FontAwesomeIcon icon={faLeftLong} className='primaryColor me-2' />Back To <span className="text-theme-primary"> Login</span> </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3" />
                    </div>
                </div>
            </section>
        </>
    )
}
