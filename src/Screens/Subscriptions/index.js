import React, { useEffect, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import CustomTable from "../../Components/CustomTable";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from '../../Components/Loader';
import "./style.css";

import { useGetSubscriptionsQuery } from "../../Redux/Apis/Subscription";
import { dateFormatter } from "../../Utils";

const sortValues = [
  { text: "Subscribed On", value: "createdAt" },
  { text: "Expiry", value: "expiry" },
];

const perPageValues = [
  { text: "8",  value: 8  },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
];

const statusOptions = [
  { text: "All",      value: ""      },
  { text: "Active",   value: "true"  },
  { text: "Inactive", value: "false" },
];

const Subscriptions = () => {

  const [currentPage,  setCurrentPage]  = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageValues[0].value);
  const [inputValue,   setInputValue]   = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy,       setSortBy]       = useState(sortValues[0].value);
  const [from,         setFrom]         = useState("");
  const [to,           setTo]           = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const { data, isLoading, refetch } = useGetSubscriptionsQuery({
    currentPage,
    itemsPerPage,
    search: inputValue,
    sortBy,
    from,
    to,
    ...(activeFilter !== "" ? { active: activeFilter } : {}),
  });

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleChange     = (e) => { setCurrentPage(1); setInputValue(e.target.value); };
  const toggleFilter     = () => setIsFilterOpen(!isFilterOpen);

  useEffect(() => { document.title = 'JetJams | Subscriptions'; }, []);

  const maleHeaders = [
    { key: "id",           title: "S.No"          },
    { key: "package",      title: "Package"        },
    { key: "user",         title: "User"           },
    { key: "subscription", title: "Subscription ID"},
    { key: "price",        title: "Price"          },
    { key: "registered",   title: "Subscribed On"  },
    { key: "expiry",       title: "Expiry"         },
    { key: "status",       title: "Status"         },
    { key: "canceled",     title: "Canceled At"    },
  ];

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12">
            <div className="dashCard">

              {/* Header row */}
              <div className="row mb-3 justify-content-between align-items-center">
                <div className="col-md-4 mb-2">
                  <h2 className="mainTitle">Subscriptions</h2>
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
                      placeholder="Search by user..."
                      value={inputValue}
                      inputClass="mainInput"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Inline filter bar */}
              {isFilterOpen && (
                <div className="row mb-3 align-items-end">
                  <div className="col-md-3 mb-2">
                    <label className="mainLabel">From Date</label>
                    <input
                      type="date"
                      className="mainInput form-control"
                      value={from}
                      onChange={e => { setFrom(e.target.value); setCurrentPage(1); }}
                    />
                  </div>
                  <div className="col-md-3 mb-2">
                    <label className="mainLabel">To Date</label>
                    <input
                      type="date"
                      className="mainInput form-control"
                      value={to}
                      onChange={e => { setTo(e.target.value); setCurrentPage(1); }}
                    />
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Status</label>
                    <select
                      className="mainInput form-control"
                      value={activeFilter}
                      onChange={e => { setActiveFilter(e.target.value); setCurrentPage(1); }}
                    >
                      {statusOptions.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Sort By</label>
                    <select
                      className="mainInput form-control"
                      value={sortBy}
                      onChange={e => { setSortBy(e.target.value); setCurrentPage(1); }}
                    >
                      {sortValues.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 mb-2">
                    <label className="mainLabel">Per Page</label>
                    <select
                      className="mainInput form-control"
                      value={itemsPerPage}
                      onChange={e => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    >
                      {perPageValues.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2 mb-2 d-flex align-items-end">
                    <CustomButton
                      type="button"
                      text="Clear Filters"
                      className="secondaryButton w-100"
                      onClick={() => {
                        setFrom(""); setTo(""); setActiveFilter("");
                        setSortBy(sortValues[0].value);
                        setInputValue(""); setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="row mb-3">
                {isLoading ? <Loader /> : (
                  <div className="col-12">
                    <CustomTable
                      headers={maleHeaders}
                      length={data?.data?.length}
                    >
                      <tbody>
                        {data?.data?.map((item, index) => (
                          <tr key={item._id}>
                            <td>{(index + 1) + ((currentPage - 1) * itemsPerPage)}</td>
                            <td className="text-capitalize">
                              {item?.package?.title || <span className="text-muted">—</span>}
                            </td>
                            <td className="text-capitalize">
                              {item?.user?.first_name
                                ? `${item.user.first_name} ${item.user.last_name}`
                                : <span className="text-muted">—</span>}
                              {item?.user?.email && (
                                <div style={{ fontSize: '11px', color: '#999' }}>{item.user.email}</div>
                              )}
                            </td>
                            <td style={{ fontSize: '11px', wordBreak: 'break-all' }}>
                              {item?.method_subscription_id || "—"}
                            </td>
                            <td>
                              {item?.package?.price != null
                                ? `$ ${item.package.price}`
                                : <span className="text-muted">—</span>}
                            </td>
                            <td>{dateFormatter(item.createdAt)}</td>
                            <td>{dateFormatter(item.expiry)}</td>
                            <td className={item.active ? 'greenColor' : "redColor"}>
                              {item.active ? 'Active' : 'Inactive'}
                            </td>
                            <td>
                              {item.canceledAt
                                ? <span className="text-warning">{dateFormatter(item.canceledAt)}</span>
                                : <span className="text-muted">—</span>}
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
    </DashboardLayout>
  );
};

export default Subscriptions;
