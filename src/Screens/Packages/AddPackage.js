import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../Components/BackButton";
import CustomButton from "../../Components/CustomButton";
import CustomInput from "../../Components/CustomInput";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import { useCreatePackageMutation } from "../../Redux/Apis/Package";
import { useGetGenreQuery } from "../../Redux/Apis/Genre";

const AddPackage = () => {
  const navigate = useNavigate();
  const [createPackage, { isLoading, isSuccess, data }] = useCreatePackageMutation();
  const { data: genreData } = useGetGenreQuery({ currentPage: 1, itemsPerPage: 100 });
  const genres = genreData?.data ?? [];

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      price: 9.99,
      duration: "month",
      featuresText: "",
      genre: [],
    },
  });

  useEffect(() => {
    document.title = "JetJams | Add Package";
  }, []);

  useEffect(() => {
    if (isSuccess && data?.success) {
      toast.success(data?.message || "Package created");
      navigate("/packages");
    }
  }, [isSuccess, data, navigate]);

  const onSubmit = async (formData) => {
    const features = formData.featuresText
      ? formData.featuresText.split("\n").map((s) => s.trim()).filter(Boolean)
      : [];
    const payload = {
      title: formData.title,
      price: Number(formData.price),
      duration: formData.duration,
      features,
      genre: Array.isArray(formData.genre) ? formData.genre : [formData.genre].filter(Boolean),
    };
    try {
      await createPackage(payload).unwrap();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create package");
    }
  };

  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12">
            <h2 className="mainTitle">
              <BackButton />
              Add Package ($9.99/month for users)
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mb-3">
            <div className="col-md-6">
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <CustomInput
                    label="Package title"
                    labelClass="mainLabel"
                    required
                    placeholder="e.g. Full site access"
                    inputClass="mainInput"
                    error={errors?.title?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-md-3">
              <Controller
                name="price"
                control={control}
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <CustomInput
                    label="Price (USD)"
                    labelClass="mainLabel"
                    required
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    inputClass="mainInput"
                    error={errors?.price?.message}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="col-md-3">
              <label className="mainLabel">Duration</label>
              <Controller
                name="duration"
                control={control}
                rules={{ required: "Duration is required" }}
                render={({ field }) => (
                  <select className="form-control mainInput" {...field}>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                )}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <Controller
                name="featuresText"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="mainLabel">Features (one per line)</label>
                    <textarea
                      className="form-control mainInput"
                      rows={5}
                      placeholder="Full access to BeatMix&#10;Unlimited downloads&#10;..."
                      {...field}
                    />
                  </>
                )}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <label className="mainLabel">Genre access (optional)</label>
              <Controller
                name="genre"
                control={control}
                render={({ field }) => (
                  <select
                    className="form-control mainInput"
                    multiple
                    value={field.value || []}
                    onChange={(e) => {
                      const selected = Array.from(e.target.selectedOptions, (o) => o.value);
                      field.onChange(selected);
                    }}
                  >
                    {genres.map((g) => (
                      <option key={g._id} value={g._id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              <small className="text-muted">Hold Ctrl/Cmd to select multiple</small>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <CustomButton type="submit" text="Create package" loading={isLoading} />
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddPackage;
