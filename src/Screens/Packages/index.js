import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { faCheck, faEllipsisV, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from '../../Components/Loader';
import CustomTable from "./../../Components/CustomTable";

import "./style.css";

import { useNavigate } from "react-router-dom";
import { useGetPackagesQuery, useDeletePackageMutation } from "../../Redux/Apis/Package";
import { dateFormatter } from "../../Utils";
import CustomButton from "../../Components/CustomButton";

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

const Packages = () => {
  const navigate = useNavigate();
  const [deletePackage, { isLoading: isDeleting }] = useDeletePackageMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageValues[0].value);
  const [inputValue, setInputValue] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState(sortValues[0].value);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data, isLoading, refetch } = useGetPackagesQuery({
    currentPage,
    itemsPerPage,
    search: inputValue,
    sortBy,
    from,
    to,
  });

  const packagesList = data?.data ?? [];

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (pkg) => {
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!packageToDelete?._id) return;
    try {
      await deletePackage(packageToDelete._id).unwrap();
      refetch();
      setShowDeleteModal(false);
      setPackageToDelete(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    document.title = 'JetJams | Subscriptions';
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "title",
      title: "Title",
    },
    {
      key: "price",
      title: "Price",
    },
    {
      key: "duration",
      title: "Duration",
    },
    {
      key: "registered",
      title: "Created At",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Subscriptions</h2>
                  </div>
                  <div className="col-md-6 mb-2 d-flex align-items-center gap-2 justify-content-md-end">
                    <CustomButton type="button" text="Add Package" className="primaryButton" onClick={() => navigate('/packages/add')} />
                    <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                  </div>
                </div>
                <div className="row mb-3">
                  {
                    isLoading ? <Loader /> :
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
                          length={packagesList?.length}
                        >
                          <tbody>
                            {packagesList?.map((item, index) => (
                              <tr key={item._id}>
                                <td>{(index + 1) + ((currentPage - 1) * itemsPerPage)}</td>
                                <td className="text-capitalize">
                                  {item.title}
                                </td>
                                <td className="text-capitalize">
                                  $ {item.price}
                                </td>
                                <td className="text-capitalize">
                                  {item.duration}ly
                                </td>
                                <td>{dateFormatter(item.createdAt)}</td>
                                {/* <td className={item.active ? 'greenColor' : "redColor"}>{item.active ? 'Active' : "Inactive"}</td> */}
                                <td>
                                  <Dropdown className="tableDropdown">
                                    <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                      <FontAwesomeIcon icon={faEllipsisV} />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu align="end" className="tableDropdownMenu">
                                      <Link to={`/packages/${item._id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link>
                                      <button type="button" onClick={() => handleDeleteClick(item)} className="tableAction text-danger"><FontAwesomeIcon icon={faTimes} className="tableActionIcon" />Delete</button>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </CustomTable>
                        <CustomPagination
                          length={packagesList?.length}
                          itemsPerPage={itemsPerPage}
                          totalItems={data?.total}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                        />
                      </div>
                  }
                </div>
              </div>
            </div>
          </div>

          <CustomModal loading={isDeleting} show={showDeleteModal} close={() => { setShowDeleteModal(false); setPackageToDelete(null); }} action={confirmDelete} heading="Delete this package? This cannot be undone." />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Packages
