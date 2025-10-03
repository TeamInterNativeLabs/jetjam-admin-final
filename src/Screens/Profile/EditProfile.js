import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { country, currentUser } from "./../../Config/Data";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import CustomModal from "../../Components/CustomModal";

import './style.css'
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../Redux/Apis/User";
import { useUploadImageMutation } from "../../Redux/Apis/Image";
import { placeholderImage } from "../../Assets/images";

const EditProfile = () => {

    const { user } = useSelector(state => state.authSlice)
    const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation()
    const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation()

    const navigate = useNavigate()

    const [userData, setUserData] = useState();
    const [userNewData, setUserNewData] = useState({})
    const [optionData, setOptionData] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleClickPopup = async () => {

        let data = { ...userData }

        if (userData?.updatedImage) {

            let formData = new FormData()

            formData.append('image', userData.updatedImage)
            let response = await uploadImage(formData)

            data.picture = response.data.data._id
            delete data.updatedImage

            await updateUser({ payload: data })

        } else {

            delete data.picture
            await updateUser({ payload: data })

        }

    }

    useEffect(() => {
        document.title = 'JetJams | Edit Profile';
        setOptionData(country);
        setUserData(user);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setShowModal(true);
            if (userData.updatedImage) {
                let data = { ...userData }
                delete data.updatedImage
                setUserData(data)
            }
        }
    }, [isSuccess])

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Profile
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {
                            userData ?
                                <div className="col-12">
                                    <form>
                                        <div className="row mb-3">
                                            <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                                <div className="profileImage">
                                                    <img src={userData?.updatedImage ?
                                                        URL.createObjectURL(userData?.updatedImage) :
                                                        user?.picture ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${user?.picture}` :
                                                            placeholderImage
                                                    } alt="User" />
                                                    <input type="file" accept="img/*" className="d-none" id="profileImage" onChange={(event) => { setUserData({ ...userData, updatedImage: event.target.files[0] }) }} />
                                                    {/* <input type="file" accept="img/*" className="d-none" id="profileImage" onChange={(event) => console.log("Imaaaaaage", event.target.files)} /> */}
                                                    <label htmlFor="profileImage" className="imageUploadButton"><FontAwesomeIcon icon={faCamera} /></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <CustomInput label="Name" labelClass="mainLabel" required type="text" placeholder="Enter Name" inputClass="mainInput" value={userData?.fullName} onChange={(event) => { setUserData({ ...userData, fullName: event.target.value }) }} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <h4 className="secondaryLabel">Email Address</h4>
                                                        <p className="secondaryText">{userData.email}</p>
                                                    </div>
                                                </div>
                                                {/* <div className="row">
                                                    <div className="col-12 mb-3">
                                                        <CustomInput label="Phone Number" labelClass="mainLabel" required type="text" placeholder="Phone Number" inputClass="mainInput" value={userData?.phoneNumber} onChange={(event) => { setUserData({ ...userData, phoneNumber: event.target.value }) }} />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6 mb-3">
                                                        <SelectBox selectClass="mainInput" name="Select Country" label="Country" required option={optionData}
                                                            onChange={(event) => { setUserNewData({ ...userNewData, country: event.target.value }) }}
                                                        />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <SelectBox selectClass="mainInput" name="Select State" label="State" required option={optionData} />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <SelectBox selectClass="mainInput" name="Select City" label="City" required option={optionData} />
                                                    </div>
                                                    <div className="col-md-6 mb-3">
                                                        <CustomInput label="Postal/Zip Code" labelClass="mainLabel" required type="number" placeholder="Enter Postal/Zip Code" inputClass="mainInput" onChange={(event) => { setUserNewData({ ...userNewData, name: event.target.value }) }} />
                                                    </div>
                                                </div> */}
                                            </div>
                                            <div className="col-12">
                                                <CustomButton type="button" variant="primaryButton" className="me-3 mb-2" text="Save" onClick={handleClickPopup} loading={isLoading || imageLoading} />
                                                <CustomButton type="button" variant="secondaryButton" className="me-3 mb-2" text="Cancel" onClick={() => { navigate('/profile') }} />
                                            </div>

                                        </div>
                                    </form>
                                </div> : ''
                        }
                    </div>
                </div>
                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Your profile is Successfully Updated! Continue' />
            </DashboardLayout>
        </>
    );
};

export default EditProfile;
