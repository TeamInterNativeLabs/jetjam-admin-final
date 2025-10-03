import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import CustomModal from "../../Components/CustomModal";

import './style.css'
import { useChangePasswordMutation } from "../../Redux/Apis/User";
import { compareString, objectValidator } from "../../Utils";

let initialState = {
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
}

const ChangePassword = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState(initialState)

    const [showModal, setShowModal] = useState(false);

    const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation()

    const handleClickPopup = async () => {
        if (objectValidator(formData) && compareString(formData.newPassword, formData.confirmPassword)) {
            let payload = { ...formData }
            delete payload.confirmPassword
            await changePassword(payload)
        }
    }

    useEffect(() => {
        document.title = 'JetJams | Change Password';
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setFormData(initialState)
            setShowModal(true);
        }
    }, [isSuccess]);

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Change Password
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-xl-6 col-lg-8">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Current Password" value={formData?.currentPassword} labelClass="mainLabel" required type="password" placeholder="Enter Current Password" inputClass="mainInput" onChange={(event) => {
                                            setFormData({ ...formData, currentPassword: event.target.value })
                                        }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="New Password" value={formData?.newPassword} labelClass="mainLabel" required type="password" placeholder="Enter New Password" inputClass="mainInput" onChange={(event) => {
                                            setFormData({ ...formData, newPassword: event.target.value })
                                        }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <CustomInput label="Confirm New Password" value={formData?.confirmPassword} labelClass="mainLabel" required type="password" placeholder="Confirm New Password" inputClass="mainInput" onChange={(event) => {
                                            setFormData({ ...formData, confirmPassword: event.target.value })
                                        }} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-12r">
                                        <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Update" onClick={handleClickPopup} loading={isLoading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Your Password is Successfully Updated!' />
            </DashboardLayout>
        </>
    );
};

export default ChangePassword;
