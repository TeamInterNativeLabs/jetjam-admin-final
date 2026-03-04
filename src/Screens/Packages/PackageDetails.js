import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import UseTableControls from "../../Config/UseTableControls";
import { useGetPackagesQuery } from "../../Redux/Apis/Package";
import { useUpdateUserMutation } from "../../Redux/Apis/User";

const PackageDetails = () => {

  const { id } = useParams();

  const { data, isLoading, refetch } = useGetPackagesQuery({ id });
  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

  if (data) {
    var { data: packageData } = data
  }

  UseTableControls();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const inactiveMale = () => {
    changeUserStatus({ id: packageData?._id, payload: { active: false } }).then(() => {
      refetch()
      setShowModal(false)
      setShowModal2(true)
    })
  }

  const activeMale = () => {
    changeUserStatus({ id: packageData?._id, payload: { active: true } }).then(() => {
      refetch()
      setShowModal3(false)
      setShowModal4(true)
    })
  }

  useEffect(() => {
    document.title = 'JetJams | Package Details';
  }, [])

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Package Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {
              isLoading ? <Loader /> :
                <>
                  <div className="col-12">
                    {/* <div className="row mb-3 justify-content-between">
                      <div className="col-lg-12 text-end order-1 order-lg-2 mb-3">
                        <button onClick={() => {
                          packageData.active ? setShowModal(true) : setShowModal3(true)
                        }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {packageData.active ? 'Inactive' : 'Active'}</button>
                        <span className={`statusBadge ${packageData.active ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{packageData.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div> */}
                    <div className="row mb-3">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-4 col-md-4">
                            <h4 className="secondaryLabel">Package Name</h4>
                            <p className="secondaryText">{packageData?.title}</p>
                          </div>
                          <div className="col-xl-4 col-md-4">
                            <h4 className="secondaryLabel">Price</h4>
                            <p className="secondaryText">$ {packageData.price}</p>
                          </div>
                          <div className="col-xl-4 col-md-4">
                            <h4 className="secondaryLabel">Duration</h4>
                            <p className="secondaryText text-capitalize">{packageData.duration}ly</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {packageData?._id && (
                      <div className="row mb-3">
                        <div className="col-lg-8">
                          <h4 className="secondaryLabel">Shareable link (marketing)</h4>
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <input
                              readOnly
                              type="text"
                              className="form-control"
                              value={`${process.env.REACT_APP_SITE_URL || 'https://jetjams.net'}/subscription-plan/${packageData._id}`}
                              style={{ maxWidth: '400px' }}
                            />
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                const url = `${process.env.REACT_APP_SITE_URL || 'https://jetjams.net'}/subscription-plan/${packageData._id}`;
                                navigator.clipboard.writeText(url);
                              }}
                            >
                              Copy
                            </button>
                          </div>
                          <p className="secondaryText small mt-1 mb-0">Share this URL so users can view and purchase this plan.</p>
                        </div>
                      </div>
                    )}
                    <div className="row mb-3">
                      <div className="col-lg-8">
                        <h4 className="secondaryLabel">Features</h4>
                        {
                          packageData?.features?.map((item, index) => (
                            <p className="secondaryText">{index + 1}. {item}</p>
                          ))
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-8">
                        <h4 className="secondaryLabel">Access to</h4>
                        {
                          packageData?.genre?.map((item, index) => (
                            <p className="secondaryText">{index + 1}. {item?.name}</p>
                          ))
                        }
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

export default PackageDetails;
