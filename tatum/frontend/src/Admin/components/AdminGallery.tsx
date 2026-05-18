import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faImage } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "./components/RichTextEditor";
import api from "../services/api";
import { toast } from "react-hot-toast";
import "./admin.css";

interface GalleryImage {
  id: number;
  url: string;
  caption?: string;
  alt_text?: string;
  order: number;
}

interface Gallery {
  id: number;
  title: string;
  slug: string;
  description?: string;
  images: GalleryImage[];
  is_active: boolean;
}

function AdminGallery() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", description: "", is_active: true });
  
  // Media Library state for image selection
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const handleDirectUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingGallery) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    const loadingToast = toast.loading(`Uploading ${files.length} image(s)...`);

    try {
      const uploadedImages: GalleryImage[] = [];
      
      for (const file of files) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        const result = await api.uploadMedia(formDataUpload);
        
        if (result.success) {
          const filename = result.data.url.split('/').pop();
          uploadedImages.push({
            id: Date.now() + Math.random(),
            url: filename,
            caption: result.data.filename,
            alt_text: result.data.filename,
            order: (editingGallery.images?.length || 0) + uploadedImages.length + 1
          });
        }
      }

      if (uploadedImages.length > 0) {
        const currentImages = parseImages(editingGallery.images);
        setEditingGallery({
          ...editingGallery,
          images: [...currentImages, ...uploadedImages]
        });
        toast.success(`${uploadedImages.length} image(s) uploaded and added`, { id: loadingToast });
      } else {
        toast.error("Upload failed", { id: loadingToast });
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const fetchGalleries = async () => {
    try {
      const response = await api.getGallery();
      setGalleries(response.data || []);
    } catch (err) {
      console.error("Failed to load galleries", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await api.getMedia();
      setMediaLibrary(response.data || []);
      setShowMediaPicker(true);
    } catch (err) {
      console.error("Failed to load media", err);
    }
  };

  const handleAddImage = (media: any) => {
    if (!editingGallery) return;
    const currentImages = parseImages(editingGallery.images);
    const newImage: GalleryImage = {
      id: Date.now(), // Temporary ID for UI
      url: media.url,
      caption: media.filename,
      alt_text: media.filename,
      order: currentImages.length + 1
    };
    setEditingGallery({
      ...editingGallery,
      images: [...currentImages, newImage]
    });
    setShowMediaPicker(false);
  };

  const handleRemoveImage = (idx: number) => {
    if (!editingGallery) return;
    const currentImages = parseImages(editingGallery.images);
    const newImages = [...currentImages];
    newImages.splice(idx, 1);
    setEditingGallery({ ...editingGallery, images: newImages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGallery) return;
    const isNew = !editingGallery.id || editingGallery.id > 1000000000;
    const loadingToast = toast.loading(isNew ? "Creating gallery..." : "Updating gallery...");
    try {
      const currentImages = parseImages(editingGallery.images);
      const payload = { ...formData, images: currentImages };
      if (isNew) {
         await api.createGallery(payload);
         toast.success("Gallery created successfully", { id: loadingToast });
      } else {
         await api.updateGallery(editingGallery.id, payload);
         toast.success("Gallery updated successfully", { id: loadingToast });
      }
      setShowModal(false);
      setEditingGallery(null);
      fetchGalleries();
    } catch (err: any) {
      toast.error(err.message || "Failed to save gallery", { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this gallery?")) return;
    const loadingToast = toast.loading("Deleting gallery...");
    try {
      await api.deleteGallery(id);
      toast.success("Gallery deleted successfully", { id: loadingToast });
      fetchGalleries();
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  const openEdit = (gallery: Gallery) => {
    setEditingGallery({ 
      ...gallery,
      images: parseImages(gallery.images)
    });
    setFormData({
      title: gallery.title,
      slug: gallery.slug,
      description: gallery.description || "",
      is_active: gallery.is_active
    });
    setShowModal(true);
  };

  const parseImages = (imgs: any) => {
    if (Array.isArray(imgs)) return imgs;
    if (typeof imgs === 'string') {
      try {
        return JSON.parse(imgs);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  if (loading) return <div className="admin-loading">Loading Galleries...</div>;

  return (
    <div className="admin-gallery">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Global Photo Galleries</h2>
        <button className="btn-primary" onClick={() => {
          setEditingGallery({ id: Date.now(), title: "", slug: "", images: [], is_active: true });
          setFormData({ title: "", slug: "", description: "", is_active: true });
          setShowModal(true);
        }}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Create Gallery
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Images</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map(g => (
              <tr key={g.id}>
                <td className="fw-bold">{g.title}</td>
                <td><code>{g.slug}</code></td>
                <td><span className="badge-count">{parseImages(g.images).length}</span></td>
                <td>
                  <span className={`status-badge ${g.is_active ? 'published' : 'draft'}`}>
                    {g.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn-icon" onClick={() => openEdit(g)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn-icon-danger" onClick={() => handleDelete(g.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {galleries.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted">No galleries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingGallery?.id && editingGallery.id < 1000000000 ? 'Edit Gallery' : 'New Gallery'}</h3>
              <button type="button" className="btn-icon" onClick={() => setShowModal(false)}>X</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="form-label">Gallery Title</label>
                  <input type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">Slug</label>
                  <input type="text" className="form-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
                </div>
              </div>

              <RichTextEditor 
                label="Gallery Description (Rich Text)"
                value={formData.description} 
                onChange={val => setFormData({...formData, description: val})} 
              />

              <div className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">Gallery Images</h4>
                  <div className="d-flex gap-2">
                    <div className="upload-btn-wrapper m-0">
                      <button type="button" className="btn-secondary btn-sm" disabled={uploading}>
                        <FontAwesomeIcon icon={faPlus} className="me-2" /> Direct Upload
                      </button>
                      <input type="file" onChange={handleDirectUpload} disabled={uploading} accept="image/*" multiple />
                    </div>
                    <button type="button" className="btn-secondary btn-sm" onClick={fetchMedia}>
                      <FontAwesomeIcon icon={faImage} className="me-2" /> Select from Media
                    </button>
                  </div>
                </div>
                
                <div className="media-grid">
                  {parseImages(editingGallery?.images).map((img: any, idx: number) => {
                    if (!img || !img.url) return null;
                    return (
                      <div key={idx} className="media-item">
                        <img 
                          src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${img.url}`} 
                          alt={img.alt_text || ""} 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/150x150?text=Error";
                          }}
                        />
                        <button type="button" className="media-delete-btn" style={{opacity: 1}} onClick={() => handleRemoveImage(idx)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="modal-footer mt-5">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Gallery</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMediaPicker && (
        <div className="admin-modal-overlay" style={{zIndex: 1100}}>
          <div className="admin-modal" style={{maxWidth: '1000px'}}>
            <div className="modal-header">
              <h3 className="modal-title">Select Image</h3>
              <button type="button" className="btn-icon" onClick={() => setShowMediaPicker(false)}>X</button>
            </div>
            <div className="media-grid">
              {(mediaLibrary || []).map(item => (
                <div key={item.id} className="media-item" onClick={() => handleAddImage(item)}>
                   {item.type?.startsWith("image/") ? (
                     <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${item.url}`} alt={item.filename || ""} />
                   ) : (
                     <div className="file-placeholder">
                       <FontAwesomeIcon icon={faImage} size="2x" />
                     </div>
                   )}
                   <div className="media-item-info">{item.filename || "Untitled"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminGallery;
