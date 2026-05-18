import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faComments } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "./components/RichTextEditor";
import api from "../services/api";
import { toast } from "react-hot-toast";
import "./admin.css";

interface Testimonial {
  id: number;
  author_name: string;
  author_title: string;
  content: string;
  rating: number;
  image: string | null;
  is_active: boolean;
  order: number;
  status: string;
}

function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    author_name: "",
    author_title: "",
    content: "",
    rating: 5,
    image: "",
    is_active: true,
    order: 0,
    status: "Published"
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.getTestimonials();
      setTestimonials(response.data || []);
    } catch (err) {
      console.error("Failed to load testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading(editingTestimonial ? "Updating testimonial..." : "Creating testimonial...");
    try {
      if (editingTestimonial) {
        await api.updateTestimonial(editingTestimonial.id, formData);
        toast.success("Testimonial updated successfully", { id: loadingToast });
      } else {
        await api.createTestimonial(formData);
        toast.success("Testimonial created successfully", { id: loadingToast });
      }
      setShowModal(false);
      setEditingTestimonial(null);
      fetchTestimonials();
    } catch (err: any) {
      toast.error(err.message || "Failed to save testimonial", { id: loadingToast });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    const loadingToast = toast.loading("Deleting testimonial...");
    try {
      await api.deleteTestimonial(id);
      toast.success("Testimonial deleted successfully", { id: loadingToast });
      fetchTestimonials();
    } catch (err: any) {
      toast.error(err.message || "Delete failed", { id: loadingToast });
    }
  };

  const openEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author_name: testimonial.author_name,
      author_title: testimonial.author_title || "",
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image || "",
      is_active: testimonial.is_active,
      order: testimonial.order,
      status: testimonial.status || "Published"
    });
    setShowModal(true);
  };

  if (loading) return <div className="admin-loading">Loading Testimonials...</div>;

  return (
    <div className="admin-testimonials">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Patient Testimonials</h2>
        <button className="btn-primary" onClick={() => {
          setEditingTestimonial(null);
          setFormData({ author_name: "", author_title: "", content: "", rating: 5, image: "", is_active: true, order: 0, status: "Published" });
          setShowModal(true);
        }}>
          <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Testimonial
        </button>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Author</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="fw-bold">{item.author_name}</div>
                  <div className="small text-muted">{item.author_title}</div>
                </td>
                <td>{"⭐".repeat(Number(item.rating) || 0)}</td>
                <td>
                  <span className={`status-badge ${(item.status || 'published').toLowerCase()}`}>
                    {item.status || 'Published'}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn-icon" onClick={() => openEdit(item)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn-icon-danger" onClick={() => handleDelete(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {testimonials.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-5 text-muted">No testimonials found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="modal-header">
              <h3 className="modal-title">{editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="form-label">Author Name</label>
                  <input type="text" className="form-input" value={formData.author_name} onChange={e => setFormData({...formData, author_name: e.target.value})} required />
                </div>
                <div className="col-md-6 form-group">
                  <label className="form-label">Author Title (e.g. Patient)</label>
                  <input type="text" className="form-input" value={formData.author_title} onChange={e => setFormData({...formData, author_title: e.target.value})} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label className="form-label">Rating (1-5)</label>
                  <select className="form-select" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}>
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
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

              <RichTextEditor 
                label="Testimonial Content"
                value={formData.content} 
                onChange={val => setFormData({...formData, content: val})} 
              />

              <div className="form-group mt-4">
                <label className="form-label">Author Image Key (optional)</label>
                <input type="text" className="form-input" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
              </div>

              <div className="modal-footer mt-5">
                <button type="button" className="btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTestimonials;
