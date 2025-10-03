import { useEffect, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import BackButton from "../../Components/BackButton"
import CustomButton from "../../Components/CustomButton"
import CustomInput from "../../Components/CustomInput"
import { DashboardLayout } from "../../Components/Layout/DashboardLayout"
import { useAddGenreMutation } from "../../Redux/Apis/Genre"
import { useAddSnpVideoMutation } from "../../Redux/Apis/SnpVideo"
import { useUploadImageMutation, useUploadVideoMutation } from "../../Redux/Apis/General"

const AddVideo = () => {

    const navigate = useNavigate()
    const ref = useRef()
    const video_ref = useRef()
    const [submit, { data: snpvideoData, isLoading, isSuccess }] = useAddSnpVideoMutation()
    const [uploadImage, { isLoading: imageUploading }] = useUploadImageMutation()
    const [uploadVideo, { isLoading: videoUploading }] = useUploadVideoMutation()

    const [image, setImage] = useState()
    const [file, setFile] = useState()

    useEffect(() => {
        document.title = 'JetJams | Add Video'
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate("/snp-videos")
            toast.success(snpvideoData?.message)
        }
    }, [isSuccess])

    const onSubmit = async () => {

        if (!image || !file) {
            toast.error("Thumbnail or Video File is required")
            return;
        }

        let image_form = new FormData()
        let file_form = new FormData()
        image_form.append("image", image)
        file_form.append("file", file)

        let image_res = await uploadImage(image_form)
        let file_res = await uploadVideo(file_form)

        let payload = {
            url: file_res?.data?.data?.path,
            thumbnail: image_res?.data?.data?.path,
        }

        submit(payload)
    }

    return (
        <DashboardLayout>
            <div className="dashCard mb-4">
                <div className="row mb-3">
                    <div className="col-12">
                        <h2 className="mainTitle">
                            <BackButton />
                            Add New Video
                        </h2>
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-8">
                        <h4 className="mainTitle">Upload Video</h4>
                        <div className="d-flex">
                            {
                                file &&
                                <p>{file?.name}</p>

                            }
                        </div>
                        <CustomButton text="Upload" variant="primaryButton" onClick={() => video_ref.current.click()} />
                        <input
                            type="file"
                            hidden
                            ref={video_ref}
                            accept="video/*"
                            onChange={e => setFile(e.target.files[0])} />
                    </div>
                </div>
                <div className="row mb-5">
                    <div className="col-4">
                        <h4 className="mainTitle">Select Thumbnail</h4>
                        {
                            image &&
                            <div className="d-flex mb-3">
                                <img className="mx-2" src={URL.createObjectURL(image)} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }} />
                            </div>
                        }
                        <CustomButton text="Upload" variant="primaryButton" onClick={() => ref.current.click()} />
                        <input
                            type="file"
                            hidden
                            ref={ref}
                            accept="image/*"
                            onChange={e => setImage(e.target.files[0])} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <CustomButton
                            text="Save"
                            onClick={onSubmit}
                            loading={isLoading || imageUploading || videoUploading}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AddVideo