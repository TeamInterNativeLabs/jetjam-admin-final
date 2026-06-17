import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import BackButton from "../../Components/BackButton";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { SelectBox } from "../../Components/CustomSelect";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import Loader from "../../Components/Loader";
import { useGetPaidAlbumByIdQuery, useUpdatePaidAlbumMutation } from "../../Redux/Apis/Albums";
import { useUploadAudioMutation, useUploadImageMutation } from "../../Redux/Apis/General";
import { useGetGenreQuery } from "../../Redux/Apis/Genre";
import { useSelector } from "react-redux";

const EditPaidAlbum = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef();
  const fileRef  = useRef();

  const [newImage, setNewImage] = useState(null);
  const [newFile,  setNewFile]  = useState(null);

  const { data: albumData, isLoading: albumLoading } = useGetPaidAlbumByIdQuery(id);
  const { general } = useSelector(state => state.generalSlice);
  const { data: genreData } = useGetGenreQuery({ page: 1, rowsPerPage: 100 });

  const [updatePaidAlbum, { isLoading, isSuccess, data: updateData }] = useUpdatePaidAlbumMutation();
  const [uploadImage, { isLoading: imageUploading }] = useUploadImageMutation();
  const [uploadAudio, { isLoading: audioUploading }] = useUploadAudioMutation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "tracks" });

  // Pre-fill form when album loads
  useEffect(() => {
    if (albumData?.data) {
      const d = albumData.data;
      reset({
        name:        d.name        || "",
        description: d.description || "",
        price:       d.price       || "",
        bpm:         d.bpm         || "",
        length:      d.length      || "",
        genre:       d.genre?._id  || d.genre || "",
        tracks:      d.tracks?.map(t => ({ name: t.name })) || [{ name: "" }],
      });
    }
  }, [albumData]);

  useEffect(() => { document.title = "JetJams | Edit Paid Album"; }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(updateData?.message || "Paid Album Updated Successfully");
      navigate("/paid-albums");
    }
  }, [isSuccess]);

  const onSubmit = async (formData) => {
    const payload = { ...formData, id };

    if (newImage) {
      const imgForm = new FormData();
      imgForm.append("image", newImage);
      const imgRes = await uploadImage(imgForm);
      payload.image = imgRes?.data?.data?.path;
    }

    if (newFile) {
      const fileForm = new FormData();
      fileForm.append("file", newFile);
      const fileRes = await uploadAudio(fileForm);
      payload.file = fileRes?.data?.data?.path;
    }

    updatePaidAlbum(payload);
  };

  const album = albumData?.data;

  if (albumLoading) return <DashboardLayout><Loader /></DashboardLayout>;

  return (
    <DashboardLayout>
      <Loader loading={isLoading || imageUploading || audioUploading} />
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Edit Paid Album
            </h2>
          </div>
        </div>

        {/* Current image preview */}
        <div className="row mb-3">
          <div className="col-4">
            <h4 className="mainTitle">Cover Image</h4>
            <div className="d-flex mb-3">
              <img
                src={newImage
                  ? URL.createObjectURL(newImage)
                  : `${process.env.REACT_APP_IMAGE_ENDPOINT}${album?.image}`}
                alt="cover"
                style={{ width: 200, height: 200, objectFit: 'contain', borderRadius: 12, backgroundColor: '#F0F0F0' }}
              />
            </div>
            <CustomButton text="Change Image" variant="primaryButton" onClick={() => imageRef.current.click()} />
            <input type="file" hidden ref={imageRef} accept="image/*"
              onChange={e => {
                const f = e.target.files[0];
                if (f?.type.startsWith('image/')) setNewImage(f);
                else toast.error("Please select a valid image file.");
              }}
            />
          </div>
        </div>

        {/* Current file */}
        <div className="row mb-3">
          <div className="col-8">
            <h4 className="mainTitle">Album ZIP File</h4>
            {newFile
              ? <p className="mb-2">New file selected: <strong>{newFile.name}</strong></p>
              : album?.file && <p className="mb-2">Current: <span style={{ fontSize: 12, color: '#aaa' }}>{album.file}</span></p>
            }
            <CustomButton text={newFile ? "Change ZIP" : "Replace ZIP"} variant="primaryButton" onClick={() => fileRef.current.click()} />
            <input type="file" hidden ref={fileRef}
              accept=".zip,application/zip,application/x-zip-compressed"
              onChange={e => {
                const f = e.target.files[0];
                if (f?.name.endsWith('.zip')) setNewFile(f);
                else toast.error("Please select a valid ZIP file.");
              }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-8">
              <Controller name="name" control={control} rules={{ required: "Required" }}
                render={({ field, fieldState }) => (
                  <CustomInput label="Album Name" labelClass="mainLabel" required
                    placeholder="Enter Album Name" inputClass="mainInput"
                    error={fieldState.error?.message} {...field} />
                )} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-8">
              <Controller name="description" control={control} rules={{ required: "Required" }}
                render={({ field, fieldState }) => (
                  <CustomInput label="Description" labelClass="mainLabel" required
                    type="textarea" placeholder="Enter Description" inputClass="mainInput"
                    error={fieldState.error?.message} {...field} />
                )} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <Controller name="price" control={control} rules={{ required: "Required" }}
                render={({ field, fieldState }) => (
                  <CustomInput label="Price (USD)" labelClass="mainLabel" required
                    type="number" step="0.01" placeholder="e.g. 9.99" inputClass="mainInput"
                    error={fieldState.error?.message} {...field} />
                )} />
            </div>
            <div className="col-4">
              <Controller name="genre" control={control} rules={{ required: "Required" }}
                render={({ field }) => (
                  <SelectBox label="Genre" labelClass="mainLabel" selectClass="mainInput"
                    name="Genre" required
                    option={genreData?.data?.map(g => ({ label: g.name, value: g._id }))}
                    {...field} />
                )} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <Controller name="length" control={control}
                render={({ field }) => (
                  <SelectBox label="Length" labelClass="mainLabel" selectClass="mainInput"
                    name="Select Length" required option={general?.lengths} {...field} />
                )} />
            </div>
            <div className="col-4">
              <Controller name="bpm" control={control}
                render={({ field }) => (
                  <SelectBox label="BPM" labelClass="mainLabel" selectClass="mainInput"
                    name="Select BPM" required option={general?.bpm} {...field} />
                )} />
            </div>
          </div>

          {/* Tracks */}
          <div className="row mb-3">
            <div className="col-8 d-flex align-items-center">
              <h4 className="mainTitle m-0">Tracks</h4>
            </div>
            <div className="col-4 d-flex justify-content-end">
              <CustomButton text="Add Track" variant="primaryButton" onClick={() => append({ name: "" })} />
            </div>
          </div>
          {fields.map((item, index) => (
            <div key={item.id} className="row my-3 align-items-center">
              <div className="col-5">
                <Controller name={`tracks.${index}.name`} control={control}
                  render={({ field }) => (
                    <CustomInput label={`Track ${index + 1}`} labelClass="mainLabel" required
                      placeholder="Track name" inputClass="mainInput" {...field} />
                  )} />
              </div>
              {fields.length > 1 && (
                <div className="col-2 d-flex align-items-end mb-2">
                  <label className="mainLabel text-danger" style={{ cursor: 'pointer' }}
                    onClick={() => remove(index)}>Remove</label>
                </div>
              )}
            </div>
          ))}

          <div className="row mt-4">
            <div className="col-4">
              <CustomButton type="submit" text="Save Changes"
                loading={isLoading || imageUploading || audioUploading} />
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EditPaidAlbum;
