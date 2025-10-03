import { faEllipsisV, faEye } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { placeholderImage } from "../../Assets/images";
import BackButton from "../../Components/BackButton";
import CustomPagination from "../../Components/CustomPagination";
import CustomTable from "../../Components/CustomTable";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import UseTableControls from "../../Config/UseTableControls";
import { useGetOrdersQuery } from "../../Redux/Apis/Order";
import { useGetUsersQuery, useUpdateUserMutation } from "../../Redux/Apis/User";
import { dateFormatter } from "../../Utils";
import { useSelector } from "react-redux";

const maleHeaders = [
  {
    key: "id",
    title: "S.No",
  },
  {
    key: "trackingNumber",
    title: "Order Number",
  },
  // {
  //   key: "email",
  //   title: "Email Address",
  // },
  {
    key: "paymentVia",
    title: "Payment Via",
  },
  {
    key: "total",
    title: "Total",
  },
  {
    key: "registered",
    title: "Created On",
  },
  {
    key: "status",
    title: "Status",
  },
  {
    key: "actions",
    title: "Actions",
  },
];

const perPageValues = [
  {
    text: "8",
    value: 8,
  },
  {
    text: "15",
    value: 15,
  },
  {
    text: "30",
    value: 30,
  }
];

const sortValues = [
  {
    text: "Name",
    value: "fullName",
  },
  {
    text: "Email",
    value: "email",
  }
];

const CustomerDetails = () => {

  const { id } = useParams();
  const { user } = useSelector(state => state?.authSlice)

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageValues[0].value);
  const [inputValue, setInputValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(sortValues[0].value);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data, isLoading, refetch } = useGetUsersQuery({ id });
  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

  const { data: orders, isLoading: isLoadingOrders } = useGetOrdersQuery({
    currentPage,
    itemsPerPage: 10,
    customer: id
  });

  const [selectedRepresentative, setSelectedRepresentative] = useState("")

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

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)


  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Customer Details
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
                        <div className="profileImage">
                          <img src={profileData.picture ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${profileData?.picture}` : placeholderImage} alt="User" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-xl-4 col-md-4 mb-3">
                            <h4 className="secondaryLabel">Customer Id</h4>
                            <p className="secondaryText">{profileData?.customerId}</p>
                          </div>
                          <div className="col-xl-4 col-md-4 mb-3">
                            <h4 className="secondaryLabel">Name</h4>
                            <p className="secondaryText">{profileData.fullName}</p>
                          </div>
                          <div className="col-xl-4 col-md-4 mb-3">
                            <h4 className="secondaryLabel">Email Address</h4>
                            <p className="secondaryText">{profileData.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-12 mb-2">
                      <h2 className="mainTitle">
                        <b>Orders</b>
                      </h2>
                    </div>
                  </div>
                  <div className="row mb-3">
                    {
                      isLoadingOrders ? <Loader /> :
                        <div className="col-12">
                          <CustomTable
                            headers={maleHeaders}
                            isFilterOpen={isFilterOpen}
                            dateFilter={false}
                            filterSort={true}
                            perPage={true}
                            filterSortValues={sortValues}
                            perPageValues={perPageValues}
                            filterSortValue={sortBy}
                            setFilterSortValue={setSortBy}
                            filterFrom={from}
                            setFilterFrom={setFrom}
                            filterTo={to}
                            setFilterTo={setTo}
                            itemsPerPage={itemsPerPage}
                            setItemsPerPage={setItemsPerPage}
                            length={orders?.data?.length}
                          >
                            <tbody>
                              {orders?.data?.map((item, index) => (
                                <tr key={item._id}>
                                  <td>{(index + 1) + ((currentPage - 1) * itemsPerPage)}</td>
                                  <td className="text-capitalize">
                                    {item?.trackingNumber}
                                  </td>
                                  {/* <td>{item.email}</td> */}
                                  <td className="text-capitalize">{item.paymentVia}</td>
                                  <td className="text-capitalize">${Number(item.total).toFixed(2) || "0"}</td>
                                  <td>{dateFormatter(item.createdAt)}</td>
                                  <td className={`text-capitalize ${item.status === "pending" ? "text-warning" : item.status === "completed" ? 'greenColor' : "redColor"}`}>{item.status}</td>
                                  <td>
                                    <Dropdown className="tableDropdown">
                                      <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                        <FontAwesomeIcon icon={faEllipsisV} />
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu align="end" className="tableDropdownMenu">
                                        <Link to={user?.role === "representative" ? `/representative/orders/${item._id}` : `/orders/${item._id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </CustomTable>
                          <CustomPagination
                            length={orders?.data?.length}
                            itemsPerPage={itemsPerPage}
                            totalItems={orders?.total}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                          />
                        </div>
                    }
                  </div>
                </>
            }
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default CustomerDetails;
