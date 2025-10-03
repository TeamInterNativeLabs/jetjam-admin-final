import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';
import CustomModal from '../../Components/CustomModal';
import { useResetPasswordMutation } from '../../Redux/Apis/Auth';
import { compareString, objectValidator } from '../../Utils';

let initialState = {
    password: null,
    confirmPassword: null
}

const ForgetPassword3 = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    if (state) {
        var { email } = state
    }

    const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation()

    const [formData, setFormData] = useState(initialState)
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        document.title = 'JetJams | Password Recovery';

        if (!email) {
            navigate('/forget-password')
        }

    }, [])

    useEffect(() => {
        if (isSuccess) {
            setFormData(initialState)
            setShowModal(true)
        }
    }, [isSuccess])


    const handleClick = () => {

        if (objectValidator(formData) && compareString(formData.password, formData.confirmPassword)) {

            let payload = {
                email, password: formData.password
            }

            resetPassword(payload)

        }
    }

    const redirectHome = () => {
        navigate('/login')
    }

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Enter a new password.' backOption={true}>
                <form>
                    <CustomInput label='New Password' value={formData?.password} required id='pass' type='password' placeholder='Enter New Password' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, password: event.target.value })
                    }} />
                    <CustomInput label='Confirm Password' value={formData?.confirmPassword} required id='cPass' type='password' placeholder='Confirm Password' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, confirmPassword: event.target.value })
                    }} />

                    <div className="mt-4 text-center">
                        <CustomButton type='button' variant='primaryButton' text='Update' onClick={handleClick} loading={isLoading} />
                    </div>
                </form>
            </AuthLayout>

            <CustomModal show={showModal} success heading='Password updated successfully. Please login to continue' close={redirectHome} btnTxt="Continue" loading={isLoading} />
        </>
    )
}

export default ForgetPassword3





