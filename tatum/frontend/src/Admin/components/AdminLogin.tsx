import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/tatum-logo.webp";
import "./admin.css";

const apiUrl = import.meta.env.VITE_API_URL || "";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@tatumwellness.com");
  const [password, setPassword] = useState("Admin@1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const targetUrl = apiUrl ? `${apiUrl}/api/v1/auth/login` : "/api/v1/auth/login";
      console.log(`[AdminLogin] Attempting login to: ${targetUrl}`);
      
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: email.trim(), 
          password: password // Don't trim on frontend, backend handles it robustly
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let result;

      if (contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.slice(0, 160)}`);
      }

      if (!response.ok || !result.success) {
        // Log detailed error for debugging
        console.error("[AdminLogin] Login failed:", result);
        throw new Error(result.message || "Login failed");
      }
      
      console.log("[AdminLogin] Login successful!");
      localStorage.setItem("tatum_admin_token", result.data.token);
      localStorage.setItem("tatum_admin_user", JSON.stringify(result.data.user));
      navigate("/admin", { replace: true });
    } catch (err: any) {
      // Ignore the "message channel closed" error in the UI as it's often a browser extension issue
      if (err.message && err.message.includes("message channel closed")) {
        console.warn("[AdminLogin] Extension-related error ignored:", err.message);
        return;
      }
      
      console.error("[AdminLogin] Catch block error:", err);
      setError(err.message || "Unable to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-brand">
          <img src={logo} alt="Tatum Logo" />
          <div>
            <h2 className="admin-login-title">Tatum Admin</h2>
            <p className="admin-login-copy">Login to manage pages, inquiries, blogs, and site settings from a dashboard styled like your site.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            className="admin-input"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="admin-input"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="admin-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <div className="admin-alert">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
