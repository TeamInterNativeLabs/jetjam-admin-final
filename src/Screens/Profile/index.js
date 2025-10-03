import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomButton from "../../Components/CustomButton";

import './style.css'
import { useSelector } from "react-redux";
import { placeholderImage } from "../../Assets/images";


const Profile = () => {

    const { user } = useSelector(state => state.authSlice)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'JetJams | My Profile';
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                My Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {user ?
                            <div className="col-12">
                                <div className="row mb-3">
                                    <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                        <div className="profileImage">
                                            <img src={user?.picture ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${user?.picture}` : placeholderImage} alt="User" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="row mb-4">
                                            <div className="col-lg-12 mb-3">
                                                <h4 className="secondaryLabel">Name</h4>
                                                <p className="secondaryText">{user?.fullName}</p>
                                            </div>
                                            {/* <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Country</h4>
                                                <p className="secondaryText">{user?.country}</p>
                                            </div> */}
                                            <div className="col-lg-12 mb-3">
                                                <h4 className="secondaryLabel">Email</h4>
                                                <p className="secondaryText">{user?.email}</p>
                                            </div>
                                            {/* <div className="col-lg-6">
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <h4 className="secondaryLabel">State</h4>
                                                        <p className="secondaryText">{user?.state}</p>
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <h4 className="secondaryLabel">City</h4>
                                                        <p className="secondaryText">{user?.city}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Phone Number</h4>
                                                <p className="secondaryText">{user?.phoneNumber}</p>
                                            </div>
                                            <div className="col-lg-6 mb-3">
                                                <h4 className="secondaryLabel">Postal/Zip Code</h4>
                                                <p className="secondaryText">{user?.postCode}</p>
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Edit Profile" onClick={() => { navigate('/profile/edit-profile') }} />
                                        <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Change Password" onClick={() => { navigate('/profile/change-password') }} />
                                    </div>

                                </div>
                            </div> : ""
                        }
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default Profile;
