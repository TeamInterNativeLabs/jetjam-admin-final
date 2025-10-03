import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import BackButton from "../../Components/BackButton"
import CustomButton from "../../Components/CustomButton"
import CustomInput from "../../Components/CustomInput"
import { DashboardLayout } from "../../Components/Layout/DashboardLayout"
import { useAddGenreMutation } from "../../Redux/Apis/Genre"

const AddGenre = () => {

    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: "" } })
    const [submit, { data: genreData, isLoading, isSuccess }] = useAddGenreMutation()

    useEffect(() => {
        document.title = 'JetJams | Add Genre'
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate("/genre")
            toast.success(genreData?.message)
        }
    }, [isSuccess])

    const onSubmit = async data => {
        submit(data)
    }

    return (
        <DashboardLayout>
            <div className="dashCard mb-4">
                <div className="row mb-3">
                    <div className="col-12">
                        <h2 className="mainTitle">
                            <BackButton />
                            Add New Genre
                        </h2>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-4">
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                                <CustomInput
                                    label="Genre Name"
                                    labelClass="mainLabel"
                                    required
                                    placeholder="Enter Genre Name"
                                    inputClass="mainInput"
                                    error={errors?.name?.message}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <CustomButton
                            text="Save"
                            onClick={handleSubmit(onSubmit)}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AddGenre