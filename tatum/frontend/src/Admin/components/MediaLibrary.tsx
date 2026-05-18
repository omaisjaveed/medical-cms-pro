import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faUpload, faLink, faImage } from "@fortawesome/free-solid-svg-icons";
import api from "../services/api";
import { toast } from "react-hot-toast";
import "./admin.css";

interface MediaItem {
  id: number;
  filename: string; // original name
  url: string;      // disk name
  type: string;
  size: number;
}

function MediaLibrary() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await api.getMedia();
      setMedia(response.data || []);
    } catch (err) {
      console.error("Failed to load media", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const loadingToast = toast.loading("Uploading file...");
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const result = await api.uploadMedia(formData);
      if (result.success) {
        toast.success("File uploaded successfully", { id: loadingToast });
        fetchMedia();
      } else {
        toast.error(result.message || "Upload failed", { id: loadingToast });
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this file?")) return;
    const loadingToast = toast.loading("Deleting file...");
    try {
      await api.deleteMedia(id);
      toast.success("File deleted successfully", { id: loadingToast });
      fetchMedia();
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Filename copied: " + text);
  };

  if (loading) return <div className="admin-loading">Loading Media...</div>;

  return (
    <div className="media-library">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Media Library</h2>
        <div className="upload-btn-wrapper">
          <button className="btn-primary" disabled={uploading}>
            <FontAwesomeIcon icon={uploading ? faUpload : faPlus} className="me-2" />
            {uploading ? "Uploading..." : "Upload File"}
          </button>
          <input type="file" onChange={handleUpload} disabled={uploading} />
        </div>
      </div>

      <div className="admin-card">
        <div className="media-grid">
          {(media || []).map((item) => (
            <div key={item.id} className="media-item" onClick={() => copyToClipboard(item.url)}>
              {item.type?.startsWith("image/") ? (
                <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${item.url}`} alt={item.filename || ""} />
              ) : (
                <div className="file-placeholder">
                  <FontAwesomeIcon icon={faLink} size="2x" />
                </div>
              )}
              <div className="media-item-info">
                {item.filename || "Untitled"}
              </div>
              <button className="media-delete-btn" onClick={(e) => {
                e.stopPropagation();
                handleDelete(item.id);
              }}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
          {media.length === 0 && (
            <div className="w-100 text-center py-5 text-muted">
              <FontAwesomeIcon icon={faImage} size="3x" className="mb-3 opacity-25" />
              <p>No media files found. Upload your first image!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MediaLibrary;
