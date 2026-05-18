import React, { useEffect, useState, Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faChevronDown, faChevronRight, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "./components/RichTextEditor";
import api from "../services/api";
import { toast } from "react-hot-toast";
import "./admin.css";

interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  parent_id: number | null;
  order: number;
  status: string;
  is_featured: boolean;
  featured_image: string;
  sections?: any[];
  children?: Service[];
}

function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  
  const initialFormData = {
    title: "",
    slug: "",
    description: "",
    content: "",
    featured_image: "",
    parent_id: null as number | null,
    order: 0,
    status: "Published",
    is_featured: false,
    sections: [] as any[],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [uploading, setUploading] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchMedia = async () => {
    try {
      const response = await api.getMedia();
      setMediaLibrary(response.data || []);
      setShowMediaPicker(true);
    } catch (err) {
      console.error("Failed to load media", err);
      toast.error("Failed to load media library");
    }
  };

  const handleSelectMedia = (item: any) => {
    if (activeSectionIndex !== null) {
      const newSections = [...formData.sections];
      newSections[activeSectionIndex].image = item.url;
      setFormData({ ...formData, sections: newSections });
      setActiveSectionIndex(null);
    } else {
      setFormData({ ...formData, featured_image: item.url });
    }
    setShowMediaPicker(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const loadingToast = toast.loading("Uploading image...");
    const formDataUpload = new FormData();
    formDataUpload.append("file", e.target.files[0]);

    try {
      const result = await api.uploadMedia(formDataUpload);
      if (result.success) {
        const filename = result.data.url.split('/').pop();
        setFormData({ ...formData, featured_image: filename });
        toast.success("Image uploaded successfully", { id: loadingToast });
      } else {
        toast.error(result.message || "Upload failed", { id: loadingToast });
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const handleBulkImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const loadingToast = toast.loading(`Uploading ${e.target.files.length} images...`);
    const formDataUpload = new FormData();
    
    for (let i = 0; i < e.target.files.length; i++) {
      formDataUpload.append("files", e.target.files[i]);
    }

    try {
      const result = await api.bulkUploadMedia(formDataUpload);
      if (result.success) {
        toast.success(`${e.target.files.length} images uploaded successfully`, { id: loadingToast });
        fetchMedia(); // Refresh media library
      } else {
        toast.error(result.message || "Upload failed", { id: loadingToast });
      }
    } catch (err: any) {
      toast.error(err.message || "Upload failed", { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.getServices(); 
      // Sort: Main Categories (parent_id null) first, then by order, then by id newest first
      const sortedData = (response.data || []).sort((a: any, b: any) => {
        if (a.parent_id === null && b.parent_id !== null) return -1;
        if (a.parent_id !== null && b.parent_id === null) return 1;
        if (a.order !== b.order) return a.order - b.order;
        return b.id - a.id;
      });
      setServices(sortedData);
    } catch (err) {
      console.error("Failed to load services", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = editingService && editingService.id < 1000000000;
    const loadingToast = toast.loading(isEditing ? "Updating..." : "Creating...");
    
    // Auto-set featured to true for main categories to ensure they show up
    const finalFormData = {
      ...formData,
      is_featured: formData.parent_id === null ? true : formData.is_featured
    };

    try {
      if (isEditing) {
        await api.updateService(editingService!.id, finalFormData);
        toast.success("Saved successfully", { id: loadingToast });
      } else {
        await api.createService(finalFormData);
        toast.success("Created successfully", { id: loadingToast });
      }
      setShowServiceModal(false);
      setShowCategoryModal(false);
      setEditingService(null);
      setFormData(initialFormData);
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Failed to save", { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item? Sub-services must be deleted first.")) return;
    const loadingToast = toast.loading("Deleting...");
    try {
      await api.deleteService(id);
      toast.success("Deleted successfully", { id: loadingToast });
      fetchServices();
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  const openEdit = (service: Service) => {
    setEditingService(service);
    
    let parsedSections = service.sections;
    if (typeof parsedSections === 'string') {
      try {
        parsedSections = JSON.parse(parsedSections);
      } catch (e) {
        parsedSections = [];
      }
    }

    setFormData({
      title: service.title,
      slug: service.slug,
      description: service.description || "",
      content: service.content || "",
      featured_image: service.featured_image || "",
      parent_id: service.parent_id,
      order: service.order,
      status: service.status,
      is_featured: service.is_featured || false,
      sections: Array.isArray(parsedSections) ? parsedSections : [],
    });
    
    if (service.parent_id === null) {
        setShowCategoryModal(true);
    } else {
        setShowServiceModal(true);
    }
  };

  const renderServiceRow = (service: Service, level: number = 0) => {
    return (
      <Fragment key={service.id}>
        <tr className={level === 0 ? "main-category-row" : "sub-service-row"}>
          <td>
            <div style={{ paddingLeft: `${level * 30}px` }} className="d-flex align-items-center">
              {level > 0 ? (
                <FontAwesomeIcon icon={faChevronRight} className="me-2 opacity-50 small" />
              ) : (
                <div className="category-indicator me-2"></div>
              )}
              <span className={level === 0 ? "fw-bold fs-5" : ""}>{service.title}</span>
            </div>
          </td>
          <td><code>/{service.slug}</code></td>
          <td>
            <span className={`status-badge ${(service.status || "Published").toLowerCase()}`}>
              {service.status || "Published"}
            </span>
          </td>
          <td>{service.is_featured ? '✅' : '❌'}</td>
          <td>
            <div className="d-flex gap-2">
              <button className="btn-icon" onClick={() => openEdit(service)} title="Edit">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="btn-icon-danger" onClick={() => handleDelete(service.id)} title="Delete">
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </td>
        </tr>
        {service.children && service.children.map(child => renderServiceRow(child, level + 1))}
      </Fragment>
    );
  };

  if (loading) return <div className="admin-loading">Loading Services...</div>;

  return (
    <div className="admin-services">
      <div className="admin-header-actions mb-4 p-4 bg-white rounded-4 shadow-sm">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="section-title mb-0">Services & Categories</h2>
            <p className="text-muted mb-0">Manage your main categories and nested services here.</p>
          </div>
          <div className="col-md-6 text-md-end mt-3 mt-md-0">
            <div className="d-inline-flex bg-light p-1 rounded-3 border">
              <button 
                className={`btn ${formData.parent_id === null && (showCategoryModal || showServiceModal) ? 'btn-primary' : 'btn-light'} px-4 py-2 rounded-2`}
                onClick={() => {
                  setEditingService(null);
                  setFormData({...initialFormData, parent_id: null});
                  setShowCategoryModal(true);
                  setShowServiceModal(false);
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" /> Main Category
              </button>
              <button 
                className={`btn ${formData.parent_id !== null && (showCategoryModal || showServiceModal) ? 'btn-primary' : 'btn-light'} px-4 py-2 rounded-2 ms-1`}
                onClick={() => {
                  setEditingService(null);
                  setFormData(initialFormData);
                  setShowServiceModal(true);
                  setShowCategoryModal(false);
                }}
              >
                <FontAwesomeIcon icon={faPlus} className="me-2" /> Full Service
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-table-container shadow-sm rounded-4 overflow-hidden">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title / Category</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => renderServiceRow(service))}
            {services.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-5 text-muted">No items found. Start by adding a main category.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Main Category Modal */}
      {showCategoryModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingService ? 'Edit Category' : 'New Main Category'}</h3>
              <button className="btn-close-custom" onClick={() => setShowCategoryModal(false)}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category Title</label>
                <input type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required placeholder="e.g. Spine Related" />
              </div>
              <div className="form-group">
                <label className="form-label">URL Slug</label>
                <input type="text" className="form-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required placeholder="e.g. spine-related" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                </select>
              </div>
              <div className="modal-footer mt-4">
                <button type="button" className="btn-secondary" onClick={() => setShowCategoryModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Service Modal */}
      {showServiceModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal large">
            <div className="modal-header">
              <h3 className="modal-title">{editingService ? 'Edit Service' : 'New Full Service'}</h3>
              <button className="btn-close-custom" onClick={() => setShowServiceModal(false)}><FontAwesomeIcon icon={faTimes} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="form-label">Service Title</label>
                  <input type="text" className="form-input" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">URL Slug</label>
                  <input type="text" className="form-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="form-label">Parent Category</label>
                  <select 
                    className="form-select" 
                    value={formData.parent_id || ""} 
                    onChange={e => setFormData({...formData, parent_id: e.target.value ? parseInt(e.target.value) : null})}
                    required
                  >
                    <option value="">Select Parent Category...</option>
                    {services.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description</label>
                <textarea className="form-textarea" rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <RichTextEditor 
                label="Full Service Content (Main Body)"
                value={formData.content} 
                onChange={val => setFormData({...formData, content: val})} 
              />

              <div className="service-sections-manager mt-5 p-4 bg-light rounded-4 border">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="mb-0">Service Detail Sections</h4>
                  <button type="button" className="btn-secondary btn-sm" onClick={() => {
                    setFormData({
                      ...formData,
                      sections: [...formData.sections, { title: "", image: "", content: "" }]
                    });
                  }}>
                    <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Section
                  </button>
                </div>

                <div className="sections-list">
                  {formData.sections.map((section, index) => (
                    <div key={index} className="service-section-card mb-4 position-relative">
                      <button 
                        type="button" 
                        className="btn-icon-danger position-absolute top-0 end-0 m-3" 
                        onClick={() => {
                          const newSections = formData.sections.filter((_, i) => i !== index);
                          setFormData({ ...formData, sections: newSections });
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>

                      <div className="row g-4">
                        <div className="col-md-5 form-group">
                          <label className="form-label">Section Title</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            value={section.title} 
                            onChange={e => {
                              const newSections = [...formData.sections];
                              newSections[index].title = e.target.value;
                              setFormData({ ...formData, sections: newSections });
                            }} 
                            placeholder="e.g. Symptoms of Disc Injury"
                          />
                        </div>
                        <div className="col-md-7 form-group">
                          <label className="form-label">Section Image</label>
                          <div className="image-picker-container">
                            {section.image ? (
                              <img 
                                src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${section.image}`} 
                                alt="Preview" 
                                className="image-picker-preview"
                              />
                            ) : (
                              <div className="image-picker-preview d-flex align-items-center justify-content-center bg-light">
                                <FontAwesomeIcon icon={faImage} className="text-muted" />
                              </div>
                            )}
                            <div className="image-picker-info">
                              {section.image || "No image selected"}
                            </div>
                            <button 
                              type="button" 
                              className="btn-primary btn-sm" 
                              onClick={() => {
                                setActiveSectionIndex(index);
                                fetchMedia();
                              }} 
                            >
                              Pick Image
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2">
                        <RichTextEditor 
                          label="Section Content"
                          value={section.content} 
                          onChange={val => {
                            const newSections = [...formData.sections];
                            newSections[index].content = val;
                            setFormData({ ...formData, sections: newSections });
                          }} 
                        />
                      </div>
                    </div>
                  ))}
                  {formData.sections.length === 0 && (
                    <div className="text-center py-4 text-muted border-dashed rounded-3">
                      No sections added yet. Click "Add Section" to build the detail page.
                    </div>
                  )}
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-md-6 form-group">
                  <label className="form-label">Main Card Image (Home Carousel)</label>
                  <div className="image-picker-container">
                    {formData.featured_image ? (
                      <img 
                        src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${formData.featured_image}`} 
                        alt="Preview" 
                        className="image-picker-preview"
                      />
                    ) : (
                      <div className="image-picker-preview d-flex align-items-center justify-content-center bg-light">
                        <FontAwesomeIcon icon={faImage} className="text-muted" />
                      </div>
                    )}
                    <div className="image-picker-info text-truncate">
                      {formData.featured_image || "No image selected"}
                    </div>
                    <button 
                      type="button" 
                      className="btn-primary btn-sm" 
                      onClick={() => {
                        setActiveSectionIndex(null);
                        fetchMedia();
                      }} 
                    >
                      Pick Image
                    </button>
                  </div>
                </div>
                <div className="col-md-6 d-flex align-items-center pt-4">
                  <label className="form-label mb-0 cursor-pointer d-flex align-items-center bg-light p-3 rounded-3 border w-100">
                    <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} style={{ width: '20px', height: '20px' }} />
                    <span className="ms-2 fw-semibold">Show in Home Carousel</span>
                  </label>
                </div>
              </div>

              <div className="modal-footer mt-5">
                <button type="button" className="btn-secondary" onClick={() => setShowServiceModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMediaPicker && (
        <div className="admin-modal-overlay" style={{zIndex: 1100}}>
          <div className="admin-modal" style={{maxWidth: '1000px'}}>
            <div className="modal-header d-flex justify-content-between align-items-center">
              <h3 className="modal-title">Select Image</h3>
              <div className="d-flex gap-3">
                <label className="btn-secondary btn-sm mb-0 cursor-pointer">
                  <FontAwesomeIcon icon={faPlus} className="me-2" /> Upload Multiple
                  <input type="file" multiple accept="image/*" className="d-none" onChange={handleBulkImageUpload} disabled={uploading} />
                </label>
                <button type="button" className="btn-icon" onClick={() => setShowMediaPicker(false)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            <div className="media-grid p-3" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {(mediaLibrary || []).map(item => (
                <div key={item.id} className="media-item" onClick={() => handleSelectMedia(item)}>
                   {item.type?.startsWith("image/") ? (
                     <img src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${item.url}`} alt={item.filename || ""} />
                   ) : (
                     <div className="file-placeholder">
                       <FontAwesomeIcon icon={faImage} size="2x" />
                     </div>
                   )}
                   <div className="media-item-info text-truncate" title={item.filename}>{item.filename || "Untitled"}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminServices;
