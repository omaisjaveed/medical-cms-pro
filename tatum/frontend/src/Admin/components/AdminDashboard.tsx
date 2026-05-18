import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFileLines, 
  faNewspaper, 
  faHandSparkles, 
  faImage, 
  faComments, 
  faEnvelopeOpenText,
  faArrowRight,
  faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./admin.css";

const apiUrl = import.meta.env.VITE_API_URL || "";

interface Stats {
  pages: number;
  pagesPublished: number;
  blogs: number;
  blogsPublished: number;
  inquiries: number;
  newInquiries: number;
  settings: number;
  services: number;
  servicesActive: number;
  gallery: number;
  galleryActive: number;
  testimonials: number;
  testimonialsActive: number;
}

const cardConfig = [
  { key: "pages", label: "Pages", icon: faFileLines, color: "#72AE39", path: "/admin/pages", desc: "Total Pages" },
  { key: "blogs", label: "Blog Posts", icon: faNewspaper, color: "#2568B8", path: "/admin/blogs", desc: "Articles & News" },
  { key: "services", label: "Services", icon: faHandSparkles, color: "#72AE39", path: "/admin/services", desc: "Treatment Options" },
  { key: "gallery", label: "Gallery", icon: faImage, color: "#2568B8", path: "/admin/gallery", desc: "Media Assets" },
  { key: "testimonials", label: "Reviews", icon: faComments, color: "#72AE39", path: "/admin/testimonials", desc: "Patient Stories" },
  { key: "inquiries", label: "Inquiries", icon: faEnvelopeOpenText, color: "#2568B8", path: "/admin/inquiries", desc: "Contact Forms" },
];

function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0, pagesPublished: 0, blogs: 0, blogsPublished: 0,
    inquiries: 0, newInquiries: 0, settings: 0, services: 0, servicesActive: 0,
    gallery: 0, galleryActive: 0, testimonials: 0, testimonialsActive: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("tatum_admin_token");
      const headers = { Authorization: `Bearer ${token}` };
      
      const [pagesRes, blogsRes, inquiriesRes, servicesRes, galleryRes, testimonialsRes] = await Promise.all([
        fetch(`${apiUrl}/api/v1/pages`, { headers }),
        fetch(`${apiUrl}/api/v1/blogs/admin/all`, { headers }),
        fetch(`${apiUrl}/api/v1/inquiries`, { headers }),
        fetch(`${apiUrl}/api/v1/services/admin/all`, { headers }),
        fetch(`${apiUrl}/api/v1/gallery/all`, { headers }),
        fetch(`${apiUrl}/api/v1/testimonials/admin/all`, { headers }),
      ]);

      const [pagesData, blogsData, inquiriesData, servicesData, galleryData, testimonialsData] = await Promise.all([
        pagesRes.json(),
        blogsRes.json(),
        inquiriesRes.json(),
        servicesRes.json(),
        galleryRes.json(),
        testimonialsRes.json(),
      ]);

      setStats({
        pages: pagesData.data?.length || 0,
        pagesPublished: (pagesData.data || []).filter((p: any) => p.status === "Published").length,
        blogs: blogsData.data?.length || 0,
        blogsPublished: (blogsData.data || []).filter((b: any) => b.status === "Published").length,
        inquiries: inquiriesData.data?.length || 0,
        newInquiries: (inquiriesData.data || []).filter((i: any) => i.status === "New").length,
        services: servicesData.data?.length || 0,
        servicesActive: (servicesData.data || []).filter((s: any) => s.status === "Published").length,
        gallery: galleryData.data?.length || 0,
        galleryActive: galleryData.data?.length || 0,
        testimonials: testimonialsData.data?.length || 0,
        testimonialsActive: (testimonialsData.data || []).filter((t: any) => t.status === "Published").length,
        settings: 0
      });
    } catch (err: any) {
      setError("Unable to connect to CMS backend. Please ensure the database is running.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="admin-loading">Initializing Dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-welcome mb-5">
        <h2 className="section-title">Welcome back, Admin</h2>
        <p className="admin-description">Here's a quick overview of your wellness center's digital presence.</p>
      </div>

      {error && (
        <div className="alert alert-warning mb-4 p-4 rounded-4">
          <h4 className="fw-bold mb-2">System Notice</h4>
          <p className="mb-0">{error}</p>
        </div>
      )}

      <div className="stats-grid">
        {cardConfig.map((card) => (
          <Link to={card.path} key={card.key} className="stats-card">
            <div className="stats-icon-wrapper" style={{ color: card.color, background: `${card.color}15` }}>
              <FontAwesomeIcon icon={card.icon} />
            </div>
            <div className="stats-content">
              <h3 className="stats-label">{card.label}</h3>
              <div className="stats-value">
                {stats[card.key as keyof Stats]}
              </div>
              <p className="stats-desc">{card.desc}</p>
            </div>
            <div className="stats-arrow">
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </Link>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-lg-8">
          <div className="admin-card h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="card-title mb-0">Quick Actions</h3>
            </div>
            <div className="quick-actions-grid">
              {/* <Link to="/admin/pages" className="action-btn">
                <div className="action-icon"><FontAwesomeIcon icon={faPlus} /></div>
                <span>Create Page</span>
              </Link> */}
              <Link to="/admin/blogs" className="action-btn">
                <div className="action-icon"><FontAwesomeIcon icon={faNewspaper} /></div>
                <span>New Blog Post</span>
              </Link>
              <Link to="/admin/services" className="action-btn">
                <div className="action-icon"><FontAwesomeIcon icon={faHandSparkles} /></div>
                <span>Add Service</span>
              </Link>
              <Link to="/admin/inquiries" className="action-btn">
                <div className="action-icon"><FontAwesomeIcon icon={faEnvelopeOpenText} /></div>
                <span>View Inquiries</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="admin-card h-100">
            <h3 className="card-title">Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon"><FontAwesomeIcon icon={faClockRotateLeft} /></div>
                <div className="activity-details">
                  <p className="activity-text">CMS Dashboard updated to v2.0</p>
                  <span className="activity-time">Just now</span>
                </div>
              </div>
              <p className="text-muted small text-center mt-4">Database connection required for live activity logs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const faPlus = { prefix: 'fas', iconName: 'plus', icon: [448, 512, [], "f067", "M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"] } as any;

export default AdminDashboard;
