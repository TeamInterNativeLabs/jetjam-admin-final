import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faCheck, faEllipsisV, faEye, faPencil, faShareAlt, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";

import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import CustomTable from "../../Components/CustomTable";
import "./style.css";

import {
  useGetAllAlbumsQuery,
  useDeletePaidAlbumMutation,
  useHandlePaidAlbumStatusMutation,
} from "../../Redux/Apis/Albums";
import { dateFormatter } from "../../Utils";
import useDebounce from "../../Hooks/useDebounce";

const perPageValues = [
  { text: "8",  value: 8  },
  { text: "15", value: 15 },
  { text: "30", value: 30 },
];

const maleHeaders = [
  { key: "id",       title: "S.No"       },
  { key: "name",     title: "Name"       },
  { key: "genre",    title: "Genre"      },
  { key: "tracks",   title: "Tracks"     },
  { key: "length",   title: "Length"     },
  { key: "price",    title: "Price"      },
  { key: "created",  title: "Created At" },
  { key: "status",   title: "Status"     },
  { key: "actions",  title: "Actions"    },
];

const PaidAlbum = () => {
  const navigate = useNavigate();

  const [handleStatus,  { isLoading: isUpdating }]                    = useHandlePaidAlbumStatusMutation();
  const [deletePaidAlbumApi, { isLoading: isDeleting, isSuccess: deleteSuccess }] = useDeletePaidAlbumMutation();

  const [showInactiveConfirm, setShowInactiveConfirm] = useState(false);
  const [showInactiveDone,    setShowInactiveDone]    = useState(false);
  const [showActiveConfirm,   setShowActiveConfirm]   = useState(false);
  const [showActiveDone,      setShowActiveDone]      = useState(false);
  const [deleteModal,         setDeleteModal]         = useState(false);
  const [confirmDeleteModal,  setConfirmDeleteModal]  = useState(false);

  const [currentPage,  setCurrentPage]  = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageValues[0].value);
  const [selectedId,   setSelectedId]   = useState(null);

  const [search, debouncedValue, onChange] = useDebounce();

  const { data, isFetching: isLoading, refetch } = useGetAllAlbumsQuery({
    page: currentPage,
    rowsPerPage: itemsPerPage,
    ...(debouncedValue ? { search: debouncedValue } : {}),
  });

  // After delete succeeds
  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      setSelectedId(null);
      setDeleteModal(false);
      setConfirmDeleteModal(true);
    }
  }, [deleteSuccess]);

  useEffect(() => { document.title = "JetJams | Paid Albums"; }, []);

  const doInactive = async () => {
    await handleStatus(selectedId);
    refetch();
    setSelectedId(null);
    setShowInactiveConfirm(false);
    setShowInactiveDone(true);
  };

  const doActive = async () => {
    await handleStatus(selectedId);
    refetch();
    setSelectedId(null);
    setShowActiveConfirm(false);
    setShowActiveDone(true);
  };

  const doDelete = async () => {
    await deletePaidAlbumApi(selectedId);
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12">
            <div className="dashCard">
              {/* Header */}
              <div className="row mb-3 justify-content-between align-items-center">
                <div className="col-md-6 mb-2">
                  <h2 className="mainTitle">Paid Albums</h2>
                </div>
                <div className="col-md-6 mb-2">
                  <div className="addUser d-flex gap-2">
                    <CustomButton
                      type="button"
                      text="Add Paid Album"
                      className="primaryButton"
                      onClick={() => navigate("/paid-albums/add")}
                    />
                    <CustomInput
                      type="text"
                      placeholder="Search..."
                      value={search}
                      inputClass="mainInput"
                      onChange={e => onChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="row mb-3">
                {isLoading ? <Loader /> : (
                  <div className="col-12">
                    <CustomTable headers={maleHeaders} length={data?.data?.length}>
                      <tbody>
                        {data?.data?.map((item, index) => (
                          <tr key={item._id}>
                            <td>{(index + 1) + ((currentPage - 1) * itemsPerPage)}</td>
                            <td className="text-capitalize">{item.name}</td>
                            <td>{item?.genre?.name || "—"}</td>
                            <td>{item?.tracks?.length ?? 0}</td>
                            <td>{((item?.length || 0) / 60).toFixed(0)} min</td>
                            <td><strong>${item.price}</strong></td>
                            <td>{dateFormatter(item.createdAt)}</td>
                            <td className={item.active ? "greenColor" : "redColor"}>
                              {item.active ? "Active" : "Inactive"}
                            </td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <Link to={`/paid-albums/${item._id}`} className="tableAction">
                                    <FontAwesomeIcon icon={faEye} className="tableActionIcon" />View
                                  </Link>
                                  <Link to={`/paid-albums/edit/${item._id}`} className="tableAction">
                                    <FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit
                                  </Link>
                                  <button
                                    onClick={() => {
                                      const url = `${process.env.REACT_APP_SITE_URL || 'https://www.jetjams.net'}/purchase-album/${item._id}`;
                                      navigator.clipboard.writeText(url);
                                      alert('Shareable link copied to clipboard!');
                                    }}
                                    className="tableAction"
                                  >
                                    <FontAwesomeIcon icon={faShareAlt} className="tableActionIcon" />Copy Link
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedId(item._id);
                                      item.active ? setShowInactiveConfirm(true) : setShowActiveConfirm(true);
                                    }}
                                    className="tableAction"
                                  >
                                    {item.active
                                      ? <><FontAwesomeIcon icon={faTimes} className="tableActionIcon" />Deactivate</>
                                      : <><FontAwesomeIcon icon={faCheck} className="tableActionIcon" />Activate</>
                                    }
                                  </button>
                                  <button
                                    onClick={() => { setSelectedId(item._id); setDeleteModal(true); }}
                                    className="tableAction text-danger"
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="tableActionIcon" />Delete
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
                      onPageChange={p => setCurrentPage(p)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CustomModal loading={isUpdating} show={showInactiveConfirm} close={() => setShowInactiveConfirm(false)} action={doInactive} heading="Mark this album as Inactive?" />
      <CustomModal show={showInactiveDone} close={() => setShowInactiveDone(false)} success heading="Album marked as Inactive" />
      <CustomModal loading={isUpdating} show={showActiveConfirm} close={() => setShowActiveConfirm(false)} action={doActive} heading="Mark this album as Active?" />
      <CustomModal show={showActiveDone} close={() => setShowActiveDone(false)} success heading="Album marked as Active" />
      <CustomModal loading={isDeleting} show={deleteModal} close={() => setDeleteModal(false)} action={doDelete} heading="Delete this paid album? This cannot be undone." />
      <CustomModal show={confirmDeleteModal} close={() => setConfirmDeleteModal(false)} success heading="Paid Album Deleted Successfully" />
    </DashboardLayout>
  );
};

export default PaidAlbum;
