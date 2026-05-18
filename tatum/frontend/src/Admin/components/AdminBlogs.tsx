import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faNewspaper, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "./components/RichTextEditor";
import api from "../services/api";
import { toast } from "react-hot-toast";
import "./admin.css";

interface BlogPost {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  status: "Published" | "Draft";
  published_at?: string;
}

function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    status: "Draft",
  });

  const [uploading, setUploading] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaLibrary, setMediaLibrary] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
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
    setFormData({ ...formData, featured_image: item.url });
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

  const fetchPosts = async () => {
    try {
      const response = await api.getAllBlogs();
      setPosts(response.data || []);
    } catch (err) {
      console.error("Failed to load blog posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading(editingPost ? "Updating article..." : "Creating article...");
    try {
      let result;
      if (editingPost) {
        result = await api.updateBlog(editingPost.id!, formData);
      } else {
        result = await api.createBlog(formData);
      }
      
      if (!result.success) throw new Error(result.message || "Failed to save blog post");
      
      toast.success(editingPost ? "Article updated successfully" : "Article created successfully", { id: loadingToast });
      setShowModal(false);
      setEditingPost(null);
      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || "Failed to save article", { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this blog post?")) return;
    const loadingToast = toast.loading("Deleting article...");
    try {
      const result = await api.deleteBlog(id);
      if (!result.success) throw new Error(result.message || "Delete failed");
      toast.success("Article deleted successfully", { id: loadingToast });
      fetchPosts();
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  const handleTitleChange = (title: string) => {
     const slug = title
       .toLowerCase()
       .replace(/[^a-z0-9]+/g, '-')
       .replace(/(^-|-$)/g, '');
     
     setFormData({
       ...formData,
       title,
       slug: editingPost ? formData.slug : slug // Only auto-generate slug for new posts or if manually cleared
     });
   };

   const openEdit = (post: BlogPost) => {
     setEditingPost(post);
     setFormData({ ...post });
     setShowModal(true);
   };

  if (loading) return <div className="admin-loading">Loading Articles...</div>;

  return (
    <div className="admin-blogs">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Global Blog Posts</h2>
        <button className="btn-primary" onClick={() => {
          setEditingPost(null);
          setFormData({ title: "", slug: "", excerpt: "", content: "", featured_image: "", status: "Draft" });
          setShowModal(true);
        }}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> New Article
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Published At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(posts || []).map(post => (
              <tr key={post.id}>
                <td className="fw-bold">{post.title || "Untitled"}</td>
                <td><code>{post.slug || ""}</code></td>
                <td>
                  <span className={`status-badge ${(post.status || "Published").toLowerCase()}`}>
                    {post.status || "Published"}
                  </span>
                </td>
                <td>{post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn-icon" onClick={() => openEdit(post)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn-icon-danger" onClick={() => handleDelete(post.id!)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingPost ? 'Edit Article' : 'New Article'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input type="text" className="form-input" value={formData.title} onChange={e => handleTitleChange(e.target.value)} required />
              </div>
              
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="form-label">Slug</label>
                  <input type="text" className="form-input" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} required />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})}>
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Excerpt (Summary)</label>
                <textarea className="form-textarea" rows={2} value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              </div>

              <RichTextEditor 
                label="Article Content"
                value={formData.content} 
                onChange={val => setFormData({...formData, content: val})} 
              />

              <div className="form-group mt-4">
                <label className="form-label">Featured Image</label>
                <div className="d-flex gap-2 align-items-center">
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Image Key"
                    value={formData.featured_image} 
                    onChange={e => setFormData({...formData, featured_image: e.target.value})} 
                  />
                  <div className="upload-btn-wrapper m-0">
                    <button type="button" className="btn-icon" disabled={uploading}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <input type="file" onChange={handleImageUpload} disabled={uploading} accept="image/*" />
                  </div>
                  <button type="button" className="btn-icon" onClick={fetchMedia} title="Select from Media">
                    <FontAwesomeIcon icon={faImage} />
                  </button>
                </div>
                {formData.featured_image && (
                  <div className="mt-2">
                    <img 
                      src={`${import.meta.env.VITE_API_URL || "http://localhost:4000"}/uploads/${formData.featured_image}`} 
                      alt="Preview" 
                      style={{ height: '80px', borderRadius: '4px' }} 
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                )}
              </div>

              <div className="modal-footer mt-5">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Article</button>
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
              <button type="button" className="btn-icon" onClick={() => setShowMediaPicker(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
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

export default AdminBlogs;
