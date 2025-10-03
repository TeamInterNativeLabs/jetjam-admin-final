import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import BackButton from "../../Components/BackButton";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import { objectValidator } from "../../Utils";
import { useAddUserMutation } from "../../Redux/Apis/User";

const AddRepresentative = () => {

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'JetJams | Add Representative';
    }, []);

    const [add, { isLoading, isSuccess, data }] = useAddUserMutation();

    const [empId, setEmpId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            navigate('/representatives')
        }
    }, [isSuccess]);

    const onClickSave = () => {

        let validate = objectValidator({ name, empId, email, address, contact, password })

        if (validate) {

            add({
                empId,
                fullName: name,
                email,
                address,
                contact,
                password,
                role: "representative"
            })

        }
    }

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Add New Representative
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <CustomInput
                                label="Employee Id"
                                labelClass="mainLabel"
                                required
                                placeholder="Enter Employee Id"
                                inputClass="mainInput"
                                value={empId}
                                onChange={e => setEmpId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <CustomInput
                                label="Name"
                                labelClass="mainLabel"
                                required
                                placeholder="Enter Representative's Name"
                                inputClass="mainInput"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <CustomInput
                                label="Contact Number"
                                labelClass="mainLabel"
                                required
                                placeholder="Enter Contact Number"
                                inputClass="mainInput"
                                value={contact}
                                onChange={e => setContact(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <CustomInput
                                label="Email"
                                labelClass="mainLabel"
                                required
                                placeholder="Enter Representative's Email"
                                inputClass="mainInput"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <CustomInput
                                label="Password"
                                labelClass="mainLabel"
                                required
                                placeholder="Enter Representative's Password"
                                inputClass="mainInput"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-8">
                            <CustomInput
                                label="Address"
                                labelClass="mainLabel"
                                required
                                placeholder="Enter Address"
                                inputClass="mainInput"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-4">
                            <CustomButton
                                text="Save"
                                onClick={onClickSave}
                                loading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default AddRepresentative;