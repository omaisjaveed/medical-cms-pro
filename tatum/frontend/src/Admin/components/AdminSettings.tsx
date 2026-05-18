import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSave, faClock, faShareNodes, faAddressCard, faLink } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import api from "../services/api";
import "./admin.css";

interface Settings {
  site_name: string;
  logo?: { imageKey: string };
  header_links: any[];
  contact_info: { email: string; phone: string; address: string; fax?: string };
  business_hours: Record<string, string>;
  social_links: Record<string, string>;
  footer_text: string;
  booking_url: string;
  maintenance_mode: boolean;
  smtp_config?: {
    host: string;
    port: string;
    user: string;
    pass: string;
    from_email: string;
    from_name: string;
    secure: boolean;
  };
}

function AdminSettings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await api.getSettings();
      
      // Ensure complex fields are parsed if they come as strings
      const settingsData = { ...response.data };
      
      const jsonFields = ['business_hours', 'social_links', 'contact_info', 'smtp_config', 'header_links', 'logo'];
      
      jsonFields.forEach(field => {
        if (typeof settingsData[field] === 'string') {
          try {
            settingsData[field] = JSON.parse(settingsData[field]);
          } catch (e) {
            console.error(`Failed to parse ${field}`, e);
            // Fallback to empty object/array based on interface
            if (field === 'header_links') settingsData[field] = [];
            else settingsData[field] = {};
          }
        }
      });

      // Helper to strip surrounding quotes from simple string fields
      const cleanSimpleString = (str: any) => {
        if (typeof str !== 'string') return str;
        return str.replace(/^["\\]+|["\\]+$/g, '').trim();
      };

      settingsData.site_name = cleanSimpleString(settingsData.site_name);
      settingsData.footer_text = cleanSimpleString(settingsData.footer_text);
      settingsData.booking_url = cleanSimpleString(settingsData.booking_url);

      // Ensure smtp_config exists
      if (!settingsData.smtp_config || Object.keys(settingsData.smtp_config).length === 0) {
        settingsData.smtp_config = {
          host: "",
          port: "587",
          user: "",
          pass: "",
          from_email: "",
          from_name: "Tatum Wellness",
          secure: false
        };
      }
      
      // Ensure defaults for broken data
      if (!settingsData.business_hours || Object.keys(settingsData.business_hours).length === 0) {
        settingsData.business_hours = {
          monday: "9 AM - 5:30 PM",
          tuesday: "9 AM - 12 PM",
          wednesday: "9 AM - 5:30 PM",
          thursday: "2 PM - 5:30 PM",
          friday: "9 AM - 5 PM",
          saturday: "Closed",
          sunday: "Closed"
        };
      }

      if (!settingsData.social_links || Object.keys(settingsData.social_links).length === 0) {
        settingsData.social_links = {
          facebook: "",
          twitter: "",
          instagram: "",
          linkedin: "",
          youtube: ""
        };
      }
      
      setSettings(settingsData);
    } catch (err: any) {
      setError(err.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleNestedChange = (parent: string, child: string, value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      [parent]: { ...(settings[parent as keyof Settings] as any), [child]: value },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const loadingToast = toast.loading("Saving settings...");
    try {
      const settingsArray = Object.entries(settings || {}).map(([key, value]) => ({ key, value }));
      await api.bulkUpdateSettings(settingsArray);
      toast.success("Settings saved successfully!", { id: loadingToast });
    } catch (err: any) {
      toast.error(err.message || "Failed to save settings", { id: loadingToast });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading">Loading Settings...</div>;
  if (!settings) return <div className="alert alert-danger">Failed to load settings data.</div>;

  return (
    <div className="admin-settings">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Global Settings</h2>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          <FontAwesomeIcon icon={faSave} className="me-2" />
          {saving ? "Saving..." : "Save All Settings"}
        </button>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="admin-card h-100">
            <h3 className="card-title">
              <FontAwesomeIcon icon={faGear} className="me-2 text-primary" />
              General Info
            </h3>
            <div className="form-group">
              <label className="form-label">Site Name</label>
              <input type="text" className="form-input" value={settings.site_name} onChange={e => setSettings({...settings, site_name: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Booking URL</label>
              <input type="text" className="form-input" value={settings.booking_url} onChange={e => setSettings({...settings, booking_url: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Footer Text</label>
              <textarea className="form-textarea" rows={3} value={settings.footer_text} onChange={e => setSettings({...settings, footer_text: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="admin-card h-100">
            <h3 className="card-title">
              <FontAwesomeIcon icon={faAddressCard} className="me-2 text-primary" />
              Contact Details
            </h3>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" value={settings.contact_info.email} onChange={e => handleNestedChange("contact_info", "email", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input type="text" className="form-input" value={settings.contact_info.phone} onChange={e => handleNestedChange("contact_info", "phone", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea className="form-textarea" rows={2} value={settings.contact_info.address} onChange={e => handleNestedChange("contact_info", "address", e.target.value)} />
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="admin-card h-100">
            <h3 className="card-title">
              <FontAwesomeIcon icon={faClock} className="me-2 text-primary" />
              Business Hours
            </h3>
            {Object.entries(settings.business_hours || {}).map(([day, hours]) => (
              <div className="form-group mb-2" key={day}>
                <label className="form-label text-capitalize">{day}</label>
                <input type="text" className="form-input" value={hours} onChange={e => setSettings({...settings, business_hours: {...settings.business_hours, [day]: e.target.value}})} />
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="admin-card h-100">
            <h3 className="card-title">
              <FontAwesomeIcon icon={faShareNodes} className="me-2 text-primary" />
              Social Links
            </h3>
            {Object.entries(settings.social_links || {}).map(([platform, url]) => (
              <div className="form-group mb-2" key={platform}>
                <label className="form-label text-capitalize">{platform}</label>
                <div className="d-flex align-items-center gap-2">
                  <FontAwesomeIcon icon={faLink} className="text-muted" />
                  <input type="text" className="form-input" value={url} onChange={e => setSettings({...settings, social_links: {...settings.social_links, [platform]: e.target.value}})} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-12 mb-4">
          <div className="admin-card">
            <h3 className="card-title">
              <FontAwesomeIcon icon={faGear} className="me-2 text-primary" />
              SMTP Configuration (Email Service)
            </h3>
            <div className="row">
              <div className="col-md-4 form-group">
                <label className="form-label">SMTP Host</label>
                <input type="text" className="form-input" value={settings.smtp_config?.host} onChange={e => handleNestedChange("smtp_config", "host", e.target.value)} placeholder="smtp.gmail.com" />
              </div>
              <div className="col-md-4 form-group">
                <label className="form-label">SMTP Port</label>
                <input type="text" className="form-input" value={settings.smtp_config?.port} onChange={e => handleNestedChange("smtp_config", "port", e.target.value)} placeholder="587" />
              </div>
              <div className="col-md-4 form-group d-flex align-items-center pt-4">
                <label className="form-label mb-0 cursor-pointer d-flex align-items-center">
                  <input type="checkbox" checked={settings.smtp_config?.secure} onChange={e => handleNestedChange("smtp_config", "secure", e.target.checked)} style={{ width: '20px', height: '20px' }} />
                  <span className="ms-2">Use SSL/TLS (Secure)</span>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label">SMTP User / Email</label>
                <input type="text" className="form-input" value={settings.smtp_config?.user} onChange={e => handleNestedChange("smtp_config", "user", e.target.value)} placeholder="your-email@gmail.com" />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">SMTP Password / App Key</label>
                <input type="password" className="form-input" value={settings.smtp_config?.pass} onChange={e => handleNestedChange("smtp_config", "pass", e.target.value)} placeholder="••••••••••••" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label">Sender Email (From)</label>
                <input type="email" className="form-input" value={settings.smtp_config?.from_email} onChange={e => handleNestedChange("smtp_config", "from_email", e.target.value)} placeholder="no-reply@tatumwellness.com" />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">Sender Name (From Name)</label>
                <input type="text" className="form-input" value={settings.smtp_config?.from_name} onChange={e => handleNestedChange("smtp_config", "from_name", e.target.value)} placeholder="Tatum Wellness" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;
