import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import "./style.css";


import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';
import { useForgetPasswordMutation } from '../../Redux/Apis/Auth';
import { isEmail, objectValidator } from '../../Utils';


const ForgetPassword = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    if (state) {
        var { email } = state
    }

    const initialState = { email }

    const [forgetPassword, { isLoading, isSuccess }] = useForgetPasswordMutation()

    const [formData, setFormData] = useState(initialState)

    useEffect(() => {

        document.title = 'JetJams | Password Recovery';

    }, [])

    useEffect(() => {
        if (isSuccess) {
            navigate('/forget-password2', { state: { email: formData.email } })
        }
    }, [isSuccess])

    const handleClick = (e) => {

        e.preventDefault()

        if (objectValidator(formData) && isEmail(formData.email)) {
            forgetPassword(formData)
        }

    }

    return (
        <>
            <AuthLayout authTitle='Password Recovery' authPara='Enter your email address to receive a verification code.' backOption={true}>
                <form>
                    <CustomInput value={formData?.email} label='Email Address' required id='userEmail' type='email' placeholder='Enter Your Email Address' labelClass='mainLabel' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, email: event.target.value })
                    }} />
                    <div className="mt-4 text-center">
                        <CustomButton type='button' variant='primaryButton' text='Continue' onClick={handleClick} loading={isLoading} />
                    </div>
                </form>

            </AuthLayout>
        </>
    )
}



export default ForgetPassword
