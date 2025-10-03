import React, { useCallback, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BackButton from "../../Components/BackButton";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import { useGetGeneralQuery } from "../../Redux/Apis/General";
import { useUploadImageMutation } from "../../Redux/Apis/Image";
import { useGetProductsQuery, useUpdateProductMutation } from "../../Redux/Apis/Product";
import { useGetSubcategoriesQuery } from "../../Redux/Apis/Subcategory";

const EditProduct = () => {

    const navigate = useNavigate()
    const ref = useRef()
    const { id } = useParams();

    const { data: product, isLoading: productLoading, isSuccess: productSuccess } = useGetProductsQuery({ id });

    const { data: generalData, refetch } = useGetGeneralQuery()

    const [upload, { isLoading }] = useUploadImageMutation()
    const [update, { data: res, isLoading: isCreating, isSuccess }] = useUpdateProductMutation()

    const [files, setFiles] = useState()
    const [images, setImages] = useState()
    const [variants, setVariants] = useState([
        {
            name: "",
            options: [{ name: "", stock: 0, outOfStock: false, image: null }]
        }
    ])
    const [discount, setDiscount] = useState({
        percentage: "",
        expiry: ""
    })
    const [quantityDiscounts, setQuantityDiscounts] = useState([
        {
            quantity: "",
            percentage: ""
        }
    ])
    const [prices, setPrices] = useState()
    const [data, setData] = useState({
        name: "",
        description: "",
        hot: false,
        trending: false,
        featured: false,
        newProduct: false,
        category: null,
        brand: null,
        subcategory: null
    })

    useEffect(() => {
        document.title = 'JetJams | Edit Product';

        if (!generalData) {
            refetch()
        }

    }, [generalData]);

    useEffect(() => {
        if (product) {
            setImages(product?.data?.images)
        }
    }, [product])

    useEffect(() => {

        if (productSuccess) {

            let { data } = product

            let payload = {
                name: data.name,
                description: data.description,
                hot: data.hot,
                trending: data.trending,
                featured: data.featured,
                newProduct: data.newProduct,
                category: data?.category?._id,
                brand: data?.brand?._id,
                subcategory: data?.subcategory?._id
            }

            setPrices(data?.priceVariation)
            setQuantityDiscounts(data?.quantityDiscounts)
            setVariants(data?.variations)
            setDiscount(data?.discount)

            setData(payload)

        }

    }, [productSuccess])

    useEffect(() => {

        if (isSuccess) {
            toast.success(res?.data?.message)
            navigate('/products')
        }

    }, [isSuccess])

    const { general } = useSelector(state => state.generalSlice)

    const { data: subcategories } = useGetSubcategoriesQuery({ rowsPerPage: 1000, page: 1, category: data?.category })

    const onAddVariant = () => {

        let temp = [...variants]

        if (temp?.length > 0) {
            let lastItem = temp[temp.length - 1]
            if (lastItem.name !== "" && lastItem.options.length > 0) {
                temp.push({
                    name: "",
                    options: [{ name: "", stock: 0, outOfStock: false, image: null }]
                })
            }
        } else {
            temp.push({
                name: "",
                options: [{ name: "", stock: 0, outOfStock: false, image: null }]
            })
        }

        setVariants(temp)

    }

    const onDeleteVariant = (index) => {
        if (variants.length > 1) {
            let temp = [...variants]
            temp.splice(index, 1)
            setVariants(temp)
        }
    }

    const onManipulateVariantOptions = (type, parentIndex, index) => {

        let temp = [...variants]

        if (type === "add") {

            temp[parentIndex].options.push({ name: "", stock: 0, outOfStock: false, image: null })
            setVariants(temp)

        } else if (type === "minus") {

            temp[parentIndex].options.splice(index, 1)
            setVariants(temp)

        }

    }

    const onChangeVariantName = (index, value) => {

        let temp = [...variants]
        temp[index].name = value
        setVariants(temp)

    }

    const onChangeVariantOption = (parentIndex, index, value, key) => {

        // let temp = [...variants]
        let temp = JSON.parse(JSON.stringify(variants))
        let item = temp[parentIndex].options[index]
        item[key] = value
        setVariants(temp)

    }

    const onAddQuantityDiscount = () => {

        let temp = JSON.parse(JSON.stringify(quantityDiscounts))
        let lastItem = temp[temp.length - 1]

        if (lastItem.quantity !== "" && lastItem.percentage !== "") {
            temp.push({
                quantity: "",
                percentage: ""
            })
            setQuantityDiscounts(temp)
        }

    }

    const onChangeQuantityDiscount = (index, key, value) => {

        let temp = JSON.parse(JSON.stringify(quantityDiscounts))
        let item = temp[index]
        item[key] = value
        setQuantityDiscounts(temp)

    }

    const onDeleteQuantityDiscount = (index) => {
        if (quantityDiscounts.length > 1) {
            let temp = JSON.parse(JSON.stringify(quantityDiscounts))
            temp.splice(index, 1)
            setQuantityDiscounts(temp)
        }
    }

    const onChangeDiscount = (key, value) => {

        let temp = { ...discount }
        temp[key] = value
        setDiscount(temp)

    }

    const onSubmit = async () => {

        let imagesRes = []

        if (files && files.length > 0) {

            for (let i = 0; i < files.length; i++) {

                let form = new FormData()
                form.append("image", files[i])

                let res = await upload(form)

                imagesRes.push(res?.data?.path)

            }

        }

        let variantsToSend = [...variants]

        for (let i = 0; i < variants.length; i++) {

            for (let j = 0; j < variants[i].options.length; j++) {

                if (variants[i]?.options[j]?.image && variants[i]?.options[j]?.image != null && typeof variants[i]?.options[j]?.image !== "string") {

                    // console.log("wwww", variants[i].options[j]?.image)

                    let form = new FormData()
                    form.append("image", variants[i].options[j]?.image)

                    let res = await upload(form)
                    variantsToSend[i].options[j].image = res?.data?.path

                }

            }

        }
        let payload = {
            ...data,
            images: [...images, ...imagesRes],
            priceVariation: prices,
            variations: variantsToSend,
            discount,
            quantityDiscounts: quantityDiscounts.filter(item => item.quantity !== "" && item.percentage !== "")
        }

        update({ id, payload })

    }

    let onChangeData = useCallback((key, value) => {

        let temp = { ...data }
        temp[key] = value
        setData(temp)

    }, [data])

    let onChangePrice = useCallback((scale, price) => {

        let temp = JSON.parse(JSON.stringify(prices));
        let index = temp.findIndex(item => item.scale === scale)
        temp[index].price = price
        setPrices(temp)

    }, [prices])

    let onDeletePictures = (index) => {
        let clone = [...images]
        clone.splice(index, 1);
        setImages(clone)
    }

    let onDeleteLocalPictures = (index) => {
        let clone = [...files]
        clone.splice(index, 1);
        setFiles(clone)
    }

    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Product
                            </h2>
                        </div>
                    </div>
                    {
                        productLoading ? <Loader /> :
                            <>
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h4 className="mainTitle">Select Pictures</h4>
                                        <div className="d-flex mb-3 flex-wrap">
                                            {
                                                images && images?.length > 0 && images?.map((item, index) => (
                                                    <div className="d-flex flex-column m-1">
                                                        <p className="m-0 text-danger text-decoration-underline text-end cursor-pointer" onClick={() => onDeletePictures(index)} style={{ cursor: 'pointer' }}>Delete</p>
                                                        <img key={item} className="mx-2" src={process.env.REACT_APP_IMAGE_ENDPOINT + item} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }} />
                                                    </div>
                                                ))
                                            }
                                            {
                                                files && files.length > 0 && Array.from(files).map((item, index) => (
                                                    <div className="d-flex flex-column m-1" >
                                                        <p className="m-0 text-danger text-decoration-underline text-end cursor-pointer" onClick={() => onDeleteLocalPictures(index)} style={{ cursor: 'pointer' }}>Delete</p>
                                                        <img className="mx-2" src={URL.createObjectURL(item)} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <CustomButton text="Upload" variant="primaryButton" onClick={() => ref.current.click()} />
                                        <input
                                            type="file"
                                            hidden
                                            ref={ref}
                                            multiple
                                            onChange={e => setFiles(e.target.files)} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <CustomInput
                                            label="Product Name"
                                            labelClass="mainLabel"
                                            required
                                            placeholder="Enter Product Name"
                                            inputClass="mainInput"
                                            value={data.name}
                                            onChange={e => onChangeData("name", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-8">
                                        <CustomInput
                                            label="Product Description"
                                            labelClass="mainLabel"
                                            required
                                            type="textarea"
                                            placeholder="Enter Product Description"
                                            inputClass="mainInput"
                                            value={data.description}
                                            onChange={e => onChangeData("description", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <SelectBox
                                            label="Select Brand"
                                            labelClass="mainLabel"
                                            selectClass="mainInput"
                                            name="Brands"
                                            required
                                            option={general?.brands}
                                            value={data?.brand}
                                            onChange={e => onChangeData("brand", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                        <div>
                                            <input type="checkbox" className="mx-2" checked={data.hot} value={data.hot} onChange={(e) => onChangeData("hot", !data.hot)} />
                                            <label className="mainLabel">Hot Product</label>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                        <div>
                                            <input type="checkbox" className="mx-2" value={data.trending} checked={data.trending} onChange={() => onChangeData("trending", !data.trending)} />
                                            <label className="mainLabel">Trending Product</label>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                        <div>
                                            <input type="checkbox" className="mx-2" value={data.featured} checked={data.featured} onChange={() => onChangeData("featured", !data.featured)} />
                                            <label className="mainLabel">Featured Product</label>
                                        </div>
                                    </div>
                                    <div className="col-2 d-flex justify-content-center align-items-center">
                                        <div>
                                            <input type="checkbox" className="mx-2" value={data.newProduct} checked={data.newProduct} onChange={() => onChangeData("newProduct", !data.newProduct)} />
                                            <label className="mainLabel">New Arrival</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <SelectBox
                                            label="Select Category"
                                            labelClass="mainLabel"
                                            selectClass="mainInput"
                                            name="Category"
                                            required
                                            option={generalData?.data?.categories}
                                            value={data?.category}
                                            onChange={e => onChangeData("category", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-4">
                                        <SelectBox
                                            label="Select Subcategory"
                                            labelClass="mainLabel"
                                            selectClass="mainInput"
                                            name="Subcategory"
                                            required
                                            option={data?.category && subcategories?.data?.map(item => ({ label: item.name, value: item._id }))}
                                            value={data?.subcategory}
                                            onChange={e => onChangeData("subcategory", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-4">
                                        <h4 className="mainTitle">Enter Prices</h4>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-2">
                                        <CustomInput
                                            label="Small Scale"
                                            labelClass="mainLabel"
                                            required
                                            placeholder="Enter Price"
                                            inputClass="mainInput"
                                            value={prices?.find(item => item.scale === "small").price}
                                            onChange={e => onChangePrice("small", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <CustomInput
                                            label="Medium Scale"
                                            labelClass="mainLabel"
                                            required
                                            placeholder="Enter Price"
                                            inputClass="mainInput"
                                            value={prices?.find(item => item.scale === "medium").price}
                                            onChange={e => onChangePrice("medium", e.target.value)}
                                        />
                                    </div>
                                    <div className="col-2">
                                        <CustomInput
                                            label="Large Scale"
                                            labelClass="mainLabel"
                                            required
                                            placeholder="Enter Price"
                                            inputClass="mainInput"
                                            value={prices?.find(item => item.scale === "large").price}
                                            onChange={e => onChangePrice("large", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-8 d-flex align-items-center">
                                        <h4 className="mainTitle m-0">Enter Variants</h4>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end align-items-center">
                                        <CustomButton
                                            text="Add More"
                                            variant="primaryButton"
                                            onClick={onAddVariant}
                                        />
                                    </div>
                                </div>
                                {
                                    variants?.map((item, index) => (
                                        <div key={index} className="row my-3">
                                            <div className="col-12 p-2">
                                                <div className="variant-card">
                                                    <div className="row">
                                                        {
                                                            variants.length > 1 &&
                                                            <label className="mainLabel text-danger text-end text-underline" onClick={() => onDeleteVariant(index)}>Delete</label>
                                                        }
                                                    </div>
                                                    <div className="col-2">
                                                        <CustomInput
                                                            label="Variant Name"
                                                            labelClass="mainLabel"
                                                            required
                                                            placeholder="Enter Variant Name"
                                                            inputClass="mainInput"
                                                            value={item.name}
                                                            onChange={e => onChangeVariantName(index, e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <label className="mainLabel">Variant Options</label>
                                                        <div className="d-flex flex-wrap">
                                                            {
                                                                item?.options?.map((itemm, indexx) => (
                                                                    <div className="me-2 d-flex align-items-center" key={indexx}>
                                                                        {/* <CustomInput
                                                                            placeholder="Enter Option"
                                                                            inputClass="mainInput mx-2"
                                                                            value={itemm}
                                                                            onChange={e => onChangeVariantOption(index, indexx, e.target.value)}
                                                                        /> */}
                                                                        <div className="mx-2">
                                                                            <CustomInput
                                                                                placeholder="Enter Option"
                                                                                inputClass="mainInput mx-2"
                                                                                value={itemm.name}
                                                                                onChange={e => onChangeVariantOption(index, indexx, e.target.value, "name")}
                                                                            />
                                                                        </div>
                                                                        <div className="mx-2">
                                                                            <CustomInput
                                                                                placeholder="Enter Quantity"
                                                                                inputClass="mainInput"
                                                                                value={itemm.stock}
                                                                                onChange={e => onChangeVariantOption(index, indexx, e.target.value, "stock")}
                                                                                type="number"
                                                                            />
                                                                        </div>
                                                                        {/* <div className="mx-5">
                                                                            <input type="checkbox" className="mx-2" value={itemm.outOfStock} checked={itemm.outOfStock} onChange={() => onChangeVariantOption(index, indexx, !itemm.outOfStock, "outOfStock")} />
                                                                            <label className="mainLabel">Out of Stock</label>
                                                                        </div> */}
                                                                        {/* {itemm.image ? <img src={typeof itemm.image === "string" ? process.env.REACT_APP_IMAGE_ENDPOINT + itemm.image : URL.createObjectURL(itemm.image)} alt="Thumbnail Image" className="img-thumbnail" /> : null} */}
                                                                        <input
                                                                            type="file"
                                                                            onChange={e => onChangeVariantOption(index, indexx, e.target.files[0], "image")} />
                                                                        {
                                                                            item?.options?.length > 1 &&
                                                                            <h5 className="text-danger ms-3" onClick={() => onManipulateVariantOptions("minus", index, indexx)}>-</h5>
                                                                        }
                                                                        {
                                                                            indexx === item?.options?.length - 1 &&
                                                                            <h5 className="ms-3" onClick={() => onManipulateVariantOptions("add", index)}>+</h5>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className="row mb-3">
                                    <div className="col-4">
                                        <h4 className="mainTitle">Discount</h4>
                                        <div className="row my-3">
                                            <div className="col-12 p-2">
                                                <div className="variant-card">
                                                    <div className="col-12">
                                                        <CustomInput
                                                            label="Percentage"
                                                            labelClass="mainLabel"
                                                            required
                                                            placeholder="Enter Percentage"
                                                            inputClass="mainInput"
                                                            value={discount?.percentage}
                                                            onChange={e => onChangeDiscount("percentage", e.target.value)}
                                                            type="number"
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <CustomInput
                                                            label="Expiry"
                                                            labelClass="mainLabel"
                                                            required
                                                            placeholder="Enter Expiry"
                                                            inputClass="mainInput"
                                                            value={discount?.expiry}
                                                            onChange={e => onChangeDiscount("expiry", e.target.value)}
                                                            type="date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-8 d-flex align-items-center">
                                        <h4 className="mainTitle m-0">Quantity Discounts</h4>
                                    </div>
                                    <div className="col-4 d-flex justify-content-end align-items-center">
                                        <CustomButton
                                            text="Add More"
                                            variant="primaryButton"
                                            onClick={onAddQuantityDiscount}
                                        />
                                    </div>
                                </div>
                                {
                                    quantityDiscounts?.map((item, index) => (
                                        <div key={index} className="row my-3">
                                            <div className="col-12 p-2">
                                                <div className="variant-card">
                                                    <div className="row">
                                                        {
                                                            quantityDiscounts.length > 1 &&
                                                            <label className="mainLabel text-danger text-end text-underline" onClick={() => onDeleteQuantityDiscount(index)}>Delete</label>
                                                        }
                                                    </div>
                                                    <div className="col-2">
                                                        <CustomInput
                                                            label="Quantity"
                                                            labelClass="mainLabel"
                                                            required
                                                            placeholder="Enter Quantity"
                                                            inputClass="mainInput"
                                                            value={item.quantity}
                                                            onChange={e => onChangeQuantityDiscount(index, "quantity", parseInt(e.target.value))}
                                                            type="number"
                                                        />
                                                    </div>
                                                    <div className="col-2">
                                                        <CustomInput
                                                            label="Discount"
                                                            labelClass="mainLabel"
                                                            required
                                                            placeholder="Enter Percentage"
                                                            inputClass="mainInput"
                                                            value={item.percentage}
                                                            onChange={e => onChangeQuantityDiscount(index, "percentage", parseInt(e.target.value))}
                                                            type="number"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }

                                <div className="row mb-3">
                                    <div className="col-4">
                                        <CustomButton
                                            text="Save"
                                            onClick={onSubmit}
                                            loading={isLoading || isCreating}
                                        />
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </DashboardLayout>
        </>
    );
};

export default EditProduct;
