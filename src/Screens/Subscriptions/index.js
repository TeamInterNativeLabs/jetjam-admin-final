import React, { useEffect, useState } from "react";


import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import CustomTable from "../../Components/CustomTable";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from '../../Components/Loader';

import "./style.css";

import { useGetSubscriptionsQuery } from "../../Redux/Apis/Subscription";
import { useUpdateUserMutation } from "../../Redux/Apis/User";
import { dateFormatter } from "../../Utils";

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

const Subscriptions = () => {

  const [changeUserStatus, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(perPageValues[0].value);
  const [inputValue, setInputValue] = useState('');
  const [selectedUserId, setSelectedUserId] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [sortBy, setSortBy] = useState(sortValues[0].value);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const { data, isLoading, isFetching, refetch } = useGetSubscriptionsQuery({
    currentPage,
    itemsPerPage,
    search: inputValue,
    sortBy,
    from,
    to,
  });

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const inactiveMale = async () => {
    await changeUserStatus({ id: selectedUserId, payload: { active: false } })
    refetch()
    setSelectedUserId()
    setShowModal(false)
    setShowModal2(true)
  }

  const activeMale = async () => {
    await changeUserStatus({ id: selectedUserId, payload: { active: true } })
    refetch()
    setSelectedUserId()
    setShowModal3(false)
    setShowModal4(true)
  }

  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    document.title = 'JetJams | Paid Subscriptions';
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "package",
      title: "Package Name",
    },
    {
      key: "user",
      title: "User Name",
    },
    {
      key: "price",
      title: "Price",
    },
    {
      key: "registered",
      title: "Subscribed On",
    },
    {
      key: "expiry",
      title: "Expiry",
    },
    {
      key: "status",
      title: "Status",
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
                    <h2 className="mainTitle">Paid Subscriptions</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      {/* <CustomButton type="button" text="Add User" className="primaryButton" /> */}
                      {/* <CustomButton type="button" icon={faFilter} className="primaryButton rounded-50" onClick={toggleFilter} /> */}
                      <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                    </div>
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
                          length={data?.data?.length}
                        >
                          <tbody>
                            {data?.data?.map((item, index) => (
                              <tr key={item._id}>
                                <td>{(index + 1) + ((currentPage - 1) * itemsPerPage)}</td>
                                <td className="text-capitalize">
                                  {item?.package?.title}
                                </td>
                                <td className="text-capitalize">
                                  {item?.user?.first_name} {item?.user?.last_name}
                                </td>
                                <td>$ {item?.package?.price}</td>
                                <td>{dateFormatter(item.createdAt)}</td>
                                <td>{dateFormatter(item.expiry)}</td>
                                <td className={item.active ? 'greenColor' : "redColor"}>{item.active ? 'Active' : "Inactive"}</td>
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
                  }
                </div>
              </div>
            </div>
          </div>

          <CustomModal loading={isUpdating} show={showModal} close={() => { setShowModal(false) }} action={inactiveMale} heading='Are you sure you want to mark this user as inactive?' />
          <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

          <CustomModal loading={isUpdating} show={showModal3} close={() => { setShowModal3(false) }} action={activeMale} heading='Are you sure you want to mark this user as Active?' />
          <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Subscriptions
