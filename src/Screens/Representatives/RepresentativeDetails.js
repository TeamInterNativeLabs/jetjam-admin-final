import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { placeholderImage } from "../../Assets/images";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import UseTableControls from "../../Config/UseTableControls";
import { useGetUsersQuery, useUpdateUserMutation } from "../../Redux/Apis/User";

const RepresentativeDetails = () => {

  const { id } = useParams();

  const { data, isLoading, refetch } = useGetUsersQuery({ id });
  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

  if (data) {
    var { data: profileData } = data
  }

  UseTableControls();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const inactiveMale = () => {
    changeUserStatus({ id: profileData?._id, payload: { active: false } }).then(() => {
      refetch()
      setShowModal(false)
      setShowModal2(true)
    })
  }

  const activeMale = () => {
    changeUserStatus({ id: profileData?._id, payload: { active: true } }).then(() => {
      refetch()
      setShowModal3(false)
      setShowModal4(true)
    })
  }

  useEffect(() => {
    document.title = 'JetJams | Details';
  }, [])


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Representative Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {
              isLoading ? <Loader /> :
                <>
                  <div className="col-12">
                    <div className="row mb-3 justify-content-between">
                      <div className="col-lg-4  order-2 order-lg-1 mb-3">
                      </div>
                      <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                        <button onClick={() => {
                          profileData.active ? setShowModal(true) : setShowModal3(true)
                        }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {profileData.active ? 'Inactive' : 'Active'}</button>
                        <span className={`statusBadge ${profileData.active ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{profileData.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Employee Id</h4>
                            <p className="secondaryText">{profileData?.empId}</p>
                          </div>
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Name</h4>
                            <p className="secondaryText">{profileData.fullName}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Email Address</h4>
                            <p className="secondaryText">{profileData.email}</p>
                          </div>
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Contact Number</h4>
                            <p className="secondaryText">{profileData.contact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-12 col-md-12 mb-3">
                            <h4 className="secondaryLabel">Address</h4>
                            <p className="secondaryText">{profileData.address}</p>
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

export default RepresentativeDetails;
