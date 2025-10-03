import { useCallback } from "react"
import { useNavigate } from "react-router"
import CustomButton from "../CustomButton"

const ProductCard = ({ item, onPressAction, onPressDelete }) => {

    const navigate = useNavigate()

    const onClickDetails = useCallback(() => {
        navigate(`/products/${item._id}`)
    }, [])

    return (
        <div className="col-xl-4 col-lg-4 col-md-6 p-2">
            <div className="product-card">
                <div className="product-upper">
                    <div className="product-card-image">
                        <img src={process.env.REACT_APP_IMAGE_ENDPOINT + item?.images[0]} className="product-image" />
                    </div>
                    <div className="product-card-content">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 d-flex align-items-center">
                                <h5>{item?.name}</h5>
                            </div>
                        </div>

                        {/* <CustomButton text="Mark Active" className="hoveredButton" onClick={onClickDetails} /> */}
                    </div>
                </div>
                <div className="product-lower">
                    <div className="row my-2">
                        <div className="col-6">
                            <p className="product-label">Brand</p>
                            <h6>{item?.brand?.name}</h6>
                        </div>
                        <div className="col-6">
                            <p className="product-label">Status</p>
                            <h6 className={`${item.active ? "text-success" : "text-danger"}`}>{item?.active ? "Active" : "Inactive"}</h6>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-6">
                            <p className="product-label">Category</p>
                            <h6 className="filterLabel">{item?.category?.name}</h6>
                        </div>
                        <div className="col-6">
                            <p className="product-label">Sub Category</p>
                            <h6>{item?.subcategory?.name || "--"}</h6>
                        </div>
                    </div>
                    <CustomButton text="Details" className="hoveredButton" onClick={onClickDetails} />
                    <CustomButton text={item.active ? "Inactive" : "Active"} className="hoveredButton ms-1" onClick={onPressAction} />
                    <CustomButton text={"Delete"} className="hoveredButton ms-1" onClick={onPressDelete} />
                </div>

            </div>
        </div>
    )
}

export default ProductCard