import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import UseTableControls from "../../Config/UseTableControls";
import { useGetAllAlbumsQuery } from "../../Redux/Apis/Albums";
import { useUpdateUserMutation } from "../../Redux/Apis/User";
import { placeholderImage } from "../../Assets/images";

const AlbumDetails = () => {
  const [albumData, setData] = useState();
  // const { data, isLoading, refetch } = useGetAllAlbumsQuery();

  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

  UseTableControls();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const inactiveMale = () => {
    changeUserStatus({ id: albumData?._id, payload: { active: false } }).then(
      () => {
        refetch();
        setShowModal(false);
        setShowModal2(true);
      }
    );
  };

  const activeMale = () => {
    changeUserStatus({ id: albumData?._id, payload: { active: true } }).then(
      () => {
        refetch();
        setShowModal3(false);
        setShowModal4(true);
      }
    );
  };

  useEffect(() => {
    document.title = "JetJams | Album Details";
  }, []);

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Album Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <div className="col-12">
                  {/* <div className="row mb-3 justify-content-between">
                      <div className="col-lg-12 text-end order-1 order-lg-2 mb-3">
                        <button onClick={() => {
                          albumData?.active ? setShowModal(true) : setShowModal3(true)
                        }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {albumData?.active ? 'Inactive' : 'Active'}</button>
                        <span className={`statusBadge ${albumData?.active ? 'statusBadgeActive' : 'statusBadgeInactive'}`}>{albumData?.active ? 'Active' : 'Inactive'}</span>
                      </div>
                    </div> */}
                  <div className="col-lg-4 order-2 order-lg-1 mb-3">
                    <div className="profileImage">
                      <img
                        src={
                          albumData?.image
                            ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${albumData?.image}`
                            : placeholderImage
                        }
                        alt="User"
                      />
                    </div>
                  </div>
                  <audio
                    src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${albumData?.file}`}
                    controls
                    className="my-3"
                  />
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">Name</h4>
                          <p className="secondaryText">{albumData?.name}</p>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">Genre</h4>
                          <p className="secondaryText">
                            {albumData?.genre.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 mb-3">
                      <h4 className="secondaryLabel">Description</h4>
                      <p className="secondaryText">{albumData?.description}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">BPM</h4>
                          <p className="secondaryText">{albumData?.bpm}</p>
                        </div>
                        <div className="col-xl-4 col-md-4 mb-3">
                          <h4 className="secondaryLabel">Length</h4>
                          <p className="secondaryText">
                            {albumData?.length / 60} Minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 mb-3">
                      <h4 className="secondaryLabel">Tracks</h4>
                      {albumData?.tracks?.map((item, index) => (
                        <p className="secondaryText">
                          {index + 1}. {item?.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <CustomModal
          loading={isUpdating}
          show={showModal}
          close={() => {
            setShowModal(false);
          }}
          action={inactiveMale}
          heading="Are you sure you want to mark this user as inactive?"
        />
        <CustomModal
          show={showModal2}
          close={() => {
            setShowModal2(false);
          }}
          success
          heading="Marked as Inactive"
        />

        <CustomModal
          loading={isUpdating}
          show={showModal3}
          close={() => {
            setShowModal3(false);
          }}
          action={activeMale}
          heading="Are you sure you want to mark this user as Active?"
        />
        <CustomModal
          show={showModal4}
          close={() => {
            setShowModal4(false);
          }}
          success
          heading="Marked as Active"
        />
      </DashboardLayout>
    </>
  );
};

export default AlbumDetails;
