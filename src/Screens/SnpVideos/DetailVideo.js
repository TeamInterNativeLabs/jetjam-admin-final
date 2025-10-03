import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import UseTableControls from "../../Config/UseTableControls";
import { useGetUsersQuery, useUpdateUserMutation } from "../../Redux/Apis/User";
import { useGetSnpVideoByIdQuery } from "../../Redux/Apis/SnpVideo";

const DetailVideo = () => {

    const { id } = useParams();

    const { data, isLoading, refetch } = useGetSnpVideoByIdQuery({ id });
    const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

    if (data) {
        var { data: videoData } = data
    }

    UseTableControls();

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);

    const inactiveMale = () => {
        changeUserStatus({ id: videoData?._id, payload: { active: false } }).then(() => {
            refetch()
            setShowModal(false)
            setShowModal2(true)
        })
    }

    const activeMale = () => {
        changeUserStatus({ id: videoData?._id, payload: { active: true } }).then(() => {
            refetch()
            setShowModal3(false)
            setShowModal4(true)
        })
    }

    useEffect(() => {
        document.title = 'JetJams | SNP Details';
    }, [])

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                SNP Video Details
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        {
                            isLoading ? <Loader /> :
                                <>
                                    <div className="col-12">
                                        {/* <div className="row mb-3 justify-content-between">
                                            <div className="col-lg-4  order-2 order-lg-1 mb-3">
                        <div className="profileImage">
                          <img src={videoData.picture ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${videoData?.picture}` : placeholderImage} alt="User" />
                        </div>
                      </div>
                                            <div className="col-lg-12 text-end order-1 order-lg-2 mb-3">
                                                <button onClick={() => {
                                                    videoData?.active ? setShowModal(true) : setShowModal3(true)
                                                }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {videoData?.active ? 'Inactive' : 'Active'}</button>
                                                <span className={`statusBadge ${videoData?.active ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{videoData?.active ? 'Active' : 'Inactive'}</span>
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            <div className="col-lg-8">
                                                <div className="row">
                                                    <div className="col-xl-4 col-md-4 mb-3">
                                                        {
                                                            videoData?.thumbnail &&
                                                            <>
                                                                <h4 className="secondaryLabel mb-3">Thumbnail</h4>
                                                                <div className="col-lg-4 order-2 order-lg-1 mb-3">
                                                                    <div className="profileImage">
                                                                        <img className="mx-2" src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${videoData?.thumbnail}`} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 mb-3">
                                                        {
                                                            videoData?.url &&
                                                            <>
                                                                <h4 className="secondaryLabel mb-3">Video</h4>
                                                                <div className="col-md-12 mb-3">
                                                                    <video style={{width: "100%"}} poster={`${process.env.REACT_APP_IMAGE_ENDPOINT}${videoData?.thumbnail}`} controls>
                                                                        <source src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${videoData?.url}`} />
                                                                    </video>
                                                                </div>
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                        }
                    </div>
                </div>

                <CustomModal loading={isUpdating} show={showModal} close={() => { setShowModal(false) }} action={inactiveMale} heading='Are you sure you want to mark this user as inactive?' />
                <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                <CustomModal loading={isUpdating} show={showModal3} close={() => { setShowModal3(false) }} action={activeMale} heading='Are you sure you want to mark this user as Active?' />
                <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
            </DashboardLayout>
        </>
    );
};

export default DetailVideo;
