import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import "./style.css";


import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomInput from "../../Components/CustomInput"
import CustomButton from '../../Components/CustomButton';
import { useVerifyOtpMutation } from '../../Redux/Apis/Auth';
import { ERRORS, objectValidator } from '../../Utils';

let initialState = {
    codeone: null,
    codetwo: null,
    codethree: null,
    codefour: null
}


const ForgetPassword2 = () => {
    const navigate = useNavigate()
    const { state } = useLocation()
    
    if (state) {
        var { email } = state
    }

    const [verifyOtp, { isLoading, isSuccess }] = useVerifyOtpMutation()

    const [formData, setFormData] = useState(initialState)


    useEffect(() => {

        document.title = 'JetJams | Password Recovery';

        if (!email) {
            navigate('/forget-password')
        }

    }, [])

    useEffect(() => {
        if (isSuccess) {
            navigate('/forget-password3', { state: { email } })
        }
    }, [isSuccess])


    const handleClick = (e) => {
        e.preventDefault()

        if (objectValidator(formData, ERRORS.INVALID_OTP)) {

            let otp = formData.codeone + formData.codetwo + formData.codethree + formData.codefour

            let payload = { email, otp }

            verifyOtp(payload)

        }

    }

    return (
        <>
            <AuthLayout authTitle='Verification Code' authPara='Please Check Your Email For Verification Code.' subauthPara='Your Code is 4 digit in Length' backOption={true}>
                <form>
                    <div className="inputWrapper mainLabel"><label htmlFor="verificationCode">Verification Code<span>*</span></label></div>
                    <div className='verification-box justify-content-between'>
                        <CustomInput maxLength={1} value={formData?.codeone} required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, codeone: event.target.value })
                        }} />
                        <CustomInput maxLength={1} value={formData?.codetwo} required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, codetwo: event.target.value })
                        }} />
                        <CustomInput maxLength={1} value={formData?.codethree} required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, codethree: event.target.value })
                        }} />
                        <CustomInput maxLength={1} value={formData?.codefour} required id='verificationCode' type='number' labelClass='mainLabel' inputClass='mainInput text-center' onChange={(event) => {
                            setFormData({ ...formData, codefour: event.target.value })
                        }} />
                    </div>
                    <div className="d-flex align-items-baseline justify-content-between mt-1">
                        <p className='text-danger fw-bold'>Resending in 00:50</p>
                        <button type='button' className='notButton primaryColor fw-bold text-decoration-underline'>Resend Code</button>
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton type='button' variant='primaryButton' text='Continue' onClick={handleClick} loading={isLoading} />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}



export default ForgetPassword2