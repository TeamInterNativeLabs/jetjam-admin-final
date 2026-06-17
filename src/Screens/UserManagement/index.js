import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { faCheck, faEllipsisV, faEye, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from '../../Components/Loader';
import CustomTable from "./../../Components/CustomTable";
import "./style.css";

import { placeholderImage } from "../../Assets/images";
import { useGetUsersQuery, useUpdateUserMutation } from "../../Redux/Apis/User";
import { dateFormatter } from "../../Utils";
import useDebounce from "../../Hooks/useDebounce";

const sortValues = [
  { text: "First Name", value: "first_name" },
  { text: "Last Name",  value: "last_name"  },
  { text: "Email",      value: "email"      },
  { text: "Registered", value: "createdAt"  },
];

const perPageValues = [
  { text: "8",  value: 8  },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
  { text: "50", value: 50 },
];

const accountStatusOptions = [
  { text: "All",      value: ""      },
  { text: "Active",   value: "true"  },
  { text: "Inactive", value: "false" },
];

const subscriptionStatusOptions = [
  { text: "All",          value: ""          },
  { text: "Subscribed",   value: "subscribed" },
  { text: "No Plan",      value: "none"       },
];

export const UserManagement = () => {

  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [showModal,  setShowModal]  = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);

  const [currentPage,       setCurrentPage]       = useState(1);
  const [itemsPerPage,      setItemsPerPage]       = useState(perPageValues[0].value);
  const [selectedUserId,    setSelectedUserId]     = useState();
  const [isFilterOpen,      setIsFilterOpen]       = useState(false);
  const [sortBy,            setSortBy]             = useState(sortValues[0].value);
  const [from,              setFrom]               = useState("");
  const [to,                setTo]                 = useState("");
  const [accountStatus,     setAccountStatus]      = useState("");

  const [search, debouncedValue, onChange] = useDebounce();

  // Build query args — only pass active filter when set
  const queryArgs = {
    currentPage,
    itemsPerPage,
    role: "user",
    search: debouncedValue,
    sortBy,
    from,
    to,
    ...(accountStatus !== "" ? { active: accountStatus } : {}),
  };

  const { data, isFetching: isLoading, refetch } = useGetUsersQuery(queryArgs);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleSearch     = (e)    => { onChange(e.target.value); setCurrentPage(1); };
  const toggleFilter     = ()     => setIsFilterOpen(!isFilterOpen);

  const clearFilters = () => {
    setFrom(""); setTo(""); setAccountStatus("");
    setSortBy(sortValues[0].value); setItemsPerPage(8);
    onChange(""); setCurrentPage(1);
  };

  const inactiveMale = async () => {
    await changeUserStatus({ id: selectedUserId, payload: { active: false } });
    refetch();
    setSelectedUserId();
    setShowModal(false);
    setShowModal2(true);
  };

  const activeMale = async () => {
    await changeUserStatus({ id: selectedUserId, payload: { active: true } });
    refetch();
    setSelectedUserId();
    setShowModal3(false);
    setShowModal4(true);
  };

  useEffect(() => { document.title = 'JetJams | User Management'; }, []);

  const maleHeaders = [
    { key: "sno",    title: "S.No"          },
    { key: "name",   title: "Name"          },
    { key: "email",  title: "Email"         },
    { key: "plan",   title: "Plan"          },
    { key: "sub",    title: "Sub Status"    },
    { key: "dates",  title: "Sub Start/End" },
    { key: "joined", title: "Registered"    },
    { key: "status", title: "Account"       },
    { key: "action", title: "Actions"       },
  ];

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12">
            <div className="dashCard">

              {/* Top bar */}
              <div className="row mb-3 justify-content-between align-items-center">
                <div className="col-md-4 mb-2">
                  <h2 className="mainTitle">Users
                    {data?.total != null && (
                      <span style={{ fontSize: '14px', fontWeight: 'normal', marginLeft: '8px', color: '#aaa' }}>
                        ({data.total} total)
                      </span>
                    )}
                  </h2>
                </div>
                <div className="col-md-8 mb-2">
                  <div className="addUser d-flex gap-2 flex-wrap justify-content-end">
                    <CustomButton
                      type="button"
                      icon={faFilter}
                      className="primaryButton rounded-50"
                      onClick={toggleFilter}
                    />
                    <CustomInput
                      type="text"
                      placeholder="Search name or email..."
                      value={search}
                      inputClass="mainInput"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>

              {/* Filter bar */}
              {isFilterOpen && (
                <div className="row mb-3 align-items-end">
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Registered From</label>
                    <input type="date" className="mainInput form-control" value={from}
                      onChange={e => { setFrom(e.target.value); setCurrentPage(1); }} />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Registered To</label>
                    <input type="date" className="mainInput form-control" value={to}
                      onChange={e => { setTo(e.target.value); setCurrentPage(1); }} />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Account Status</label>
                    <select className="mainInput form-control" value={accountStatus}
                      onChange={e => { setAccountStatus(e.target.value); setCurrentPage(1); }}>
                      {accountStatusOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Sort By</label>
                    <select className="mainInput form-control" value={sortBy}
                      onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}>
                      {sortValues.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Per Page</label>
                    <select className="mainInput form-control" value={itemsPerPage}
                      onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                      {perPageValues.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 mb-2 d-flex align-items-end">
                    <CustomButton type="button" text="Clear" className="secondaryButton w-100" onClick={clearFilters} />
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="row mb-3">
                {isLoading ? <Loader /> : (
                  <div className="col-12">
                    <CustomTable headers={maleHeaders} length={data?.data?.length}>
                      <tbody>
                        {data?.data?.map((item, index) => (
                          <tr key={item._id}>
                            <td>{(index + 1) + ((currentPage - 1) * itemsPerPage)}</td>
                            <td className="text-capitalize">
                              <img
                                src={item.picture
                                  ? `${process.env.REACT_APP_IMAGE_ENDPOINT}${item.picture}`
                                  : placeholderImage}
                                alt="avatar"
                                className="thumbnail"
                              />
                              {item.first_name} {item.last_name}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.subscription?.plan ?? <span className="text-muted">—</span>}</td>
                            <td className={
                              item.subscription?.active
                                ? 'greenColor'
                                : item.subscription?.canceledAt
                                  ? 'text-warning'
                                  : item.subscription
                                    ? 'redColor'
                                    : ''
                            }>
                              {item.subscription
                                ? item.subscription.active
                                  ? 'Active'
                                  : item.subscription.canceledAt
                                    ? 'Canceled'
                                    : 'Inactive'
                                : <span className="text-muted">No Plan</span>}
                            </td>
                            <td style={{ fontSize: '12px' }}>
                              {item.subscription
                                ? `${dateFormatter(item.subscription.createdAt)} / ${dateFormatter(item.subscription.expiry)}`
                                : <span className="text-muted">—</span>}
                            </td>
                            <td>{dateFormatter(item.createdAt)}</td>
                            <td className={item.active ? 'greenColor' : 'redColor'}>
                              {item.active ? 'Active' : 'Inactive'}
                            </td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/users/${item._id}`} className="tableAction">
                                    <FontAwesomeIcon icon={faEye} className="tableActionIcon" />View
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setSelectedUserId(item._id);
                                      item.active ? setShowModal(true) : setShowModal3(true);
                                    }}
                                    className="tableAction"
                                  >
                                    {item.active
                                      ? <><FontAwesomeIcon icon={faTimes} className="tableActionIcon" />Deactivate</>
                                      : <><FontAwesomeIcon icon={faCheck} className="tableActionIcon" />Activate</>
                                    }
                                  </button>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </CustomTable>
                    <CustomPagination
                      length={data?.data?.length}
                      itemsPerPage={itemsPerPage}
                      totalItems={data?.total}
                      currentPage={currentPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      <CustomModal
        loading={isUpdating}
        show={showModal}
        close={() => setShowModal(false)}
        action={inactiveMale}
        heading='Deactivate this user? Their active subscription will also be canceled immediately.'
      />
      <CustomModal show={showModal2} close={() => setShowModal2(false)} success heading='User deactivated and subscription canceled.' />

      <CustomModal
        loading={isUpdating}
        show={showModal3}
        close={() => setShowModal3(false)}
        action={activeMale}
        heading='Activate this user?'
      />
      <CustomModal show={showModal4} close={() => setShowModal4(false)} success heading='User activated.' />
    </DashboardLayout>
  );
};
