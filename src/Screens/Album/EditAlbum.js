import { useEffect, useRef, useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router"
import { toast } from "react-toastify"
import BackButton from "../../Components/BackButton"
import CustomButton from "../../Components/CustomButton"
import CustomInput from "../../Components/CustomInput"
import { SelectBox } from "../../Components/CustomSelect"
import { DashboardLayout } from "../../Components/Layout/DashboardLayout"
import { useGetAlbumsQuery, useUpdateAlbumMutation } from "../../Redux/Apis/Albums"
import { useUploadAudioMutation, useUploadImageMutation } from "../../Redux/Apis/General"
import { useGetGenreQuery } from "../../Redux/Apis/Genre"
import { useSelector } from "react-redux"
import Loader from "../../Components/Loader"

const EditAlbum = () => {

    const params = useParams()
    const navigate = useNavigate()
    const ref = useRef()
    const audio_ref = useRef()

    const [newImage, setNewImage] = useState(null)
    const [newFile, setNewFile] = useState(null)

    const { data: album_data, isLoading: albumLoading } = useGetAlbumsQuery({ id: params?.id })
    const { general } = useSelector(state => state.generalSlice)
    const { data: genreData } = useGetGenreQuery({ page: 1 })

    const [submit, { data: albumData, isLoading, isSuccess }] = useUpdateAlbumMutation()
    const [uploadImage, { isLoading: imageUploading }] = useUploadImageMutation()
    const [uploadAudio, { isLoading: audioUploading }] = useUploadAudioMutation()

    const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm()
    const { fields, append, remove } = useFieldArray({ control, name: "tracks" })

    let suggested = watch("suggested")
    let newAlbum = watch("new")
    let trending = watch("trending")
    let free = watch("free")

    // Populate form once album data loads
    useEffect(() => {
        if (album_data?.data) {
            const d = album_data.data
            reset({
                name: d.name,
                description: d.description,
                bpm: d.bpm,
                length: d.length,
                genre: d.genre?._id || d.genre,
                new: d.new,
                suggested: d.suggested,
                trending: d.trending,
                free: d.free,
                tracks: d.tracks?.map(t => ({ name: t.name })) || [],
            })
        }
    }, [album_data])

    useEffect(() => {
        document.title = 'JetJams | Edit Album'
    }, [])

    useEffect(() => {
        if (isSuccess) {
            navigate("/albums")
            toast.success(albumData?.message || 'Album updated successfully')
        }
    }, [isSuccess])

    const onSubmit = async data => {
        let payload = { ...data, id: params?.id }

        // Only upload new files if admin selected them
        if (newImage) {
            let image_form = new FormData()
            image_form.append("image", newImage)
            let image_res = await uploadImage(image_form)
            payload.image = image_res?.data?.data?.path
        }

        if (newFile) {
            let file_form = new FormData()
            file_form.append("file", newFile)
            let file_res = await uploadAudio(file_form)
            payload.file = file_res?.data?.data?.path
        }

        submit(payload)
    }

    if (albumLoading) return <DashboardLayout><Loader /></DashboardLayout>

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

                {/* Audio file — optional replacement */}
                <div className="row mb-3">
                    <div className="col-8">
                        <h4 className="mainTitle">Album File</h4>
                        <div className="d-flex flex-column">
                            <audio
                                src={newFile ? URL.createObjectURL(newFile) : `${process.env.REACT_APP_IMAGE_ENDPOINT}${album_data?.data?.file}`}
                                controls
                                className="my-3"
                            />
                            <div>
                                <CustomButton text="Replace Audio" variant="primaryButton" onClick={() => audio_ref.current.click()} />
                                <small className="ms-2 text-muted">Leave unchanged to keep existing file</small>
                            </div>
                        </div>
                        <input type="file" hidden ref={audio_ref} accept="audio/*" onChange={e => {
                            const file = e.target.files[0]
                            if (file && file.type.startsWith('audio/')) {
                                setNewFile(file)
                            } else {
                                toast.error("Please select a valid audio file.")
                                e.target.value = ''
                            }
                        }} />
                    </div>
                </div>

                {/* Image — optional replacement */}
                <div className="row mb-3">
                    <div className="col-4">
                        <h4 className="mainTitle">Cover Image</h4>
                        <div className="d-flex mb-3">
                            <img
                                className="mx-2"
                                src={newImage ? URL.createObjectURL(newImage) : `${process.env.REACT_APP_IMAGE_ENDPOINT}${album_data?.data?.image}`}
                                style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }}
                                alt="cover"
                            />
                        </div>
                        <CustomButton text="Replace Image" variant="primaryButton" onClick={() => ref.current.click()} />
                        <small className="ms-2 text-muted">Leave unchanged to keep existing image</small>
                        <input type="file" hidden ref={ref} accept="image/*" onChange={e => {
                            const file = e.target.files[0]
                            if (file && file.type.startsWith('image/')) {
                                setNewImage(file)
                            } else {
                                toast.error("Please select a valid image file.")
                                e.target.value = ''
                            }
                        }} />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-8">
                        <Controller name="name" control={control} render={({ field }) => (
                            <CustomInput label="Album Name" labelClass="mainLabel" required placeholder="Enter Album Name" inputClass="mainInput" {...field} />
                        )} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-8">
                        <Controller name="description" control={control} render={({ field }) => (
                            <CustomInput label="Album Description" labelClass="mainLabel" required type="textarea" placeholder="Enter Album Description" inputClass="mainInput" {...field} />
                        )} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <Controller name="genre" control={control} render={({ field }) => (
                            <SelectBox label="Select Genre" labelClass="mainLabel" selectClass="mainInput" name="Genre" required
                                option={genreData?.data?.map(item => ({ label: item.name, value: item._id }))}
                                {...field}
                            />
                        )} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-4">
                        <Controller name="length" control={control} render={({ field }) => (
                            <SelectBox label="Length" labelClass="mainLabel" selectClass="mainInput" name="Select Length" required option={general?.lengths} {...field} />
                        )} />
                    </div>
                    <div className="col-4">
                        <Controller name="bpm" control={control} render={({ field }) => (
                            <SelectBox label="BPM" labelClass="mainLabel" selectClass="mainInput" name="Select BPM" required option={general?.bpm} {...field} />
                        )} />
                    </div>
                </div>
                <div className="row mb-4">
                    {[
                        { name: "suggested", label: "Suggested", state: suggested },
                        { name: "new", label: "New Album", state: newAlbum },
                        { name: "trending", label: "Trending", state: trending },
                        { name: "free", label: "Free", state: free },
                    ].map(({ name, label, state }) => (
                        <div key={name} className="col-2 d-flex justify-content-center align-items-center">
                            <div>
                                <input type="checkbox" className="mx-2" checked={!!state} onChange={() => setValue(name, !state)} />
                                <label className="mainLabel">{label}</label>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row mb-3">
                    <div className="col-8 d-flex align-items-center">
                        <h4 className="mainTitle m-0">Tracks</h4>
                    </div>
                    <div className="col-4 d-flex justify-content-end align-items-center">
                        <CustomButton text="Add More" variant="primaryButton" onClick={() => append({ name: '' })} />
                    </div>
                </div>
                {fields?.map((item, index) => (
                    <div key={item.id} className="row my-3 d-flex align-items-center">
                        <div className="col-4">
                            <Controller name={`tracks.${index}.name`} control={control} render={({ field }) => (
                                <CustomInput label="Track Name" labelClass="mainLabel" required placeholder="Enter Track Name" inputClass="mainInput" {...field} />
                            )} />
                        </div>
                        {fields.length > 1 && (
                            <div className="col-4 d-flex align-items-center">
                                <label className="mainLabel text-danger text-end text-underline" onClick={() => remove(index)}>Delete</label>
                            </div>
                        )}
                    </div>
                ))}
                <div className="row mb-3">
                    <div className="col-4">
                        <CustomButton
                            text="Save Changes"
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
