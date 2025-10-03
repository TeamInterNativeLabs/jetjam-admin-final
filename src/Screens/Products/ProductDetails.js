import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import Loader from "../../Components/Loader";
import { useGetFeedbackQuery } from "../../Redux/Apis/Feedback";
import { dateFormatter } from "../../Utils";
import { useGetProductsQuery } from "../../Redux/Apis/Product";
import ImageCard from "../../Components/ImageCard";
import CustomButton from "../../Components/CustomButton";
import CustomTextModal from "../../Components/CustomTextModal";
import { useCreateDiscountMutation } from "../../Redux/Apis/Discount";
import { toast } from "react-toastify";

const ProductDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate()

  const { data, isLoading } = useGetProductsQuery({ id });

  const [modal, setModal] = useState(false)
  const [discount, setDiscount] = useState({ percentage: "", expiry: "" })
  const [savediscount, { data: res, isLoading: creating, isSuccess }] = useCreateDiscountMutation()

  const onChangeDiscount = (key, value) => {
    setDiscount(prev => ({ ...prev, [key]: value }))
  }

  const onSaveDiscount = () => {
    savediscount({ ...discount, product: productData._id })
  }

  const toggle = () => { setModal(!modal) }

  useEffect(() => {
    if (isSuccess) {
      toast.success(res.message)
      toggle()
    }
  }, [isSuccess])

  if (data) {
    var productData = data.data
  }

  useEffect(() => {
    document.title = 'JetJams | Product Details';
  });

  return (
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3">
            <div className="col-12">
              <h2 className="mainTitle">
                <BackButton />
                View Product Details
              </h2>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <CustomButton text="Edit Product" onClick={() => navigate(`/edit-product/${id}`)} />
            </div>
          </div>
          <div className="row mb-3">
            {
              isLoading ? <Loader /> :
                <div className="col-12">
                  <div className="row">
                    <div className="col-12 mb-1">
                      <h4 className="mainTitle">Discount</h4>
                    </div>
                    <div className="col-12 mb-3">
                      {
                        productData?.discount ? (
                          <div className="row">
                            <div className="col-xl-4 col-md-4 mb-3">
                              <h4 className="secondaryLabel">Percentage</h4>
                              <p className="secondaryText">{productData?.discount?.percentage} %</p>
                            </div>
                            <div className="col-xl-4 col-md-4 mb-3">
                              <h4 className="secondaryLabel">Expiry</h4>
                              <p className="secondaryText">{dateFormatter(productData?.discount?.expiry)}</p>
                            </div>
                          </div>
                        ) : (
                          <CustomButton text={"Add Discount"} onClick={toggle} />
                        )
                      }
                    </div>
                    <div className="col-12 mb-1">
                      <h4 className="mainTitle">Images</h4>
                    </div>
                    <div className="col-12 mb-3">
                      {
                        productData?.images?.map(item => (
                          <ImageCard src={process.env.REACT_APP_IMAGE_ENDPOINT + item} />
                        ))
                      }
                    </div>
                    <div className="col-xl-12 col-md-12 mb-3">
                      <h4 className="secondaryLabel">Name</h4>
                      <h2 className="secondaryText">{productData?.name}</h2>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Brand</h4>
                      <p className="secondaryText">{productData?.brand?.name}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Category</h4>
                      <p className="secondaryText">{productData?.category?.name}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Subcategory</h4>
                      <p className="secondaryText">{productData?.subcategory?.name || "--"}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Hot</h4>
                      <p className="secondaryText">{productData?.hot ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Trending</h4>
                      <p className="secondaryText">{productData?.trending ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">New Arrival</h4>
                      <p className="secondaryText">{productData?.newProduct ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Featured</h4>
                      <p className="secondaryText">{productData?.featured ? "Yes" : "No"}</p>
                    </div>
                    <div className="col-xl-4 col-md-4 mb-3">
                      <h4 className="secondaryLabel">Created At</h4>
                      <p className="secondaryText">{dateFormatter(productData?.createdAt)}</p>
                    </div>
                    <div className="col-12 mb-3">
                      <h4 className="secondaryLabel">Description</h4>
                      <p className="secondaryText">{productData?.description}</p>
                    </div>
                    <div className="col-12 mb-1">
                      <h4 className="mainTitle">Prices</h4>
                    </div>
                    {
                      productData?.priceVariation?.map(item => (
                        <div className="col-3 mb-3">
                          <h4 className="secondaryLabel text-capitalize">{item.scale} Scale</h4>
                          <p className="secondaryText">{item?.price}</p>
                        </div>
                      ))
                    }
                    <div className="col-12 mb-1">
                      <h4 className="mainTitle">Variations</h4>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="row">
                        {productData?.variations?.map((item, index) => (
                          <div key={index} className="col-3 p-2 mb-1">
                            <div className="variant-card">
                              <div className="col-2">
                                <label className="mainLabel">Name</label>
                                <label>{item?.name}</label>
                              </div>
                              <div className="col-12">
                                <label className="mainLabel">Variant Options</label>
                                <div className="d-flex flex-wrap">
                                  {item.options.map(itemm => <p className="me-2">{itemm.name} <span className="text-danger">{`[${itemm.stock}]`}</span>,</p>)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {
                      productData?.quantityDiscounts && productData?.quantityDiscounts?.length > 0 &&
                      <>
                        <div className="col-12 mb-1">
                          <h4 className="mainTitle">Quantity Discount</h4>
                        </div>
                        <div className="col-12 mb-3">
                          <div className="row">
                            {productData?.quantityDiscounts?.map((item, index) => (
                              <div key={index} className="col-3 p-2 mb-1">
                                <div className="variant-card">
                                  <div className="col-2">
                                    <label className="mainLabel">Quantity</label>
                                    <label>{item?.quantity}</label>
                                  </div>
                                  <div className="col-2">
                                    <label className="mainLabel">Percentage</label>
                                    <label>{item?.percentage} %</label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    }
                  </div>
                </div>
            }
          </div>
        </div>
      </DashboardLayout>
      <CustomTextModal
        show={modal}
        close={toggle}
        heading="Add Discount"
        action={onSaveDiscount}
        textboxes={[
          {
            label: "Percentage %",
            placeholder: "Enter Percentage",
            type: "number",
            value: discount.percentage,
            onChange: (e) => onChangeDiscount("percentage", e.target.value)
          },
          {
            label: "Expiry",
            placeholder: "Enter Expiry Date",
            type: "date",
            value: discount.expiry,
            onChange: (e) => onChangeDiscount("expiry", e.target.value)
          }
        ]}
        loading={creating}
      />
    </>
  );
};

export default ProductDetails;