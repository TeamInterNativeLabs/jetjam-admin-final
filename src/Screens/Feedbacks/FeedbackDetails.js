import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import Loader from "../../Components/Loader";
import { useGetFeedbackQuery } from "../../Redux/Apis/Feedback";
import { dateFormatter } from "../../Utils";

const FeedbackDetails = () => {

  const { id } = useParams();

  const { data, isLoading } = useGetFeedbackQuery({ id });

  if (data) {
    var { data: feedbackData } = data
  }

  useEffect(() => {
    document.title = 'JetJams | Feedback Details';
  });

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="mainTitle">
                <BackButton />
                View Feedback
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {
              isLoading ? <Loader /> :
                <div className="col-12">
                  <div className="row">
                    <div className="col-xl-12 col-md-12 mb-3">
                      <h4 className="secondaryLabel">Name</h4>
                      <p className="secondaryText">{feedbackData?.name}</p>
                    </div>
                    {/* <div className="col-xl-12 col-md-12 mb-3">
                      <h4 className="secondaryLabel">User Type</h4>
                      <p className="secondaryText">{feedbackData?.gender}</p>
                    </div> */}
                    <div className="col-xl-12 col-md-12 mb-3">
                      <h4 className="secondaryLabel">Email Address</h4>
                      <p className="secondaryText">{feedbackData?.email}</p>
                    </div>
                    <div className="col-xl-12 col-md-12 mb-3">
                      <h4 className="secondaryLabel">Date</h4>
                      <p className="secondaryText">{dateFormatter(feedbackData?.createdAt)}</p>
                    </div>
                    <div className="col-12 mb-3">
                      <h4 className="secondaryLabel">Subject</h4>
                      <p className="secondaryText">{feedbackData?.subject}</p>
                    </div>
                    <div className="col-12 mb-3">
                      <h4 className="secondaryLabel">Message</h4>
                      <p className="secondaryText">{feedbackData?.message}</p>
                    </div>
                  </div>
                </div>
            }
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default FeedbackDetails;