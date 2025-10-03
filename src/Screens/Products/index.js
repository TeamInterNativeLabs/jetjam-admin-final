import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { faFilter } from "@fortawesome/free-solid-svg-icons";

import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import CustomModal from "../../Components/CustomModal";
import CustomPagination from "../../Components/CustomPagination";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from '../../Components/Loader';

import "./style.css";

import CustomFilters from "../../Components/CustomFilters";
import ProductCard from "../../Components/ProductCard";
import { useGetProductsQuery, useUpdateProductMutation } from "../../Redux/Apis/Product";

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
    },
    {
        text: "50",
        value: 50,
    },
    {
        text: "100",
        value: 100,
    }
];

export const Products = () => {

    const navigate = useNavigate()
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);
    const [showModal5, setShowModal5] = useState(false);
    const [showModal6, setShowModal6] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(perPageValues[0].value);
    const [inputValue, setInputValue] = useState('');
    const [selectedProductId, setSelectedProductId] = useState();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [sortBy, setSortBy] = useState(sortValues[0].value);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const { data, isLoading, refetch } = useGetProductsQuery({
        currentPage,
        itemsPerPage: itemsPerPage,
        role: "user",
        search: inputValue,
        sortBy,
        from,
        to
    });

    const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const inactiveMale = async () => {
        await updateProduct({ id: selectedProductId, payload: { active: false } })
        refetch()
        setSelectedProductId()
        setShowModal(false)
        setShowModal2(true)
    }

    const activeMale = async () => {
        await updateProduct({ id: selectedProductId, payload: { active: true } })
        refetch()
        setSelectedProductId()
        setShowModal3(false)
        setShowModal4(true)
    }

    const deleteProduct = async () => {
        await updateProduct({ id: selectedProductId, payload: { isDeleted: true } })
        refetch()
        setSelectedProductId()
        setShowModal5(false)
        setShowModal6(true)
    }

    const handleChange = (e) => {
        setCurrentPage(1)
        setInputValue(e.target.value);
    }

    useEffect(() => {
        document.title = 'JetJams | Products';
    }, []);

    return (
        <>
            <DashboardLayout>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="dashCard">
                                <div className="row mb-3 justify-content-between">
                                    <div className="col-md-6 mb-2">
                                        <h2 className="mainTitle">Products</h2>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="addUser">
                                            {/* <CustomButton type="button" text="Add User" className="primaryButton" /> */}
                                            <CustomButton type="button" icon={faFilter} className="primaryButton rounded-50" onClick={toggleFilter} />
                                            <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                                        </div>
                                    </div>
                                    <CustomFilters
                                        isFilterOpen={isFilterOpen}

                                        // filterSort={props?.filterSort}
                                        // filterSortValue={props?.filterSortValue}
                                        // setFilterSortValue={props?.setFilterSortValue}
                                        // filterSortValues={props?.filterSortValues}

                                        // filterSearch={props?.filterSearch}
                                        // filterSearchValue={props?.filterSearchValue}
                                        // setFilterSearchValue={props?.setFilterSearchValue}

                                        // dateFilter={props?.dateFilter}
                                        // filterFrom={props?.filterFrom}
                                        // setFilterFrom={props?.setFilterFrom}
                                        // filterTo={props?.filterTo}
                                        // setFilterTo={props?.setFilterTo}

                                        perPage
                                        perPageValues={perPageValues}
                                        itemsPerPage={itemsPerPage}
                                        setItemsPerPage={setItemsPerPage}
                                    />
                                </div>
                                <div className="row mb-3 justify-content-end">
                                    <div className="col-3 d-flex justify-content-end">
                                        <CustomButton text={"Add Product"} onClick={() => navigate("/add-product")} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    {
                                        isLoading ? <Loader /> :
                                            data.data.length > 0 ?
                                                <div className="col-12">
                                                    <div className="row d-flex">
                                                        {
                                                            data?.data?.map((item, index) => <ProductCard key={item._id} item={item} onPressAction={() => {
                                                                if (item.active) {
                                                                    setSelectedProductId(item._id)
                                                                    setShowModal(true)
                                                                } else {
                                                                    setSelectedProductId(item._id)
                                                                    setShowModal3(true)
                                                                }
                                                            }} onPressDelete={() => {
                                                                setSelectedProductId(item._id)
                                                                setShowModal5(true)
                                                            }} />)
                                                        }
                                                    </div>
                                                    <CustomPagination
                                                        length={data?.data?.length}
                                                        itemsPerPage={itemsPerPage}
                                                        totalItems={data?.total}
                                                        currentPage={currentPage}
                                                        onPageChange={handlePageChange}
                                                    />
                                                </div>
                                                :
                                                <div className="empty">
                                                    <h3>No Data Found</h3>
                                                </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <CustomModal loading={isUpdating} show={showModal} close={() => { setShowModal(false) }} action={inactiveMale} heading='Are you sure you want to mark this product as Inactive?' />
                    <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                    <CustomModal loading={isUpdating} show={showModal3} close={() => { setShowModal3(false) }} action={activeMale} heading='Are you sure you want to mark this product as Active?' />
                    <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />

                    <CustomModal loading={isUpdating} show={showModal5} close={() => { setShowModal5(false) }} action={deleteProduct} heading='Are you sure you want to delete this product?' />
                    <CustomModal show={showModal6} close={() => { setShowModal6(false) }} success heading='Deleted' />
                </div>
            </DashboardLayout>
        </>
    );
};
