import { useEffect, useRef, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import BackButton from "../../Components/BackButton"
import CustomButton from "../../Components/CustomButton"
import CustomInput from "../../Components/CustomInput"
import { SelectBox } from "../../Components/CustomSelect"
import { DashboardLayout } from "../../Components/Layout/DashboardLayout"
import { useAddAlbumMutation, useGetAlbumsQuery } from "../../Redux/Apis/Albums"
import { useUploadAudioMutation, useUploadImageMutation } from "../../Redux/Apis/General"
import { useGetGenreQuery } from "../../Redux/Apis/Genre"
import { useSelector } from "react-redux"

const EditAlbum = () => {

    const params = useParams()
    const navigate = useNavigate()
    const ref = useRef()
    const audio_ref = useRef()

    const [image, setImage] = useState()
    const [file, setFile] = useState()

    const { data: album_data } = useGetAlbumsQuery({ id: params?.id })

    console.log("Edit Data", album_data?.data)

    const { general } = useSelector(state => state.generalSlice)

    let defaultValues = {
        name: album_data?.data?.name,
        description: album_data?.data?.description,
        bpm: album_data?.data?.bpm,
        length: album_data?.data?.length,
        genre: album_data?.data?.genre?._id,
        new: album_data?.data?.new,
        suggested: album_data?.data?.suggested,
        trending: album_data?.data?.trending,
        free: album_data?.data?.free,
        tracks: album_data?.data?.tracks,
    }

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "tracks",
    });

    let suggested = watch("suggested")
    let newAlbum = watch("new")
    let trending = watch("trending")
    let free = watch("free")

    const { data } = useGetGenreQuery({ page: 1 })
    const [submit, { data: albumData, isLoading, isSuccess }] = useAddAlbumMutation()
    const [uploadImage, { isLoading: imageUploading }] = useUploadImageMutation()
    const [uploadAudio, { isLoading: audioUploading }] = useUploadAudioMutation()

    useEffect(() => {
        document.title = 'JetJams | Edit Album'
    }, []);

    useEffect(() => {
        if (isSuccess) {
            navigate("/albums")
            toast.success(albumData?.message)
        }
    }, [isSuccess])

    const onSubmit = async data => {

        if (!image || !file) {
            toast.error('Image and File are required')
            return
        }

        let image_form = new FormData()
        let file_form = new FormData()
        image_form.append("image", image)
        file_form.append("file", file)

        let image_res = await uploadImage(image_form)
        let file_res = await uploadAudio(file_form)

        let payload = {
            ...data,
            file: file_res?.data?.data?.path,
            image: image_res?.data?.data?.path,
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
                            Edit Album
                        </h2>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-8">
                        <h4 className="mainTitle">Upload Album File <span className="text-danger">*</span></h4>
                        <div className="d-flex">
                            {
                                file &&
                                <p>{file?.name}</p>

                            }
                        </div>
                        <div className="d-flex flex-column">
                            <audio src={file ? URL.createObjectURL(file) : `${process.env.REACT_APP_IMAGE_ENDPOINT}${album_data?.data?.file}`} controls className="my-3" />
                            <div>
                                <CustomButton text="Upload" variant="primaryButton" onClick={() => audio_ref.current.click()} />
                            </div>
                        </div>
                        <input
                            type="file"
                            hidden
                            ref={audio_ref}
                            accept="audio/*"
                            onChange={e => {

                                const file = e.target.files[0];

                                if (file && file.type.startsWith('audio/')) {
                                    setFile(file);
                                } else {
                                    toast.error("Please select a valid audio file.")
                                    e.target.value = '';
                                }

                            }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <h4 className="mainTitle">Image <span className="text-danger">*</span></h4>
                        <div className="d-flex mb-3">
                            {
                                <img className="mx-2" src={image ? URL.createObjectURL(image) : `${process.env.REACT_APP_IMAGE_ENDPOINT}${album_data?.data?.image}`} style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }} />

                            }
                        </div>
                        <CustomButton text="Change Image" variant="primaryButton" onClick={() => ref.current.click()} />
                        <input
                            type="file"
                            hidden
                            ref={ref}
                            accept="image/*"
                            onChange={e => {
                                const file = e.target.files[0];

                                if (file && file.type.startsWith('image/')) {
                                    setImage(file);
                                } else {
                                    toast.error("Please select a valid image file.")
                                    e.target.value = '';
                                }

                            }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-8">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    label="Album Name"
                                    labelClass="mainLabel"
                                    required
                                    placeholder="Enter Album Name"
                                    inputClass="mainInput"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-8">
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    label="Album Description"
                                    labelClass="mainLabel"
                                    required
                                    type="textarea"
                                    placeholder="Enter Album Description"
                                    inputClass="mainInput"
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <Controller
                            name="genre"
                            control={control}
                            render={({ field }) => (
                                <SelectBox
                                    label="Select Genre"
                                    labelClass="mainLabel"
                                    selectClass="mainInput"
                                    name="Genre"
                                    required
                                    option={data?.data?.map(item => ({ label: item.name, value: item._id }))}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <Controller
                            name="length"
                            control={control}
                            render={({ field }) => (
                                <SelectBox
                                    label="Length"
                                    labelClass="mainLabel"
                                    selectClass="mainInput"
                                    name="Select Length"
                                    required
                                    option={general?.lengths}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <Controller
                            name="bpm"
                            control={control}
                            render={({ field }) => (
                                <SelectBox
                                    label="Beats Per Minute (BPM)"
                                    labelClass="mainLabel"
                                    selectClass="mainInput"
                                    name="Select BPM"
                                    required
                                    option={general?.bpm}
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    {/* <div className="col-4">
                        <Controller
                            name="length"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    label="Length"
                                    labelClass="mainLabel"
                                    required
                                    placeholder="hh:mm:ss"
                                    inputClass="mainInput"
                                    type="time"
                                    {...field}
                                />
                            )}
                        />
                    </div> */}
                    {/* <div className="col-4">
                        <Controller
                            name="bpm"
                            control={control}
                            render={({ field }) => (
                                <CustomInput
                                    label="Beats Per Minute (BPM)"
                                    labelClass="mainLabel"
                                    required
                                    placeholder="Enter BPM"
                                    inputClass="mainInput"
                                    {...field}
                                />
                            )}
                        />
                    </div> */}
                </div>
                <div className="row mb-4">
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <div>
                            <Controller
                                name="suggested"
                                control={control}
                                render={({ field }) => (
                                    <input type="checkbox" className="mx-2" checked={suggested} onChange={() => setValue("suggested", !suggested)} />
                                )}
                            />
                            <label className="mainLabel">Suggested Album</label>
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <div>
                            <Controller
                                name="suggested"
                                control={control}
                                render={({ field }) => (
                                    <input type="checkbox" className="mx-2" checked={newAlbum} onChange={() => setValue("new", !newAlbum)} />
                                )}
                            />
                            <label className="mainLabel">New Album</label>
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <div>
                            <Controller
                                name="trending"
                                control={control}
                                render={({ field }) => (
                                    <input type="checkbox" className="mx-2" checked={trending} onChange={() => setValue("trending", !trending)} />
                                )}
                            />
                            <label className="mainLabel">Trending Album</label>
                        </div>
                    </div>
                    <div className="col-2 d-flex justify-content-center align-items-center">
                        <div>
                            <Controller
                                name="free"
                                control={control}
                                render={({ field }) => (
                                    <input type="checkbox" className="mx-2" checked={free} onChange={() => setValue("free", !free)} />
                                )}
                            />
                            <label className="mainLabel">Free</label>
                        </div>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-8 d-flex align-items-center">
                        <h4 className="mainTitle m-0">Enter Tracks</h4>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <CustomButton
                            text="Add More"
                            variant="primaryButton"
                            onClick={() => append({ name: '' })}
                        />
                    </div>
                </div>
                {
                    fields?.map((item, index) => (
                        <div key={item.id} className="row my-3 d-flex align-items-center">
                            <div className="col-4">
                                <Controller
                                    name={`tracks.${index}.name`}
                                    control={control}
                                    render={({ field }) => (
                                        <CustomInput
                                            label="Track Name"
                                            labelClass="mainLabel"
                                            required
                                            placeholder="Enter Track Name"
                                            inputClass="mainInput"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                            {
                                fields.length > 1 &&
                                <div className="col-4 d-flex align-items-center">
                                    <label className="mainLabel text-danger text-end text-underline" onClick={() => remove(index)}>Delete</label>
                                </div>
                            }
                        </div>
                    ))
                }

                <div className="row mb-3">
                    <div className="col-4">
                        <CustomButton
                            text="Save"
                            onClick={handleSubmit(onSubmit)}
                            loading={isLoading || imageUploading || audioUploading}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default EditAlbum