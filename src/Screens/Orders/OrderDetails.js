import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { SelectBox } from "../../Components/CustomSelect";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import UseTableControls from "../../Config/UseTableControls";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../Redux/Apis/Order";
import { useUpdateUserMutation } from "../../Redux/Apis/User";
import { dateFormatter } from "../../Utils";
import { useSelector } from "react-redux";

const OrderDetails = () => {

  const { id } = useParams();

  const { data, isLoading, refetch } = useGetOrdersQuery({ id });
  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [changeOrderStatus, { isLoading: updating }] = useUpdateOrderStatusMutation();

  const { general } = useSelector(state => state.generalSlice)

  if (data) {
    var { data: orderDetails } = data
  }

  UseTableControls();



  // const [orderDetails, setProfileData] = useState({});
  // const [paymentData, setPaymentData] = useState([]);
  // const singleData = []

  // console.log(paymentData)


  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const inactiveMale = () => {
    changeUserStatus({ id: orderDetails?._id, payload: { active: false } }).then(() => {
      refetch()
      setShowModal(false)
      setShowModal2(true)
    })
  }

  const activeMale = () => {
    changeUserStatus({ id: orderDetails?._id, payload: { active: true } }).then(() => {
      refetch()
      setShowModal3(false)
      setShowModal4(true)
    })
  }

  useEffect(() => {
    document.title = 'JetJams | Details';
  }, [])

  const onChangeStatus = (status) => {
    changeOrderStatus({ id, payload: { status } }).then(() => {
      refetch()
    })
  }


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Order Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            {
              isLoading ? <Loader /> :
                <>
                  <div className="col-12">
                    <div className="row mb-3 justify-content-end align-items-center">
                      <div className="col-2 bg-red ">
                        <SelectBox
                          selectClass="text-capitalize mainInput"
                          name="Status"
                          option={Object.values(general.ORDER_STATUS).map(item => ({ label: item, value: item }))}
                          value={orderDetails?.status}
                          onChange={e => onChangeStatus(e.target.value)}
                        />
                      </div>
                      <div className="col-lg-2 text-end order-1 order-lg-2 mb-3">
                        <span className={`statusBadge text-capitalize ${orderDetails?.status === "returned" || orderDetails?.status === "cancelled" ? 'statusBadgeInactive' : 'statusBadgeActive'}`}>{orderDetails?.status}</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Name</h4>
                            <p className="secondaryText">{orderDetails.customer?.fullName}</p>
                          </div>
                          {/* <div className="col-xl-6 col-md-6 mb-3">
                          <h4 className="secondaryLabel">Username</h4>
                          <p className="secondaryText">{orderDetails.username}</p>
                        </div> */}
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Email Address</h4>
                            <p className="secondaryText">{orderDetails.customer?.email}</p>
                          </div>
                          {/* <div className="col-xl-6 col-md-6 mb-3">
                          <h4 className="secondaryLabel">Interests and Hobbies</h4>
                          {orderDetails.interest ? orderDetails.interest.map((item) => (
                            <p className="secondaryText">{item}</p>
                          )) :
                            ''}
                        </div> */}
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Payment Via</h4>
                            <p className="secondaryText text-capitalize">{orderDetails.paymentVia}</p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-xl-4 col-md-4 mb-3">
                            <h4 className="secondaryLabel">Shipping Charges</h4>
                            <p className="secondaryText">$ {orderDetails.shippingCharges || "0"}</p>
                          </div>
                          <div className="col-xl-4 col-md-4 mb-3">
                            <h4 className="secondaryLabel">Tax</h4>
                            <p className="secondaryText">$ {orderDetails.tax}</p>
                          </div>
                          <div className="col-xl-4 col-md-4 mb-3">
                            <h4 className="secondaryLabel">Total</h4>
                            <p className="secondaryText text-capitalize">$ {orderDetails.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <h2 className="mainTitle">
                        Contact Details
                      </h2>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Name</h4>
                            <p className="secondaryText">{orderDetails.contactDetails?.name}</p>
                          </div>
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Phone</h4>
                            <p className="secondaryText">{orderDetails.contactDetails?.phone}</p>
                          </div>
                          <div className="col-xl-6 col-md-6 mb-3">
                            <h4 className="secondaryLabel">Email Address</h4>
                            <p className="secondaryText">{orderDetails.contactDetails?.email}</p>
                          </div>
                          {
                            orderDetails?.paymentVia === "card" &&
                            <>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Account Number</h4>
                                <p className="secondaryText">{orderDetails.contactDetails?.accountNumber}</p>
                              </div>
                              {/* <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">City</h4>
                                <p className="secondaryText">{orderDetails.contactDetails?.city}</p>
                              </div>
                              <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">State</h4>
                                <p className="secondaryText">{orderDetails.contactDetails?.state}</p>
                              </div>
                              <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">Zip</h4>
                                <p className="secondaryText text-capitalize">{orderDetails.contactDetails?.zip}</p>
                              </div> */}
                              <div className="col-xl-12 col-md-12 mb-3">
                                <h4 className="secondaryLabel">Address</h4>
                                <p className="secondaryText text-capitalize">{orderDetails.contactDetails?.address}</p>
                              </div>
                            </>
                          }
                        </div>
                      </div>
                    </div>
                    {
                      orderDetails.paymentVia == "cheque" &&
                      <>
                        <div className="row">
                          <h2 className="mainTitle">
                            Bank Details
                          </h2>
                          <div className="col-lg-8">
                            <div className="row">
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Name</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.name}</p>
                              </div>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Phone</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.phone}</p>
                              </div>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Fraction</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.fraction}</p>
                              </div>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Routing Number</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.routingNumber}</p>
                              </div>
                              {/* <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">City</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.city}</p>
                              </div>
                              <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">State</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.state}</p>
                              </div>
                              <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">Zip</h4>
                                <p className="secondaryText text-capitalize">{orderDetails.bankDetails?.zip}</p>
                              </div> */}
                              <div className="col-xl-12 col-md-12 mb-3">
                                <h4 className="secondaryLabel">Address</h4>
                                <p className="secondaryText text-capitalize">{orderDetails.bankDetails?.address}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <h2 className="mainTitle">
                            Cheque Details
                          </h2>
                          <div className="col-lg-8">
                            <div className="row">
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Cheque Number</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.chequeNumber}</p>
                              </div>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Payee Name</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.chequePayeeName}</p>
                              </div>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Cheque Amount</h4>
                                <p className="secondaryText">$ {orderDetails.bankDetails?.chequeAmount}</p>
                              </div>
                              <div className="col-xl-6 col-md-6 mb-3">
                                <h4 className="secondaryLabel">Cheque Date</h4>
                                <p className="secondaryText">{dateFormatter(orderDetails.bankDetails?.chequeDate)}</p>
                              </div>
                              <div className="col-xl-4 col-md-4 mb-3">
                                <h4 className="secondaryLabel">Cheque Memo</h4>
                                <p className="secondaryText">{orderDetails.bankDetails?.chequeMemo}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                    <div className="row">
                      <h2 className="mainTitle">
                        Item Details
                      </h2>
                      {
                        orderDetails?.items?.map((item, index) => (
                          <div className="row m-1 p-2">
                            <div className="row">
                              <div className="col-xl-2 col-md-2 mb-3">
                                <img src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${item?.product?.images[0]}`} style={{ width: "100px", height: "100px", objectFit: 'contain' }} />
                              </div>
                              <div className="col-xl-10 col-md-10 mb-3">
                                <div className="row">
                                  <div className="col-xl-6 col-md-6 mb-3">
                                    <h4 className="secondaryLabel">Product Name</h4>
                                    <p className="secondaryText">{item?.product?.name}</p>
                                  </div>
                                  <div className="col-xl-6 col-md-6 mb-3">
                                    <h4 className="secondaryLabel">Product Price</h4>
                                    <p className="secondaryText">{item?.price}</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-xl-6 col-md-6 mb-3">
                                    <h4 className="secondaryLabel">{item?.variation?.name}</h4>
                                    <p className="secondaryText">{item?.option}</p>
                                  </div>
                                  <div className="col-xl-6 col-md-6 mb-3">
                                    <h4 className="secondaryLabel">Quantity</h4>
                                    <p className="secondaryText">{item?.qty}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
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

export default OrderDetails;
