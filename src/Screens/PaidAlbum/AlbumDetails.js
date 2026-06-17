import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import Loader from "../../Components/Loader";
import CustomButton from "../../Components/CustomButton";
import { useGetPaidAlbumByIdQuery } from "../../Redux/Apis/Albums";
import { dateFormatter } from "../../Utils";

const PaidAlbumDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useGetPaidAlbumByIdQuery(id);
  const album = data?.data;

  useEffect(() => { document.title = "JetJams | Paid Album Details"; }, []);

  return (
    <DashboardLayout>
      <div className="dashCard mb-4">
        <div className="row mb-3 align-items-center justify-content-between">
          <div className="col">
            <h2 className="mainTitle">
              <BackButton />
              Paid Album Details
            </h2>
          </div>
          {album && (
            <div className="col-auto d-flex gap-2">
              <CustomButton
                type="button"
                text="Edit Album"
                className="primaryButton"
                onClick={() => navigate(`/paid-albums/edit/${id}`)}
              />
              <CustomButton
                type="button"
                text="Copy Share Link"
                className="secondaryButton"
                onClick={() => {
                  const url = `${process.env.REACT_APP_SITE_URL || 'https://www.jetjams.net'}/purchase-album/${id}`;
                  navigator.clipboard.writeText(url);
                  alert(`Share link copied!\n\n${url}`);
                }}
              />
            </div>
          )}
        </div>

        {isLoading ? <Loader /> : album ? (
          <div className="row">
            {/* Cover image */}
            {album.image && (
              <div className="col-12 mb-4">
                <img
                  src={`${process.env.REACT_APP_IMAGE_ENDPOINT}${album.image}`}
                  alt="Album cover"
                  style={{ maxWidth: '200px', borderRadius: '8px', objectFit: 'cover' }}
                />
              </div>
            )}

            <div className="col-lg-8">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">Album Name</h4>
                  <p className="secondaryText text-capitalize">{album.name}</p>
                </div>
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">Genre</h4>
                  <p className="secondaryText">{album?.genre?.name || "—"}</p>
                </div>
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">Price</h4>
                  <p className="secondaryText"><strong>${album.price}</strong></p>
                </div>
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">Length</h4>
                  <p className="secondaryText">{((album.length || 0) / 60).toFixed(0)} minutes</p>
                </div>
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">BPM</h4>
                  <p className="secondaryText">{album.bpm}</p>
                </div>
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">Status</h4>
                  <p className={`secondaryText ${album.active ? 'greenColor' : 'redColor'}`}>
                    {album.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="col-md-4 mb-3">
                  <h4 className="secondaryLabel">Created At</h4>
                  <p className="secondaryText">{dateFormatter(album.createdAt)}</p>
                </div>
                <div className="col-12 mb-3">
                  <h4 className="secondaryLabel">Description</h4>
                  <p className="secondaryText">{album.description}</p>
                </div>
              </div>

              {/* Tracks */}
              <div className="row mt-2">
                <div className="col-12">
                  <h4 className="secondaryLabel">Tracks ({album?.tracks?.length || 0})</h4>
                  {album?.tracks?.length > 0 ? (
                    <ol style={{ paddingLeft: '20px' }}>
                      {album.tracks.map((track, i) => (
                        <li key={track._id || i} className="secondaryText mb-1">
                          {track.name}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="secondaryText text-muted">No tracks</p>
                  )}
                </div>
              </div>

              {/* Shareable link */}
              <div className="col-12 mb-3">
                <h4 className="secondaryLabel">Shareable Link (share on Facebook, Instagram, etc.)</h4>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <input
                    readOnly
                    type="text"
                    className="form-control"
                    value={`${process.env.REACT_APP_SITE_URL || 'https://www.jetjams.net'}/purchase-album/${id}`}
                    style={{ maxWidth: '500px', fontSize: '12px' }}
                  />
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      const url = `${process.env.REACT_APP_SITE_URL || 'https://www.jetjams.net'}/purchase-album/${id}`;
                      navigator.clipboard.writeText(url);
                      alert('Link copied!');
                    }}
                  >
                    Copy
                  </button>
                </div>
                <small className="text-muted">Anyone with this link can view the album and purchase it.</small>
              </div>
                <div className="row mt-3">
                  <div className="col-12">
                    <h4 className="secondaryLabel">Album File</h4>
                    <a
                      href={`${process.env.REACT_APP_IMAGE_ENDPOINT}${album.file}`}
                      target="_blank"
                      rel="noreferrer"
                      className="primaryColor"
                    >
                      Download / Preview
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-muted">Album not found.</p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaidAlbumDetails;
