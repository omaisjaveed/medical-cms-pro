import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faTrash, faReply, faTimes } from "@fortawesome/free-solid-svg-icons";
import RichTextEditor from "./components/RichTextEditor";
import { toast } from "react-hot-toast";
import api from "../services/api";
import "./admin.css";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  reply_content?: string;
  created_at: string;
  data?: any;
}

function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [replyInquiry, setReplyInquiry] = useState<Inquiry | null>(null);
  const [replyContent, setReplyContent] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await api.getInquiries();
      setInquiries(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(err.message || "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this inquiry?")) return;
    const loadingToast = toast.loading("Deleting inquiry...");
    try {
      await api.deleteInquiry(id);
      toast.success("Inquiry deleted successfully", { id: loadingToast });
      fetchInquiries();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete inquiry", { id: loadingToast });
    }
  };

  const handleOpenReply = (inquiry: Inquiry) => {
    setReplyInquiry(inquiry);
    setReplyContent(inquiry.reply_content || "");
  };

  const handleSaveReply = async () => {
    if (!replyInquiry) return;
    const loadingToast = toast.loading("Saving reply...");
    try {
      await api.replyInquiry(replyInquiry.id, replyContent);
      toast.success("Reply saved successfully", { id: loadingToast });
      setReplyInquiry(null);
      fetchInquiries();
    } catch (err: any) {
      toast.error(err.message || "Failed to save reply", { id: loadingToast });
    }
  };

  if (loading) return <div className="admin-loading">Loading Inquiries...</div>;

  return (
    <div className="admin-inquiries">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Patient Inquiries</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Contact info</th>
              <th>Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(inquiries || []).map((item) => {
              const contactData = typeof item.data === 'string' ? JSON.parse(item.data) : item.data || {};
              const fullName = item.name || contactData.name || `${contactData.firstName || ""} ${contactData.lastName || ""}`.trim() || "N/A";
              return (
                <tr key={item.id}>
                  <td className="small text-muted">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="fw-bold">{fullName}</td>
                  <td>
                    <div className="small">{item.email || contactData.email}</div>
                    <div className="small text-muted">{item.phone || contactData.phone}</div>
                  </td>
                  <td style={{ maxWidth: '300px' }}>
                    <div className="small">{item.message || contactData.message}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${item.status?.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn-icon" onClick={() => handleOpenReply(item)} title="Reply">
                        <FontAwesomeIcon icon={faReply} />
                      </button>
                      <button className="btn-icon-danger" onClick={() => handleDelete(item.id)} title="Delete">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-5 text-muted">No inquiries found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {replyInquiry && (
        <div className="admin-modal-overlay">
          <div className="admin-modal large">
            <div className="modal-header">
              <h3 className="modal-title">Reply to {replyInquiry.name || "Inquiry"}</h3>
              <button className="btn-close-custom" onClick={() => setReplyInquiry(null)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="p-4">
              <div className="inquiry-original-message mb-4 p-3 bg-light rounded-3 border">
                <div className="fw-bold mb-1">Original Message:</div>
                <div className="text-muted small">{replyInquiry.message || JSON.parse(replyInquiry.data || "{}").message}</div>
              </div>

              <RichTextEditor 
                label="Admin Reply Content"
                value={replyContent}
                onChange={setReplyContent}
              />

              <div className="modal-footer mt-4">
                <button className="btn-secondary" onClick={() => setReplyInquiry(null)}>Cancel</button>
                <button className="btn-primary" onClick={handleSaveReply}>Save Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminInquiries;
