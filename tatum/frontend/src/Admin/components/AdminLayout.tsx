import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/images/tatum-logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGauge, 
  faFileLines, 
  faHandSparkles, 
  faImage, 
  faImages,
  faNewspaper, 
  faComments, 
  faEnvelopeOpenText, 
  faGear,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import "./admin.css";

function AdminLayout() {
  const navigate = useNavigate();
  const token = typeof window !== "undefined" ? window.localStorage.getItem("tatum_admin_token") : null;

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("tatum_admin_token");
    localStorage.removeItem("tatum_admin_user");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src={logo} alt="Tatum Logo" />
          <div className="admin-brand-text">
            <span className="admin-brand-title">Tatum</span>
            <span className="admin-brand-subtitle">Wellness CMS</span>
          </div>
        </div>
        <nav>
          <NavLink to="/admin" end>
            <FontAwesomeIcon icon={faGauge} className="nav-icon" />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/pages">
            <FontAwesomeIcon icon={faFileLines} className="nav-icon" />
            <span>Pages</span>
          </NavLink>
          <NavLink to="/admin/services">
            <FontAwesomeIcon icon={faHandSparkles} className="nav-icon" />
            <span>Services</span>
          </NavLink>
          <NavLink to="/admin/gallery">
            <FontAwesomeIcon icon={faImage} className="nav-icon" />
            <span>Gallery</span>
          </NavLink>
          <NavLink to="/admin/blogs">
            <FontAwesomeIcon icon={faNewspaper} className="nav-icon" />
            <span>Blogs</span>
          </NavLink>
          <NavLink to="/admin/testimonials">
            <FontAwesomeIcon icon={faComments} className="nav-icon" />
            <span>Testimonials</span>
          </NavLink>
          <NavLink to="/admin/inquiries">
            <FontAwesomeIcon icon={faEnvelopeOpenText} className="nav-icon" />
            <span>Inquiries</span>
          </NavLink>
          <NavLink to="/admin/media">
            <FontAwesomeIcon icon={faImages} className="nav-icon" />
            <span>Media Library</span>
          </NavLink>
          <NavLink to="/admin/settings">
            <FontAwesomeIcon icon={faGear} className="nav-icon" />
            <span>Settings</span>
          </NavLink>
        </nav>
        <button className="admin-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="nav-icon" />
          <span>Logout</span>
        </button>
      </aside>
      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <h1 className="admin-heading">Admin Dashboard</h1>
            <p className="admin-description">Manage your content with a dashboard experience built using the same site palette, typography, and clean visual language.</p>
          </div>
        </div>
        <div className="admin-content-card">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
