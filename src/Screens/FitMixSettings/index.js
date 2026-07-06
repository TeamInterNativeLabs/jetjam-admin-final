import { useState, useEffect } from "react";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { toast } from "react-toastify";
import { useGetSettingsQuery, useUpdateSettingsMutation } from "../../Redux/Apis/Settings";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const FitMixSettings = () => {
  const { data: settingsData, isLoading } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();

  const [formData, setFormData] = useState({
    fitMixVideoUrl: "",
    fitMixMessageHTML: "",
    imagePreview: null,
    imageFile: null
  });

  useEffect(() => {
    if (settingsData?.data) {
      setFormData({
        fitMixVideoUrl: settingsData.data.fitMixVideoUrl || "",
        fitMixMessageHTML: settingsData.data.fitMixMessageHTML || "",
        imagePreview: settingsData.data.fitMixImage ? `${process.env.REACT_APP_IMAGE_ENDPOINT}uploads/settings/${settingsData.data.fitMixImage}` : null,
        imageFile: null
      });
    }
  }, [settingsData]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({ ...prev, fitMixMessageHTML: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append("fitMixVideoUrl", formData.fitMixVideoUrl);
    submitData.append("fitMixMessageHTML", formData.fitMixMessageHTML);
    if (formData.imageFile) {
      submitData.append("fitMixImage", formData.imageFile);
    }
    
    try {
      await updateSettings(submitData).unwrap();
      toast.success("Settings updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3">
          <div className="col-12 mb-2">
            <h2 className="mainTitle">
              <BackButton />
              Fit-Mix Settings
            </h2>
          </div>
        </div>
        
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row mb-4">
              <div className="col-md-12 mb-4">
                <CustomInput
                  label="Fit-Mix Video URL"
                  type="text"
                  placeholder="Enter YouTube Embed URL"
                  value={formData.fitMixVideoUrl}
                  onChange={(e) => setFormData(prev => ({...prev, fitMixVideoUrl: e.target.value}))}
                />
              </div>

              <div className="col-md-12 mb-4">
                <label className="mb-2">Fit-Mix Message content</label>
                <ReactQuill 
                  theme="snow"
                  value={formData.fitMixMessageHTML}
                  onChange={handleEditorChange}
                  style={{ height: '300px', marginBottom: '50px' }}
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                      ['link', 'image', 'video'],
                      ['clean']
                    ]
                  }}
                />
              </div>

              <div className="col-md-12 mb-4">
                <label className="mb-2">Image Replacement (if provided, it replaces the video)</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                {formData.imagePreview && (
                  <div className="mt-3">
                    <img src={formData.imagePreview} alt="Preview" style={{maxHeight: 200, borderRadius: 10}} />
                  </div>
                )}
              </div>

            </div>

            <CustomButton type="submit" variant="primaryButton" text={isUpdating ? "Updating..." : "Save Settings"} />
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};
