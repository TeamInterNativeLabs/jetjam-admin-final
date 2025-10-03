import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import "./style.css";

import { AuthLayout } from '../../Components/Layout/AuthLayout';
import CustomButton from '../../Components/CustomButton';
import CustomInput from "../../Components/CustomInput"
import { useLoginMutation } from '../../Redux/Apis/Auth';
import { isEmail, objectValidator } from '../../Utils';

let initialState = {
    email: null,
    password: null
}

const AdminLogin = () => {

    const navigate = useNavigate()
    const [login, { data, isLoading, isSuccess }] = useLoginMutation();

    const [formData, setFormData] = useState(initialState)

    useEffect(() => {
        document.title = 'JetJams | Login';
    }, [])

    useEffect(() => {
        if (isSuccess) {
            if (data?.data?.role === "representative") {
                navigate('/representative/customers', { replace: true })
            } else {
                navigate('/dashboard', { replace: true })
            }
        }
    }, [isSuccess])

    const handleClick = (e) => {

        e.preventDefault()

        if (objectValidator(formData) && isEmail(formData.email)) {
            login(formData)
        }

    }

    return (
        <>
            <AuthLayout authTitle='Login' authPara='Login into your Account'>
                <form>
                    <CustomInput value={formData?.email} label='Email Address' required id='userEmail' type='email' placeholder='Enter Your Email Address' labelClass='mainLabel text-white' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, email: event.target.value })
                    }} />
                    <CustomInput value={formData?.password} label='Password' required id='pass' type='password' placeholder='Enter Password' labelClass='mainLabel text-white' inputClass='mainInput' onChange={(event) => {
                        setFormData({ ...formData, password: event.target.value })
                    }} />
                    <div className="d-flex align-items-baseline justify-content-end mt-1">
                        {/* <div className="checkBox">
                            <input type="checkbox" name="rememberMe" id="rememberMe" className='me-1' />
                            <label htmlFor="rememberMe" className='fw-semibold'>Remember Me</label>
                        </div> */}
                        <Link to={'/forget-password'} state={{ email: formData.email }} className='text-white text-decoration-underline'>Forget Password?</Link>
                    </div>
                    <div className="mt-4 text-center">
                        <CustomButton variant='primaryButton' text='Login' onClick={handleClick} loading={isLoading} />
                    </div>
                </form>
            </AuthLayout>
        </>
    )
}


export default AdminLogin
